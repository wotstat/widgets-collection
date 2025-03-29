<template>
  <InsetsWrapper :insets="props.skin == 'transparent' ? 12 : 0" class="edge-mask"
    :class="{ ...classes, [`style-${props.skin ?? 'default'}`]: true }">
    <div class="main center">
      <WidgetCard class="main-card">
        <div>
          <h1 class="title primary" v-if="title">УКРАДЕНО</h1>
          <p class="counter accent number" v-if="!percent">
            <TweenValue :value="miss" />
            <span>/</span>
            <TweenValue :value="total" />
          </p>
          <p class="counter percent accent number" v-else>
            <TweenValue :value="percentValue" :precision="2" v-slot="{ value }">{{ value }}%
            </TweenValue>
          </p>
        </div>
      </WidgetCard>
    </div>
  </InsetsWrapper>

</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import TweenValue from '@/components/TweenValue.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { computed } from 'vue';

const classes = useStateClass()
const props = defineProps<{
  title?: boolean
  miss: number
  total: number
  percent?: boolean
  skin: 'transparent' | 'default'
}>();

const percentValue = computed(() => props.total > 0 ? props.miss / props.total * 100 : 0);

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

.percent {
  font-size: 5.5em;
}

.style-transparent {
  &.edge-mask {
    mask-image:
      linear-gradient(to right, transparent, black 1.5em, black calc(100% - 1.5em), transparent),
      linear-gradient(to bottom, transparent, black 1.5em, black calc(100% - 1.5em), transparent);
    mask-composite: intersect;
  }

  &.is-in-mini-preview>.main>.card::after {
    border: max(0.5px, 0.03em) solid rgba(255, 255, 255, 0.25);
  }

  .main {
    position: relative;

    &::before {
      z-index: -1;
      content: '';
      background: radial-gradient(ellipse closest-corner, rgb(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.6) 80%);
      opacity: 0.35;
      position: absolute;
      inset: -0.4em;

      filter: blur(1.8em);
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
        inset: 0em;
        border: max(1px, 0.03em) solid rgba(255, 255, 255, 0.25);
        border-radius: 1em;
      }
    }
  }
}
</style>