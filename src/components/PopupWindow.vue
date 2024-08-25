<template>
  <Teleport to="body">
    <div class="popup-container">
      <div class="card flex ver">
        <XImg class="close" @click="emit('close')" />
        <h2 class="title">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import XImg from "@/assets/icons/x.svg";

const props = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

onMounted(() => {
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onKey);
});

onUnmounted(() => {
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onKey);
});

function onKey(params: KeyboardEvent) {
  if (params.key == 'Escape') {
    emit('close');
  }
}


</script>

<style>
.no-scroll {
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
// @import "@/styles/mixins.scss";

.popup-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  pointer-events: all;
  max-width: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .card {
    margin: 40px;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #393939;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.1);

    position: relative;
    width: 100%;
    max-width: 800px;

    h2.title {
      margin: 0;
      font-size: 2em;
      line-height: 1.2;
      margin-right: 40px;
      margin-top: -0.3em;
    }

    @media screen and (max-width: 800px) {
      margin: 0;
      width: 100%;
      margin-top: 50px;
      height: 100%;
      max-height: 100%;
      border-end-end-radius: 0;
      border-end-start-radius: 0;
    }

    .close {
      position: absolute;
      background-color: #8181813e;
      border-radius: 50%;
      padding: 8px;
      fill: currentColor;
      cursor: pointer;
      width: 30px;

      top: 15px;
      right: 15px;

      &:hover {
        background-color: #8181815e;
      }
    }
  }


}
</style>