<template>
  <div class="widgets-sdk-styles" :style="targetStyle">
    <div class="autoscale" ref="containerElement" :style="{ aspectRatio: predictedAspectRatio }">
    </div>
    <div class="auto-scale-container" v-if="autoScale">
      <div class="slot" :style="{ fontSize, width: width + 'px' }">
        <slot></slot>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { computed, inject, ref } from 'vue';
import { accent, background } from "@/composition/wotstatColors";
import { isInMiniPreview as isInMiniPreviewKey } from '@/utils/provides';

const containerElement = ref<HTMLElement | null>(null)

const props = defineProps<{
  autoScale?: boolean
  predictedAspectRatio?: number
}>()

const { width } = useElementSize(containerElement)
const fontSize = computed(() => width.value / 100 * 4 + 'px')

const isInMiniPreview = inject(isInMiniPreviewKey, false)
const targetStyle = computed(() => {

  if (isInMiniPreview) return { fontSize: fontSize.value }

  return {
    '--wotstat-accent': `#` + accent.value,
    '--wotstat-background': `#` + background.value,
    fontSize: fontSize.value
  }
})

</script>


<style lang="scss" scoped>
.widgets-sdk-styles {
  width: 100%;
  height: 100%;
  position: relative;

  :deep(.card),
  :deep(.preview-card) {
    border: 1px dashed rgba(255, 255, 255, 0.1);
    // margin: -1px;
  }

  :deep(img) {
    user-select: none;
    pointer-events: none;
  }

  .autoscale {
    max-height: 100%;
  }

  .auto-scale-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>