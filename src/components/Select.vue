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
  offsetX?: number
  offsetY?: number
  align?: 'left' | 'right' | 'center'
}>()

const value = defineModel<T>({ required: true })


function pointerDown(event: PointerEvent) {
  if (!element.value) return;

  event.preventDefault();
  event.stopPropagation();

  const rect = element.value.getBoundingClientRect()

  rect.x += props.offsetX ?? 0
  rect.y += props.offsetY ?? 0

  simpleContextMenu({
    position: rect,
    minWidth: rect.width,
    alignX: 'center',
    alignY: 'bottom',
  }, [
    ...options(value, props.variants.map(variant => ({
      key: variant.value,
      label: variant.label ?? String(variant.value)
    }))),
  ])
}
</script>


<style lang="scss" scoped></style>