<template>
  <label>
    <span>{{ path[path.length - 1] }}</span>
    <input type="number" v-model="value" />
  </label>
</template>

<script setup lang="ts">

type Meta = { drawer: string; /* … */ }

const props = defineProps<{
  meta: Meta
  path: string[]
}>()

const value = defineModel<number>('value')
</script>
