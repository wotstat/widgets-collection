<template>
  <InsetsWrapper :insets="insets" :edge-mask="edgeMask">
    <div class="main preview-card" :class="{ [`skin-${skin}`]: true, 'hide-icon': hideIcon }">
      <div class="flex">
        <img :src="RankTabHighlight" class="highlight-hide-icon" v-if="hideIcon">
        <img :src="RankTabHighlight" class="highlight" v-if="!hideIcon">
        {{ rank }}
        <RankIcon class="rank" :game="props.game == 'lesta' ? 'mt' : 'wot'" :rank :size="'large'" v-if="!hideIcon" />
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
import TweenValue from '@/components/TweenValue.vue'
import { computed, inject, watch } from 'vue'
import { type Props } from './define.widget'
import InsetsWrapper from '@/components/InsetsWrapper.vue'

import RankTabHighlight from './assets/rankTabHighlight.png'
import Battles from './assets/battles.svg'
import { preloadImage } from '@/utils/preload'
import { isInPreview as isInPreviewKey } from '@/utils/provides'
import RankIcon from '@/components/comp7/rank/RankIcon.vue'
import { rankImageUrl } from '@/components/comp7/utils'

const isInPreview = inject(isInPreviewKey, false)

const props = defineProps<Props>()

const rank = computed(() => {
  if (props.eliteRating) return { value: props.currentRank, eliteRating: props.eliteRating }
  return props.currentRank
})

const currentRankImage = computed(() => rankImageUrl(rank.value, 'large', props.game == 'lesta' ? 'mt' : 'wot'))
watch(currentRankImage, () => {
  const step = props.game == 'lesta' ? 80 : 100
  const nextRank = typeof rank.value === 'number' ? rank.value + step : { value: rank.value.value + step, eliteRating: rank.value.eliteRating }
  const prevRank = typeof rank.value === 'number' ? rank.value - step : { value: rank.value.value - step, eliteRating: rank.value.eliteRating }
  preloadImage(rankImageUrl(nextRank, 'large', props.game == 'lesta' ? 'mt' : 'wot'))
  preloadImage(rankImageUrl(prevRank, 'large', props.game == 'lesta' ? 'mt' : 'wot'))
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