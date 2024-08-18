<template>
  <div class="line">
    <p>{{ label }}</p>
    <ColorPicker v-model:pureColor="value" :debounce="0" :lang="'En'" :disable-history="true" :picker-type="'chrome'"
      :format="'hex4'" />
  </div>
</template>


<script setup lang="ts">
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const props = defineProps<{
  label: string
}>()

const value = defineModel<string>()
</script>


<style lang="scss" scoped>
:deep(.vc-color-wrap) {
  height: 20px;
  border-radius: 5px;
  border: 1px solid #858585;
  margin: 0;
}
</style>