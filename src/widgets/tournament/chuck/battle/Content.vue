<template>
  <div class="main center preview-drop-shadow" :style="{
    '--color-from': `#${props.colorFrom}`,
    '--color-to': `#${props.colorTo}`,
  }">

    <div class="title" v-if="shouldShow(showTitle)">
      <p class="gradient">{{ title }}</p>
    </div>

    <div class="line step-info" v-if="shouldShow(periodLine)">
      <img class="background-image" :src="TopBack"></img>
      <div class="content">
        <p class="gradient uppercase">{{ period }}</p>
        <p>ОЧКИ: <span class="gradient">{{ score }}</span></p>
      </div>
    </div>

    <div class="line main-count" v-if="shouldShow(battlesLine)">
      <img class="background-image" :src="MiddleBack"></img>
      <div class="content">
        <p>БОËВ: <span class="gradient">{{ battles }}</span></p>
        <p class="gradient" v-if="shouldShow(periodLine)">~ {{ battles == 0 ? 0 : Math.round(score / battles) }}</p>
        <p v-else>ОЧКИ: <span class="gradient">{{ score }}</span></p>
      </div>
    </div>

    <div class="line photo" v-if="photoLine && isInBattle">
      <img class="background-image" :src="BigBack"></img>
      <div class="content">
        <div class="players">
          <div class="player" v-for="(player, i) in players">
            <div class="person" v-if="photoType == 'photo'"></div>
            <div class="info">
              <p class="name uppercase">{{ player.name }}</p>
              <p class="score gradient" v-if="player.connected || hpLine" :class="{
                hidden: !player.connected,
              }">{{ player.score }}</p>
              <div class="disconnected" v-else>
                <Disconnect />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="line health" v-if="hpLine && isInBattle">
      <img class="background-image" :src="MediumBack"></img>

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
                  <TweenValue :value="player.hp" v-slot="{ value }" :options="{ duration: 250 }">
                    <ForceMono :value="`${value}`" width="1.2em" />
                  </TweenValue>
                </p>
                <p class="health-name">ХП</p>
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
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { HangerBattleVariant, Props } from './define.widget';

import TopBack from './assets/top-back.webp'
import MiddleBack from './assets/middle-back.webp'
import BigBack from './assets/big-back.webp'
import MediumBack from './assets/medium-back.webp'
import Disconnect from './assets/disconnect.svg'
import ForceMono from '@/components/ForceMono.vue';


const props = defineProps<Props>()

function shouldShow(show: HangerBattleVariant) {
  if (show === 'both') return true;
  if (show === 'never') return false;
  if (show == 'battle') return props.isInBattle;
  if (show == 'hangar') return !props.isInBattle;
  return false;
}

function hpPercent(hp: number, maxHp: number) {
  return Math.max(0, Math.min(1, hp / maxHp));
}

function hpColor(hp: number, maxHp: number) {
  const percent = hpPercent(hp, maxHp);
  if (hp == 0) return '#7a7a7a'; // Grey
  if (percent >= 0.75) return '#00ffb7'; // Green
  if (percent >= 0.5) return '#fffd00'; // Yellow
  if (percent >= 0.25) return '#ffbc00'; // Red
  if (percent > 0) return '#ff5b00'; // Red
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
  font-size: 1em;
  line-height: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.3em;
  font-family: Drukwidecyr, sans-serif;

  p {
    font-size: 1em;
  }

  .gradient {
    background: linear-gradient(90deg, var(--color-from), var(--color-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .uppercase {
    text-transform: uppercase;
  }
}

.line {
  position: relative;

  .background-image {
    width: 100%;
    display: block;
  }

  .content {
    position: absolute;
    inset: 0;
  }
}

.title {
  display: flex;
  font-size: 0.8em;
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
      // background: rgba(60, 155, 57, 0.1);


      .person {
        width: $photo-width;
        height: 8em;
        // background-color: rgba(255, 0, 0, 0.3);
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.2em 0.1em;
        justify-content: space-evenly;

        .name {
          font-size: 0.6em;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 11em;
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
</style>