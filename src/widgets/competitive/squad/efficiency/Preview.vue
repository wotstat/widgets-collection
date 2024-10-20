<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content :lines="lines" :anim />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from '../../../efficiency/stats/Content.vue';
import { Props, SlotValue } from './define.widget';

const props = defineProps<{
  isMiniPreview: boolean
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
  'player': ['__NIDIN__', 'Sh0tnik'],
  'tank': ['Grille 15', 'ИС-7'],
  'dmg': [4587, 3782],
  'block': [552, 456],
  'assist': [735, 968],
  'discover': [3, 2],
  'assist-radio': [823, 672],
  'assist-track': [455, 390],
  'fire': [1, 0],
  'fire-dmg': [72, 0],
  'ram': [0, 1],
  'ram-dmg': [0, 52],
  'ammo-bay-destroyed': [1, 0],
  'ammo-bay-destroyed-dmg': [1600, 0],
  'base-capture': [10, 20],
  'base-defend': [0, 40],
  'distance': [1342, 2245],
  'chuck-score': [4587, 3782],
  'gun-mark-dmg': [4887, 4200],
  'gun-mark-percent': [80.51, 82.14],
} as const satisfies {
  [key in Exclude<SlotValue, 'empty'>]: any
}

const lines = computed(() => (props.isMiniPreview ?
  ['player', 'tank', 'dmg', 'block', 'assist'] as const :
  [props.slot1, props.slot2, props.slot3, props.slot4, props.slot5, props.slot6, props.slot7, props.slot8])
  .filter(t => t != undefined)
  .filter(t => t != 'empty')
  .map(t => ({ icon: t, values: (defaultValues[t] ?? ['', '']) as any })
  ))

const aspect = computed(() => 9 / lines.value.length)
</script>


<style lang="scss" scoped></style>