import { prisma } from '@/lib/prisma'
import { formatCondition } from '@/lib/weather-format'
import type { WeatherRecord } from '@/app/generated/prisma/client'

export const dynamic = 'force-dynamic'

export default async function WeatherRecordsPage() {
  const weatherRecords = await prisma.weatherRecord.findMany({
    include: {
      location: true
    },
    orderBy: { date: 'desc' }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-sans dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">天氣記錄</h1>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">天氣記錄列表</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              新增記錄
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">日期</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">地點</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">平均溫度</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">最低溫度</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">最高溫度</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">濕度</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">天氣狀況</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-200">操作</th>
                </tr>
              </thead>
              <tbody>
                {weatherRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      {record.date.toLocaleDateString('zh-CN')}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {record.location?.name || '-'}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {record.temperature}°C
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {record.minTemp}°C
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {record.maxTemp}°C
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {record.humidity}%
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {formatCondition(record.condition)}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">編輯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}