<template>
  <label>
    <span>{{ title }}</span>
    <input type="checkbox" v-model="value">
  </label>
</template>


<script setup lang="ts">
import { useSetStateMap } from './useSetStateMap';

const props = defineProps<{
  title: string
  mKey?: string
}>()

const value = defineModel<boolean>({ default: false })

useSetStateMap(props.mKey, value);

</script>