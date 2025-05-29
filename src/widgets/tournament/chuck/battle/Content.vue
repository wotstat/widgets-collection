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
        <p class="gradient">{{ period }}</p>
        <p>ОЧКИ: <span class="gradient">321084</span></p>
      </div>
    </div>

    <div class="line main-count" v-if="shouldShow(battlesLine)">
      <img class="background-image" :src="MiddleBack"></img>
      <div class="content">
        <p>БОËВ: <span class="gradient">00</span></p>
        <p class="gradient" v-if="shouldShow(periodLine)">~ 16215</p>
        <p v-else>ОЧКИ: <span class="gradient">000000</span></p>
      </div>
    </div>

    <div class="line photo" v-if="photoLine">
      <img class="background-image" :src="BigBack"></img>
      <div class="content">
        <div class="players">
          <div class="player" v-for="(player, i) in new Array(3).fill(0)">
            <div class="person" v-if="photoType == 'photo'"></div>
            <div class="info">
              <p class="name">ОООООЧКЕЬ_ДЛИННЫЙ_НИК</p>
              <p class="score gradient">2482</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="line health" v-if="hpLine">
      <img class="background-image" :src="MediumBack"></img>

      <div class="content">
        <div class="players">
          <div class="player" v-for="(player, i) in new Array(3).fill(0)">
            <p class="tank-name">Rinoceronte</p>
            <div class="health-bar"></div>
            <div class="health-info">
              <p class="health gradient">2482</p>
              <p class="health-name">ХП</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import TweenValue from '@/components/TweenValue.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { HangerBattleVariant, Props } from './define.widget';

import TopBack from './assets/top-back.webp'
import MiddleBack from './assets/middle-back.webp'
import BigBack from './assets/big-back.webp'
import MediumBack from './assets/medium-back.webp'

const classes = useStateClass()
const props = defineProps<Props>()

function shouldShow(show: HangerBattleVariant) {
  if (show === 'both') return true;
  if (show === 'never') return false;
  if (show == 'battle') return props.isInBattle;
  if (show == 'hangar') return !props.isInBattle;
  return false;
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
    font-size: 1.14em;
  }

  .gradient {
    background: linear-gradient(90deg, var(--color-from), var(--color-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
        text-transform: uppercase;
        font-family: "Bebas Neue", sans-serif;
        letter-spacing: 0.1em;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 6.5em;
      }


      .health-bar {
        min-height: 0.5em;
        width: $photo-width;
        background-color: #00ffb7;
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

    }
  }
}
</style>