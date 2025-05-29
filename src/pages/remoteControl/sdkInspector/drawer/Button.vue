<template>
  <label>
    <span>{{ title }}</span>
    <button @click="emits('trigger')">Trigger</button>
  </label>
</template>


<script setup lang="ts">
import { useSetStateMap } from './useSetStateMap';

const props = defineProps<{
  title: string
}>()

const emits = defineEmits<{
  (e: 'trigger'): void
}>()

</script>