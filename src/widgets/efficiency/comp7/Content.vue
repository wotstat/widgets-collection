<template>
  <InsetsWrapper :insets="insets" :edge-mask="edgeMask">
    <div class="main preview-card">
      <div class="flex">
        <img :src="RankTabHighlight" class="highlight-hide-icon" v-if="hideIcon">
        <img :src="RankTabHighlight" class="highlight" v-if="!hideIcon">
        <img class="rank" :src="currentImage" v-if="!hideIcon">
        <p class="current-rank wg-font">
          <TweenValue :value="props.currentRank" />
        </p>
        <div class="history wg-font">
          <TransitionGroup :name="isInPreview ? 'list-preview' : 'list'">
            <div class="line flex" v-for="line in history" :key="line.arena + '_' + line.delta">
              <p class="name flex-1">{{ line.arena }}</p>
              <p class="delta" :class="{
                'positive': line.delta > 0,
                'negative': line.delta < 0
              }">
                <span class="sign">{{ line.delta < 0 ? '-' : '+' }}</span>
                    <span class="value">{{ Math.abs(line.delta) }}</span>
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
import { preloadImage } from '@/utils/preload';
import { isInPreview as isInPreviewKey } from '@/utils/provides';


const ranks = import.meta.glob<{ default: string }>('./assets/rank/*.png', { eager: true });
const isInPreview = inject(isInPreviewKey, false);

const ranksMap = {
  1: 'first_E',
  80: 'first_D',
  160: 'first_C',
  240: 'first_B',
  320: 'first_A',
  400: 'second_E',
  480: 'second_D',
  560: 'second_C',
  640: 'second_B',
  720: 'second_A',
  800: 'third_E',
  880: 'third_D',
  960: 'third_C',
  1040: 'third_B',
  1120: 'third_A',
  1200: 'fourth_E',
  1280: 'fourth_D',
  1360: 'fourth_C',
  1440: 'fourth_B',
  1520: 'fourth_A',
  1600: 'fifth_logo'
}

const props = defineProps<Props>()

function imageForRank(rank: number) {
  const key = Object.keys(ranksMap).reverse().find(key => rank >= parseInt(key));
  if (!key) return ranks[`./assets/rank/qualification.png`].default
  const value = ranksMap[key as unknown as keyof typeof ranksMap];
  return ranks[`./assets/rank/${value}.png`].default;
}

const currentImage = computed(() => imageForRank(props.currentRank));

watch(currentImage, () => {
  preloadImage(imageForRank(props.currentRank + 80))
})

const insets = computed(() => {
  if (props.hideIcon) return { top: 20, bottom: 5, left: 10, right: 10 }
  return { top: 5, bottom: 5, left: 10, right: 10 }
})

const edgeMask = computed(() => {
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


  &::after {
    content: '';
    position: absolute;
    inset: -100%;
    z-index: 0;
  }

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

    &::before {
      content: '';
      position: absolute;
      inset: 0.5em;
      background: rgba(0, 0, 0, 0.1);
      filter: blur(1em);
      z-index: -1;
    }

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
}
</style>