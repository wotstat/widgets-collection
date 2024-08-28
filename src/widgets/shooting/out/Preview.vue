<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="3.1">
    <WidgetCard>
      <Content :percent="!isMiniPreview && percent" :title="isMiniPreview || title" :miss="24" :total="532" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';

const props = defineProps<{
  isMiniPreview: boolean
  percent?: boolean
  title?: boolean
}>();


</script>


<style lang="scss" scoped></style>