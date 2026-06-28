import { prisma } from '@/lib/prisma'
import { formatCondition, formatWindDirection } from '@/lib/weather-format'
import type { WeatherRecord, Location } from '@/app/generated/prisma/client'

export const dynamic = 'force-dynamic'

interface WeatherRecordDetailProps {
  params: { id: string }
}

export default async function WeatherRecordDetailPage({ params }: WeatherRecordDetailProps) {
  const weatherRecord = await prisma.weatherRecord.findUnique({
    where: { id: params.id || '' },
    include: {
      location: true
    }
  })

  if (!weatherRecord) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">天氣記錄不存在</h1>
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
              天氣記錄詳情
            </h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              編輯記錄
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">記錄信息</h2>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">日期：</span>
                  {weatherRecord.date.toLocaleDateString('zh-CN')}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">地點：</span>
                  {weatherRecord.location?.name || '未知'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">平均溫度：</span>
                  {weatherRecord.temperature}°C
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">最低溫度：</span>
                  {weatherRecord.minTemp}°C
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">最高溫度：</span>
                  {weatherRecord.maxTemp}°C
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">濕度：</span>
                  {weatherRecord.humidity}%
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">降水量：</span>
                  {weatherRecord.precipitation}mm
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">風速：</span>
                  {weatherRecord.windSpeed}km/h
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">風向：</span>
                  {formatWindDirection(weatherRecord.windDirection)}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">氣壓：</span>
                  {weatherRecord.pressure || '未指定'}hPa
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">紫外線指數：</span>
                  {weatherRecord.uvIndex || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">天氣狀況：</span>
                  {formatCondition(weatherRecord.condition)}
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">地點信息</h2>
              <div className="space-y-3">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">地點名稱：</span>
                  {weatherRecord.location?.name || '未知'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">國家：</span>
                  {weatherRecord.location?.country || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">緯度：</span>
                  {weatherRecord.location?.latitude?.toFixed(4) || '未指定'}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">經度：</span>
                  {weatherRecord.location?.longitude?.toFixed(4) || '未指定'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}