<template>
  <label>
    <span>{{ path[path.length - 1] }}</span>
    <ColorPicker v-model="value" :format="'hex'" class="color-picker" :placement="'bottom-start'" />
  </label>
</template>

<script setup lang="ts">
import ColorPicker from "@/components/colorPicker/ColorPicker.vue";

type Meta = { drawer: string; }

const props = defineProps<{
  meta: Meta
  path: string[]
}>()

const value = defineModel<string>('value', {
  set(value) {
    if (value.length == 8 && value.endsWith('ff')) return `#${value.slice(0, 6)}`;
    return `#${value}`
  }
})
</script>

<style lang="scss" scoped>
.color-picker {
  height: 22.5px;
}
</style>