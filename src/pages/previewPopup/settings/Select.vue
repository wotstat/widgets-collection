<template>
  <div class="line">
    <p>{{ label }}</p>
    <Select v-model="value" :variants="props.variants" />
  </div>
</template>


<script setup lang="ts">
import Select from '@/components/Select.vue';

const props = defineProps<{
  label: string
  variants: { value: string, label: string }[]
}>()


const value = defineModel<string>({ required: true })
</script>


<style lang="scss" scoped></style>