<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="predictedAspectRatio">
    <Content v-bind="target" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue'
import Content from './Content.vue'
import { computed, ref, watch } from 'vue'
import { ChallengeTournament, SupportedVictoryType } from './define.widget'
import type { UniversalTournamentProps } from './define.widget'

const props = defineProps<{
  isMiniPreview: boolean,
  tournament?: string,
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
  hideL4?: boolean,
  skin?: 'default' | 'transparent',
}>()

const targetBattleCount = ref(10)
const ruleLabel = ref('Лучшие 10 • Урон')
const isSeries = ref(false)

const previewBattles = [
  { date: 1731790571056, tank: 'Gendarme', score: 5212, today: false },
  { date: 1731791256575, tank: 'Gendarme', score: 5182, today: false },
  { date: 1730813329711, tank: 'FV4005', score: 5172, today: false },
  { date: 1731614833973, tank: 'Gendarme', score: 5164, today: true },
  { date: 1731638991393, tank: 'FV4005', score: 5096, today: false },
  { date: 1731637891450, tank: 'Gendarme', score: 5044, today: true },
  { date: 1731637630680, tank: 'FV4005', score: 5037, today: false },
  { date: 1731624918280, tank: 'Gendarme', score: 5025, today: false },
  { date: 1731624504156, tank: null, score: 5019, today: true },
  { date: 1731624177120, tank: null, score: 4977, today: false },
  { date: 1731623810841, tank: 'Gendarme', score: 4955, today: false },
  { date: 1731623430359, tank: 'FV4005', score: 4952, today: false },
  { date: 1731621663631, tank: 'FV4005', score: 4947, today: true },
  { date: 1731615256104, tank: 'Gendarme', score: 4940, today: true },
  { date: 1731614833973, tank: 'FV4005', score: 4855, today: false },
]

const metricLabels: Record<SupportedVictoryType, string> = {
  exp: 'Опыт',
  damage: 'Урон',
  kills: 'Уничтожения',
  score: 'Очки',
}

watch(() => props.tournament, async id => {
  if (!id) return
  try {
    const response = await fetch(`https://challenge.tanki.su/api/v1/tournaments/${id}?limit=1`)
    if (!response.ok) return
    const { data } = await response.json() as { data: ChallengeTournament }
    const count = data.stats_type === 'best_series' ? data.series_size : data.best_battles
    const metric = metricLabels[data.victory_type as SupportedVictoryType]
    if (!count || !metric) return

    targetBattleCount.value = count
    isSeries.value = data.stats_type === 'best_series'
    ruleLabel.value = data.stats_type === 'best_series' ? `Лучшая серия из ${count} • ${metric}` : `Лучшие ${count} • ${metric}`
  } catch (e) {
    console.error(e)
  }
}, { immediate: true })

const target = computed<UniversalTournamentProps>(() => ({
  hideL1: props.hideL1,
  hideL2: props.hideL2,
  hideL3: props.isMiniPreview ? true : props.hideL3,
  hideL4: props.hideL4,
  skin: props.isMiniPreview ? 'transparent' : props.skin,
  place: 98,
  battleCount: 347,
  targetBattleCount: targetBattleCount.value,
  ruleLabel: ruleLabel.value,
  isSeries: isSeries.value,
  currentSeriesSum: previewBattles.slice(0, targetBattleCount.value).reduce((sum, battle) => sum + battle.score, 0),
  bestSeriesSum: previewBattles.slice(0, targetBattleCount.value).reduce((sum, battle) => sum + battle.score + 100, 0),
  bestBattles: previewBattles.slice(0, targetBattleCount.value),
  bestSeries: isSeries.value
    ? previewBattles.slice(0, targetBattleCount.value).map(battle => ({ ...battle, score: battle.score + 100 }))
    : [],
  last10: [1200, 2124, 1212, 564, 1244, 2412, 1551, 1551, 1551, 453],
  lastBattle: { tank: 'FV4005', score: 453 },
}))

const predictedAspectRatio = computed(() => {
  return props.isMiniPreview ? 1.6 : 1
})

</script>


<style lang="scss" scoped></style>
