import { config } from 'dotenv'
import { defineConfig } from '@prisma/config'

// 顯式載入 .env（Prisma 7 用 jiti/esbuild 加載 config 時，副作用 import 順序不可靠）
config({ path: '.env' })

export default defineConfig({
  // 定義 Prisma CLI 的配置
  schema: './prisma/schema.prisma',
  // Prisma 7 從 schema 移除了 datasource.url，改由這裡提供遷移/內省用的連接字串
  datasource: {
    url: process.env.DATABASE_URL,
  },
})