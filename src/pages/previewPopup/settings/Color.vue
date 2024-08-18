<template>
  <div class="line">
    <p>{{ label }}</p>
    <input type="color" v-model="value">
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const value = defineModel<string>()
</script>


<style lang="scss" scoped></style>