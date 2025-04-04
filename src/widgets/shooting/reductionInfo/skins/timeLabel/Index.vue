<template>
  <div class="main preview-card wg-font number">
    <p class="center" v-if="props.time < 0.01">СВЕДËН</p>
    <p class="label" v-else>
      <ForceMono :value="timeLabel.split('.')[0]" />
      <span class="dot">.</span>
      <ForceMono :value="timeLabel.split('.')[1]" />
    </p>

  </div>
</template>


<script setup lang="ts">
import ForceMono from '@/components/ForceMono.vue';
import { computed } from 'vue';

const props = defineProps<{
  time: number,
}>()

const timeLabel = computed(() => {
  return (Math.round(props.time * 10) / 10).toFixed(1)
})
</script>


<style lang="scss" scoped>
.main {
  border-radius: 2em;
}

p {
  font-size: 7em;
  line-height: 1;
  text-align: center;
  font-weight: bold;
  color: white;
  font-variant-numeric: tabular-nums;
  filter: drop-shadow(0 0 0.01em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1));

  --char-width: 0.49em;
}
</style>