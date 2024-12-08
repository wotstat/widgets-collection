<template>
  <div class="main preview-card">
    <img class="ribbon" src="./assets/effects/ribbon_gold_medium.png" v-if="!hideL1">
    <div class="line-1" v-if="!hideL1">
      <div class="container number">
        <img src="./assets/containers/ny_2025_small.png">
        <p class="nowrap">
          <TweenValue :value="opened.small" space :options />
        </p>
      </div>

      <div class="container">
        <img src="./assets/containers/ny_2025_big.png">
        <p class="nowrap">
          <TweenValue :value="opened.big" space :options />
        </p>
      </div>

      <div class="container">
        <img src="./assets/containers/ny_2025_tanks.png">
        <p class="nowrap">
          <TweenValue :value="opened.tanks" space :options />
        </p>
      </div>

      <div class="container surprise">
        <img src="./assets/containers/ny_2025_surprise.png">
        <p class="nowrap">
          <TweenValue :value="opened.surprise" space :options />
        </p>
      </div>
    </div>

    <div class="line-2 nowrap" v-if="!hideL2">
      <DefineLine v-slot="{ img, value }">
        <div class="line">
          <div class="icon">
            <img :src="img">
          </div>
          <div class="value number">
            <p>
              <TweenValue :value="value" space :processor="logProcessor" :options />
            </p>
          </div>
        </div>
      </DefineLine>

      <ReuseLine :img="Gold" :value="currencies.gold" />
      <ReuseLine :img="Credits" :value="currencies.credits" class="rtl" />
      <ReuseLine :img="FreeXP" :value="currencies.freeXP" />
      <ReuseLine :img="Premium" :value="currencies.premium" class="rtl" />
      <ReuseLine :img="Mandarins" :value="currencies.mandarins" />
    </div>

    <div class="line-3" v-if="!hideL3 && tankNames.status != loading">

      <DefineTank v-slot="{ tag }">
        <div class="tank">
          <FallbackImg :src="`https://static.wotstat.info/vehicles/preview/${tag.replace(':', '-')}.png`" class="img"
            :fallback="`https://static.wotstat.info/vehicles/preview/noImage.png`" />
          <p class="nowrap name">{{ getTankName(tag) }}</p>
        </div>
      </DefineTank>

      <TransitionGroup name="list">
        <ReuseTank :tag="tank" v-for="tank in tanks" :key="tank" />
      </TransitionGroup>
    </div>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { createReusableTemplate } from '@vueuse/core'

import Gold from './assets/currencies/gold.png'
import Credits from './assets/currencies/credits.png'
import FreeXP from './assets/currencies/freeXP.png'
import Premium from './assets/currencies/premium_plus_universal.png'
import Mandarins from './assets/currencies/nyMandarins.png'
import FallbackImg from '@/components/shared/FallbackImg.vue';
import { loading, queryAsync } from '@/utils/db';
import { computed } from 'vue';
import { Props } from './define.widget';


const [DefineLine, ReuseLine] = createReusableTemplate<{ img: string, value: number }>()
const [DefineTank, ReuseTank] = createReusableTemplate<{ tag: string }>()

const props = defineProps<Props>()
const options = { duration: 700 }

const tankNames = queryAsync<{ tag: string, name: string, level: number }>(`select tag, argMax(shortName, datetime) as name, argMax(level, datetime) as level from Vehicles where region = 'RU' group by tag`)
const tankNamesMap = computed(() => new Map(tankNames.value.data.map(t => [t.tag, { name: t.name, level: t.level }])))

function getTankName(tag: string) {
  return tankNamesMap.value.get(tag)?.name ?? tag.split(':')[1].split('_').slice(1).join(' ')
}

function getTankLevel(tag: string) {
  return tankNamesMap.value.get(tag)?.level ?? 0
}

function logProcessor(value: number) {
  if (value < 1e5) return value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (value < 1e6) return (value / 1e3).toFixed(1) + 'k';
  if (value < 1e9) return (value / 1e6).toFixed(1) + 'M';
  if (value < 1e12) return (value / 1e9).toFixed(1) + 'B';
  return (value / 1e12).toFixed(1) + 'T';
}

const tanks = computed(() => props.tanks.toSorted((a, b) => getTankLevel(b) - getTankLevel(a)))

</script>


<style lang="scss" scoped>
.main {
  font-size: 2em;
  overflow: hidden;
  padding-top: 0.4em;
  position: relative;
  border-radius: 1em;

  .ribbon {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
  }

  .line-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.1em;

    .container {
      position: relative;

      &:not(.surprise) {
        img {
          transform: translateY(8%);
        }
      }

      &.surprise {
        img {
          scale: 1.2;
        }
      }

      &:nth-child(1) {
        transform: rotate(-30deg) translateY(20%);
      }

      &:nth-child(2) {
        transform: rotate(-10deg) translate(5%, -15%);
      }

      &:nth-child(3) {
        transform: rotate(10deg) translate(0, -15%);
      }

      &:nth-child(4) {
        transform: rotate(30deg) translateY(20%);
      }

      img {
        width: 3em;
      }

      p {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5em;
        text-align: center;
        transform: translate(-50%, -50%);
        font-size: 0.9em;
        font-weight: bold;
        color: white;
        background: url('./assets/effects/glow.png');
        background-position: center;
        background-size: 4em 100%;
        background-repeat: no-repeat;
        filter: drop-shadow(0 0 0.2em rgba(9, 51, 150, 0.515));
      }
    }
  }

  .line-2 {
    margin: 1em 1.9em;
    margin-top: 0.2em;
    margin-bottom: 1em;

    .line {
      display: flex;
      align-items: center;
      $border: 0.03em solid rgba(131, 232, 255, 0.507);
      margin: -0.5em 0;

      &.rtl {
        flex-direction: row-reverse;
      }

      .icon {
        background: url('./assets/effects/circle_background.png'), linear-gradient(180deg, #01164b 0%, #032e9c 100%);
        background-size: 190%;
        background-position: center;
        width: 2.2em;
        height: 2.2em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: $border;
        z-index: 1;
        overflow: hidden;

        img {
          width: auto;
          max-width: 100%;
          scale: 1.1;
        }
      }

      .value {
        flex: 1;
        background: url('./assets/effects/cardSnow.png'), url('./assets/effects/cardBg.png');
        background-position: right bottom, center;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        height: 1.4em;
        margin-right: 23.0%;
        padding-left: 0.8em;
        border-radius: 0.4em;
        margin-left: -1em;
        border: $border;
        overflow: hidden;
        position: relative;

        p {
          font-size: 0.9em;
          font-weight: bold;
          line-height: 1;
          color: rgb(255, 255, 255);
          filter: drop-shadow(0 0 0.3em rgb(88, 123, 249));
        }
      }

      &.rtl {
        .value {
          background: url('./assets/effects/cardSnowRtl.png'), url('./assets/effects/cardBg.png');
          background-position: left bottom, center;
          background-size: cover;
          margin-right: -1em;
          padding-right: 0.8em;
          padding-left: 0;
          margin-left: 23.0%;
        }
      }
    }
  }

  .line-3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.7em;

    .tank {
      width: 3em;
      margin: -0.3em -0.5em;
      filter: drop-shadow(0 0 0.2em rgba(9, 51, 150, 0.6));

      .img {
        width: 100%;
        aspect-ratio: 60/37;
        transform: translateX(0.15em);
      }

      .name {
        width: 100%;
        text-align: center;
        font-size: 0.35em;
        line-height: 1;
        color: rgb(255, 234, 164);
        transform: translate(0, -220%);
        letter-spacing: -0.07em;
      }
    }

    &:has(:nth-child(15)) {
      .tank {
        width: 2.5em;
        margin: -0.3em -0.4em;

        .name {
          font-size: 0.3em;
        }
      }
    }

    .list-move,
    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(1em);
    }
  }

  &:not(:has(.line-1)) {
    font-size: 2.8em;
    padding: 0;

    .line-2 {
      margin: 0.5em 0;
    }
  }

  &:has(.line-3) {
    .line-2 {
      margin-bottom: 1em;
    }
  }
}
</style>