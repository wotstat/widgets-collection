<template>
  <div class="main preview-card wg-font number" :style="{ '--percent': `${percentProgress}%` }" :class="{
    'green': percent > 0.85,
    'orange': percent > 0.5 && percent <= 0.85,
    'red': percent <= 0.5,
  }">
    <p>{{ timeLabel }}</p>
    <div class="progress">
      <div class="bar">
        <Bar />
        <BarRed v-if="percent < 0.5" class="bar-value" />
        <BarOrange v-else-if="percent < 0.85" class="bar-value" />
        <BarGreen v-else class="bar-value" />
      </div>
    </div>
    <p>{{ Math.round(percent * 100) }}%</p>
  </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import Bar from './reduction-info-new-bar.svg';
import BarGreen from './reduction-info-new-bar-green.svg';
import BarOrange from './reduction-info-new-bar-orange.svg';
import BarRed from './reduction-info-new-bar-red.svg';

const props = defineProps<{
  percent: number,
  time: number,
}>()

const timeLabel = computed(() => {
  if (props.time < 0.01) return 'СВЕДËН'
  return (Math.round(props.time * 10) / 10).toFixed(1) + ' с'
})

const percentProgress = computed(() => {
  return 100 - Math.max(0, Math.min(100, props.percent * 100))
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

  .progress {
    .bar {
      margin: 0 10.5em;
      height: 100%;
      position: relative;

      .bar-value {
        height: 100%;
        position: absolute;
        inset: 0;

        mask: linear-gradient(to bottom, transparent var(--percent), black 0%);
      }
    }
  }

  &.green p {
    color: #9bc81f;
  }

  &.orange p {
    color: #EDB529;
  }

  &.red p {
    color: #f73f35;
  }
}
</style>