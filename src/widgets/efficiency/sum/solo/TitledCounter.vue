<template>
  <InsetsWrapper :insets="props.skin == 'transparent' ? insets : 0" class="edge-mask"
    :class="{ ...classes, [`style-${props.skin ?? 'default'}`]: true }">
    <div class="main" :class="title ? '' : 'no-title'">
      <WidgetCard class="main-card">
        <h1 v-if="title" class="title primary">{{ title }}</h1>
        <p class="counter accent number">
          <TweenValue :value space />
        </p>
      </WidgetCard>
    </div>
  </InsetsWrapper>

</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import TweenValue from '@/components/TweenValue.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { computed } from 'vue';

const props = defineProps<{
  title?: boolean | string
  value: number
  skin?: 'transparent' | 'default'
}>();

const classes = useStateClass()

const insets = computed(() => {
  if (props.title) return { top: 8, right: 12, bottom: 12, left: 12, }
  return 13
})


</script>


<style lang="scss" scoped>
.title {
  font-size: 2em;
  text-align: center;
  margin: 0;
  line-height: 1;
  margin-bottom: 0.2em;
}

.counter {
  font-weight: bold;
  font-size: 4em;
  text-align: center;
  margin: 0;
  line-height: 1;
}

.no-title {
  font-size: 1.2em;
}

.style-transparent {
  &.edge-mask {
    mask-image:
      linear-gradient(to right, transparent, black 1.5em, black calc(100% - 1.5em), transparent),
      linear-gradient(to bottom, transparent, black 1.5em, black calc(100% - 1.5em), transparent);
    mask-composite: intersect;
  }

  &.is-in-preview>.main {
    margin-top: 0;
  }

  &.is-in-mini-preview>.main>.card::after {
    border: max(0.5px, 0.07em) solid rgba(255, 255, 255, 0.25);
  }

  .main {
    position: relative;
    margin-top: -0.8em;

    &::before {
      z-index: -1;
      content: '';
      background: radial-gradient(ellipse closest-corner, rgb(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.6) 100%);
      opacity: 0.38;
      position: absolute;
      inset: -0.2em;
      top: 2em;
      filter: blur(2em);
    }

    .card {
      background: transparent;
      border: none;
      box-shadow: none;
      position: relative;

      &::after {
        z-index: 1;
        content: '';
        position: absolute;
        inset: 0.1em;
        border: max(1px, 0.07em) solid rgba(255, 255, 255, 0.25);
        border-radius: 1em;
      }
    }

    &.no-title {
      margin-top: 0;

      &::before {
        top: 0em;
      }
    }

    &:not(.no-title) {

      .main-card {
        &::after {
          inset: 2em 0em 0em 0em;
          clip-path: polygon(0% 0%, 1.5em 0%, 1.5em 10%, calc(100% - 1.5em) 10%, calc(100% - 1.5em) 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
        }
      }
    }
  }
}
</style>