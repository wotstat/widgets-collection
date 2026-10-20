import { useIntervalFn } from '@vueuse/core'
import { computed, shallowRef, watch, type Ref } from 'vue'
import { useAnalyticsRealtime } from '@/composition/useAnalyticsRealtime'
import { clickhouse } from '@/utils/db'

type Snapshot = { day: string, recalculation: string }
type Position = { lastRank: number, lastDayRank: number }

const QUERY_SETTINGS = {
  use_query_cache: 0,
  max_execution_time: 10,
  max_rows_to_read: '10000000',
} as const

export function useLeaderboardPosition(nickname: Ref<string>, region: Ref<string>) {
  const { data: recalculations, status } = useAnalyticsRealtime('comp7LastRecalculation')
  const player = shallowRef<Position | null>(null)
  const isNotFound = shallowRef(false)
  const refresh = shallowRef(0)
  let needsRetry = false

  const readySnapshot = computed(() => {
    if (status.value !== 'OPEN') return null
    return recalculations.value?.[region.value]?.daily ?? null
  })

  // Compare values so repeated realtime messages do not repeat the same query.
  const snapshotKey = computed(() => {
    const snapshot = readySnapshot.value
    return snapshot ? `${snapshot.day}/${snapshot.recalculation}` : null
  })

  // Also retry failed requests and discover snapshots while realtime is unavailable.
  useIntervalFn(() => {
    if (needsRetry || !readySnapshot.value) refresh.value++
  }, 60_000)

  watch([nickname, region], () => {
    player.value = null
    isNotFound.value = false
  }, { flush: 'sync' })

  watch([nickname, region, snapshotKey, refresh], async ([name, currentRegion], _, onCleanup) => {
    if (!name || !currentRegion) return

    const controller = new AbortController()
    onCleanup(() => controller.abort())

    try {
      let snapshot = readySnapshot.value
      if (!snapshot) {
        const result = await clickhouse.query({
          query: `
            SELECT day, lastRecalculationTime AS recalculation
            FROM Comp7LeaderboardDailyByRank
            WHERE region = {region:String} AND NOT startsWith(name, 'MT_COMP_QA_')
            ORDER BY lastRecalculationTime DESC, day DESC
            LIMIT 1
          `,
          query_params: { region: currentRegion },
          format: 'JSONEachRow',
          clickhouse_settings: QUERY_SETTINGS,
          abort_signal: controller.signal,
        })
        const snapshots = await result.json<Snapshot>()
        snapshot = snapshots[0] ?? null
      }

      if (controller.signal.aborted) return
      if (!snapshot) {
        player.value = null
        isNotFound.value = true
        return
      }

      const result = await clickhouse.query({
        query: `
          SELECT lastRank, lastDayRank
          FROM Comp7LeaderboardDailyByRank FINAL
          WHERE region = {region:String} AND day = {day:Date}
            AND lastRecalculationTime = {recalculation:DateTime}
            AND lower(name) = lower({nickname:String})
            AND NOT startsWith(name, 'MT_COMP_QA_')
          LIMIT 1
        `,
        query_params: { region: currentRegion, nickname: name, ...snapshot },
        format: 'JSONEachRow',
        clickhouse_settings: QUERY_SETTINGS,
        abort_signal: controller.signal,
      })
      const players = await result.json<Position>()
      if (!controller.signal.aborted) {
        player.value = players[0] ?? null
        isNotFound.value = player.value === null
        needsRetry = false
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        needsRetry = true
        console.error('Failed to load Comp7 leaderboard position:', error)
      }
    }
  }, { immediate: true })

  return {
    position: computed(() => player.value?.lastRank ?? null),
    delta: computed(() => player.value?.lastDayRank ? player.value.lastDayRank - player.value.lastRank : null),
    isNew: computed(() => player.value !== null && player.value.lastDayRank === 0),
    isNotFound,
  }
}
