<template>
  <InsetsWrapper :insets="insets" :edge-mask="edgeMask">
    <div class="main preview-card" :class="{ [`skin-${skin}`]: true }">
      <div class="flex">
        <p class="current-rank wg-font">
          <TweenValue :value="props.currentPercent" :precision="2" :options="{ duration: 500 }" />
        </p>
        <div class="history wg-font">
          <TransitionGroup :name="isInPreview ? 'list-preview' : 'list'">
            <div class="line flex" v-for="line in history" :key="line.key">
              <p class="name flex-1" :style="longNameFix.get(line.arena)">{{ line.arena }}</p>
              <p class="delta" :class="{
                'positive': line.delta > 0,
                'negative': line.delta < 0
              }">
                <span class="sign">{{ line.delta < 0 ? '-' : '+' }}</span>
                    <span class="value">{{ Math.abs(line.delta).toFixed(2) }}</span>
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

import { isInPreview as isInPreviewKey } from '@/utils/provides';


const isInPreview = inject(isInPreviewKey, false);


const props = defineProps<Props>()


const insets = computed(() => {
  if (props.skin == 'default') return 0
  return { top: 20, bottom: 5, left: 10, right: 10 }
})

const edgeMask = computed(() => {
  if (props.skin == 'default') return 0
  return { top: 10, bottom: 5, left: 10, right: 10 }
})

const longNameFix = new Map([['Линия Маннергейма', { letterSpacing: '-0.03em', fontSize: '96%' }]])


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
      font-size: 1.22em;
      align-items: center;
      height: 1.5em;
      white-space: nowrap;
    }

    .name {
      flex: 1;
      text-align: left;
      width: 1em;
      overflow: hidden;
      text-overflow: ellipsis;
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
        width: 1.75em;
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

    &::before {
      content: '';
      position: absolute;
      inset: 0.5em;
      background: rgba(0, 0, 0, 0.13);
      filter: blur(1em);
      z-index: -1;
    }
  }

  &.skin-default {
    padding: 0.8em 1em;
    padding-top: 0.3em;
    font-size: 1.71em;
    overflow: hidden;

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