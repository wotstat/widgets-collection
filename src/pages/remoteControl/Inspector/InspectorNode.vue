<template>
  <div class="inspector-node" :style="{ ['--level']: `${path.length - 1}` }">

    <div class="section-header" v-if="hasChildren && path.length != 0" @click="collapsed = !collapsed">
      <ArrowDown class="icon" :class="{ 'collapsed': collapsed }" />
      <p> {{ node.key }}</p>
    </div>


    <div class="content" v-show="!collapsed">
      <template v-if="hasChildren">
        <InspectorNode v-for="child in childArray" :key="child.key" :node="child" :path="[...path, child.key]"
          @change="t => emits('change', { path: t.path, value: t.value })" />
      </template>
      <template v-else>
        <component :is="drawerComponent" :value="node.value" :meta="node.meta" :path="path"
          @update:value="(value: any) => emits('change', { path, value })" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import type { TreeNode } from './tree'
import { drawerRegistry } from './drawerRegistry';

import ArrowDown from '@/assets/icons/arrow-down.svg'

const props = defineProps<{
  node: TreeNode
  path: string[]
}>()

const collapsed = ref(false)

const hasChildren = computed(() => !!props.node.children)
const childArray = computed(() => Object.values(props.node.children!))

const drawerComponent = computed(() => {
  if (!props.node.meta) throw new Error('Leaf missing meta')
  const comp = drawerRegistry.resolve(props.node.meta.drawer)
  if (!comp) throw new Error(`No drawer registered for ${props.node.meta.drawer}`)
  return comp
})

const emits = defineEmits<{
  (e: 'change', data: { path: string[], value: unknown }): void
}>()
</script>
