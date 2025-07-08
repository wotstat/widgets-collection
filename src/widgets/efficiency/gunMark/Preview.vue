<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content v-bind="targetProps" :skin="skin ?? 'transparent'" />
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
  historyLength?: number | string,
  skin?: 'transparent' | 'default'
}>();

const targetProps = computed<Omit<Props, 'skin'>>(() => ({
  currentPercent: 50.21,
  history: [
    { delta: +1.24, key: '1', arena: 'Утёс' },
    { delta: +0.72, key: '2', arena: 'Химмльсдорф' },
    { delta: -0.41, key: '3', arena: 'Степи' },
    { delta: +0.68, key: '4', arena: 'Карелия' },
    { delta: +2.79, key: '5', arena: 'Тихий берег' },
    { delta: +1.82, key: '6', arena: 'Линия Маннергейма' },
  ].slice(0, Number.parseInt((props.historyLength ?? 3).toString())),
  hideIcon: props.hideIcon,
  game: 'lesta'
}))


const aspect = computed((() => {
  let height = 50;
  height += 22 * targetProps.value.history.length;


  return 145 / height;
}))

</script>


<style lang="scss" scoped></style>