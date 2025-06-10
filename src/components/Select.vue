<template>
  <select v-model="value" @pointerdown="pointerDown" ref="element">
    <option v-for="variant in variants" :key="variant.value" :value="variant.value">
      {{ variant.label || variant.value }}
    </option>
  </select>
</template>


<script setup lang="ts" generic="T extends PropertyKey">
import { computed, ref } from 'vue';
import { options, simpleContextMenu } from './contextMenu/simpleContextMenu';

const element = ref<HTMLSelectElement | null>(null)

const props = defineProps<{
  variants: { value: T, label?: string }[] | [T, string][]
  offsetX?: number
  offsetY?: number
  align?: 'left' | 'right' | 'center'
}>()

const value = defineModel<T>({ required: true })

const variants = computed(() => {
  if (props.variants.length === 0) return []

  if (typeof props.variants[0] === 'object') {
    return props.variants as { value: T, label?: string }[]
  } else {
    return (props.variants as [T, string][]).map(([value, label]) => ({ value, label })) as { value: T, label?: string }[]
  }
})


function pointerDown(event: PointerEvent) {
  if (!element.value) return;
  if (event.pointerType == 'touch') return;


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
    ...options(value, variants.value.map(variant => ({
      key: variant.value,
      label: variant.label ?? String(variant.value)
    }))),
  ])
}
</script>


<style lang="scss" scoped></style>