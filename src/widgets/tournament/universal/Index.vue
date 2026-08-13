<template>
  <DefineTemplate>
    <Content v-bind="data" :hide-l1="query.hideL1" :hide-l2="query.hideL2" :hide-l3="query.hideL3"
      :hide-l4="query.hideL4" :skin="query.skin" />
  </DefineTemplate>

  <WidgetWrapper autoScale autoHeight :allow-without-sdk="Boolean(query.nickname)">
    <ReuseTemplate />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue'


import Content from './Content.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk'

import { createReusableTemplate } from '@vueuse/core'
import { oneOf, StringDefault, useQueryParams } from '@/composition/useQueryParams'
import { ChallengeTournament, isSupportedTournament, SupportedVictoryType } from './define.widget'
import type { UniversalTournamentProps } from './define.widget'
import { useBattleResultHistory } from '@/composition/shared/useBattleResultHistory'
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const HOUR_MS = 1000 * 60 * 60
const API_URL = 'https://challenge.tanki.su/api/v1/tournaments'

const query = useQueryParams({
  tournament: StringDefault('1015'),
  hideL1: Boolean,
  hideL2: Boolean,
  hideL3: Boolean,
  hideL4: Boolean,
  nickname: String,
  skin: oneOf(['default', 'transparent'] as const)
})

const { sdk } = useWidgetSdk()

const sdkId = useReactiveState(sdk.data.player.id)
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const vehicle = useReactiveState(sdk.data.battle.vehicle)
const nicknameId = ref<null | string>(null)

const id = computed(() => nicknameId.value || sdkId.value)

type StoredBattle = {
  score?: number
  exp: number
  damage: number
  kills: number
  tank: string
  date: number
}

const battleHistory = useBattleResultHistory<StoredBattle>((parsed) => ({
  exp: parsed.personal?.stats.xp ?? 0,
  damage: parsed.personal?.stats.damageDealt ?? 0,
  kills: parsed.personal?.stats.kills ?? 0,
}))

watch(() => [isInBattle.value, vehicle.value] as const, ([isInBattle, vehicle]) => {
  if (!isInBattle) return
  if (!vehicle) return

  battleHistory.addDataToCurrentBattle({
    tank: vehicle.localizedShortName,
    date: new Date().getTime()
  })
})

const data = ref<Omit<UniversalTournamentProps, 'hideL1' | 'hideL2' | 'hideL3' | 'hideL4'>>({
  place: 0,
  battleCount: 0,
  targetBattleCount: 10,
  ruleLabel: 'Лучшие 10 • Урон',
  isSeries: false,
  currentSeriesSum: 0,
  bestSeriesSum: 0,
  bestBattles: [],
  bestSeries: [],
  last10: [],
  lastBattle: undefined,
})

const tournament = ref<ChallengeTournament | null>(null)

function apiDate(value: string) {
  return new Date(value.endsWith('Z') ? value : `${value}Z`).getTime()
}

function battleScore(battle: Partial<StoredBattle>, victoryType: SupportedVictoryType) {
  if (victoryType === 'damage') return battle.damage ?? battle.score
  return battle[victoryType]
}

const metricLabels: Record<SupportedVictoryType, string> = {
  exp: 'Опыт',
  damage: 'Урон',
  kills: 'Уничтожения',
  score: 'Очки',
}

const currentSessionStart = computed(() => {
  const battles = battleHistory.battlesArray.value.map(t => t.date).filter(t => t != undefined)

  if (battles.length === 0) return new Date().getTime()

  for (let i = battles.length - 1; i > 0; i--) {
    const last = battles[i - 1]
    const current = battles[i]
    const delta = current - last
    if (delta > 4 * HOUR_MS) return current
  }

  return battles[0]
})

async function loadTournament() {
  const response = await fetch(`${API_URL}/${query.tournament}?limit=1`)
  if (!response.ok) throw new Error(`Tournament API responded with ${response.status}`)
  const { data: result } = await response.json() as { data: ChallengeTournament }
  if (!isSupportedTournament(result)) throw new Error(`Tournament ${result.id} is not supported`)

  tournament.value = result
  const victoryType = result.victory_type as SupportedVictoryType
  const targetBattleCount = result.stats_type === 'best_series' ? result.series_size : result.best_battles
  data.value.targetBattleCount = targetBattleCount ?? 0
  data.value.isSeries = result.stats_type === 'best_series'
  data.value.ruleLabel = result.stats_type === 'best_series'
    ? `Лучшая серия из ${targetBattleCount} • ${metricLabels[victoryType]}`
    : `Лучшие ${targetBattleCount} • ${metricLabels[victoryType]}`
}

async function load() {
  if (!tournament.value || !id.value) return

  const position = await fetch(`${API_URL}/${tournament.value.id}/player/${id.value}?sortby=rating`)
  if (!position.ok) return
  const { data: place } = await position.json() as { data: number }

  const page = await fetch(`${API_URL}/${tournament.value.id}?offset=${place - 1}&limit=1`)
  if (!page.ok) return
  const { data: { participants } } = await page.json()

  const userParticipant = participants.find((p: any) => p.user.spa_id == id.value)
  if (!userParticipant) return

  const { results } = userParticipant

  data.value.place = userParticipant.position
  data.value.battleCount = results.battles

  const victoryType = tournament.value.victory_type as SupportedVictoryType
  const tournamentStart = apiDate(tournament.value.started_at)
  const tournamentFinish = apiDate(tournament.value.finished_at)
  const knownBattles = battleHistory.battlesArray.value
    .filter(battle => battle.date != undefined && tournamentStart <= battle.date && battle.date <= tournamentFinish)

  function matchBattles(values: number[]) {
    const valuesMap = new Map<number, ({ tank?: string, date?: number })[]>()
    for (const battle of knownBattles) {
      const score = battleScore(battle, victoryType)
      if (score == undefined) continue
      if (!valuesMap.has(score)) valuesMap.set(score, [])
      valuesMap.get(score)?.push(battle)
    }

    return values.map(value => {
      const battle = valuesMap.get(value)?.pop() ?? null
      return {
        tank: battle?.tank ?? null,
        date: battle?.date ?? null,
        score: value,
        today: currentSessionStart.value <= (battle?.date ?? 0)
      }
    })
  }

  if (tournament.value.stats_type === 'best_series') {
    const value = (item: { rating?: number, score?: number }) => item.rating ?? item.score ?? 0
    const currentValues = (results.current_series as { rating?: number, score?: number }[]).map(value)
    const bestValues = (results.best_series as { rating?: number, score?: number }[]).map(value)
    data.value.bestBattles = matchBattles(currentValues)
    data.value.bestSeries = matchBattles(bestValues)
    data.value.currentSeriesSum = results.current_total
    data.value.bestSeriesSum = results.best_total
    data.value.last10 = currentValues
  } else {
    data.value.bestBattles = matchBattles((results.history as number[]).toSorted((a, b) => b - a))
    data.value.bestSeries = []
    data.value.currentSeriesSum = 0
    data.value.bestSeriesSum = 0
    data.value.last10 = knownBattles.slice(-10).map(t => battleScore(t, victoryType)).filter(t => t != undefined)
  }

  const last = knownBattles.at(-1)
  const lastScore = last && battleScore(last, victoryType)
  if (last && lastScore != undefined) {
    data.value.lastBattle = {
      tank: last.tank ?? null,
      score: lastScore,
    }
  }
}

let loopTimer: ReturnType<typeof setTimeout> | undefined
async function loadLoop() {
  try {
    await load()
  } catch (e) {
    console.error(e)
  }

  loopTimer = setTimeout(loadLoop, 5000)
}

async function loadSpaIdByPlayerName() {
  if (!query.nickname || !tournament.value) return

  fetch(`${API_URL}/${tournament.value.id}/autocomplete?search=${encodeURIComponent(query.nickname)}`)
    .then(res => res.json())
    .then(data => {
      try {
        const search_results: { name: string, spa_id: number }[] = data.data.search_results
        const target = query.nickname?.toLowerCase()
        nicknameId.value = search_results.find(t => t.name.toLowerCase() === target)?.spa_id.toString() ?? ''
      } catch (error) { }
    })
}

let loopStarted = false
watch([id, tournament], ([playerId, currentTournament]) => {
  if (loopStarted || !playerId || !currentTournament) return
  loopStarted = true
  loadLoop()
})

onMounted(async () => {
  try {
    await loadTournament()
    await loadSpaIdByPlayerName()
  } catch (e) {
    console.error(e)
  }
})

onUnmounted(() => clearTimeout(loopTimer))

useReactiveTrigger(sdk.data.battle.onBattleResult, r => {
  load()
})


</script>


<style lang="scss" scoped></style>
