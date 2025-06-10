<template>
  <label class="line">
    <p>{{ label }}</p>
    <input type="checkbox" v-model="value">
  </label>
</template>


<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const value = defineModel<boolean>({ required: true })
</script>


<style lang="scss" scoped></style>