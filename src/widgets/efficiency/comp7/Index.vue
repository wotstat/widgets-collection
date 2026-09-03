<template>
  <WidgetWrapper auto-height auto-scale>
    <Content v-bind="targetProps" :hideIcon :skin />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue'
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { oneOf, useQueryParams } from '@/composition/useQueryParams'
import WidgetWrapper from '@/components/WidgetWrapper.vue'
import { Props } from './define.widget'
import { LONG_CACHE_SETTINGS, query, queryComputed } from '@/utils/db'
import { isLestaRegion, LOCALIZATION_CACHE_SETTINGS, selectArenaNames } from '@/utils/gameLocalization'
import { useBattleResultHistory } from '@/composition/shared/useBattleResultHistory'
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk'
import { getStatistics } from './statistics'


const COMP_7_BONUS_TYPE = 43
const SEASON_TIME_OFFSETS: Record<string, number> = { RU: -3, EU: -9, ASIA: -8, NA: -20, CN: -4, CT: -3, RPT: -3 }

const { hideIcon, stat, historyLength, skin } = useQueryParams({
  hideIcon: Boolean,
  stat: oneOf(['season', 'all-time', 'today', 'false'] as const, 'today'),
  historyLength: Number,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

let eliteRatingInterval: ReturnType<typeof setInterval> | null = null
const eliteRatingStats = shallowRef(new Map<string, number>())
const seasonStarts = ref(new Map<string, number>())

const { sdk } = useWidgetSdk()
const region = useReactiveState(sdk.data.game.region)
const gameLanguage = useReactiveState(sdk.data.game.language)

const { battlesArray: history, battlesTimings, addDataToCurrentBattle } = useBattleResultHistory((parsed, raw) => {
  if (!parsed.personal || parsed.personal.player == 'bot') return { delta: 0, rating: 0 }
  return {
    delta: parsed.personal.comp7.ratingDelta ?? 0,
    rating: parsed.personal.comp7.rating ?? 0,
    isQualification: parsed.personal.comp7.qualActive ?? false,
    battleResult: parsed.result,
    arena: parsed.common.arenaId,
    bonusType: parsed.common.bonusType,
    arenaUniqueID: parsed.arenaUniqueID
  }
}, { order: 'result', groupByPlayerId: true })

const arenaId = useReactiveState(sdk.data.battle.arenaId)
const arena = useReactiveState(sdk.data.battle.arena)

watch([arenaId, arena], ([id, arena]) => {
  if (!id || arena?.mode !== 'COMP7') return
  addDataToCurrentBattle({ arenaUniqueID: id, bonusType: COMP_7_BONUS_TYPE })
}, { immediate: true })

const comp7History = computed(() => history.value.filter(h => h?.arena != null && h.bonusType == COMP_7_BONUS_TYPE))
const latestBattleStart = computed(() => history.value.reduce((latest, battle) => {
  if (battle?.bonusType !== COMP_7_BONUS_TYPE || !battle.arenaUniqueID) return latest
  return Math.max(latest, battlesTimings.value.get(battle.arenaUniqueID)?.start ?? 0)
}, 0))


const arenas = queryComputed<{ id: number, name: string }>(() =>
  region.value ? selectArenaNames(region.value, gameLanguage.value) : null,
  { settings: LOCALIZATION_CACHE_SETTINGS }
)

async function reloadEliteRating() {
  const res = await query<{ region: string, lastElite: number }>(`
    select region, argMax(eliteRating, dateTime) as lastElite
    from Event_OnComp7Info
    group by region
  `, { settings: LONG_CACHE_SETTINGS, allowCache: false })

  eliteRatingStats.value = new Map(res.data.map(r => [r.region, r.lastElite]))
}

async function reloadSeason() {
  if (stat == 'false' || stat !== 'season') return
  const currentRegion = region.value?.toUpperCase()
  if (!currentRegion || !Object.hasOwn(SEASON_TIME_OFFSETS, currentRegion)) return

  try {
    const { data } = await query<{ season: string, start: number | string }>(`
      select season,
             toUnixTimestamp(min(toStartOfDay(dateTime + interval ${SEASON_TIME_OFFSETS[currentRegion]} hour, 'UTC'))) * 1000 as start
      from Event_OnComp7Info
      where region = '${currentRegion}' and season != ''
      group by season
      order by start desc
      limit 1
    `, {
      allowCache: false,
      settings: { ...LONG_CACHE_SETTINGS, max_execution_time: 10, max_rows_to_read: '100000000' }
    })

    const start = Number(data[0]?.start)
    if (Number.isFinite(start) && start > 0) seasonStarts.value.set(currentRegion, start)
  } catch (error) {
    console.error('Failed to load the current Comp7 season:', error)
  }
}

watch(region, reloadSeason, { immediate: true })

function getArenaName(id: number) {
  const fullName = arenas.value.data.find(a => a.id == id)?.name
  if (!fullName) return '...'

  return fullName
    .replace('(новогодняя)', 'НГ')
}

const targetProps = computed<Omit<Props, 'hideIcon' | 'showStatistics'>>(() => {
  const lastBattle = comp7History.value.at(-1)

  const battlesToStat = comp7History.value.map(t => ({
    delta: t.delta,
    result: t.battleResult,
    startedAt: t.arenaUniqueID ? battlesTimings.value.get(t.arenaUniqueID)?.start : undefined,
  }))

  const history = comp7History.value.toReversed().slice(0, historyLength).map(t => ({
    arena: getArenaName(t?.arena ?? 0),
    delta: t.delta ?? 0,
    key: `${t.arena}_${t.delta}_${t.rating}_${t.arenaUniqueID}`,
    result: t.battleResult,
  }))

  return {
    currentRank: (lastBattle?.rating ?? 0) + (lastBattle?.delta ?? 0),
    eliteRating: eliteRatingStats.value.get(region.value ?? '') || null,
    statistics: stat == 'false' ? null : getStatistics(battlesToStat, {
      interval: stat,
      region: region.value,
      latestBattleStart: latestBattleStart.value,
      seasonStart: seasonStarts.value.get(region.value?.toUpperCase() ?? ''),
    }),
    history,
    game: isLestaRegion(region.value) ? 'lesta' : 'wg'
  }
})

onMounted(() => {
  reloadEliteRating()
  eliteRatingInterval = setInterval(() => {
    reloadEliteRating()
    reloadSeason()
  }, 60_000)
})

onUnmounted(() => {
  if (eliteRatingInterval) {
    clearInterval(eliteRatingInterval)
    eliteRatingInterval = null
  }
})

</script>


<style lang="scss" scoped></style>
