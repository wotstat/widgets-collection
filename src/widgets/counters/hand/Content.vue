<template>
  <InsetsWrapper :insets="props.skin == 'transparent' ? 12 : 0" class="edge-mask"
    :class="{ ...classes, [`style-${props.skin ?? 'default'}`]: true }">
    <div class="main center">
      <WidgetCard class="main-card">
        <p class="accent number bold big">
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

const classes = useStateClass()
const props = defineProps<{
  value: number,
  skin: 'transparent' | 'default'
}>()

</script>


<style lang="scss" scoped>
.main {
  font-size: 2.5em;
  line-height: 1.2;

  .big {
    font-size: 2.5em;
  }

  .main-card {
    padding: 0.2em;
    border-radius: 0.5em;
  }
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
      inset: 0;

      filter: blur(0.8em);
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
        border-radius: 0.5em;
      }
    }
  }
}
</style>