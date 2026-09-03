import type { Props } from './define.widget'

export type StatisticsInterval = 'season' | 'all-time' | 'today'

type StatisticsBattle = {
  delta?: number
  result?: 'draw' | 'win' | 'lose'
  startedAt?: number
}

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

// Matches getRegionDayChangeHourOffset used by analytics-frontend's Onslaught DaySelector.
const REGION_TIME_DAY_CHANGE_OFFSETS: Record<string, number> = {
  RU: 0.5,
  EU: 0,
  ASIA: 0,
  NA: 7,
  CN: 0,
}

export function getStatisticsDayStart(timestamp: number, region: string) {
  const offset = (REGION_TIME_DAY_CHANGE_OFFSETS[region.toUpperCase()] ?? 0) * HOUR_MS
  return Math.floor((timestamp - offset) / DAY_MS) * DAY_MS + offset
}

export function getStatistics(history: StatisticsBattle[], {
  interval = 'all-time',
  region = '',
  latestBattleStart = history.reduce((latest, battle) => Math.max(latest, battle.startedAt ?? 0), 0),
  seasonStart,
}: {
  interval?: StatisticsInterval
  region?: string
  latestBattleStart?: number
  seasonStart?: number
} = {}): Props['statistics'] {
  if (interval === 'season' && seasonStart === undefined) return null

  const start = interval === 'season' ? seasonStart! : getStatisticsDayStart(latestBattleStart, region)
  const selected = interval === 'all-time' ? history : history.filter(battle =>
    battle.startedAt !== undefined && battle.startedAt >= start)

  const battles = selected.length
  const ratingDelta = selected.reduce((sum, battle) => sum + (battle.delta ?? 0), 0)
  const wins = selected.filter(battle => battle.result === 'win').length

  return {
    battles,
    ratingDelta,
    winrate: battles > 0 ? wins / battles * 100 : 0,
  }
}
