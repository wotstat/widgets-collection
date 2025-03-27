<template>
  <div class="line">
    <p>{{ label }}</p>
    <input v-model="value">
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const value = defineModel<string>({ required: true })
</script>


<style lang="scss" scoped></style>