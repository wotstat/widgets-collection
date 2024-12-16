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
  edgeMask?: number | { top: number, right: number, bottom: number, left: number }
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

  let margin = '0'
  if (isInCollection) {
    if (typeof props.insets === 'number') margin = `-${props.insets}%`
    else margin = `-${props.insets.top}% -${props.insets.right}% -${props.insets.bottom}% -${props.insets.left}%`
  }


  let gradient = null as { top: number, right: number, bottom: number, left: number } | null
  if (typeof props.edgeMask === 'number') gradient = { top: props.edgeMask, right: props.edgeMask, bottom: props.edgeMask, left: props.edgeMask }
  else if (props.edgeMask) gradient = props.edgeMask

  const edgeMask = (gradient && Object.values(gradient).some(t => t != 0)) ? {
    maskComposite: 'intersect',
    maskImage: `linear-gradient(to right, transparent, black ${gradient.left}%, black calc(100% - ${gradient.right}%), transparent),
                linear-gradient(to bottom, transparent, black ${gradient.top}%, black calc(100% - ${gradient.bottom}%), transparent)`
  } : {}

  const horizontal = typeof props.insets === 'number' ? 2 * props.insets : props.insets.left + props.insets.right
  return {
    padding,
    margin,
    fontSize: isInCollection ? undefined : `${100 - horizontal}%`,
    ...edgeMask
  }

})
</script>

<style lang="scss" scoped>
.insets-container {
  overflow: hidden;
}
</style>