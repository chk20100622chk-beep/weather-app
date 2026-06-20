import { PrismaClient } from '@/app/generated/prisma/client'

// 開發環境下避免 HMR 產生多個連線
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () =>
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/weather_app',
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { prisma }