import { prisma } from '@/lib/prisma'
import { formatCondition } from '@/lib/weather-format'
import type { Location, WeatherRecord, Forecast } from '@/app/generated/prisma/client'

export const dynamic = 'force-dynamic'

interface LocationPageProps {
  params: { id: string }
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const location = await prisma.location.findUnique({
    where: { id: params.id },
    include: {
      records: {
        orderBy: { date: 'desc' },
        take: 10
      },
      forecasts: {
        orderBy: { forecastDate: 'asc' },
        take: 7
      }
    }
  })

  if (!location) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">地點不存在</h1>
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
              {location.name}
            </h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              編輯地點
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">地點信息</h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">國家：</span>
                  {location.country || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">緯度：</span>
                  {location.latitude?.toFixed(4) || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">經度：</span>
                  {location.longitude?.toFixed(4) || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">創建時間：</span>
                  {location.createdAt.toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">最新天氣記錄</h2>
              {location.records.length > 0 ? (
                <div className="space-y-2">
                  {location.records.map((record) => (
                    <div key={record.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {record.date.toLocaleDateString('zh-CN')}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        溫度：{record.temperature}°C
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        天氣：{formatCondition(record.condition)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">暂无天氣記錄</p>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">未來天氣預報</h2>
            {location.forecasts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {location.forecasts.map((forecast) => (
                  <div key={forecast.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {forecast.forecastDate.toLocaleDateString('zh-CN')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      溫度：{forecast.minTemp}-{forecast.maxTemp}°C
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      天氣：{formatCondition(forecast.condition)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      降水概率：{forecast.precipitationProbability}%
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">暂无天氣預報</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}