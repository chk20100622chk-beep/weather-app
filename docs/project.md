# Weather App — 天氣預報與記錄網站

## 项目簡介

Weather App 是一個用於**記錄和預報天氣資訊**的網站。用戶可以記錄每日天氣數據，並查看天氣預報，包括：

- 🌍 **地點管理** — 添加、編輯天氣觀測地點
- 📊 **天氣記錄** — 記錄每日天氣數據（溫度、濕度、降水等）
- 📈 **天氣預報** — 查看未來天氣預測
- 📍 **位置資訊** — 管理地點的經緯度和國家信息
- 📱 **響應式設計** — 支持桌面和移動設備
- 🌐 **多語言支持** — 支持中英文界面

核心價值：讓天氣資訊有系統地記錄和查詢，方便用戶了解歷史天氣趨勢和未來預測，為日常生活和出行提供數據支持。

---

## 技術棧（Tech Stack）

| 層級 | 技術 | 說明 |
|------|------|------|
| 框架 | **Next.js 16** (App Router) | 全棧框架，支持 SSR/SSG/API Routes |
| 語言 | **TypeScript** | 類型安全 |
| 樣式 | **Tailwind CSS v4** | 原子化 CSS |
| ORM | **Prisma** | 類型安全的數據庫訪問 |
| 數據庫 | **PostgreSQL** | 關係型數據庫 |
| 字體 | **Geist** | 現代化 UI 字體 |

---

## 核心數據模型

### Location（地點）
- `id` — 主鍵
- `name` — 地點名稱
- `country` — 國家
- `latitude` — 緯度
- `longitude` — 經度
- `createdAt` / `updatedAt`

### WeatherRecord（天氣記錄）
- `id` — 主鍵
- `locationId` — 地點（外鍵）
- `date` — 記錄日期
- `temperature` — 平均溫度（℃）
- `minTemp` — 最低溫度（℃）
- `maxTemp` — 最高溫度（℃）
- `humidity` — 濕度（%）
- `precipitation` — 降水量（mm）
- `windSpeed` — 風速（km/h）
- `windDirection` — 風向
- `pressure` — 氣壓（hPa）
- `uvIndex` — 紫外線指數
- `condition` — 天氣狀況
- `createdAt` / `updatedAt`

### Forecast（天氣預報）
- `id` — 主鍵
- `locationId` — 地點（外鍵）
- `forecastDate` — 預報日期
- `minTemp` — 預報最低溫度（℃）
- `maxTemp` — 預報最高溫度（℃）
- `condition` — 預報天氣狀況
- `precipitationProbability` — 降水概率（%）
- `createdAt` / `updatedAt`

---

## 功能規劃（分階段）

### Phase 1 — 項目基礎與數據庫（已完成）
- [x] 安裝並配置 Prisma
- [x] 設計並建立數據庫 Schema（Location / WeatherRecord / Forecast）
- [x] 設置 PostgreSQL 連接
- [x] 創建首頁骨架

### Phase 2 — 數據錄入（進行中）
- [ ] 新增/編輯地點
- [ ] 記錄天氣數據
- [ ] 添加天氣預報

### Phase 3 — 數據展示與查詢
- [ ] 地點列表與詳情頁
- [ ] 天氣記錄查詢
- [ ] 天氣預報顯示

### Phase 4 — 優化與擴展
- [ ] 搜索 / 篩選 / 排序
- [ ] 數據可視化圖表
- [ ] 用戶認證（可選）

---

## Git 工作流

- 开发功能时从基础分支拉出 `feature/<功能名>` 分支
- 每个阶段的工作完成后，开启 subagent 进行代码审查
- 审查通过后再合并

---

## 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 打包生产版本
npm run lint     # 代码检查
npx prisma studio   # 可视化查看数据库
npx prisma migrate  # 执行数据库迁移
```
