<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content v-bind="targetProps" :skin="skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue'
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue'
import Content from './Content.vue'
import { Props } from './define.widget'
import { getStatistics, getStatisticsDayStart, type StatisticsInterval } from './statistics'


const props = defineProps<{
  isMiniPreview: boolean
  hideIcon?: boolean
  stat?: StatisticsInterval | 'false'
  historyLength?: number | string,
  skin?: 'transparent' | 'default'
}>()

const previewRegion = 'RU'
const dayStart = getStatisticsDayStart(Date.now(), previewRegion)
const previewSeasonStart = dayStart - 7 * 24 * 60 * 60 * 1000

const previewHistory: (Props['history'][number] & { startedAt: number })[] = [
  { delta: +19, key: '1', arena: 'Утёс', result: 'win', startedAt: dayStart + 60_000 },
  { delta: +29, key: '2', arena: 'Химмльсдорф', result: 'lose', startedAt: dayStart },
  { delta: -15, key: '3', arena: 'Степи', result: 'lose', startedAt: dayStart - 60_000 },
  { delta: +12, key: '4', arena: 'Карелия', result: 'win', startedAt: previewSeasonStart + 60_000 },
  { delta: +12, key: '5', arena: 'Тихий берег', result: 'win', startedAt: previewSeasonStart },
  { delta: +12, key: '6', arena: 'Карелия', result: 'win', startedAt: previewSeasonStart - 60_000 },
]

const previewStatistics = computed(() => {
  if (!props.stat || props.stat == 'false') return null

  const statistics = getStatistics(previewHistory, {
    interval: props.stat as StatisticsInterval,
    region: previewRegion,
    seasonStart: previewSeasonStart,
  })

  return statistics ? { ...statistics } : null
})

const targetProps = computed<Omit<Props, 'skin'>>(() => ({
  currentRank: 925,
  eliteRating: null,
  statistics: previewStatistics.value,
  history: previewHistory.slice(0, Number.parseInt((props.historyLength ?? 3).toString())),
  hideIcon: props.hideIcon ?? false,
  game: 'lesta'
}))


const aspect = computed((() => {
  let height = 50
  if (!targetProps.value.hideIcon) height += 150
  if (targetProps.value.statistics) height += 38
  height += 22 * targetProps.value.history.length


  return 145 / height
}))

</script>


<style lang="scss" scoped></style>
