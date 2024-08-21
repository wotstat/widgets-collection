<template>
  <div class="line">
    <p>{{ label }}</p>
    <div class="flex">
      <input v-model="value" id="random-string">
      <ReloadIcon class="icon" @click.stop.prevent="generateNewValue" />
    </div>
  </div>
</template>


<script setup lang="ts">
import ReloadIcon from '@/assets/icons/reload.svg';
import { onMounted, ref } from 'vue';
const props = defineProps<{
  label: string
  length: number
}>()

const value = defineModel<string>()

onMounted(() => {
  if (!value.value) generateNewValue()
})

function generateNewValue() {
  value.value = Math.random().toString(36).substring(2, 2 + props.length)
}
</script>


<style lang="scss" scoped>
#random-string {
  max-width: 75.5px;
}

.icon {
  cursor: pointer;
  width: 21.5px;
  height: 21.5px;
  border-radius: 5px;
  padding: 3px;
  margin-left: 3px;
  transition: background-color 0.2s;
  border: 1px solid #858585;
  user-select: none;

  &:hover {
    background-color: #686868;
  }
}
</style>