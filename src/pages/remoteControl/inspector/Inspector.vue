<template>
  <InspectorNode :node="treeRoot" :path="[]" :offset="offset ?? 0"
    @change="t => emits('change', { path: t.path, value: t.value })" @mouse-enter="t => emits('mouseEnter', t)"
    @mouse-leave="t => emits('mouseLeave', t)" class="rc-inspector-style" />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { buildTree, type Entry } from './tree'
import InspectorNode from './InspectorNode.vue';


const props = defineProps<{ data: Record<string, Entry>, offset?: number }>()

const treeRoot = computed(() => buildTree(props.data))


const emits = defineEmits<{
  (e: 'change', data: { path: string[], value: unknown }): void
  (e: 'mouseEnter', path: string[]): void
  (e: 'mouseLeave', path: string[]): void
}>()

</script>

<style lang="scss">
@use '../inspectorStyle.scss';
</style>