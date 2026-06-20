# Weather App - 天氣預報與記錄網站

## 專案簡介

Weather App 是一個用於記錄和預報天氣資訊的網站。用戶可以記錄每日天氣數據，並查看天氣預報，讓您隨時掌握天氣變化。

## 開始使用

### 環境要求
- Node.js 18 或更高版本
- PostgreSQL 數據庫

### 安裝步驟

1. 複製專案
```bash
git clone <repository-url>
cd hoops-record
```

2. 安裝依賴
```bash
npm install
```

3. 設置環境變數
```bash
cp .env.example .env
# 編輯 .env 文件，設置 DATABASE_URL
```

4. 創建數據庫並運行遷移
```bash
npx prisma db push
```

5. 啟動開發伺服器
```bash
npm run dev
```

6. 打開瀏覽器訪問
```
http://localhost:3000
```

## 功能特色

- 🌍 地點管理 - 添加、編輯天氣觀測地點
- 📊 天氣記錄 - 記錄每日天氣數據（溫度、濕度、降水等）
- 📈 天氣預報 - 查看未來天氣預測
- 📍 位置資訊 - 管理地點的經緯度和國家信息

## 技術棧

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Prisma
- PostgreSQL

## 開發命令

```bash
npm run dev       # 開發伺服器
npm run build     # 建置生產版本
npm run start     # 啟動生產伺服器
npm run lint      # 執行 ESLint
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
