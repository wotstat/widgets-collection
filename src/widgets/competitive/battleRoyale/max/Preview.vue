<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="3.6">
    <WidgetCard>
      <Content :lines="lines" :dmg :frags :top />
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
  dmg?: 'max' | 'avg'
  frags?: 'max' | 'avg'
  top?: 'in-row' | 'sum'
}>();

const lines = [
  {
    name: 'EviL_GrannY',
    maxDmg: 25586,
    maxFrags: 12,
    maxTopInRow: 5,
    sumTop: 12,
    sumDmg: 229575,
    sumFrags: 38,
    battlesCount: 20,
  },
  {
    name: 'Near_You',
    maxDmg: 18828,
    maxFrags: 8,
    maxTopInRow: 4,
    sumTop: 10,
    sumDmg: 314558,
    sumFrags: 54,
    battlesCount: 18,
  }
]

</script>


<style lang="scss" scoped></style>