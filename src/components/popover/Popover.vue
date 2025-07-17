<template>
  <Teleport :to="'body'" defer v-if="display">
    <div class="popup-container" ref="popupContainer" :style="targetStyle">
      <slot></slot>
    </div>
  </Teleport>
</template>


<script setup lang="ts">
import { computed, onBeforeMount, onUnmounted, ref, shallowRef, watch } from 'vue';
import { calculatePopoverPosition, generateOffset, getParams, isParamsEqual, OffsetValue, Params, Placement } from './utils';
import { onClickOutside, useEventListener } from '@vueuse/core';

const targetParams = shallowRef<Params | null>(null);

const props = defineProps<{
  target: HTMLElement | null
  display: boolean
  offset?: OffsetValue
  placement?: Placement
}>()

const emit = defineEmits<{
  (e: 'onClickOutside'): void
}>()

const popupContainer = ref<HTMLElement | null>(null);
let animationHandle: number | null = null;

useEventListener(window, 'pointerdown', (event: PointerEvent) => {
  if (!props.display) return;

  if (!popupContainer.value) return;

  if (!popupContainer.value.contains(event.target as Node)) {
    emit('onClickOutside');
  }
});


function onAnimationFrame() {
  animationHandle = null;

  if (!props.display) return;

  animationHandle = requestAnimationFrame(onAnimationFrame)

  if (!props.target) return;
  const targetNewParams = getParams(props.target, popupContainer.value);
  if (!targetNewParams) return;

  if (!targetParams.value || !isParamsEqual(targetParams.value, targetNewParams)) {
    targetParams.value = targetNewParams;
  }
}

watch(() => props.display, display => {
  if (display && animationHandle === null) {
    onAnimationFrame();
  } else if (!display && animationHandle !== null) {
    cancelAnimationFrame(animationHandle);
    animationHandle = null;
  }
}, { immediate: true });

onBeforeMount(() => {
  if (props.display && animationHandle === null) onAnimationFrame()
})

onUnmounted(() => {
  if (animationHandle != null) cancelAnimationFrame(animationHandle);
});

const offset = computed(() => generateOffset(props.offset ?? 0))

const targetStyle = computed(() => {
  if (!targetParams.value) return {}

  const params = targetParams.value

  const position = calculatePopoverPosition(params, props.placement ?? 'top', {
    offset: offset.value,
    bbox: 'window'
  });

  return {
    transform: `translate3d(${position.x}px, ${position.y}px, 0px)`
  }
})

</script>


<style lang="scss" scoped>
.popup-container {
  position: fixed;
  z-index: 1000;
  will-change: transform;
  top: 0px;
  left: 0px;
  margin: 0px;
}
</style>