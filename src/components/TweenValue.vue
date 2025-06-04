<template>
  <DefineTemplate>
    <slot :value="processed" v-if="slots.default"></slot>
    <template v-else>{{ processed }}</template>
  </DefineTemplate>

  <component :is="tag" v-if="tag">
    <ReuseTemplate />
  </component>
  <ReuseTemplate v-else />
</template>


<script setup lang="ts" generic="T">
import { spaceProcessor } from '@/composition/processors/useSpaceProcessor';
import { TweenOptions, useTweenRef } from '@/composition/tween/useTweenRef';
import { isInPreview } from '@/utils/provides';
import { computed, inject, ref, useSlots, watch } from 'vue';
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const props = defineProps<{
  value: number
  tag?: string
  options?: TweenOptions
  processor?: (value: number) => T
  raw?: boolean
  space?: boolean
  precision?: number
  startAnimationInPreview?: boolean
  disabled?: boolean
}>()

const isPreview = inject(isInPreview, false)
const slots = useSlots()
const value = ref(isPreview && !props.startAnimationInPreview ? props.value : 0)
const tweenValue = useTweenRef(value, props.options)

watch(() => props.value, t => {
  value.value = t
}, { immediate: true })


const displayValue = computed(() => {
  if (props.disabled) return props.value
  return tweenValue.value
})

const processed = computed(() => {

  if ('processor' in props && props.processor)
    return props.processor(displayValue.value)

  const space = 'space' in props && props.space

  if ('precision' in props && Number.isInteger(props.precision)) {
    const val = displayValue.value.toFixed(props.precision)
    return space ? spaceProcessor(val) : val
  }

  if (props.raw) return displayValue.value

  const val = Math.round(displayValue.value)
  return space ? spaceProcessor(val.toString()) : val
})
</script>
