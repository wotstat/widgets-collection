<template>
  <Transition>
    <Teleport :to="'body'" defer v-if="display">
      <div class="popup-container" ref="popupContainer" :style="targetStyle">
        <slot :arrow="arrowProps"></slot>
      </div>
    </Teleport>
  </Transition>
</template>


<script setup lang="ts">
import { computed, onBeforeMount, onUnmounted, ref, shallowRef, triggerRef, watch } from 'vue';
import { calculatePopoverPosition, generateOffset, getArrowPosition, getParams, isParamsEqual, OffsetValue, Params, PlacementParam, PlacementWithModifiers } from './utils';
import { useEventListener } from '@vueuse/core';

const targetParams = shallowRef<Params | null>(null);

const props = defineProps<{
  target: HTMLElement | null
  display: boolean
  offset?: OffsetValue
  viewportOffset?: OffsetValue
  placement?: PlacementParam
  preserveLastPlacement?: boolean
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


let lastHtmlSize = { width: 0, height: 0 };
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

  const htmlSize = { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
  if (lastHtmlSize.width !== htmlSize.width || lastHtmlSize.height !== htmlSize.height) {
    lastHtmlSize = htmlSize;
    triggerRef(targetParams);
  }

}

watch(() => props.display, display => {
  if (display && animationHandle === null) {
    lastPlacement = undefined;
    targetParams.value = null;
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
const viewportOffset = computed(() => generateOffset(props.viewportOffset ?? props.offset ?? 0))
const placementParam = computed<PlacementWithModifiers[]>(() => {
  if (Array.isArray(props.placement)) return props.placement.length == 0 ? ['top-float'] : props.placement
  return [props.placement ?? 'top-float']
})

let lastPlacement: PlacementWithModifiers | undefined = undefined;
const positions = computed(() => {
  if (!targetParams.value) return null

  const params = targetParams.value

  const position = calculatePopoverPosition(params, placementParam.value, {
    offset: offset.value,
    viewportOffset: viewportOffset.value,
    bbox: 'window',
    lastPlacement,
    preserveLastPlacement: props.preserveLastPlacement ?? true
  });

  lastPlacement = position.placement;

  const arrowPosition = getArrowPosition(position, params);

  return {
    x: position.x,
    y: position.y,
    placement: position.placement,
    arrowX: arrowPosition?.x,
    arrowY: arrowPosition?.y,
    arrowDirection: arrowPosition?.direction
  }
})

const targetStyle = computed(() => {
  if (!positions.value) return {}

  return {
    transform: `translate3d(${positions.value.x}px, ${positions.value.y}px, 0px)`
  }
})

const arrowProps = computed(() => {
  if (!positions.value || !positions.value.placement) return { x: 0, y: 0 }

  return {
    x: positions.value.arrowX,
    y: positions.value.arrowY,
    direction: positions.value.arrowDirection
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

.v-enter-active {
  transition: opacity 0.1s ease;
}

.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>