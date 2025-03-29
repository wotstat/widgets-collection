<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="3.1">
    <Content :value="data.startFrom ?? 0" :title="data.title" :skin="skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  title?: boolean
  startFrom?: number
  skin?: 'transparent' | 'default'
}>();

const data = computed(() => props.isMiniPreview ? { title: true, startFrom: 23 } : props);

</script>


<style lang="scss" scoped></style>