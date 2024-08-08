<template>
  <h3 class="secondary bold">AIMING</h3>
  <div class="flex">
    <div class="flex flex-1 ver">
      <Line name="isAutoAim" :value="isAutoAim" />
      <Line name="ClientDisp" :value="(clientDispersion ?? 0).toFixed(7)" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-1 ver">
      <Line name="isServerAim" :value="isServerAim" />
      <Line name="ServerDisp" :value="(serverDispersion ?? 0).toFixed(7)" />
    </div>
  </div>
  <Line name="IdealDisp" :value="(idealDispersion ?? 0).toFixed(7)" />
</template>


<script setup lang="ts">
import Line from '../Line.vue';

defineProps<{
  isAutoAim?: boolean;
  clientDispersion?: number;
  isServerAim?: boolean;
  serverDispersion?: number;
  idealDispersion?: number;
}>();
</script>


<style lang="scss" scoped></style>