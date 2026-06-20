import { prisma } from '@/lib/prisma'
import type { Location, Forecast } from '@/app/generated/prisma/client'

export const dynamic = 'force-dynamic'

interface ForecastDetailProps {
  params: { id: string }
}

export default async function ForecastDetailPage({ params }: ForecastDetailProps) {
  const forecast = await prisma.forecast.findUnique({
    where: { id: params.id },
    include: {
      location: true
    }
  })

  if (!forecast) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">天氣預報不存在</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              天氣預報詳情
            </h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              編輯預報
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">預報信息</h2>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">預報日期：</span>
                  {forecast.forecastDate.toLocaleDateString('zh-CN')}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">地點：</span>
                  {forecast.location?.name || '未知'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">最低溫度：</span>
                  {forecast.minTemp}°C
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">最高溫度：</span>
                  {forecast.maxTemp}°C
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">天氣狀況：</span>
                  {forecast.condition}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">降水概率：</span>
                  {forecast.precipitationProbability}%
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">地點信息</h2>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">地點名稱：</span>
                  {forecast.location?.name || '未知'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">國家：</span>
                  {forecast.location?.country || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">緯度：</span>
                  {forecast.location?.latitude?.toFixed(4) || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">經度：</span>
                  {forecast.location?.longitude?.toFixed(4) || '未指定'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}