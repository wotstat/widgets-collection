<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2.78">
    <TitledCounter :title="data.title ? 'УРОНА ТАРАНОМ' : false" :value="data.startFrom ?? 0"
      :skin="props.skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import TitledCounter from '../TitledCounter.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';

const props = defineProps<{
  isMiniPreview: boolean
  title?: boolean
  startFrom?: number
  skin?: 'transparent' | 'default'
}>();

const data = computed(() => props.isMiniPreview ? { title: true, startFrom: 54531 } : props);

</script>


<style lang="scss" scoped></style>