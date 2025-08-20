<template>
  <InsetsWrapper :insets="props.skin != 'default' ? 10 : 0" class="edge-mask" :class="{
    ...classes,
    [`style-${props.skin ?? 'default'}`]: true,
    'bordered': props.border,
  }">
    <div class="main wg-font" :class="{ 'is-in-battle': props.isInBattle }">
      <div class="background" v-if="props.skin == 'dot'">
        <div class="pattern"></div>
      </div>
      <WidgetCard class="main-card">

        <div class="header">
          <div class="line battle">
            <p class="title">{{ t('battle') }}</p>
            <p class="value">{{ spaceProcessor(startedBattlesCount) }}</p>
          </div>

          <div class="line score">
            <p class="title">{{ t('score') }}</p>
            <p class="value">{{ spaceProcessor(score) }}</p>
          </div>
        </div>


        <div class="footer"
          v-if="totalScoreDisplay == 'both' || totalScoreDisplay == 'hangar' && (!isInBattle || isPreview)">
          <div class="line">
            <p class="title">Всего очков</p>
            <p class="value">{{ spaceProcessor(totalScore) }}</p>
          </div>
        </div>

        <div class="players">
          <div class="player" v-for="player in players" :class="{
            'is-dead': player.hp <= 0,
            'disconnected': !player.connected
          }">
            <div class="vehicle">
              <VehicleImage :tag="player.tankTag" :size="'preview'" />
            </div>
            <div class="name">{{ player.name }}</div>
            <div class="score" v-if="player.connected">{{ spaceProcessor(player.score) }}</div>
            <div class="disconnected-icon" v-else>
              <DisconnectedIcon />
            </div>
            <div class="hp">
              <div class="progress" :style="{
                '--health-progress': `${hpPercent(player.hp, player.maxHp) * 100}%`,
                '--health-color': hpColor(player.hp, player.maxHp)
              }">
                <div class="bar"></div>
              </div>
              <div class="info">
                <p class="title">{{ t('hp') }}</p>
                <p class="value">{{ spaceProcessor(player.hp) }}</p>
              </div>
            </div>

            <div class="score total-score">
              <LeftArrowIcon />
              {{ spaceProcessor(battlesCount == 0 ? 0 : Math.round(player.totalScore / battlesCount)) }}
              <RightArrowIcon />
            </div>
          </div>
        </div>

      </WidgetCard>
    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { useI18nRef } from '@/composition/useI18n';
import i18n from './i18n.json';
import { Props } from './define.widget';
import VehicleImage from '@/components/vehicle/VehicleImage.vue';
import { spaceProcessor } from '@/composition/processors/useSpaceProcessor';

import LeftArrowIcon from './assets/left.svg'
import RightArrowIcon from './assets/right.svg'

import DisconnectedIcon from "./assets/disconnect.svg";
import { inject } from 'vue';
import { isInPreview } from '@/utils/provides';

const { t } = useI18nRef(i18n);

const classes = useStateClass()
const props = defineProps<Props>()


const isPreview = inject(isInPreview, false);

function hpPercent(hp: number, maxHp: number) {
  return Math.max(0, Math.min(1, Math.max(0, hp) / maxHp));
}

function hpColor(hp: number, maxHp: number) {
  const percent = hpPercent(hp, maxHp);
  if (hp <= 0) return '#74e115';
  if (percent >= 0.8) return '#62ff34';
  if (percent >= 0.6) return '#dfff3d';
  if (percent >= 0.4) return '#ffdd2c';
  if (percent >= 0.2) return '#f9982b';
  if (percent > 0) return '#f52e21';
}


</script>


<style lang="scss" scoped>
.main {
  font-size: 1.8em;
  line-height: 1.2;

  --secondary-color: rgba(227, 227, 227, 1);

  .main-card {
    padding: 0.8em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border-radius: 1em;
    border: none;

    .footer,
    .header {
      .line {
        flex: 1;

        display: flex;
        align-items: baseline;
        padding: 0;

        .title {
          flex: 1;
          font-size: 0.7em;
          color: var(--secondary-color);
        }

        .value {
          font-weight: bold;
          color: white;
        }
      }
    }

    .header {
      display: flex;

      gap: 1.2em;
      margin-top: -0.4em;

      .line {
        border-bottom: 0.06em solid rgba(255, 255, 255, 0.7);
        padding-top: 0.1em;
        padding-bottom: 0.4em;
      }
    }

    .footer {
      display: flex;

      .line {
        border-bottom: 0.06em solid rgba(255, 255, 255, 0.7);
        padding-top: 0.1em;
        padding-bottom: 0.4em;
      }
    }

    .players {
      display: flex;
      gap: 0.6em;

      .player {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3em;

        .vehicle {
          margin-top: 0.5em;
          width: 3em;
          height: 3em;
          display: flex;
          justify-content: center;
          // display: none;


          img {
            max-height: 100%;
          }

          margin-bottom: 0.3em;
        }

        .name {
          color: var(--secondary-color);
          font-size: 0.7em;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 5.5em;
          margin: 0 -2em;
          font-weight: normal;
          margin-bottom: -0.2em;
        }

        .score {
          font-size: 0.9em;
          margin: 0.1em 0;
          font-weight: bold;
        }

        .total-score {
          font-size: 0.7em;
          font-size: 0.8em;
          font-weight: normal;
          display: flex;
          align-items: center;
          margin: 0;

          svg {
            height: 0.9em;
            fill: currentColor;
            margin: 0 -0.2em;
            margin-bottom: -0.15em;
          }
        }

        .disconnected-icon {
          width: 1em;
          height: 1em;
          margin: 0.13em 0;
        }

        .hp {
          display: flex;
          width: 100%;
          flex-direction: column;

          .progress {
            flex: 1;
            background-color: rgba(177, 177, 177, 0.6);
            min-height: 0.15em;
            width: 100%;
            border-radius: 0.5em;
            overflow: hidden;
            position: relative;

            .bar {
              position: absolute;
              background-color: var(--health-color);
              inset: 0;
              right: calc(100% - var(--health-progress));
            }
          }

          .info {
            display: flex;
            align-items: baseline;
            width: 100%;
            margin-top: 0.3em;

            .title {
              font-size: 0.6em;
              color: var(--secondary-color);
              flex: 1;
            }

            .value {
              font-size: 0.6em;
              color: white;
            }
          }

        }

      }
    }
  }

  &.is-in-battle {
    .player {

      &.is-dead,
      &.disconnected {

        .name,
        .score,
        .hp {
          opacity: 0.5;
        }
      }

      &.disconnected {
        .hp {
          opacity: 0;
        }
      }

      .total-score {
        display: none !important;
      }
    }
  }

  &:not(.is-in-battle) {
    .players {
      .player {
        &.disconnected {

          .name,
          .score {
            opacity: 0.5;
          }
        }

        .hp {
          display: none;
        }
      }
    }
  }
}

.style-transparent,
.style-dot {
  &.bordered {
    .main {
      .card {
        background: transparent;
        border: none;
        box-shadow: none;
        position: relative;

        &::after {
          z-index: 1;
          content: '';
          position: absolute;
          inset: 1.1em 0 0 0;
          border: max(1px, 0.07em) solid rgba(255, 255, 255, 0.3);
          border-radius: 0.5em;
        }

        &.main-card {
          &::after {
            clip-path: polygon(0% 0%,
                0.6em 0%,
                0.6em 10%,
                calc(100% - 0.6em) 10%,
                calc(100% - 0.6em) 0%,
                100% 0%,
                100% 100%,
                0% 100%,
                0% 0%);
          }
        }
      }
    }
  }
}

.style-transparent {
  &.edge-mask {
    mask-image:
      linear-gradient(to right, transparent, black 1em, black calc(100% - 1em), transparent),
      linear-gradient(to bottom, transparent, black 1em, black calc(100% - 1em), transparent);
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
      background: radial-gradient(ellipse closest-corner, rgb(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.5) 70%);
      opacity: 0.4;
      position: absolute;
      inset: -0.3em;
      filter: blur(0.7em);
    }

    .card {
      background: transparent;
      border: none;
      box-shadow: none;
    }

  }
}

.style-dot {
  .main-card {
    background-color: transparent;
  }

  &.edge-mask {
    mask-image:
      linear-gradient(to right, transparent, black 2em, black calc(100% - 2em), transparent),
      linear-gradient(to bottom, transparent, black 2em, black calc(100% - 2em), transparent);
    mask-composite: intersect;
  }

  .main {
    position: relative;

    .background {
      .pattern {
        position: absolute;
        inset: -0em;
        z-index: -1;

        background: radial-gradient(circle, black 20%, transparent 110%);
        border-radius: 1em;
        opacity: 0.4;
        filter: blur(1em);
      }

      &::before {
        content: '';

        position: absolute;
        inset: -3em;
        z-index: -1;

        background: radial-gradient(circle, black 20%, transparent 70%);
        opacity: 0.1;

        mask-repeat: repeat;
        mask-size: 4px;
        mask-image: url(./assets/dot.svg);
      }

    }

  }
}
</style>