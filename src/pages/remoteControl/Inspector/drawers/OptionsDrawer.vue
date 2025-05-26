<template>
  <label>
    <span>{{ path[path.length - 1] }}</span>
    <select v-model="value">
      <option v-for="variant in meta.meta.variants" :key="variant" :value="variant">
        {{ variant }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
type Meta = { drawer: string; meta: { variants: string[]; } }

const props = defineProps<{
  meta: Meta
  path: string[]
}>()


const value = defineModel<string>('value')
</script>

<!-- <style lang="scss" scoped>
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

  select {
    width: 110px;
    border: none;
    border-bottom: solid 1px rgba(129, 129, 129, 0.2431372549);
    padding: 5px;
    border-radius: 5px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style> -->