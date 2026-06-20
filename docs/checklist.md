# Phase 1 Checklist — 项目基础与数据库

> 目标：完成 Prisma + PostgreSQL 的接入，建立核心数据模型，并搭好首页骨架。
> 分支：`feature/phase1-database-foundation`

---

## 1. 安装 Prisma 依赖
- [x] 安装 `prisma`（开发依赖）
- [x] 安装 `@prisma/client`（运行依赖）

## 2. 初始化 Prisma
- [x] 运行 `prisma init`，生成 `prisma/schema.prisma`
- [x] 生成 `.env` 文件（含 `DATABASE_URL` 占位符）

## 3. 设计数据库 Schema
- [x] 定义 `Location` 模型（id, name, country, latitude, longitude, timestamps）
- [x] 定义 `WeatherRecord` 模型（id, locationId, date, temperature, minTemp, maxTemp, humidity, precipitation, windSpeed, windDirection, pressure, uvIndex, condition, timestamps）
- [x] 定义 `Forecast` 模型（id, locationId, forecastDate, minTemp, maxTemp, condition, precipitationProbability, timestamps）
- [x] 建立模型间的关联关系（一对多、多对多）

## 4. 配置 PostgreSQL 连接
- [x] 在 `.env` 设置 `DATABASE_URL`
- [x] 确认 `.env` 已被 `.gitignore` 忽略

## 5. 创建 Prisma Client 单例
- [x] 建立 `lib/prisma.ts`，导出复用的 Prisma Client 实例

## 6. 搭建首页骨架
- [x] 替换默认模板 `app/page.tsx`
- [x] 更新 `app/layout.tsx` 的 metadata（标题/描述）
- [x] 加入项目主题的占位内容（导航 + 欢迎区）

## 7. 验证
- [x] `npm run build` 通过（无类型错误）
- [x] `npm run lint` 通过
- [x] Prisma Client 可正常导入

---

## 完成后
- [x] 提交代码（commit）
- [x] 开启 subagent 进行代码审查
