<template>
  <slot :value="processed" v-if="slots.default"></slot>
  <template v-else>{{ processed }}</template>
</template>


<script setup lang="ts" generic="T">
import { TweenOptions, useTweenRef } from '@/composition/tween/useTweenRef';
import { isInPreview } from '@/utils/provides';
import { computed, inject, ref, useSlots, watch } from 'vue';

const props = defineProps<{
  value: number
  options?: TweenOptions
  processor?: (value: number) => T
  round?: boolean
  precision?: number
  startAnimationInPreview?: boolean
}>()

const isPreview = inject(isInPreview, false)
const slots = useSlots()
const value = ref(isPreview && !props.startAnimationInPreview ? props.value : 0)
const tweenValue = useTweenRef(value, props.options)

watch(() => props.value, t => {
  value.value = t
}, { immediate: true })

const processed = computed(() => {
  if ('processor' in props && props.processor) {
    return props.processor(tweenValue.value)
  } else if ('round' in props && props.round) {
    return Math.round(tweenValue.value)
  } else if ('precision' in props && !Number.isNaN(props.precision)) {
    return tweenValue.value.toFixed(props.precision)
  } else {
    return tweenValue.value
  }
})
</script>
