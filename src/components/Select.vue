<template>
  <select v-model="value" @pointerdown="pointerDown" ref="element">
    <option v-for="variant in props.variants" :key="variant.value" :value="variant.value">
      {{ variant.label || variant.value }}
    </option>
  </select>
</template>


<script setup lang="ts" generic="T extends PropertyKey">
import { ref } from 'vue';
import { options, simpleContextMenu } from './contextMenu/simpleContextMenu';

const element = ref<HTMLSelectElement | null>(null)

const props = defineProps<{
  variants: { value: T, label?: string }[]
}>()

const value = defineModel<T>({ required: true })


function pointerDown(event: PointerEvent) {
  if (!element.value) return;

  event.preventDefault();
  event.stopPropagation();

  const rect = element.value.getBoundingClientRect()

  simpleContextMenu({ x: rect.x + rect.width / 2, y: rect.y + rect.height + 7, minWidth: 50 + rect.width }, [
    ...options(value, props.variants.map(variant => ({
      key: variant.value,
      label: variant.label ?? String(variant.value)
    }))),
  ])
}
</script>


<style lang="scss" scoped></style>