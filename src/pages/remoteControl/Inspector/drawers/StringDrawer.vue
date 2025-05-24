<template>
  <label>
    <span>{{ path[path.length - 1] }}</span>
    <input type="text" v-model="value" />
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
type Meta = { drawer: string; /* … */ }

const props = defineProps<{
  meta: Meta
  path: string[]
}>()

const value = defineModel<string>('value')
</script>

<style lang="scss" scoped>
label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 3px;
  border-radius: 5px;

  padding-left: calc(24px + var(--level, 0) * 10px);

  span {
    flex: 1;
  }

  input {
    width: 110px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>