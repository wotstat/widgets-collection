<template>
  <h3 class="secondary bold">HANGAR</h3>
  <div class="flex">
    <div class="flex-2">
      <Line name="BattleMode" :value="hangarBattleMode" />
    </div>
    <div class="vr"></div>
    <div class="flex-1">
      <Line name="InQueue" :value="isInQueue" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from "../Line.vue";

defineProps<{
  hangarBattleMode?: string;
  isInQueue?: boolean;
}>();
</script>


<style lang="scss" scoped></style>