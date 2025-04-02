<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.45">
    <Content :background="[]" :under-leg="[]" :left-eye="'normal'" :right-eye="'normal'" :mouth="'normal'" :left="left"
      :right="right" :flipX="flipX ?? false" :flipY="flipY ?? false" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { useEventListener } from '@vueuse/core';

const props = defineProps<{
  isMiniPreview: boolean
  flipX?: boolean
  flipY?: boolean
}>();

const left = ref<'up' | 'down'>('up');
const right = ref<'up' | 'down'>('up');

useEventListener(document, 'mousedown', e => e.button == 0 ? left.value = 'down' : null)
useEventListener(document, 'mouseup', e => e.button == 0 ? left.value = 'up' : null)

</script>


<style lang="scss" scoped></style>