<template>
  <label>
    <span>{{ path[path.length - 1] }}</span>
    <Select v-model="value"
      :variants="meta.meta.variants.map(value => typeof value == 'string' ? { value: value } : value)"
      :align="'left'" />
  </label>
</template>

<script setup lang="ts">
import Select from '@/components/Select.vue';

type Meta = { drawer: string; meta: { variants: string[]; } }

const props = defineProps<{
  meta: Meta
  path: string[]
}>()

const value = defineModel<string>('value', { required: true })
</script>