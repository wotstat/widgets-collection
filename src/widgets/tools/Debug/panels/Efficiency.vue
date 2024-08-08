<template>

  <h3 class="secondary bold">EFFICIENCY</h3>
  <div class="flex">
    <div class="flex flex-1 ver">
      <Line name="totalDamage" :value="totalDamage" />
      <Line name="totalBlocked" :value="totalBlocked" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-1 ver">
      <Line name="totalAssist" :value="totalAssist" />
      <Line name="totalStun" :value="totalStun" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from '../Line.vue';

defineProps<{
  totalDamage?: number;
  totalBlocked?: number;
  totalAssist?: number;
  totalStun?: number;
}>();
</script>


<style lang="scss" scoped></style>