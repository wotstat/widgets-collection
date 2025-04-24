<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="0.88">
    <Content :value="454.015" :pb="[132.23, 151.56, 1565.65]" :show-events="isMiniPreview || (showEvents ?? true)"
      :show-pb="isMiniPreview || (showPb ?? true)" :events="[
        { type: 'dmg', time: 45.63 },
        { type: 'ram', time: 65.78 },
        { type: 'kill', time: 98.25 },
        { type: 'receive-dmg', time: 145.456 },
        { type: 'loss-50hp', time: 215.69 },
        { type: 'kill-spg', time: 380.32 },
        { type: 'base-capture-80', time: 419.80 },
        { type: 'death', time: 445.57 },
      ]" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  showEvents?: boolean
  showPb?: boolean
}>();

</script>


<style lang="scss" scoped></style>