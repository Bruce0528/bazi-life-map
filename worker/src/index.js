/**
 * Payment API for 時序命盤's 近期事件推演 (NT$99 unlock), backed by NewebPay MPG
 * and Cloudflare D1.
 *
 * STATUS: written from NewebPay's documented MPG (Mobile/PC Gateway) spec,
 * NOT YET TESTED against a real NewebPay sandbox (no test MerchantID/HashKey
 * existed at the time this was written). Before going live:
 *   1. Get test credentials from NewebPay, set them with `wrangler secret put`.
 *   2. Hit POST /orders then POST /payments/newebpay, confirm the resulting
 *      TradeInfo/TradeSha are accepted by NewebPay's test gateway (a bad
 *      TradeSha is rejected immediately with a clear error on their page,
 *      so this is quick to iterate on).
 *   3. Double-check the exact required TradeInfo fields and gateway URLs
 *      against NewebPay's current 介接技術文件 (they do occasionally revise
 *      field names) — the ones below reflect the commonly documented set.
 *
 * The actual BaZi calculation stays entirely client-side (as it already is
 * in app.js) — this backend's only job is: take NT$99, and hand back a
 * one-time "unlock" the frontend can redeem to enable the 推演 button.
 */

const GATEWAY_URL = {
  test: 'https://ccore.newebpay.com/MPG/mpg_gateway',
  prod: 'https://core.newebpay.com/MPG/mpg_gateway',
};

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, env, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(env) },
  });
}

function bufToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  return bytes.buffer;
}

async function aesKey(hashKey, usage) {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(hashKey), { name: 'AES-CBC' }, false, [usage]);
}

async function aesEncryptHex(hashKey, hashIV, plainText) {
  const key = await aesKey(hashKey, 'encrypt');
  const iv = new TextEncoder().encode(hashIV);
  const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, new TextEncoder().encode(plainText));
  return bufToHex(cipherBuf); // lowercase hex — this is what NewebPay expects in TradeInfo
}

async function aesDecryptHex(hashKey, hashIV, hexCipherText) {
  const key = await aesKey(hashKey, 'decrypt');
  const iv = new TextEncoder().encode(hashIV);
  const plainBuf = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, hexToBuf(hexCipherText));
  return new TextDecoder().decode(plainBuf);
}

async function sha256UpperHex(text) {
  const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return bufToHex(hashBuf).toUpperCase();
}

async function computeTradeSha(env, tradeInfoHex) {
  return sha256UpperHex(`HashKey=${env.NEWEBPAY_HASHKEY}&${tradeInfoHex}&HashIV=${env.NEWEBPAY_HASHIV}`);
}

function newId(prefix) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`;
}

// MerchantOrderNo must be unique and NewebPay caps it at 30 chars.
function newMerchantOrderNo() {
  return `BZ${Date.now().toString(36)}${crypto.randomUUID().slice(0, 6)}`.slice(0, 30);
}

async function handleCreateOrder(request, env) {
  const body = await request.json().catch(() => ({}));
  const deviceToken = body.deviceToken && typeof body.deviceToken === 'string' ? body.deviceToken : newId('dev');
  const orderId = newId('ord');
  const merchantOrderNo = newMerchantOrderNo();
  const amount = Number(env.AMOUNT_TWD) || 99;

  await env.DB.prepare(
    `INSERT INTO orders (id, merchant_order_no, amount, item_desc, status, email, device_token)
     VALUES (?, ?, ?, ?, 'pending', ?, ?)`
  )
    .bind(orderId, merchantOrderNo, amount, env.ITEM_DESC || '近期事件推演 1 次', body.email || null, deviceToken)
    .run();

  return json({ orderId, merchantOrderNo, amount, deviceToken }, env);
}

async function handleCreatePayment(request, env) {
  const { orderId } = await request.json().catch(() => ({}));
  if (!orderId) return json({ error: 'orderId required' }, env, 400);

  const order = await env.DB.prepare(`SELECT * FROM orders WHERE id = ?`).bind(orderId).first();
  if (!order) return json({ error: 'order not found' }, env, 404);
  if (order.status === 'paid') return json({ error: 'order already paid' }, env, 409);

  const origin = new URL(request.url).origin;
  const returnUrl = `${origin}/payments/return?orderId=${encodeURIComponent(orderId)}`;
  const notifyUrl = `${origin}/payments/callback`;
  const clientBackUrl = env.ALLOWED_ORIGIN;

  const fields = {
    MerchantID: env.NEWEBPAY_MERCHANT_ID,
    RespondType: 'JSON',
    TimeStamp: Math.floor(Date.now() / 1000).toString(),
    Version: '2.0',
    MerchantOrderNo: order.merchant_order_no,
    Amt: String(order.amount),
    ItemDesc: order.item_desc,
    Email: order.email || undefined,
    LoginType: '0',
    ReturnURL: returnUrl,
    NotifyURL: notifyUrl,
    ClientBackURL: clientBackUrl,
  };
  const tradeInfoPlain = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');

  const tradeInfoHex = await aesEncryptHex(env.NEWEBPAY_HASHKEY, env.NEWEBPAY_HASHIV, tradeInfoPlain);
  const tradeSha = await computeTradeSha(env, tradeInfoHex);

  return json(
    {
      gatewayUrl: GATEWAY_URL[env.NEWEBPAY_ENV] || GATEWAY_URL.test,
      fields: {
        MerchantID: env.NEWEBPAY_MERCHANT_ID,
        TradeInfo: tradeInfoHex,
        TradeSha: tradeSha,
        Version: '2.0',
      },
    },
    env
  );
}

// Server-to-server notification NewebPay POSTs after a payment attempt.
async function handleCallback(request, env) {
  const bodyText = await request.text();
  const params = new URLSearchParams(bodyText);
  const tradeInfoHex = params.get('TradeInfo');
  const tradeSha = params.get('TradeSha');
  if (!tradeInfoHex || !tradeSha) return new Response('missing fields', { status: 400 });

  const expectedSha = await computeTradeSha(env, tradeInfoHex);
  if (expectedSha !== tradeSha) return new Response('bad checksum', { status: 400 });

  const decrypted = await aesDecryptHex(env.NEWEBPAY_HASHKEY, env.NEWEBPAY_HASHIV, tradeInfoHex);
  let result;
  try {
    result = JSON.parse(decrypted);
  } catch {
    // Some NewebPay responses come back as a querystring instead of JSON
    // depending on RespondType — fall back to parsing it that way.
    result = Object.fromEntries(new URLSearchParams(decrypted));
  }
  const payload = result.Result || result;
  const merchantOrderNo = payload.MerchantOrderNo;
  const status = (result.Status || '').toString();

  const order = await env.DB.prepare(`SELECT * FROM orders WHERE merchant_order_no = ?`).bind(merchantOrderNo).first();
  if (!order) return new Response('order not found', { status: 404 });

  if (status === 'SUCCESS' && order.status !== 'paid') {
    await env.DB.batch([
      env.DB.prepare(`UPDATE orders SET status='paid', paid_at=datetime('now'), raw_notify=? WHERE id=?`).bind(
        bodyText,
        order.id
      ),
      env.DB.prepare(`INSERT INTO unlocks (id, order_id, device_token) VALUES (?, ?, ?)`).bind(
        newId('unlock'),
        order.id,
        order.device_token
      ),
    ]);
  } else if (status !== 'SUCCESS') {
    await env.DB.prepare(`UPDATE orders SET status='failed', raw_notify=? WHERE id=?`).bind(bodyText, order.id).run();
  }

  // NewebPay just needs a 200 response; body content isn't machine-checked.
  return new Response('OK');
}

// The browser lands here (NewebPay POSTs to ReturnURL after checkout) —
// this is UX-only; the authoritative payment record comes from
// handleCallback (NotifyURL), so this just verifies+redirects and, as a
// defensive fallback, marks the order paid if the server notify hasn't
// landed yet by the time the user's browser gets back.
async function handleReturn(request, env) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get('orderId') || '';
  const bodyText = await request.text().catch(() => '');
  const params = new URLSearchParams(bodyText);
  const tradeInfoHex = params.get('TradeInfo');
  const tradeSha = params.get('TradeSha');
  let status = 'unknown';

  if (tradeInfoHex && tradeSha && (await computeTradeSha(env, tradeInfoHex)) === tradeSha) {
    const decrypted = await aesDecryptHex(env.NEWEBPAY_HASHKEY, env.NEWEBPAY_HASHIV, tradeInfoHex).catch(() => null);
    if (decrypted) {
      let result;
      try {
        result = JSON.parse(decrypted);
      } catch {
        result = Object.fromEntries(new URLSearchParams(decrypted));
      }
      status = (result.Status || '').toString() === 'SUCCESS' ? 'paid' : 'failed';
      const merchantOrderNo = (result.Result || result).MerchantOrderNo;
      const order = merchantOrderNo
        ? await env.DB.prepare(`SELECT * FROM orders WHERE merchant_order_no = ?`).bind(merchantOrderNo).first()
        : null;
      if (order && status === 'paid' && order.status !== 'paid') {
        await env.DB.batch([
          env.DB.prepare(`UPDATE orders SET status='paid', paid_at=datetime('now') WHERE id=?`).bind(order.id),
          env.DB.prepare(`INSERT INTO unlocks (id, order_id, device_token) VALUES (?, ?, ?)`).bind(
            newId('unlock'),
            order.id,
            order.device_token
          ),
        ]);
      }
    }
  }

  const dest = new URL(env.ALLOWED_ORIGIN);
  dest.hash = 'divination';
  dest.searchParams.set('orderId', orderId);
  dest.searchParams.set('payment', status);
  return Response.redirect(dest.toString(), 302);
}

async function handleGetOrder(orderId, env) {
  const order = await env.DB.prepare(`SELECT id, status, amount, created_at, paid_at FROM orders WHERE id = ?`)
    .bind(orderId)
    .first();
  if (!order) return json({ error: 'order not found' }, env, 404);
  return json(order, env);
}

async function handlePremiumReading(request, env) {
  const { deviceToken } = await request.json().catch(() => ({}));
  if (!deviceToken) return json({ error: 'deviceToken required' }, env, 400);

  const unlock = await env.DB.prepare(
    `SELECT * FROM unlocks WHERE device_token = ? AND used = 0 ORDER BY created_at ASC LIMIT 1`
  )
    .bind(deviceToken)
    .first();
  if (!unlock) return json({ ok: false, reason: 'no_unlock' }, env, 402);

  await env.DB.prepare(`UPDATE unlocks SET used=1, used_at=datetime('now') WHERE id=?`).bind(unlock.id).run();
  // The client already has everything it needs to run the (client-side)
  // divination logic in app.js; this endpoint's job is only to gate that.
  return json({ ok: true }, env);
}

// Simple per-IP rate limit backed by KV. Not perfectly precise (KV is
// eventually consistent, so a burst right at a window boundary could
// slip through), but it is enough to stop naive scripted abuse of the
// order/payment/unlock endpoints without needing a paid domain+WAF.
async function isRateLimited(env, request, bucket, limit, windowSeconds) {
  if (!env.RATE_LIMIT) return false; // fail open if KV isn't bound, rather than break the API
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `${bucket}:${ip}`;
  const current = await env.RATE_LIMIT.get(key);
  const count = current ? parseInt(current, 10) : 0;
  if (count >= limit) return true;
  await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: windowSeconds });
  return false;
}

const RATE_LIMITS = {
  '/orders': { limit: 10, windowSeconds: 60 },
  '/payments/newebpay': { limit: 10, windowSeconds: 60 },
  '/premium/reading': { limit: 20, windowSeconds: 60 },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (method === 'OPTIONS') return new Response(null, { headers: corsHeaders(env) });
    if (pathname === '/health') return json({ ok: true }, env);

    const limitRule = RATE_LIMITS[pathname];
    if (limitRule && method === 'POST') {
      const limited = await isRateLimited(env, request, pathname, limitRule.limit, limitRule.windowSeconds);
      if (limited) return json({ error: 'too many requests, please try again shortly' }, env, 429);
    }

    try {
      if (pathname === '/orders' && method === 'POST') return await handleCreateOrder(request, env);
      if (pathname === '/payments/newebpay' && method === 'POST') return await handleCreatePayment(request, env);
      if (pathname === '/payments/callback' && method === 'POST') return await handleCallback(request, env);
      if (pathname === '/payments/return' && (method === 'POST' || method === 'GET')) return await handleReturn(request, env);
      if (pathname === '/premium/reading' && method === 'POST') return await handlePremiumReading(request, env);
      if (pathname.startsWith('/orders/') && method === 'GET')
        return await handleGetOrder(pathname.slice('/orders/'.length), env);
      return json({ error: 'not found' }, env, 404);
    } catch (err) {
      return json({ error: 'internal error', detail: String(err && err.message || err) }, env, 500);
    }
  },
};
