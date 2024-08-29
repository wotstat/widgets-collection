<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="3.6">
    <WidgetCard>
      <Content :lines="lines" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  title?: boolean
  startFrom?: number
}>();

const lines = [
  {
    name: 'EviL_GrannY',
    maxDmg: 12586,
    maxFrags: 12,
    maxTopInRow: 7,
    sumTop: 412,
    sumDmg: 634578,
    sumFrags: 1235,
    battlesCount: 20,
  },
  {
    name: 'Near_You',
    maxDmg: 18828,
    maxFrags: 8,
    maxTopInRow: 9,
    sumTop: 754,
    sumDmg: 456364,
    sumFrags: 6654,
    battlesCount: 18,
  }
]

const data = computed(() => props.isMiniPreview ? { title: true, startFrom: 23 } : props);

</script>


<style lang="scss" scoped></style>