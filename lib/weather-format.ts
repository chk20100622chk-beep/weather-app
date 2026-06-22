// 天氣狀況與風向的顯示輔助函式
// 把資料庫裡的原始值（如 "CLEAR"、"RAIN"、"NE"）對應成 emoji + 中文標籤，
// 讓前端顯示更直觀。原始值對應 schema 註解中的 enum 定義。

export type ConditionMeta = {
  emoji: string
  label: string
}

const WEATHER_CONDITION_MAP: Record<string, ConditionMeta> = {
  CLEAR: { emoji: '☀️', label: '晴' },
  PARTLY_CLOUDY: { emoji: '⛅', label: '局部多雲' },
  CLOUDY: { emoji: '☁️', label: '多雲' },
  RAIN: { emoji: '🌧️', label: '雨' },
  HEAVY_RAIN: { emoji: '⛈️', label: '大雨' },
  SNOW: { emoji: '❄️', label: '雪' },
  FOG: { emoji: '🌫️', label: '霧' },
  THUNDERSTORM: { emoji: '🌩️', label: '雷暴' },
}

const WIND_DIRECTION_MAP: Record<string, ConditionMeta> = {
  N: { emoji: '⬇️', label: '北風' },
  NE: { emoji: '⬋', label: '東北風' },
  E: { emoji: '⬅️', label: '東風' },
  SE: { emoji: '⬉', label: '東南風' },
  S: { emoji: '⬆️', label: '南風' },
  SW: { emoji: '⬈', label: '西南風' },
  W: { emoji: '➡️', label: '西風' },
  NW: { emoji: '⬊', label: '西北風' },
}

function lookup(map: Record<string, ConditionMeta>, value: string | null | undefined): ConditionMeta {
  if (!value) return { emoji: '❔', label: '未知' }
  return map[value] ?? { emoji: '❔', label: value }
}

/** 取得天氣狀況的 emoji + 中文標籤 */
export function getConditionMeta(condition: string | null | undefined): ConditionMeta {
  return lookup(WEATHER_CONDITION_MAP, condition)
}

/** 取得風向的 emoji + 中文標籤 */
export function getWindDirectionMeta(direction: string | null | undefined): ConditionMeta {
  return lookup(WIND_DIRECTION_MAP, direction)
}

/** 格式化天氣狀況，例如 "RAIN" -> "🌧️ 雨" */
export function formatCondition(condition: string | null | undefined): string {
  const { emoji, label } = getConditionMeta(condition)
  return `${emoji} ${label}`
}

/** 格式化風向，例如 "NE" -> "⬋ 東北風" */
export function formatWindDirection(direction: string | null | undefined): string {
  const { emoji, label } = getWindDirectionMeta(direction)
  return `${emoji} ${label}`
}
