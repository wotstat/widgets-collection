<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content :slots="slots ?? ['dmg-avg', 'kill-avg', 'xp-avg', 'fire-dmg-avg', 'battles']" :data="targetData"
      :total="props.total ? total : undefined" />
  </WidgetPreviewRoot>
</template>


<script setup lang='ts'>

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';
import { AggregatorResultPrefixKey, toIconType, totalAggregator } from '@/composition/shared/useBattleHistoryAggregator';


const props = defineProps<{
  isMiniPreview: boolean
  slots?: Props['slots'],
  total?: boolean
}>();

const sampleData = {
  'ammoBayDestroyed': 0.2,
  'ammoBayDestroyedDamage': 330,
  'assist': 1200,
  'radioAssist': 1100,
  'trackAssist': 400,
  'baseCapturePoints': 10,
  'baseCaptureDefend': 15,
  'blocked': 3000,
  'discover': 6,
  'distance': 800,
  'damage': 5000,
  'duration': 600,
  'fire': 0.4,
  'fireDamage': 400,
  'frags': 4,
  'lifetime': 500,
  'position': 2,
  'ram': 0.5,
  'ramDamage': 80,
  'xp': 1200,
  'crits': 3,
  'stun': 3,
  'stunAssist': 300,
} as const satisfies {
  [key in Exclude<AggregatorResultPrefixKey, 'gunMarkDmg' | 'chuckScore' | 'shotDamage'>]: number
}

function dataFor(battles: number) {
  const multiplied = Object.fromEntries(Object.entries(sampleData).map(([key, value]) => [key, Math.round(value * battles * (1 + Math.random() * 0.5))]))

  multiplied['chuckScore'] = multiplied['damage'] + multiplied['frags'] * 200
  multiplied['gunMarkDmg'] = multiplied['damage'] + Math.max(multiplied['trackAssist'], multiplied['radioAssist'], 1)

  const avgMaxMinTotal = Object.fromEntries(Object.entries(multiplied).flatMap(([key, value]) => {
    const avg = value / battles
    const max = Math.round(1 + avg * (1 + Math.random() * 0.5))
    const min = Math.round(avg * (1 - Math.random() * 0.5))
    return [[key + 'Avg', avg], [key + 'Max', max], [key + 'Min', min], [key + 'Total', value]]
  }))


  const top1InRow = Math.round(battles * (Math.random() * 0.3 + 0.3))
  const countDamagedShots = Math.round(battles * (Math.random() * 3 + 4))
  return {
    ...avgMaxMinTotal,
    battles,
    wins: Math.round(battles * Math.random()),
    top1: Math.round(battles * (Math.random() * 0.3 + 0.7)),
    'top1InRow': top1InRow,
    'top1InRowMax': top1InRow * 1.25,
    'shotDamageTotal': Math.round(multiplied['damage'] * 0.9),
    'shotDamageAvg': 400 * (1 + Math.random() * 0.5),
    'shotDamageMax': 400 * (1.2 + Math.random() * 0.5),
    countDamagedShots,
  }
}

const prepare = [
  { player: '__NIDIN__', results: dataFor(12) },
  { player: 'Sh0tnik', results: dataFor(11) },
  { player: 'EviL_GrannY', results: dataFor(11) },
]

const targetData = prepare.map(t => ({
  player: t.player,
  ...toIconType(t.results as any)
}))

const total = toIconType(totalAggregator(prepare.map(t => t.results as any)))

const aspect = computed(() => {
  switch (props.slots?.length) {
    case 0: return 1.2
    case 1: return 1.45
    case 2: return 2.17
    case 3: return 2.75
    case 4: return 3.02
    case 5: return 3.36
    case 6: return 3.7
    case 7: return 4.04
    case 8: return 4.38
    case 9: return 4.72
    default: return 4
  }
})
</script>


<style lang='scss' scoped></style>