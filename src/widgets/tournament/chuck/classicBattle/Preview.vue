<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.05">
    <Content :players :battles-count="12" :startedBattlesCount="13" :is-in-battle="true" :score="17641"
      :skin="skin ?? 'dot'" :border="border ?? false" :total-score="213566"
      :total-score-display="isMiniPreview ? 'both' : totalScore ?? 'both'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  border?: boolean
  totalScore?: 'never' | 'hangar' | 'both'
  skin?: 'transparent' | 'default'
}>();

const players = computed(() => {
  return [
    {
      name: 'EviL_GrannY',
      tankName: 'ИС-7',
      tankTag: 'ussr:R45_IS-7',
      score: 5540,
      totalScore: 60348,
      hp: 250,
      maxHp: 3000,
      connected: true
    },
    {
      name: 'Jove',
      tankName: 'Maus',
      tankTag: 'germany:G42_Maus',
      score: 5417,
      totalScore: 40348,
      hp: 1500,
      maxHp: 3000,
      connected: true
    },
    {
      name: '__NIDIN__',
      tankName: 'Rinoceronte',
      tankTag: 'italy:It15_Rinoceronte',
      score: 6684,
      totalScore: 58848,
      hp: 3000,
      maxHp: 3000,
      connected: true
    },
  ];
});

</script>


<style lang="scss" scoped></style>