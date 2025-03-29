<template>
  <DefineTemplate>
    <TweenValue :value="props.value" />
  </DefineTemplate>

  <InsetsWrapper :insets="props.skin == 'transparent' ? 12 : 0" class="edge-mask"
    :class="{ ...classes, [`style-${props.skin ?? 'default'}`]: true }">
    <div class="main center">
      <WidgetCard class="main-card">
        <p class="primary" v-if="title">Боёв:
          <span class="accent number bold">
            <ReuseTemplate />
          </span>
        </p>
        <p class="accent number bold big" v-else>
          <ReuseTemplate />
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
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const classes = useStateClass()
const props = defineProps<{
  value: number
  title: boolean
  skin: 'transparent' | 'default'
}>()

</script>


<style lang="scss" scoped>
.main {
  font-size: 3em;
  line-height: 1.2;

  .accent {
    font-size: 1.5em;
  }

  .big {
    font-size: 2.5em;
  }


  .main-card {
    padding: 0.4em;
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