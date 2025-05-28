<template>
  <label>
    <span>{{ title }}</span>
    <input type="text" v-model="value">
  </label>
</template>


<script setup lang="ts">
import { useSetStateMap } from './useSetStateMap';

const props = defineProps<{
  title: string
  mKey?: string
}>()

const value = defineModel<string>({ default: '' })

useSetStateMap(props.mKey, value);

</script>