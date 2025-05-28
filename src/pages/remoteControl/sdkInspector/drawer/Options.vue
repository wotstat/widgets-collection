<template>
  <label>
    <span>{{ title }}</span>
    <select v-model="value">
      <option v-for="variant in variants" :key="variant" :value="variant">{{ variant }}</option>
    </select>
  </label>
</template>


<script setup lang="ts">
import { inject, ref, Ref, watch } from 'vue';
import { useSetStateMap } from './useSetStateMap';

const props = defineProps<{
  title: string
  mKey?: string
  variants: string[]
}>()

const value = defineModel<string>({ default: '' })

useSetStateMap(props.mKey, value, props.variants);

</script>