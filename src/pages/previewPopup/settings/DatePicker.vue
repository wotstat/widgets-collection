<template>
  <div class="line">
    <p>{{ label }}</p>
    <input type="date" v-model="modelValue">
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const modelValue = defineModel<string>({ required: true })
</script>


<style lang="scss" scoped>
input[type="date"] {
  padding: 0px 10px;
  height: 21.5px;
  border-radius: 5px;
  border: 0;
  min-width: 140px;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: #7a7a7a;
  }
}
</style>
