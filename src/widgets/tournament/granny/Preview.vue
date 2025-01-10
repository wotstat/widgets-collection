<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="predictedAspectRatio">
    <Content v-bind="target" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { computed } from 'vue';
import { Props } from './define.widget';

const props = defineProps<{
  isMiniPreview: boolean,
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
  skin?: 'default' | 'transparent' | 'replay',
}>();

const target = computed<Props>(() => ({
  hideL1: props.hideL1,
  hideL2: props.hideL2,
  hideL3: props.isMiniPreview ? true : props.hideL3,
  skin: props.isMiniPreview ? 'transparent' : props.skin,
  place: 98,
  battleCount: 347,
  bestBattles: [
    { date: 1731790571056, tank: 'Gendarme', score: 5212, today: false },
    { date: 1731791256575, tank: 'Gendarme', score: 5182, today: false },
    { date: 1730813329711, tank: 'FV4005', score: 5172, today: false },
    { date: 1731614833973, tank: 'Gendarme', score: 5164, today: true },
    { date: 1731638991393, tank: 'FV4005', score: 5096, today: false },
    { date: 1731637891450, tank: 'Gendarme', score: 5044, today: true },
    { date: 1731637630680, tank: 'FV4005', score: 5037, today: false },
    { date: 1731624918280, tank: 'Gendarme', score: 5025, today: false },
    { date: 1731624504156, tank: null, score: 5019, today: true },
    { date: 1731624177120, tank: null, score: 5977, today: false },
    { date: 1731623810841, tank: 'Gendarme', score: 5955, today: false },
    { date: 1731623430359, tank: 'FV4005', score: 5952, today: false },
    { date: 1731621663631, tank: 'FV4005', score: 5947, today: true },
    { date: 1731615256104, tank: 'Gendarme', score: 5940, today: true },
    { date: 1731614833973, tank: 'FV4005', score: 5855, today: false },
  ],
  last10: [1200, 2124, 1212, 564, 1244, 2412, 1551, 1551, 1551, 453],
  lastBattle: { tank: 'FV4005', score: 453 },
}))

const predictedAspectRatio = computed(() => {
  return props.isMiniPreview ? 1.6 : props.skin === 'replay' ? 0.8 : 1.2
})

</script>


<style lang="scss" scoped></style>