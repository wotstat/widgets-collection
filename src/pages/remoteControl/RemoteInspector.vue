<template>
  <div>
    <Inspector :data="data" @change="onChange" @mouse-enter="mouseEnter" @mouse-leave="mouseLeave" />
  </div>
</template>


<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Inspector from './inspector/Inspector.vue';

const props = defineProps<{
  patch: (path: string, value: unknown) => void;
  data: Record<string, any>;
}>()

const hoverPath = ref<string | null>(null);

function onChange({ path, value }: { path: string[]; value: unknown }) {
  props.patch(path.join('/'), value);
}

function mouseEnter(path: string[]) {
  hoverPath.value = path.join('/');
}

function mouseLeave(path: string[]) {
  if (hoverPath.value === path.join('/')) {
    hoverPath.value = null;
  }
}

const emits = defineEmits<{
  (e: 'change:over-element', path: string | null): void;
}>();

watchEffect(() => emits('change:over-element', hoverPath.value));
</script>


<style lang="scss" scoped></style>