<template>
  <div class="line">
    <p>{{ label }}</p>
    <ColorPicker v-model:pureColor="value" :debounce="100" :lang="'En'" :disable-history="false" :picker-type="'chrome'"
      :format="'hex4'" />
    <ColorPickerMy v-model="value" />
  </div>
</template>


<script setup lang="ts">
import { ColorPicker } from "vue3-colorpicker";
import ColorPickerMy from "@/components/colorPicker/ColorPicker.vue";
import "vue3-colorpicker/style.css";

const props = defineProps<{
  label: string
}>()

const value = defineModel<string>({
  required: true,
  set(value) {
    return value.replace('#', '')
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

<style lang="scss">
.vc-colorpicker.white {
  background-color: #2a2a2a !important;
  color: #f6f6f6 !important;
  border-radius: 10px;
  border: 1px solid #424242;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);

  .vc-alpha-input,
  .vc-color-input {
    input {
      color: #f6f6f6;
    }
  }

  .vc-saturation {

    border-radius: 5px;

    .vc-saturation__white,
    .vc-saturation__black {
      border-radius: 5px;
    }
  }
}
</style>