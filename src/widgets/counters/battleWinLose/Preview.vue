<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.8">
    <WidgetCard>
      <Content :battles="24" :wins="16" :loses="8" :align="align ?? 'center'"
        :showLosses="isMiniPreview || showLosses" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  align?: 'left' | 'center' | 'right'
  showLosses?: boolean
}>();

</script>


<style lang="scss" scoped></style>