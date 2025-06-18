<template>
  <InsetsWrapper :insets="insets" :edge-mask="edgeMask">
    <div class="main preview-card" :class="{ [`skin-${skin}`]: true, 'hide-icon': hideIcon }">
      <div class="flex">
        <img :src="RankTabHighlight" class="highlight-hide-icon" v-if="hideIcon">
        <img :src="RankTabHighlight" class="highlight" v-if="!hideIcon">
        <img class="rank" :src="currentImage" v-if="!hideIcon">
        <p class="current-rank wg-font">
          <TweenValue :value="props.currentRank" :options="{ duration: 500 }" />
        </p>
        <div class="history wg-font">
          <TransitionGroup :name="isInPreview ? 'list-preview' : 'list'">
            <div class="line flex" v-for="line in history" :key="line.key">
              <p class="name flex-1">{{ line.arena }}</p>
              <p class="delta" :class="{
                'positive': line.delta > 0,
                'negative': line.delta < 0
              }">
                <template v-if="line.delta != 0 || line.result == undefined">
                  <span class="sign">{{ line.delta < 0 ? '-' : '+' }}</span>
                      <span class="value">{{ Math.abs(line.delta) }}</span>
                </template>
                <Battles v-else :class="line.result" class="result-icon" />
              </p>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { computed, inject, watch } from 'vue';
import { type Props } from "./define.widget";
import InsetsWrapper from "@/components/InsetsWrapper.vue";

import RankTabHighlight from "./assets/rankTabHighlight.png";
import Battles from "./assets/battles.svg";
import { preloadImage } from '@/utils/preload';
import { isInPreview as isInPreviewKey } from '@/utils/provides';


const ranksLesta = import.meta.glob<{ default: string }>('./assets/rank-lesta/*.png', { eager: true });
const ranksWg = import.meta.glob<{ default: string }>('./assets/rank-wg/*.png', { eager: true });
const isInPreview = inject(isInPreviewKey, false);

const ranksLestaMap = {
  1: 'first_E',
  80: 'first_D',
  160: 'first_C',
  240: 'first_B',
  320: 'first_A',
  400: 'second_E',
  500: 'second_D',
  600: 'second_C',
  700: 'second_B',
  800: 'second_A',
  900: 'third_E',
  1050: 'third_D',
  1200: 'third_C',
  1350: 'third_B',
  1500: 'third_A',
  1650: 'fourth_E',
  1850: 'fourth_D',
  2050: 'fourth_C',
  2250: 'fourth_B',
  2450: 'fourth_A',
  2650: 'fifth_logo'
}

const rankWgMap = {
  1: 'first_E',
  100: 'first_D',
  200: 'first_C',
  300: 'first_B',
  400: 'first_A',
  500: 'second_E',
  600: 'second_D',
  700: 'second_C',
  800: 'second_B',
  900: 'second_A',
  1000: 'third_E',
  1100: 'third_D',
  1200: 'third_C',
  1300: 'third_B',
  1400: 'third_A',
  1500: 'fourth_E',
  1600: 'fourth_D',
  1700: 'fourth_C',
  1800: 'fourth_B',
  1900: 'fourth_A',
  2000: 'fifth_logo'
}

const props = defineProps<Props>()

function imageForRank(rank: number) {
  const isLesta = props.game == 'lesta';

  const rankImage = isLesta ? ranksLesta : ranksWg;
  const rankImagePrefix = isLesta ? './assets/rank-lesta' : './assets/rank-wg';

  const key = Object.keys(isLesta ? ranksLestaMap : rankWgMap).reverse().find(key => rank >= parseInt(key));
  if (!key) return rankImage[`${rankImagePrefix}/qualification.png`].default

  const value = isLesta ? ranksLestaMap[key as unknown as keyof typeof ranksLestaMap] : rankWgMap[key as unknown as keyof typeof rankWgMap];
  return rankImage[`${rankImagePrefix}/${value}.png`].default;
}

const currentImage = computed(() => imageForRank(props.currentRank));

watch(currentImage, () => {
  preloadImage(imageForRank(props.currentRank + (props.game == 'lesta' ? 80 : 100)));
})

const insets = computed(() => {
  if (props.skin == 'default') return 0
  if (props.hideIcon) return { top: 20, bottom: 5, left: 10, right: 10 }
  return { top: 5, bottom: 5, left: 10, right: 10 }
})

const edgeMask = computed(() => {
  if (props.skin == 'default') return 0
  if (props.hideIcon) return { top: 10, bottom: 5, left: 10, right: 10 }
  return { top: 5, bottom: 5, left: 10, right: 10 }
})


</script>


<style lang="scss" scoped>
.preview-card {
  border-radius: 1em;
}

.main {
  font-size: 1.9em;
  position: relative;
  padding: 0 0.3em;
  color: white;

  >.flex {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .highlight {
    position: absolute;
    opacity: 0.8;
    width: 30em;
    top: -4.5em;
    z-index: 0;
  }

  .highlight-hide-icon {
    position: absolute;
    width: 40em;
    top: -20em;
    z-index: 0;

    mask-image: radial-gradient(circle, black 20%, transparent 58%);
    mask-repeat: no-repeat;
    mask-position: 0% 17em;
  }

  img.rank {
    width: 14em;
    aspect-ratio: 1;
    margin-bottom: -10%;
    position: relative;
    z-index: 10;
  }

  .current-rank {
    font-size: 4em;
    font-weight: bold;
    line-height: 1;
    position: relative;
    z-index: 10;
  }

  .history {
    width: 100%;
    position: relative;

    .line {
      gap: 0.4em;
      font-size: 1.25em;
      align-items: center;
      height: 1.5em;
      white-space: nowrap;
    }

    .name {
      flex: 1;
      text-align: left;
      width: 1em;
    }

    .delta {
      font-size: 1.2em;
      line-height: 0.8;
      font-weight: bold;

      .sign {
        display: inline-block;
        width: 0.6em;
        text-align: center;
        transform: translateY(-0.05em);
      }

      .value {
        display: inline-block;
        width: 1em;
        text-align: right;
      }

      .result-icon {
        width: 2em;
        margin-right: -0.5em;

        &.win {
          color: #f1ffeb;
          filter: drop-shadow(0 0 0.3em #6ab528);
        }

        &.lose {
          color: #fff0f0;
          filter: drop-shadow(0 0 0.3em #e11818);
        }
      }

      &.contrast {
        &.positive {
          color: #34C759;
        }

        &.negative {
          color: #FF3B30;
        }
      }

      &:not(.contrast) {
        &.positive {
          color: #f2ffed;
          filter: drop-shadow(0 0 0.3em #6ab528);
        }

        &.negative {
          color: #fff0f0;
          filter: drop-shadow(0 0 0.3em #e11818);
        }
      }
    }
  }

  &.skin-transparent {
    .history {
      &::before {
        content: '';
        position: absolute;
        inset: 0.5em;
        background: rgba(0, 0, 0, 0.13);
        filter: blur(1em);
        z-index: -1;
      }
    }
  }

  &.skin-default {
    padding: 0.8em 1em;
    font-size: 1.7em;
    overflow: hidden;

    &:not(.hide-icon) {
      padding-top: 0.3em;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0em;
      background: var(--wotstat-background);
      border-radius: 1em;
      z-index: -1;
    }
  }


  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from {
    opacity: 0;
    transform: translateY(-1em);
  }

  .list-leave-to {
    opacity: 0;
  }

  .list-leave-active {
    position: absolute;
    width: 100%;
  }
}
</style>