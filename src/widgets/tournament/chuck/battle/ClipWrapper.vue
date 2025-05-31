<template>
  <div class="clip-wrapper" ref="wrapper">
    <div class="overlay-mask">
      <slot name="overlay"></slot>
    </div>
    <slot></slot>
  </div>
</template>


<script setup lang="ts">
import { computed, provide, ref, Ref, shallowRef, ShallowRef, triggerRef, watchEffect } from 'vue';
import { clipWrapper } from './clipUtils';
import { useElementBounding } from '@vueuse/core';

const wrapper = ref<HTMLElement | null>(null);
const { top } = useElementBounding(wrapper);

const clips = shallowRef(new Map<string, { top: ShallowRef<number>, svg: string }>());

function register(path: string, info: { top: ShallowRef<number>, svg: string }) {
  clips.value.set(path, info);
  triggerRef(clips);
}

function unregister(path: string) {
  clips.value.delete(path);
  triggerRef(clips);
}

const clip = computed(() => {
  return Array.from(clips.value.entries())
    .map(([id, info]) => `url(data:image/svg+xml;utf8,${encodeURIComponent(info.svg)}) 0 ${info.top.value - top.value}px/100% no-repeat`)
    .join(', ');
})

provide(clipWrapper, {
  register,
  unregister
});

</script>


<style lang="scss" scoped>
.overlay-mask {
  position: absolute;
  inset: 0;

  pointer-events: none;
  user-select: none;

  mask: v-bind(clip);
}
</style>