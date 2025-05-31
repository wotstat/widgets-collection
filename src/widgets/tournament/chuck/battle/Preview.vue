<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1">
    <Content v-bind="targetProps" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


import { defaultGradient, Props } from './define.widget'
const props = defineProps<Partial<Props> & {
  isMiniPreview: boolean
}>();


const targetProps = computed(() => {
  return {
    colorFrom: props.colorFrom ?? defaultGradient.from,
    colorTo: props.colorTo ?? defaultGradient.to,
    title: props.title ?? 'ТУРНИР МËРФИ',
    showTitle: props.showTitle ?? 'both',
    periodLine: props.periodLine ?? 'both',
    battlesLine: props.battlesLine ?? 'both',
    photoLine: props.isMiniPreview || props.photoLine,
    photoType: props.photoType ?? 'photo',
    hpLine: props.isMiniPreview || props.hpLine,
    period: props.period ?? 'ЭТАП 1',

    isInBattle: true,
    score: 60348,
    battles: 4,
    players: [
      {
        name: 'Spichka',
        tankName: 'ИС-7',
        tankTag: 'ussr:R45_IS-7',
        score: 0,
        totalScore: 60348,
        hp: 120,
        maxHp: 3000,
        connected: true
      },
      {
        name: 'Pykav',
        tankName: 'Maus',
        tankTag: 'germany:G42_Maus',
        score: 5000,
        totalScore: 40348,
        hp: 1500,
        maxHp: 3000,
        connected: true
      },
      {
        name: 'PBODY_PRESS_SUPER_LONG',
        tankName: 'Rinoceronte',
        tankTag: 'italy:It15_Rinoceronte',
        score: 1500,
        totalScore: 58848,
        hp: 3000,
        maxHp: 3000,
        connected: true
      },
    ]
  } satisfies Props;
});

</script>


<style lang="scss" scoped></style>