<template>
  <InsetsWrapper :insets class="edge-mask">
    <div class="main wg-font number">
      <p class="title" v-if="title">{{ title }}</p>
      <div class="chart">
        <svg :viewBox="`0 0 ${targetWidth} 100`">
          <path :d="path" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="current-value" :style="{ top: `${100 - 100 * (value - minValue) / (maxValue - minValue)}%` }">
          <div class="circle"></div>
          <p class="label" v-if="displayValue">
            {{ (Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision) }}
          </p>
        </div>
      </div>
    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import { computed } from 'vue';


const props = defineProps<{
  value: number,
  history: number[],
  defaultMax: number,
  precision: number,
  title?: string,
  displayValue?: boolean,
}>()

const height = 100;
const targetWidth = computed(() => props.history.length > 200 ? 200 : 100)
const maxValue = computed(() => 0.1 + Math.max(...props.history, props.defaultMax))
const minValue = computed(() => -0.3)

const insets = computed(() => {
  if (props.displayValue === false) return 10
  if (props.precision === 1) return { left: 10, right: 15, top: 10, bottom: 10 }
  return { left: 10, right: 17, top: 10, bottom: 10 }
})

const path = computed(() => {
  const data = props.history;
  const width = targetWidth.value;

  if (data.length === 0) return "";
  const step = width / (data.length - 1);

  let path = "";
  data.forEach((value, index) => {
    const normalized = (value - minValue.value) / (maxValue.value - minValue.value);
    const x = index * step;
    const y = height - normalized * height;
    path += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;

  });

  return path;
})

// const timeLabel = computed(() => {
//   return (Math.round(props.time * 10) / 10).toFixed(1)
// })
</script>


<style lang="scss" scoped>
.main {
  border-radius: 2em;
  position: relative;

  .title {
    line-height: 1;
    margin-bottom: 0.3em;
    font-size: min(15px, 2em);
    color: white;
    filter: drop-shadow(0 0 0.3em rgba(0, 0, 0, 1));
  }

  &::before {
    content: '';
    position: absolute;
    inset: -0.5em;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    filter: blur(1.2em);
  }

  .chart {
    position: relative;
    margin-right: 0em;

    svg {
      filter: drop-shadow(0 0 0.3em rgba(0, 0, 0, 0.2));
      display: block;
      border-radius: 1em;
      overflow: hidden;
      border: max(1px, 0.1em) solid rgba(255, 255, 255, 0.4);
      filter: drop-shadow(0 0 0.3em rgba(0, 0, 0, 0.5));
    }

    .current-value {
      right: 0.15em;
      position: absolute;
      display: flex;
      align-items: center;
      transform: translate(100%, -56%);
      gap: 0.5em;

      .circle {
        width: 1em;
        height: 0.5em;
        border-radius: 1em;
        background-color: rgb(255, 255, 255);
        filter: drop-shadow(0 0 0.2em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.1em rgba(0, 0, 0, 1));
      }

      .label {
        line-height: 1;
        font-size: min(18px, 2em);
        font-weight: bold;
        color: white;
        font-variant-numeric: tabular-nums;
        filter: drop-shadow(0 0 0.2em rgba(0, 0, 0, 1)) drop-shadow(0 0 0.1em rgba(0, 0, 0, 1));
      }
    }
  }
}
</style>