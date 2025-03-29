<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="3.1">
    <Content :percent="!isMiniPreview && percent" :title="isMiniPreview || title" :miss="24" :total="532"
      :skin="skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';

const props = defineProps<{
  isMiniPreview: boolean
  percent?: boolean
  title?: boolean
  skin?: 'transparent' | 'default'
}>();


</script>


<style lang="scss" scoped></style>