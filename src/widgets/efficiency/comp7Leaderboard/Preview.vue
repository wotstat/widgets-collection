<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="4.6">
    <Content :position="123456" :delta="1234" :hide-icon :hide-delta :skin />
  </WidgetPreviewRoot>
</template>

<script setup lang="ts">
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue'
import Content from './Content.vue'

defineProps<{
  hideIcon?: boolean
  hideDelta?: boolean
  skin?: 'transparent' | 'default'
}>()
</script>
