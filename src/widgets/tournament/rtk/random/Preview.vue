<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="predictedAspectRatio">
    <WidgetCard>
      <Content v-bind="target" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { computed, ref } from 'vue';
import { Props } from './define.widget';

const props = defineProps<{
  isMiniPreview: boolean,
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
}>();

const target = computed<Props>(() => ({
  hideL1: props.hideL1,
  hideL2: props.hideL2,
  hideL3: props.isMiniPreview ? true : props.hideL3,
  place: 98,
  battleCount: 347,
  bestBattles: [
    { tank: '110', score: 2212, today: false },
    { tank: 'Turtle I', score: 2182, today: false },
    { tank: 'Turtle I', score: 2172, today: false },
    { tank: 'Turtle I', score: 2164, today: true },
    { tank: 'Turtle I', score: 2096, today: false },
    { tank: '110', score: 2044, today: true },
    { tank: 'Turtle I', score: 2037, today: false },
    { tank: '110', score: 2025, today: false },
    { tank: null, score: 2019, today: true },
    { tank: null, score: 1977, today: false },
    { tank: '110', score: 1955, today: false },
    { tank: 'Turtle I', score: 1952, today: false },
    { tank: 'Turtle I', score: 1947, today: true },
    { tank: '110', score: 1940, today: true },
    { tank: 'Turtle I', score: 1855, today: false },
  ],
  last10: [1200, 2124, 1212, 564, 1244, 2412, 1551, 1551, 1551, 453],
  lastBattle: { tank: 'Turtle I', score: 453 },
}))

const predictedAspectRatio = computed(() => {
  return props.isMiniPreview ? 1.33 : 1.09
})

</script>


<style lang="scss" scoped></style>