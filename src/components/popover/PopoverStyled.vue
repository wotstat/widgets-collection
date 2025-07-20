<template>
  <Popover :target :display :offset="targetOffset" :viewportOffset :placement :preserveLastPlacement
    @on-click-outside="emit('onClickOutside')" v-slot="{ arrow }">
    <div class="popover-card"
      :class="{ [`arrow-${arrow.direction}`]: arrow.direction, 'arrow-disabled': arrowSize == 0 }" :style="{
        '--background-color': '#2a2a2a',
        '--arrow-x': `${arrow.x}px`,
        '--arrow-y': `${arrow.y}px`,
        '--arrow-size': `${arrowSize ?? 5}px`
      }">
      <slot></slot>
    </div>
  </Popover>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import Popover from './Popover.vue';
import { OffsetValue, PlacementParam, PlacementWithModifiers } from './utils';

const { target,
  display,
  offset,
  viewportOffset = 10,
  placement,
  preserveLastPlacement = true,
  arrowSize
} = defineProps<{
  target: HTMLElement | null
  display: boolean
  offset?: OffsetValue
  viewportOffset?: OffsetValue
  arrowSize?: number
  preserveLastPlacement?: boolean
  placement?: PlacementParam
}>()

const emit = defineEmits<{
  (e: 'onClickOutside'): void
}>()

const targetOffset = computed<OffsetValue>(() => {
  if (offset !== undefined) return offset;
  if (arrowSize) return arrowSize + 3;
  return viewportOffset;
});

</script>


<style lang="scss" scoped>
$background-color: var(--background-color, #2a2a2a);
$border-color: var(--border-color, #444);


.popover-card {
  background-color: $background-color;
  color: #f6f6f6;
  border-radius: 10px;
  border: 1px solid $border-color;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;

  $arrow-offset: calc(var(--arrow-size) / -2);
  $arrow-offset-bordered: calc($arrow-offset - 2px);

  &::after {
    content: '';
    position: absolute;
    top: var(--arrow-y);
    left: var(--arrow-x);
    width: var(--arrow-size);
    height: var(--arrow-size);
    background-color: $background-color;
    border-right: 1px solid $border-color;
    border-top: 1px solid $border-color;
    border-left: 1px solid transparent;
    border-bottom: 1px solid transparent;
    clip-path: polygon(0 0, 100% 100%, 100% 0);
  }

  &.arrow-left::after {
    transform: translate($arrow-offset, $arrow-offset) rotate(-135deg);
  }

  &.arrow-right::after {
    transform: translate($arrow-offset-bordered, $arrow-offset-bordered) rotate(45deg);
  }

  &.arrow-top::after {
    transform: translate($arrow-offset, $arrow-offset) rotate(-45deg);
  }

  &.arrow-bottom::after {
    transform: translate($arrow-offset-bordered, $arrow-offset-bordered) rotate(135deg);
  }

  &.arrow-disabled::after {
    display: none;
  }

}
</style>