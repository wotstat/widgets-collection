<template>
  <div class="main preview-drop-shadow" :class="{
    'no-animation': !props.animation,
    'no-gradient': !props.gradient,
    [`style-${props.widgetStyle}`]: true,
  }" :style="{
    '--color-from': `#${props.colorFrom}`,
    '--color-to': `#${props.colorTo}`,
  }">
    <svg xmlns="http://www.w3.org/2000/svg" style="position:absolute" width="0" height="0" viewBox="0 0 0 0">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="`#${props.colorFrom}`" />
          <stop offset="100%" :stop-color="`#${props.colorTo}`" />
        </linearGradient>
      </defs>
    </svg>

    <ClipWrapper>

      <template #overlay>
        <div class="overlay">
          <div class="box"></div>
          <div class="triangle-grid"></div>
          <div class="gradients">
            <div class="triangle t1"></div>
            <div class="triangle t2"></div>
            <div class="triangle t3"></div>
          </div>
        </div>
      </template>

      <div class="lines" ref="lines">
        <div class="title" v-if="shouldShow(showTitle)">
          <p class="gradient min-width">{{ title }}</p>
        </div>

        <div class="line step-info" v-if="shouldShow(periodLine)">
          <ClipContent :root="lines" :svg="SmallTopBack" class="background-image">
            <div class="ice"></div>
          </ClipContent>
          <SmallTopLine class="background-line" />
          <div class="content">
            <p class="gradient uppercase">{{ period }}</p>
            <p class="uppercase">{{ t('score') }} <span class="gradient ">{{ score }}</span></p>
          </div>
        </div>

        <div class="line main-count" v-if="shouldShow(battlesLine)">
          <ClipContent :root="lines" :svg="SmallBottomBack" class="background-image">
            <div class="ice"></div>
          </ClipContent>
          <SmallBottomLine class="background-line" />
          <div class="content">
            <p class="uppercase">{{ t('battles') }} <span class="gradient min-width">{{ battles }}</span></p>
            <p class="gradient" v-if="shouldShow(periodLine)">
              &lt;{{ battles == 0 ? 0 : Math.round(score / battles) }}&gt;
            </p>
            <p v-else class="uppercase">{{ t('score') }} <span class="gradient">{{ score }}</span></p>
          </div>
        </div>

        <div class="line photo" :class="`photo-type-${photoType}`" v-if="photoLine">
          <ClipContent :root="lines"
            :svg="photoType == 'photo' ? LargePhotoBack : photoType == 'tank' ? MediumPhotoBack : SmallPhotoBack"
            class="background-image">
            <div class="ice"></div>
            <div class="gradients">
              <div class="grad" v-for="(player, i) in players"></div>
            </div>
          </ClipContent>
          <LargePhotoLine class="background-line" v-if="photoType == 'photo'" />
          <MediumPhotoLine class="background-line" v-else-if="photoType == 'tank'" />
          <SmallPhotoLine class="background-line" v-else />
          <div class="content">
            <div class="players">
              <div class="player" v-for="(player, i) in players">
                <div class="person" v-if="photoType == 'photo'">
                  <img :src="getPhotoByNickname(player.name)" :key="getPhotoByNickname(player.name)">
                </div>
                <div class="tank" v-if="photoType == 'tank'">
                  <Image class="tank-image"
                    :src="`https://static.wotstat.info/vehicles/shop/${player.tankTag.replace(':', '-')}.png`" />
                </div>
                <div class="info">
                  <div class="name">
                    <Disconnect class="disconnected" v-if="!player.connected && !isInBattle" />
                    <p class="uppercase">{{ player.name }}</p>
                  </div>
                  <p class="score gradient min-width-small center" v-if="player.connected || !isInBattle">
                    {{ isInBattle ? player.score : `<${battles == 0 ? 0 : Math.round(player.totalScore / battles)}>` }}
                  </p>
                  <div class="disconnected" v-else>
                    <Disconnect />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="line health" v-if="hpLine && isInBattle">
          <ClipContent :root="lines" :svg="MediumBack" class="background-image">
            <div class="ice"></div>
          </ClipContent>
          <MediumBackLine class="background-line" />

          <div class="content">
            <div class="players">
              <div class="player" v-for="(player, i) in players">
                <p class="tank-name uppercase">{{ player.tankName }}</p>
                <template v-if="player.connected">
                  <div class="health-bar" :style="{
                    '--health-progress': `${hpPercent(player.hp, player.maxHp) * 100}%`,
                    '--health-color': hpColor(player.hp, player.maxHp)
                  }">
                    <div class="bar"></div>
                  </div>
                  <div class="health-info">
                    <p class="health gradient">
                      <TweenValue :value="Math.max(0, player.hp)" v-slot="{ value }" :options="{ duration: 250 }"
                        v-if="animation">
                        <ForceMono :value="`${value}`" width="1.1em" />
                      </TweenValue>
                      <template v-else>{{ player.hp }}</template>
                    </p>
                    <p class="health-name">{{ t('hp') }}</p>
                  </div>
                </template>
                <div class="disconnected" v-else>
                  <Disconnect />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ClipWrapper>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { HangerBattleVariant, Props } from './define.widget';
import Disconnect from './assets/disconnect.svg'
import ForceMono from '@/components/ForceMono.vue';

import LargePhotoBack from './assets/background/large-photo.svg?raw';
import MediumPhotoBack from './assets/background/medium-photo.svg?raw';
import MediumBack from './assets/background/medium.svg?raw';
import SmallBottomBack from './assets/background/small-bottom.svg?raw';
import SmallPhotoBack from './assets/background/small-photo.svg?raw';
import SmallTopBack from './assets/background/small-top.svg?raw';

import LargePhotoLine from './assets/lines/large-photo.svg';
import MediumPhotoLine from './assets/lines/medium-photo.svg'
import MediumBackLine from './assets/lines/medium.svg';
import SmallBottomLine from './assets/lines/small-bottom.svg';
import SmallPhotoLine from './assets/lines/small-photo.svg';
import SmallTopLine from './assets/lines/small-top.svg';


import { useI18nRef } from '@/composition/useI18n';
import i18n from './i18n.json';
import ClipContent from './ClipContent.vue';
import ClipWrapper from './ClipWrapper.vue';
import { computed, ref } from 'vue';

import PhotoMerfi from './assets/photos/Merfi.png'
import Image from '@/components/Image.vue';

const gradientId = Math.random().toString(36).substring(2, 15);
const gradientUrl = computed(() => `url(#${gradientId})`);

const { t } = useI18nRef(i18n);

const props = defineProps<Props>()
const lines = ref<HTMLElement | null>(null);

function shouldShow(show: HangerBattleVariant) {
  if (show === 'both') return true;
  if (show === 'never') return false;
  if (show == 'battle') return props.isInBattle;
  if (show == 'hangar') return !props.isInBattle;
  return false;
}

function hpPercent(hp: number, maxHp: number) {
  return Math.max(0, Math.min(1, Math.max(0, hp) / maxHp));
}

function hpColor(hp: number, maxHp: number) {
  const percent = hpPercent(hp, maxHp);
  if (hp <= 0) return '#7a7a7a'; // Grey
  if (percent >= 0.75) return '#00ffb7'; // Green
  if (percent >= 0.5) return '#fffd00'; // Yellow
  if (percent >= 0.25) return '#ffbc00'; // Red
  if (percent > 0) return '#ff5b00'; // Red
}

const photoUrls = import.meta.glob<{ default: string }>('./assets/photos/*.png', { eager: true });

function getPhotoByNickname(name: string) {
  const photo = photoUrls[`./assets/photos/${name}.png`];
  if (photo) return photo.default;
  return PhotoMerfi;
}
</script>


<style lang="scss" scoped>
@font-face {
  font-family: "Drukwidecyr";
  src: url("./assets/drukwidecyr-bold.ttf");
  font-weight: bold;
}


@font-face {
  font-family: "Bebas Neue";
  src: url("./assets/BebasNeue-Regular.ttf");
  font-weight: normal;
}

.main {
  position: relative;
  font-size: 1em;
  line-height: 1;
  width: 100%;
  font-family: Drukwidecyr, sans-serif;

  p {
    font-size: 1em;
  }

  .gradient {
    background: linear-gradient(90deg, var(--color-from), var(--color-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .min-width {
    min-width: 6em;
  }

  .min-width-small {
    min-width: 2.5em;
  }

  .uppercase {
    text-transform: uppercase;
  }
}

.overlay {
  position: absolute;
  inset: 0;
  overflow: hidden;

  .gradients,
  .box,
  .triangle-grid {
    position: absolute;
    inset: 0;
  }

  .box {
    background: #282828;
  }

  .triangle-grid {
    mask: url('./assets/triangle.webp');
    mask-size: 8em;
    mask-position: -2em -2.2em;
    background: var(--color-to);
    filter: saturate(2) brightness(1.5);
    opacity: 0.3;
  }

  .gradients {
    .triangle {
      position: absolute;
      width: 5em;
      height: 9em;
      background: var(--color-from);
      filter: blur(2.2em) saturate(1.2);
      opacity: 0.2;
      // mix-blend-mode: hard-light;

      &.t1 {
        left: -2em;
        bottom: -3em;
      }

      &.t2 {
        right: -2em;
        top: -3em;
      }

      &.t3 {
        background: var(--color-to);
        right: -3em;
        top: 20%;
        height: 12em;
        opacity: 0.4;
        // mix-blend-mode: lighten;
      }
    }
  }
}

.lines {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.line {
  position: relative;
  overflow: hidden;

  .background-image {
    width: 100%;
    display: block;
    // color: #2f2f2f;
    color: transparent;
  }

  .background-line {
    position: absolute;
    inset: 0;

    :deep(path) {
      vector-effect: non-scaling-stroke;
      stroke-width: max(0.5px, 0.08em);
      stroke: v-bind(gradientUrl);
    }
  }

  .content {
    position: absolute;
    inset: 0;
  }

  .ice {
    position: absolute;
    inset: -1.2em;
    background: url('./assets/ice.webp') no-repeat;
    background-size: 100% 100%;
    opacity: 0.8;
  }
}

.title {
  display: flex;
  font-size: 0.8em;
  filter: drop-shadow(0px 0px 0.5em rgba(0, 0, 0, 0.2));
}

.step-info,
.main-count {
  .content {
    display: flex;
    align-items: center;
    padding: 0 1em;
    padding-bottom: 0.1em;
    justify-content: space-between;
  }
}

$photo-width: 5.6em;


.photo {

  .gradients {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 4.5em;

    .grad {
      width: 6em;
      height: 9em;
      background: var(--color-from);
      filter: blur(1em) saturate(1.2);
      transform: rotate(30deg);
      mix-blend-mode: hard-light;
      opacity: 0.2;
    }
  }

  .players {
    display: flex;
    gap: 0.2em;
    padding: 0.65em 1.6em 0.2em 1.8em;
    height: 100%;


    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;

      .person,
      .tank {
        width: $photo-width;
        height: 8em;
        background: linear-gradient(180deg, var(--color-from), var(--color-to));
        position: relative;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url('./assets/granite.jpg') no-repeat center center;
          background-size: cover;
          mix-blend-mode: multiply;
          opacity: 0.2;
        }
      }

      .person {
        img {
          position: absolute;
          bottom: 0;
          width: 105%;
          height: 105%;
          z-index: 6;
          object-fit: cover;
        }
      }

      .tank {
        position: relative;
        height: 5em;

        clip-path: polygon(-100% -10%,
            100% -10%,
            100% 100%,
            -100% 100%);
        ;

        .tank-image {
          position: absolute;
          right: -25%;
          bottom: -10%;
          width: 160%;
          height: 130%;
          object-fit: contain;
          z-index: 6;

          :deep(.loader) {
            margin-left: 4%;
            margin-top: 2%;
          }

          :deep(.error-image) {
            padding: 4% 25% 0% 30%;
            scale: 0.7;
          }
        }
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.2em 0.1em;
        justify-content: space-evenly;

        .name {
          display: flex;
          align-items: center;
          max-width: 6.8em;
          font-family: "Bebas Neue", sans-serif;

          p {
            font-size: 1.05em;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .disconnected {
            min-height: 0.8em;
            min-width: 0.8em;
            max-height: 0.8em;
            max-width: 0.8em;
            margin: -0.1em;
            margin-right: 0.1em;
            margin-bottom: 0.055em;

            display: block;
          }
        }

        .score {
          font-size: 0.95em;

          &.hidden {
            opacity: 0;
          }
        }

        .disconnected {
          width: 0.95em;
          height: 0.95em;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e7e7e7;

          svg {
            margin: -0.1em;
          }
        }
      }
    }
  }


  &.photo-type-never {
    .gradients {
      padding-bottom: 0;

      .grad {
        width: 3em;
        height: 5em;
        transform: rotate(90deg);
        opacity: 0.1;
      }
    }

    .players {
      padding: 0.2em 1.6em 0.2em 1.8em;
    }
  }
}

.health {
  .players {
    display: flex;
    gap: 0.2em;
    padding: 0.65em 1.6em 0.2em 1.8em;
    height: 100%;


    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      gap: 0.3em;
      // background: rgba(60, 155, 57, 0.1);

      .tank-name {
        font-size: 1.05em;
        font-family: "Bebas Neue", sans-serif;
        letter-spacing: 0.1em;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 6.5em;
      }


      .health-bar {
        height: 0.5em;
        width: $photo-width;
        position: relative;
        border: 0.07em solid var(--health-color);
        transition: border 0.2s ease-in-out;

        .bar {
          position: absolute;
          inset: 0;
          right: calc(100% - var(--health-progress));
          background-color: var(--health-color);
          transition: right 0.2s ease-in-out;
          transition-property: right, background-color;
        }
      }

      .health-info {
        display: flex;
        justify-content: space-between;
        width: $photo-width;
        align-items: baseline;

        .health {
          font-size: 0.85em;
        }

        .health-name {
          font-size: 0.55em;
        }

      }

      .disconnected {
        width: 1.5em;
        height: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #e7e7e7;
      }

    }
  }
}

.no-animation {

  .health-bar,
  .bar {
    transition: none !important;
  }
}

.no-gradient,
.style-simple {
  .overlay {
    .gradients {
      display: none;
    }
  }

  .ice {
    display: none;
  }

  .photo {
    .gradients {
      display: none;
    }
  }
}

.style-simple {
  .triangle-grid {
    display: none;
  }

  .box {
    background: var(--wotstat-background);
  }

  .photo {
    .player {

      .person,
      .tank {
        border-radius: 0.4em;

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>