<template>
  <div class="line">
    <p>{{ label }}</p>
    <input type="checkbox" v-model="value">
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const value = defineModel<boolean>()
</script>


<style lang="scss" scoped></style>