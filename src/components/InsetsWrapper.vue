<template>
  <div class="insets-container" :style="targetStyle">
    <slot></slot>
  </div>
</template>


<script setup lang="ts">
import { WidgetMetaTags } from '@/composition/widgetSdk';
import { isInPreview } from '@/utils/provides';
import { computed, inject, watch } from 'vue';

const props = defineProps<{
  insets: number | { top: number, right: number, bottom: number, left: number }
}>()

const isInCollection = inject<boolean>(isInPreview, false)

watch(() => props.insets, (insets) => {
  if (!insets) return
  WidgetMetaTags.setInsets(insets)
}, { immediate: true })

const targetStyle = computed(() => {
  let padding = '0'
  if (typeof props.insets === 'number') padding = `${props.insets}%`
  else padding = `${props.insets.top}% ${props.insets.right}% ${props.insets.bottom}% ${props.insets.left}%`

  const horizontal = typeof props.insets === 'number' ? 2 * props.insets : props.insets.left + props.insets.right

  return {
    padding,
    scale: isInCollection ? 1 / (1 - horizontal / 100) : undefined,
    fontSize: `${100 - horizontal}%`
  }

})
</script>