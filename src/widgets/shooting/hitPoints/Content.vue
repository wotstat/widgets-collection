<template>
  <div class="main preview-drop-shadow" :class="circleBackground ? 'circleBackground' : 'card'">
    <svg>
      <circle class="main-circle" cx="50%" cy="50%" r="49.75%" :class="showCircle ? 'stroke' : ''" />
      <line x1="45%" y1="50%" x2="55%" y2="50%" v-if="showCenter" />
      <line x1="50%" y1="45%" x2="50%" y2="55%" v-if="showCenter" />
      <TransitionGroup name="hit">
        <circle v-for="(item, i) in values" :key="`${item.r}-${item.theta}`" class="shadow hit-point" :class="{
          'last': i === values.length - 1,
        }" :cx="polarToDec(item).x * 99 + '%'" :cy="polarToDec(item).y * 99 + '%'" />
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

    line {
      stroke: #8c8c8c;
      stroke-width: 0.3%;
    }

    .hit-point {
      fill: #ffffff;

      r: 0.8%;

      &.shadow {
        filter: drop-shadow(0 0 5px rgb(0, 0, 0));
      }

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