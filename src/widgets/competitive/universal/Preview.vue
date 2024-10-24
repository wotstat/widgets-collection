<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content :slots="slots ?? ['dmg-avg', 'kill-avg', 'xp-avg', 'fire-dmg-avg', 'battles']" :data="targetData" />
  </WidgetPreviewRoot>
</template>


<script setup lang='ts'>

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  slots?: Props['slots']
}>();

const sampleData = {
  'ammo-bay-destroyed': 0.2,
  'ammo-bay-destroyed-dmg': 330,
  'assist': 1200,
  'assist-radio': 1100,
  'assist-track': 400,
  'base-capture': 10,
  'base-defend': 15,
  'block': 3000,
  'discover': 6,
  'distance': 800,
  'dmg': 5000,
  'duration': 600,
  'fire': 0.4,
  'fire-dmg': 400,
  'kill': 4,
  'lifetime': 500,
  'position': 2,
  'ram': 0.5,
  'ram-dmg': 80,
  'xp': 1200,
}

function dataFor(battles: number) {
  const multiplied = Object.fromEntries(Object.entries(sampleData).map(([key, value]) => [key, Math.round(value * battles * (1 + Math.random() * 0.5))]))

  multiplied['chuck-score'] = multiplied['dmg'] + multiplied['kill'] * 200
  multiplied['gun-mark-dmg'] = multiplied['dmg'] + Math.max(multiplied['assist-track'], multiplied['assist-radio'], 1)

  const avgMax = Object.fromEntries(Object.entries(multiplied).flatMap(([key, value]) => {
    const avg = value / battles
    const max = Math.round(1 + avg * (1 + Math.random() * 0.5))
    return [[key + '-avg', avg], [key + '-max', max]]
  }))


  const top1InRow = Math.round(battles * (Math.random() * 0.3 + 0.3))
  return {
    ...multiplied,
    ...avgMax,
    battles,
    win: Math.round(battles * Math.random()),
    top1: Math.round(battles * (Math.random() * 0.3 + 0.7)),
    'top1-in-row': top1InRow,
    'top1-in-row-max': top1InRow * 1.25,
    'shot-dmg': Math.round(multiplied['dmg'] * 0.9),
    'shot-dmg-avg': 400 * (1 + Math.random() * 0.5),
    'shot-dmg-max': 400 * (1.2 + Math.random() * 0.5)
  }
}

const targetData = [
  { player: '__NIDIN__', ...dataFor(12) },
  { player: 'Sh0tnik', ...dataFor(11) },
  { player: 'EviL_GrannY', ...dataFor(11) },
] as any

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