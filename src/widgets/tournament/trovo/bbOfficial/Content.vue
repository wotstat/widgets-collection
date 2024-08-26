<template>
  <div class="main preview-card" :class="transparentBackground ? 'transparent' : 'background'">
    <div class="head flex">
      <Logo class="logo" />
      <p class="battles flex-1">{{ t('battles') }}: <span class="number">{{ battles }}/30</span></p>
      <p class="resets flex-1">{{ t('removes') }}: <span class="number"> {{ resets }}/3</span></p>
    </div>

    <div class="progress flex">
      <p class="flex-1 nowrap">{{ t('place') }} <span class="number big">{{ place }}</span></p>
      <div class="vr accent"></div>
      <p class="flex-1 nowrap">{{ t('avgDamage') }} <span class="number big">{{ avgDamage }}</span></p>
    </div>

    <div class="best-place flex" v-if="showBest !== false">
      <template v-for="_, i in new Array(3).fill(0)">
        <p class="icon">
          {{ i + 1 }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 10">
            <path fill="#fff" d="M.935 9.506h30V3.673h-10V.372h-10v6.134h-10v3Z" />
          </svg>
        </p>
        <div class="place flex-1">
          <p class="number center">{{ places[i] ?? '-' }}</p>
        </div>
        <div class="vr" v-if="i != 2"></div>
      </template>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRoundTweenProcessor } from '@/composition/processors/useRoundTweenProcessor';

import Logo from "./logo.svg";
import i18n from './i18n.json'
import { useI18nRef } from '@/composition/useI18n';

const { t } = useI18nRef(i18n);

const props = defineProps<{
  place: number,
  avgDamage: number,
  battles: number,
  resets: number,
  places: number[],
  transparentBackground?: boolean,
  showBest?: boolean,
}>()

const battles = useRoundTweenProcessor(() => props.battles, { duration: 1000 });
const avgDamage = useRoundTweenProcessor(() => props.avgDamage, { duration: 1000 });
const place = useRoundTweenProcessor(() => props.place, { duration: 1000 });
const resets = useRoundTweenProcessor(() => props.resets, { duration: 1000 });

</script>


<style lang="scss" scoped>
@import '@/styles/widget.scss';

.main {
  overflow: hidden;
  border-radius: 1em;
  padding: 0.8em;
  color: #fff;

  &.transparent {
    background: radial-gradient(ellipse, rgba(43, 43, 43, 0.5) 10%, rgba(43, 43, 43, 0.25) 100%);
  }

  .head {

    gap: 0.8em;

    .logo {
      width: 2.5em;
      pointer-events: none;
    }

    .battles {
      border-bottom: 0.1em solid var(--wotstat-accent);
    }

    .resets {
      border: 0.1em solid var(--wotstat-accent);
      border-radius: 0.4em;
    }

    p {
      text-align: center;
      font-size: 1em;
    }
  }

  .progress {
    font-size: 1em;
    margin-top: 0.5em;
    align-items: center;

    p {
      text-align: center;
      line-height: 1;

      .big {
        font-size: 2.2em;
        font-weight: bold;
      }
    }

    .vr {
      height: 1.8em;
      width: 0.08em;
      min-width: 0.08em;
    }

  }

  .best-place {
    margin-top: 0.5em;
    align-items: center;
    justify-content: center;
    background-color: rgb(27, 27, 27);
    border-radius: 0.4em;
    padding: 0.4em;
    line-height: 1;
    font-size: 0.9em;

    .icon {
      font-size: 0.8em;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: -1em 0;

      svg {
        fill: white;
        width: 1.8em;
        margin-top: 0em;
        margin-left: -0.1em;
      }
    }

    .vr {
      height: 1em;
    }
  }

}
</style>