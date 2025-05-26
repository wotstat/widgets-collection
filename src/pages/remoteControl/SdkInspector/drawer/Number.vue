<template>
  <label>
    <span>{{ title }}</span>
    <input type="number" v-model.number="value">
  </label>
</template>


<script setup lang="ts">
import { useSetStateMap } from './useSetStateMap';

const props = defineProps<{
  title: string
  mKey?: string
}>()

const value = defineModel<number>({ default: 0 })

useSetStateMap(props.mKey, value);

</script>