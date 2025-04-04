<template>
  <div class="main preview-card wg-font number">
    <p class="center">
      <ForceMono :value="Math.round(percent * 100).toFixed(0)" />%
    </p>
  </div>
</template>


<script setup lang="ts">
import ForceMono from '@/components/ForceMono.vue';



const props = defineProps<{
  percent: number,
}>()

</script>


<style lang="scss" scoped>
.main {
  border-radius: 2em;
}

p {
  font-size: 7em;
  line-height: 1;
  text-align: left;
  font-weight: bold;
  color: white;
  font-variant-numeric: tabular-nums;
  filter: drop-shadow(0 0 0.01em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1));

  &.center {
    text-align: center;
    --char-width: 0.49em;
  }

}
</style>