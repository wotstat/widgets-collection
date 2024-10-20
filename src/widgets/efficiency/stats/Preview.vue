<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content :lines="lines" :soloAlign :anim large />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { SlotValue } from './define.widget';

const props = defineProps<{
  isMiniPreview: boolean
  soloAlign?: 'left' | 'right'
  anim?: boolean
  slot1?: SlotValue
  slot2?: SlotValue
  slot3?: SlotValue
  slot4?: SlotValue
  slot5?: SlotValue
  slot6?: SlotValue
  slot7?: SlotValue
  slot8?: SlotValue
}>();


const defaultValues = {
  'dmg': 4587,
  'block': 5723,
  'assist': 731,
  'discover': 4,
  'assist-radio': 435,
  'assist-track': 775,
  'fire': 2,
  'fire-dmg': 423,
  'ram': 1,
  'ram-dmg': 23,
  'ammo-bay-destroyed': 1,
  'ammo-bay-destroyed-dmg': 1600,
  'base-capture': 23,
  'base-defend': 50,
  'distance': 966,
  'chuck-score': 7284,
  'gun-mark-dmg': 4862,
  'gun-mark-percent': 78.5,
} as const satisfies {
  [key in Exclude<SlotValue, 'empty'>]: any
}

const lines = computed(() => (props.isMiniPreview ?
  ['dmg', 'block', 'assist-radio', 'assist-track', 'fire-dmg'] as const :
  [props.slot1, props.slot2, props.slot3, props.slot4, props.slot5, props.slot6, props.slot7, props.slot8])
  .filter(t => t != undefined)
  .filter(t => t != 'empty')
  .map(t => ({ icon: t, values: ([defaultValues[t] ?? '']) as any })
  ))

const aspect = computed(() => Math.min(3.3 / lines.value.length, 0.8))
</script>


<style lang="scss" scoped></style>