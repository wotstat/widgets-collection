<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="isMiniPreview ? 1.45 : 1">
    <Content v-bind="targetProps" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


import { merfiGradient, Props } from './define.widget'
import { accent } from '@/composition/wotstatColors';

const props = defineProps<Partial<Props> & {
  isMiniPreview: boolean
}>();


const targetGradient = computed(() => {

  let from = merfiGradient.from;
  let to = merfiGradient.to;

  if (props.widgetStyle === 'simple') {
    from = accent.value;
    to = accent.value;
  } else if (props.widgetStyle === 'custom') {
    from = props.colorFrom ?? merfiGradient.from;
    to = props.colorTo ?? merfiGradient.to;
  }

  return { from, to };
});

const targetProps = computed(() => {
  return {
    colorFrom: targetGradient.value.from,
    colorTo: targetGradient.value.to,
    title: props.title ?? 'ТУРНИР ЧАКА',
    showTitle: props.isMiniPreview ? 'never' : (props.showTitle ?? 'both'),
    periodLine: props.periodLine ?? 'never',
    battlesLine: props.battlesLine ?? 'both',
    photoLine: props.isMiniPreview || props.photoLine,
    photoType: props.photoType ?? 'tank',
    hpLine: props.isMiniPreview || props.hpLine,
    period: props.period ?? 'Тренировка',
    animation: props.animation ?? true,
    gradient: props.isMiniPreview || (props.gradient ?? true),
    widgetStyle: props.widgetStyle ?? 'merfi',

    isInBattle: true,
    score: 60348,
    battles: 4,
    lastBattleTotalScore: 123,
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
        name: 'SUPER_LONG_NAME',
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