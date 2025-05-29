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
  } satisfies Props;
});

</script>


<style lang="scss" scoped></style>