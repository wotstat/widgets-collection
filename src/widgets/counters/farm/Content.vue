<template>
  <InsetsWrapper :insets="props.skin == 'transparent' ? 12 : 0" class="edge-mask" :class="{
    ...classes,
    [`style-${props.skin ?? 'default'}`]: true,
    'title-hidden': props.hideTitle,
  }">
    <div class="main center">
      <WidgetCard class="main-card">
        <h1 v-if="!props.hideTitle">УЖЕ НАФАРМЛЕНО</h1>
        <p class="accent number total-farm" :class="{
          'big': tweenValue < 1e8
        }">
          <span v-for="(part, i) in spacedValue" :key="i">{{ part }}</span>
        </p>
        <div class="info-line">

          <div class="badge" v-if="props.lastBattle">
            Последний бой:
            <span class="number">
              <TweenValue :value="props.lastBattleValue" space />
            </span>
          </div>

          <div class="badge" v-if="props.totalBattles">
            Боёв:
            <span class="number">
              <TweenValue :value="props.totalBattlesValue" space />
            </span>
          </div>

          <div class="badge" v-if="props.timeInBattles">
            Время в боях:
            <span class="number">
              <TweenValue :value="props.timeInBattlesValue" :processor="timeProcessor" />
            </span>
          </div>

          <div class="badge" v-if="props.averagePerBattle">
            За бой:
            <span class="number">
              <TweenValue :value="props.averagePerBattleValue" space />
            </span>
          </div>


          <div class="badge" v-if="props.averagePerHour">
            За час:
            <span class="number">
              <TweenValue :value="props.averagePerHourValue" space />
            </span>
          </div>

        </div>
      </WidgetCard>
    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue'
import TweenValue from '@/components/TweenValue.vue'
import WidgetCard from '@/components/WidgetCard.vue'
import { spaceProcessor } from '@/composition/processors/useSpaceProcessor'
import { useTweenRef } from '@/composition/tween/useTweenRef'
import { useStateClass } from '@/composition/utils/useStateClass'
import { computed, toRef } from 'vue'
import { type SettingsProps } from './define.widget'

const classes = useStateClass()
const props = defineProps<SettingsProps & {
  value: number,
  lastBattleValue: number,
  totalBattlesValue: number,
  timeInBattlesValue: number,
  averagePerBattleValue: number,
  averagePerHourValue: number,
}>()


const tweenValue = useTweenRef(toRef(props, 'value'))
const spacedValue = computed(() => {
  const val = Math.round(tweenValue.value)
  return spaceProcessor(val.toString()).split(' ')
})

function timeProcessor(value: number) {
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
</script>


<style lang="scss" scoped>
.main {
  font-size: 1.9em;
  line-height: 1.2;

  .main-card {
    padding: 0.6em;
    border-radius: 0.8em;
  }

  h1 {
    font-weight: 900;
    font-size: 1em;
  }

  .total-farm {
    font-size: 1.6em;
    font-weight: 900;
    letter-spacing: -0.05em;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 0.3em;

    &.big {
      font-size: 1.95em;
    }
  }

  .info-line {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em 0.3em;
    margin-top: 0.5em;

    font-size: 0.55em;

    &:not(:has(:nth-child(1))) {
      margin-top: 0;
    }

    .badge {
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 20em;
      padding: 0.2em 0.5em;

      span {
        font-weight: bold;
        color: rgb(227, 227, 227);
      }
    }
  }
}

.style-semi-transparent {
  .main {
    .main-card {
      padding: 0.5em;
      background-color: rgba(25, 25, 25, 0.615);
      border: max(1px, 0.03em) solid rgba(255, 255, 255, 0.1);

      .badge {
        background-color: rgba(255, 255, 255, 0.08);
      }
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

    .main-card {
      padding: 0.5em;

      .info-line {
        .badge {
          background-color: rgba(0, 0, 0, 0.3);
          border: max(1px, 0.03em) solid rgba(255, 255, 255, 0.1);

          span {
            color: white;
          }
        }
      }
    }

    &::before {
      z-index: -1;
      content: '';
      background: radial-gradient(ellipse closest-corner, rgb(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.6) 80%);
      opacity: 0.35;
      position: absolute;
      inset: -0.5em;

      filter: blur(0.5em);
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
        border-radius: 0.8em;
      }
    }
  }
}

.title-hidden {
  .main {
    .main-card {
      &:has(.info-line > *) {
        padding-top: 0.3em;
      }
    }
  }
}
</style>