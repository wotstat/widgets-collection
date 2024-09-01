<template>
  <div class="line">
    <p>{{ label }}</p>
    <select v-model="value">
      <option v-for="variant in props.variants" :value="variant.value">{{ variant.label }}</option>
    </select>
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  label: string
  variants: { value: string, label: string }[]
}>()

const value = defineModel<string>()
</script>


<style lang="scss" scoped></style>