-- D1 schema for the 近期事件推演 (NT$99 unlock) payment flow.
-- Apply with: wrangler d1 execute bazi-orders --file=./worker/schema.sql

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,               -- our own order id, e.g. ord_<uuid>
  merchant_order_no TEXT NOT NULL UNIQUE, -- sent to NewebPay as MerchantOrderNo (must be unique, <=30 chars)
  amount INTEGER NOT NULL,           -- in NT$, integer (99)
  item_desc TEXT NOT NULL DEFAULT '近期事件推演 1 次',
  status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed | expired
  email TEXT,                        -- optional, for receipt / lookup
  device_token TEXT,                 -- random token issued to the browser, used to claim the unlock after payment
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT,
  raw_notify TEXT                    -- last raw NewebPay notify payload, kept for support/debugging
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_device_token ON orders(device_token);

-- One row per unlocked "reading" a paid order grants. Kept separate from orders
-- so a single order could in principle grant more than one unlock in future.
CREATE TABLE IF NOT EXISTS unlocks (
  id TEXT PRIMARY KEY,               -- unlock_<uuid>
  order_id TEXT NOT NULL REFERENCES orders(id),
  device_token TEXT NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,   -- 0 = unused, 1 = already consumed by one 推演
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  used_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_unlocks_device_token ON unlocks(device_token);
