<template>
  <label>
    <span>{{ path[path.length - 1] }}</span>
    <input type="checkbox" v-model="value" />
  </label>
</template>

<script setup lang="ts">

type Meta = { drawer: string; /* … */ }

const props = defineProps<{
  meta: Meta
  path: string[]
}>()

const value = defineModel<boolean>('value')
</script>
