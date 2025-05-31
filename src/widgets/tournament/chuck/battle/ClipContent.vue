<template>
  <div class="container" ref="root">
    <div ref="svgElement" v-html="props.svg"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useElementBounding, useMutationObserver } from '@vueuse/core';
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { clipWrapper } from './clipUtils';

const svgElement = ref<HTMLElement | null>(null);
const { top, update } = useElementBounding(svgElement);

const id = `clip-${Math.random().toString(36).substring(2, 15)}`;

const props = defineProps<{
  svg: string;
  root?: HTMLElement | null;
}>()

const clip = computed(() => `url(data:image/svg+xml;utf8,${encodeURIComponent(props.svg)})`)

const wrapper = inject(clipWrapper)

let version = 0;
watch(() => props.svg, (newSvg, oldSvg) => {
  wrapper?.unregister(id);
  wrapper?.register(id, { top, svg: newSvg });
  if (oldSvg && oldSvg !== newSvg)
    props.root?.setAttribute(`clip-version-${id}`, (version++).toString());
}, { immediate: true });

onUnmounted(() => {
  wrapper?.unregister(id);
});

useMutationObserver(() => props.root, update, {
  childList: true,
  attributes: true,
});
</script>


<style lang="scss" scoped>
.container {
  position: relative;

  .content {
    position: absolute;
    inset: 0;
    color: white;
    mask-image: v-bind(clip);
    mask-repeat: no-repeat;

    // mask: v-bind(clip) 0 80px/100% 100% no-repeat,
    //   v-bind(clip) 0 -40px/100% 100% no-repeat;

  }
}
</style>