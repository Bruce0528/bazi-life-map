# 近期事件推演 — 藍新金流付款 API

Cloudflare Worker，負責 NT$99 解鎖「近期事件推演」的訂單建立、藍新金流 (NewebPay) MPG 串接與付款結果驗證。八字/命盤/算卦的實際運算邏輯仍完全留在前端 `app.js`（未改動）——這個後端只負責「收到錢之後，發一張可以用一次的解鎖券」。

**目前狀態**：程式碼依 NewebPay MPG 官方技術文件邏輯撰寫，尚未拿到真實（測試）金鑰實際跑過一次，正式上線前務必先在測試環境跑完整流程。

## 你需要準備的東西（只有你能做，我不能幫你申請或輸入）

1. **藍新金流特約商店**（個人身分即可）— 申請後取得測試環境的：
   - `MerchantID`（商店代號）
   - `HashKey`
   - `HashIV`
2. **Cloudflare 帳號**（免費）— [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
3. 本機安裝 Node.js，然後：
   ```bash
   npm install -g wrangler
   wrangler login
   ```

## 部署步驟

在 `worker/` 目錄下執行：

```bash
# 1. 建立 D1 資料庫
wrangler d1 create bazi-orders
# 指令會印出一個 database_id，複製後貼到 wrangler.toml 的 database_id 欄位

# 2. 建立資料表
wrangler d1 execute bazi-orders --file=./schema.sql

# 3. 設定金鑰（機密資料，不會進 git，直接存在 Cloudflare 帳號裡）
wrangler secret put NEWEBPAY_MERCHANT_ID
wrangler secret put NEWEBPAY_HASHKEY
wrangler secret put NEWEBPAY_HASHIV

# 4. 部署
wrangler deploy
```

部署完成後，wrangler 會給你一個網址，例如 `https://bazi-payments-api.<your-subdomain>.workers.dev`。之後可以在 Cloudflare 後台綁自訂網域（例如 `api.你的網域.com`）。

## 上線前一定要測試的事

1. 用測試環境的 `NEWEBPAY_ENV = "test"`（`wrangler.toml` 裡已預設），先跑完整付款流程，確認：
   - `POST /orders` 能建立訂單
   - `POST /payments/newebpay` 回來的 `TradeInfo`/`TradeSha` 能被藍新測試頁接受（若加解密邏輯有誤，藍新會直接在付款頁顯示錯誤，很好排查）
   - 付款成功後 `NotifyURL`（`/payments/callback`）有確實把訂單標記為 `paid` 並產生一筆 `unlocks`
   - `POST /premium/reading` 帶正確的 `deviceToken` 能拿到 `{ok:true}`，且同一張解鎖券用過一次後不能再用
2. 全部測試通過、正式合約簽下來後，把 `wrangler.toml` 的 `NEWEBPAY_ENV` 改成 `"prod"`，並用 `wrangler secret put` 換成正式環境的 `MerchantID`/`HashKey`/`HashIV`。
3. 到時候我可以幫忙把前端「近期事件推演」按鈕從現在的暫停狀態，接上這支 API（建立訂單 → 導去藍新付款頁 → 返回後解鎖）。這部分我還沒動，因為現在後端根本還打不通。

## 檔案說明

- `wrangler.toml` — Worker 設定（D1 綁定、非機密參數）
- `schema.sql` — D1 資料表結構（orders / unlocks）
- `src/index.js` — 所有 API 邏輯
