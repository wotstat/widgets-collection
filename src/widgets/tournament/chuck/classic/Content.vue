<template>
  <InsetsWrapper :insets="props.skin == 'transparent' ? 12 : 0" class="edge-mask"
    :class="{ ...classes, [`style-${props.skin ?? 'default'}`]: true }">
    <div class="main center">
      <WidgetCard class="main-card">
        <div class="line header">
          <p class="name"></p>
          <p class="avg">{{ t('avg-title') }} ({{ battlesCount }})</p>
          <p class="last">{{ t('last-battle') }}</p>
        </div>
        <div class="players">
          <div class="line" v-for="player in players">
            <p class="name">{{ player.name }}</p>
            <p class="accent number">
              <TweenValue :value="player.avg" space :options="{ duration: 500 }" />
            </p>
            <p class="number">
              <TweenValue :value="player.last" space :options="{ duration: 500 }" />
            </p>
          </div>
        </div>
        <div class="line footer"></div>
      </WidgetCard>

      <WidgetCard class="total-card">
        <div class="line total">
          <p class="name">{{ t('total') }}</p>
          <p class="avg accent number">
            <TweenValue :value="totalAvg" space :options="{ duration: 500 }" />
          </p>
          <p class="last number">
            <TweenValue :value="totalLast" space :options="{ duration: 500 }" />
          </p>
        </div>
      </WidgetCard>
    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import TweenValue from '@/components/TweenValue.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { useI18nRef } from '@/composition/useI18n';
import i18n from './i18n.json';
import { Props } from './define.widget';

const { t } = useI18nRef(i18n);

const classes = useStateClass()
const props = defineProps<Props>()

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.2em;
  line-height: 1.2;

  .main-card {
    padding: 0.3em 0.8em;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }

  .total-card {
    margin-top: 0.3em;
    padding: 0.2em 0.8em;

    .name {
      font-weight: bold;
    }

    .number {
      font-size: 1.2em;
      font-weight: 900;
    }

    .total {
      align-items: center;
    }
  }

  .header {
    white-space: nowrap;

    p {
      font-weight: 400;
    }

    .avg,
    .last {
      font-size: 0.8em;
    }
  }

  .name {
    text-align: left;
    min-width: 7em;
    max-width: 7em;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .line {
    display: flex;

    p {
      flex: 1;
    }
  }


  .players {
    display: flex;
    flex-direction: column;
    gap: 0.2em;

    .name {
      text-align: left;
      font-weight: normal;
    }

    p {
      text-align: center;
      font-weight: 900;
    }
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
      opacity: 0.3;
      position: absolute;
      inset: -0.5em;

      filter: blur(1em);
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
        inset: 0.8em 0 0 0;
        border: max(1px, 0.07em) solid rgba(255, 255, 255, 0.25);
        border-radius: 1em;
      }

      &.main-card {
        &::after {
          clip-path: polygon(0% 0%,
              7.5em 0%,
              7.5em 10%,
              calc(100% - 1.3em) 10%,
              calc(100% - 1.3em) 0%,
              100% 0%,
              100% 100%,
              0% 100%,
              0% 0%);
        }
      }
    }

    .card.total-card {
      &::after {
        inset: 0;
      }
    }
  }
}
</style>