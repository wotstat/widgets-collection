<template>
  <div class="main preview-drop-shadow" :class="circleBackground ? 'circleBackground' : 'card'">
    <svg viewBox="0 0 100 100">
      <circle class="main-circle" cx="50%" cy="50%" r="49.75%" :class="showCircle ? 'stroke' : ''" />
      <line x1="45%" y1="50%" x2="55%" y2="50%" v-if="showCenter" />
      <line x1="50%" y1="45%" x2="50%" y2="55%" v-if="showCenter" />
      <TransitionGroup name="hit">
        <template v-for="(item, i) in values" :key="`${item.r}-${item.theta}`">
          <circle v-if="item.r <= 1.01" class="shadow hit-point" :class="i === values.length - 1 ? 'last' : ''"
            :cx="polarToDec(item).x * 99 + '%'" :cy="polarToDec(item).y * 99 + '%'" />

          <polygon v-else class="out-arrow shadow" :class="i === values.length - 1 ? 'last' : ''"
            points="50,2 48.5,5 51.5,5" :style="{
              transform: `rotate(${Math.PI / 2 - item.theta}rad)`,
              transformOrigin: `50% 50%`,
            }" />
        </template>
      </TransitionGroup>
    </svg>
  </div>
</template>


<script setup lang="ts">

const props = defineProps<{
  values: { r: number; theta: number }[]
  showCircle?: boolean
  showCenter?: boolean
  circleBackground?: boolean
}>()

function polarToDec(value: { r: number; theta: number }) {
  const x = (value.r * Math.cos(value.theta) + 1) / 2
  const y = (1 - value.r * Math.sin(value.theta)) / 2
  return { x, y }
}

</script>


<style lang="scss" scoped>
.main {
  aspect-ratio: 1;

  &:not(.card) {
    border-radius: 50%;
  }

  &.circleBackground {
    border-radius: 50%;

    svg {
      .main-circle {
        fill: var(--wotstat-background);
      }
    }
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;

    .main-circle {
      fill: none;
      stroke: none;

      &.stroke {
        stroke: var(--wotstat-accent);
      }

      stroke-width: 0.5%;
    }

    .out-arrow {
      fill: white;
      transition: all 0.3s ease-in-out;
      filter: drop-shadow(0 0 2px rgb(0, 0, 0));

      &.last {
        fill: var(--wotstat-accent);
      }

      &.hit-enter-active,
      &.hit-leave-active {
        transition: all 0.3s ease-in-out;
      }

      &.hit-enter-from,
      &.hit-leave-to {
        opacity: 0;
      }
    }

    line {
      stroke: #8c8c8c;
      stroke-width: 0.3%;
      filter: drop-shadow(0 0 1.5px rgb(0, 0, 0));
    }

    .hit-point {
      fill: #ffffff;
      filter: drop-shadow(0 0 2px rgb(0, 0, 0));
      r: 0.8%;

      &.last {
        fill: var(--wotstat-accent);
        r: 1.2%;
      }

      &.hit-enter-active,
      &.hit-leave-active {
        transition: all 0.3s ease-in-out;
      }

      &.hit-enter-from {
        r: 0%;

        &.last {
          r: 6%;
        }

        opacity: 0;
      }

      &.hit-leave-to {
        opacity: 0;
        r: 0%;
      }
    }
  }
}
</style>