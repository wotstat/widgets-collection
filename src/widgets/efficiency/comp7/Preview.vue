<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content v-bind="targetProps" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  hideIcon?: boolean
  historyLength?: number | string
}>();

const targetProps = computed<Props>(() => ({
  currentRank: 840,
  history: [
    { delta: +19, arena: 'Утёс' },
    { delta: +29, arena: 'Химмльсдорф' },
    { delta: -15, arena: 'Степи' },
    { delta: +12, arena: 'Карелия' },
    { delta: +12, arena: 'Тихий берег' },
    { delta: +12, arena: 'Карелия' },
  ].slice(0, Number.parseInt((props.historyLength ?? 3).toString())),
  hideIcon: props.hideIcon,
}))


const aspect = computed((() => {
  let height = 50;
  if (!targetProps.value.hideIcon) height += 150;
  height += 22 * targetProps.value.history.length;


  return 145 / height;
}))

</script>


<style lang="scss" scoped></style>