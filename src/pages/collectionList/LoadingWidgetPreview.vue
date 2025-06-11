<template>
  <div class="loading"></div>
</template>


<script setup lang="ts">
const props = defineProps<{}>()
</script>


<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(248, 248, 248, 0.188);
  border-radius: 20px;

  $color: rgba(255, 255, 255, 0.1);
  $shine-color: rgba(255, 255, 255, 0.2);
  background: linear-gradient(90deg, $color 8%, $shine-color 20.5%, $color 33%);
  background-size: 200% 100%;
  animation: shine 1.8s infinite linear;
  background-position: 100% 0;

  @keyframes shine {
    to {
      background-position: -100% 0;
    }
  }
}
</style>