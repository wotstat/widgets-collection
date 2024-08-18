<template>
  <div class="line">
    <p>{{ label }}</p>
    <input :value="currentText" @input="onChange">
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  label: string,
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [number]
}>()

const currentText = ref(props.modelValue?.toString())

function onChange(e: Event) {
  const target = e.target as HTMLInputElement
  const mainPart = target.value.split(/[^0-9]/)[0]
  target.value = mainPart

  if (target.value === '') {
    emit('update:modelValue', 0)
    currentText.value = ''
    return
  }

  target.value = Number(target.value).toString()
  currentText.value = target.value
  emit('update:modelValue', Number(target.value))
}

watch(() => props.modelValue, (newValue) => {
  if (currentText.value == '' && newValue == 0) return
  currentText.value = newValue.toString()
})
</script>


<style lang="scss" scoped>
input {
  background-color: #1a1a1a;
}
</style>