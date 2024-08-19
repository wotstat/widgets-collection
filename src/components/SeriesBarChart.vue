<template>
  <div class="chart">
    <TransitionGroup name="list">
      <div class="bar" v-for="(bar, index) in values" :style="barStyle(bar, index)" :key="bar.key"></div>
    </TransitionGroup>
  </div>
</template>


<script setup lang="ts">
import { computed, StyleValue } from 'vue';

const props = defineProps<{
  values: {
    key: string,
    value: number
  }[],
  targetCount?: number
  gap?: number
}>()

const maxValue = computed(() => Math.max(...props.values.map((bar) => bar.value)))

function barStyle(bar: { key: string, value: number }, index: number) {
  const width = 100 / (props.targetCount ?? props.values.length)
  const gap = props.gap ?? 5
  return {
    width: `${width - gap}%`,
    top: (100 - 100 * bar.value / maxValue.value) + '%',
    left: `${width * index + gap / 2}%`,
  } as StyleValue
}
</script>


<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  position: relative;

  .bar {
    position: absolute;
    width: 1em;
    background-color: var(--wotstat-accent);
    border-top-right-radius: 0.1em;
    border-top-left-radius: 0.1em;
    bottom: 0;
    transition: top 0.5s ease;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease !important;
}

.list-enter-from {
  opacity: 0;
  top: 100% !important;
}

.list-leave-to {
  opacity: 0;
  left: -5% !important;
}
</style>