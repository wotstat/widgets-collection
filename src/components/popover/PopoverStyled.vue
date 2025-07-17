<template>
  <Popover :target :display :offset :placement @on-click-outside="emit('onClickOutside')">
    <div class="popover-card" :style="{ '--background-color': '#2a2a2a' }">
      <slot></slot>
    </div>
  </Popover>
</template>


<script setup lang="ts">
import Popover from './Popover.vue';
import { OffsetValue, Placement } from './utils';

const { target, display, offset, placement } = defineProps<{
  target: HTMLElement | null
  display: boolean
  offset?: OffsetValue
  placement?: Placement
}>()

const emit = defineEmits<{
  (e: 'onClickOutside'): void
}>()

</script>


<style lang="scss" scoped>
.popover-card {
  background-color: var(--background-color);
  color: #f6f6f6;
  border-radius: 10px;
  border: 1px solid #424242;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>