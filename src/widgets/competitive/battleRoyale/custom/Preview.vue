<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content :lines :slot1 :slot2 :slot3 :slot4 :slot5 />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Line, SlotValue } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  slot1?: SlotValue
  slot2?: SlotValue
  slot3?: SlotValue
  slot4?: SlotValue
  slot5?: SlotValue
}>();

const lines = [
  {
    name: 'EviL_GrannY',
    maxDmg: 25586,
    sumDmg: 229575,

    maxFrags: 12,
    sumFrags: 38,

    maxXp: 2450,
    sumXp: 32150,

    bestPosition: 1,
    sumPosition: 45,

    maxScore: 54,
    sumScore: 900,
    currentScoreInRow: 340,
    maxScoreInRow: 430,

    maxTopInRow: 4,
    sumTop: 25,

    battlesCount: 20
  },
  {
    name: 'Near_You',
    maxDmg: 18828,
    sumDmg: 229575,

    maxFrags: 8,
    sumFrags: 45,

    maxXp: 3120,
    sumXp: 23150,

    bestPosition: 1,
    sumPosition: 45,

    maxScore: 58,
    sumScore: 858,
    currentScoreInRow: 410,
    maxScoreInRow: 540,

    maxTopInRow: 8,
    sumTop: 27,

    battlesCount: 25
  }
] satisfies Line[]

const slotsCount = computed(() => [props.slot1, props.slot2, props.slot3, props.slot4, props.slot5].filter(s => s != 'empty').length)
const aspect = computed(() => {
  switch (slotsCount.value) {
    case 0: return 2.11
    case 1: return 2
    case 2: return 2.64
    case 3: return 3.11
    case 4: return 3.51
    case 5: return 4.18
  }
})

const slot1 = computed(() => props.slot1 ?? 'dmg-avg')
const slot2 = computed(() => props.slot2 ?? 'frags-avg')
const slot3 = computed(() => props.slot3 ?? 'xp-avg')
const slot4 = computed(() => props.slot4 ?? 'top-sum')
const slot5 = computed(() => props.slot5 ?? 'battles')

</script>


<style lang="scss" scoped></style>