<template>
  <div class="color-preview" :style="{
    backgroundColor: `#${color}`,
  }" @click="showPopup = true" ref="colorPreview"></div>

  <PopoverStyled :target="colorPreview" :display="showPopup" @on-click-outside="showPopup = false" :offset="5"
    :placement="'left'">
    <ColorPickerPopup v-model="color" />
  </PopoverStyled>

</template>


<script setup lang="ts">
import { ref } from 'vue';
import ColorPickerPopup from './ColorPickerPopup.vue';
import PopoverStyled from '../popover/PopoverStyled.vue';

const colorPreview = ref<HTMLElement | null>(null);
const showPopup = ref(false);

const color = defineModel<string>({
  required: false,
})

</script>


<style lang="scss" scoped>
.color-preview {
  height: 1em;
  width: 3em;

  border-radius: 5px;
  border: 1px solid #828282;

  cursor: pointer;
}
</style>