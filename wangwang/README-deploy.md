# 汪汪日記 — 正式上線步驟

這個資料夾(`deploy/`)裡的 `index.html` 是可以獨立上線的完整網站,跟 Claude 對話裡看到的預覽版是同一份設計,差別只在資料庫從 Claude 的內建資料庫換成了 Firebase。整個過程不需要寫程式,大約 20-25 分鐘。

## 第一步:建立 Firebase 專案(讓情報、打卡紀錄能所有人共用)

1. 開啟 https://console.firebase.google.com ,用 Google 帳號登入
2. 「新增專案」→ 輸入專案名稱(例如 `wangwang-diary`)→ 一路下一步建立完成(可以關閉 Google Analytics,不需要)
3. 左側選單「建構」→「Firestore Database」→「建立資料庫」
   - 位置選 `asia-east1`(台灣/香港附近)
   - 安全性規則先選「測試模式」(之後會手動貼規則,見下方)
4. 建立完成後,回到專案總覽頁,點網頁圖示 `</>` 新增一個「Web應用程式」
   - 應用程式暱稱隨意(例如 `web`)
   - 不需要勾選 Firebase Hosting
   - 建立後畫面會出現一段 `firebaseConfig = { apiKey: ..., authDomain: ..., ... }`,把這整段複製起來

## 第二步:把設定貼進網站

打開 `deploy/index.html`,找到接近檔案最上方的這一段(搜尋 `YOUR_API_KEY`):

```js
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

把整段換成你從 Firebase 複製的內容,存檔。畫面底部原本會出現的「尚未設定 Firebase」提示條,設定成功後就不會再出現。

## 第三步:設定 Firestore 安全規則

回到 Firebase 主控台 →「Firestore Database」→「規則」分頁,貼上:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

點「發布」。

> ⚠️ 這組規則是「所有人都能讀寫」,跟目前 Claude 預覽版的行為一致(沒有登入機制),方便親朋好友直接使用。缺點是理論上任何人都能亂寫資料。等網站穩定有人用之後,若想加強保護,可以再回來加上 Firebase 的匿名登入(Anonymous Auth)或內容審核機制,到時候可以再請我協助調整規則。

## 第四步:把程式碼放上 GitHub

這一步是為了讓 Vercel 能自動幫你部署,也是「連上 GitHub」這件事實際發生的地方——完成後,你會在 https://github.com/settings/installations 看到多一個「Vercel」的項目,這是 GitHub 自己顯示「你已經授權哪些 App 存取你的帳號」的頁面,**只有你自己登入 GitHub 親自按下授權按鈕才會出現**,我這邊沒有你的帳號密碼,沒辦法幫你完成這個按鈕的部分,但檔案我已經幫你準備好、也建好本機的 Git 版本記錄了,你只需要做「建立空倉庫」跟「push」兩個動作:

1. 開啟 https://github.com/new ,倉庫名稱建議取 `wangwang-diary`(或你喜歡的名字),Public 或 Private 都可以,**不要**勾選「Add a README file」,按「Create repository」
2. 把我傳給你的 `index.html`、`README-deploy.md`、`images/` 資料夾都放進電腦裡一個叫 `deploy` 的資料夾,在該資料夾底下開終端機(Windows 用 PowerShell 或 Git Bash),依序執行:
   ```bash
   git init
   git add .
   git commit -m "初次上線"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/wangwang-diary.git
   git push -u origin main
   ```
   (`<你的帳號>` 換成你的 GitHub 帳號名稱,網址 GitHub 建立倉庫後的頁面上也會直接顯示給你複製)第一次 `push` 會跳出瀏覽器要求你登入 GitHub 並授權

## 第五步:在 Vercel 匯入這個 GitHub 倉庫,設定 wangwang 子網域

1. 開啟 https://vercel.com ,選「Continue with GitHub」登入(這一步就是安裝 Vercel 的 GitHub App,授權完成後 https://github.com/settings/installations 就會出現 Vercel)
2. Dashboard 點「Add New...」→「Project」→「Import Git Repository」,選你剛剛建立的 `wangwang-diary` 倉庫
3. 「Project Name」這一欄改成 **`wangwang`**——這就是子網域的來源,Vercel 會自動給你一個 `wangwang.vercel.app` 的網址(如果這個名字已經被別人用掉,Vercel 會提示你,可以改成 `wangwang-diary` 之類的變化)
4. 其他設定都不用動(這是純靜態網站,不需要 Build Command),直接按「Deploy」
5. 部署完成後,`https://wangwang.vercel.app` 就是正式可以分享出去的網址了
6. 之後你在本機改了 `deploy/index.html`,只要 `git add . && git commit -m "更新" && git push`,Vercel 會自動偵測並重新部署,不用再手動上傳

> 如果你已經有自己的網域(例如 `example.com`),也可以在 Vercel 專案的「Settings → Domains」裡加上 `wangwang.example.com`,再照畫面指示到你的網域註冊商加一筆 CNAME 記錄,就能用你自己的網域當子網域,效果跟 `wangwang.vercel.app`一樣,只是網址換成你自己的品牌。

### 沒有要用 GitHub 的話,更快的替代方案

如果你不想碰 Git,也可以跳過第四、五步,直接到 Vercel Dashboard 點「Add New...」→「Project」,把整個 `deploy/` 資料夾直接拖進瀏覽器的上傳區——一樣能部署成功,只是之後每次改檔案都要手動重新拖曳上傳一次,不會自動同步,而且不會在 GitHub 的 installations 頁面留下紀錄。

## 第六步:接上真正的 Google 地圖(選用,但程式已經寫好了)

這份 `deploy/index.html` 已經內建 Google Maps 串接程式碼,平常沒設定金鑰時會自動顯示手繪示意地圖(不會出錯),一旦你貼上金鑰,「地圖探索」頁跟「散步打卡」選路線時顯示的地圖會自動變成真正可縮放、拖曳的 Google 地圖,不用再改任何程式。

1. 到 https://console.cloud.google.com/ ,建立一個新專案(或沿用建 Firebase 時順便產生的專案)
2. 左側選單「API 和服務」→「已啟用的 API 和服務」→「啟用 API 和服務」,搜尋並啟用「**Maps JavaScript API**」
3. 左側「憑證」→「建立憑證」→「API 金鑰」,複製產生的金鑰
4. 「帳單」需要綁一張信用卡才能啟用(Google 有防呆機制,每月有 $200 美金免費額度,一般小型網站用不完不會被扣款,但建議之後到「API 金鑰」設定裡把這把金鑰限制成「只能用在你的網域」+「只能呼叫 Maps JavaScript API」,避免被盜用)
5. 打開 `deploy/index.html`,找到 `YOUR_GOOGLE_MAPS_API_KEY` 這一行,換成你剛剛複製的金鑰:
   ```js
   var GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
   ```
6. 存檔、`git push`(或重新拖曳上傳)

> 📍 地圖上的店家與路線座標,其中蘆洲捷運站、湧蓮寺(廟口夜市)、蘆洲成功國小三個地標已經是查證過的真實座標;其餘幾個(蘆洲防汛公園、得意堤外自行車道等)還是我估的大概位置,正式上線後建議你對照 Google 地圖,把 `index.html` 裡 `PLACES` 和 `ROUTES` 兩個清單裡的 `lat`(緯度)`lng`(經度)換成實際座標(在 Google 地圖對地點點右鍵選「這是哪裡?」就能複製),跟我說一聲我也可以幫你改。

## 檔案說明

- `index.html` — 完整網站,直接上傳即可
- `images/` — 6 個品種的狗狗插畫(首頁、散步、日記都會用到),跟 `index.html` 放在同一層結構下即可,不要移動或改名
- `README-deploy.md` — 就是這份說明
