<template>
  <InspectorNode :node="treeRoot" :path="[]" @change="t => emits('change', { path: t.path, value: t.value })" />
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { buildTree, type Entry } from './tree'
import InspectorNode from './InspectorNode.vue';


const props = defineProps<{ data: Record<string, Entry> }>()

const treeRoot = computed(() => buildTree(props.data))


const emits = defineEmits<{
  (e: 'change', data: { path: string[], value: unknown }): void
}>()

</script>