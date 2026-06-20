import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  // 简化版：创建一个示例用户（实际应该有登录表单）
  const user = await prisma.user.findFirst()
  
  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg mx-auto">
          <div className="flex flex-col items-center gap-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              已登录
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              欢迎回来，{user.name}！
            </p>
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-800 md:w-[200px]"
              href="/weather-records"
              target="_self"
            >
              <span>进入应用</span>
            </a>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg mx-auto">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Weather App
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
            記錄和預報天氣資訊，讓您隨時掌握天氣變化
          </p>
          <div className="flex flex-col gap-4 text-base font-medium">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-800 md:w-[200px]"
              href="/weather-records"
              target="_self"
            >
              <span>查看天氣記錄</span>
            </a>
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gray-600 text-white transition-colors hover:bg-gray-700 dark:hover:bg-gray-800 md:w-[200px]"
              href="/locations"
              target="_self"
            >
              <span>地點管理</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}