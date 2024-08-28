<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2.1">
    <WidgetCard>
      <Content :value="data.startFrom ?? 0" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  startFrom?: number
}>();

const data = computed(() => props.isMiniPreview ? { startFrom: 42 } : props);

</script>


<style lang="scss" scoped></style>