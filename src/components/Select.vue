<template>
  <select v-model="value" @pointerdown="pointerDown" ref="element">
    <option v-for="variant in variants" :key="variant.value" :value="variant.value">
      {{ (variant.label || variant.value).toString().split('/').at(-1) }}
    </option>
  </select>
</template>


<script setup lang="ts" generic="T extends PropertyKey">
import { computed, ref } from 'vue';
import { simpleContextMenu, childs, SimpleContextMenuItem, checkboxItem } from './contextMenu/simpleContextMenu';

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


  function unwrapSubitems(variants: { value: any, label: string }[], currentPath: string = ''): SimpleContextMenuItem[] {
    if (variants.length === 0) return []

    let result: SimpleContextMenuItem[] = []

    const notAddedVariants = new Set(variants)

    while (notAddedVariants.size > 0) {
      const variant = notAddedVariants.values().next().value!
      notAddedVariants.delete(variant)

      const label = variant.label.slice(currentPath.length)
      const [current, ...rest] = label.split('/')

      if (rest.length === 0) {
        result.push(checkboxItem(label, {
          value: computed(() => value.value === variant.value),
          toggle: () => value.value = variant.value
        }))
      } else {
        const prefix = currentPath + current + '/'
        const childsVariants = [...notAddedVariants.values()].filter(t => t.label.startsWith(prefix))
        childsVariants.forEach(t => notAddedVariants.delete(t))
        const subitems = unwrapSubitems([variant, ...childsVariants], prefix)
        if (subitems.length > 0) result.push(childs(current, subitems))
      }
    }

    return result
  }

  const normalizedVariants = variants.value.map(t => typeof t == 'string' ? { value: t, label: t } : { value: t.value, label: t.label ?? String(t.value) })
  const items: SimpleContextMenuItem[] = unwrapSubitems(normalizedVariants)

  simpleContextMenu({
    position: rect,
    minWidth: rect.width,
    alignX: 'center',
    alignY: 'bottom',
  }, items)
}
</script>


<style lang="scss" scoped></style>