<template>
  <div class="line">
    <p>{{ label }}</p>
    <ColorPicker v-model="value" />
  </div>
</template>


<script setup lang="ts">
import ColorPicker from "@/components/colorPicker/ColorPicker.vue";

const props = defineProps<{
  label: string
}>()

const value = defineModel<string>({
  required: true,
  set(value) {
    if (value.length == 8 && value.endsWith('ff')) return value.slice(0, 6);
    return value
  }
})
</script>


<style lang="scss" scoped>
:deep(.vc-color-wrap) {
  height: 21.5px;
  border-radius: 5px;
  border: 1px solid #858585;
  margin: 0;
}

:deep(.color-preview) {
  height: 21.5px;
}
</style>
