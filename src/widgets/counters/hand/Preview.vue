<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2.9">
    <Content :value="data.startFrom ?? 0" :skin="skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  startFrom?: number
  skin?: 'transparent' | 'default'
}>();

const data = computed(() => props.isMiniPreview ? { startFrom: 42 } : props);

</script>


<style lang="scss" scoped></style>