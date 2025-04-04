<template>
  <div class="main preview-card wg-font number" :style="{ '--percent': `${colorValue}%` }">
    <p class="green">{{ timeLabel }}</p>
    <div class="progress">
      <Bar class="bar" />
      <div class="current" :style="{ top: `calc(${percent * 100}% - 0.5px)` }"></div>
    </div>
    <p class="percent">{{ Math.round(percent * 100) }}%</p>
  </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import Bar from "./reduction-info-old-bar.svg";

const props = defineProps<{
  percent: number,
  time: number,
}>()

const timeLabel = computed(() => {
  if (props.time < 0.01) return 'СВЕДËН'
  return (Math.round(props.time * 10) / 10).toFixed(1) + ' с'
})

const colorValue = computed(() => {
  const value = 1 - (0.9 - props.percent) / (0.1)
  return Math.max(0, Math.min(100, value * 100))
})
</script>


<style lang="scss" scoped>
.main {

  border-radius: 3em;

  p {
    font-size: 6.2em;
    text-align: center;
    font-weight: bold;
    color: white;
    font-variant-numeric: tabular-nums;
    filter: drop-shadow(0 0 0.01em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.03em rgba(0, 0, 0, 1));
  }

  .green {
    color: rgb(83, 255, 41);
  }

  .percent {
    color: color-mix(in srgb, rgb(248, 223, 0), rgba(248, 223, 0, 0.65) var(--percent));
  }

  .progress {
    position: relative;

    .bar {
      margin: 0 4em;
      height: 100%;
      fill: rgb(255, 254, 228);
      opacity: 1;
      filter: drop-shadow(0 0 1em rgba(0, 0, 0, 1)) drop-shadow(0 0 1em rgba(0, 0, 0, 1));
    }

    .current {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);

      height: 1em;
      width: 60%;
      border-radius: 1em;
      background: rgb(247, 255, 230);
      filter: drop-shadow(0 0 1em rgba(0, 0, 0, 1));
    }
  }
}
</style>