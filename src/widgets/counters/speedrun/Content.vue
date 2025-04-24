<template>
  <div class="main">
    <WidgetCard class="main-card">
      <p class="accent number bold counter fira-font">
        <span>{{ timeProcessor(value) }}</span>
        <span class="small">.{{ msProcessor(value) }}</span>
      </p>

      <div class="personal-best" v-if="pb.length && showPb">
        <p>PB</p>
        <p class="badge" v-for="value in pb.sort((a, b) => a - b).slice(0, 3)">{{ pbProcessor(value) }}</p>
      </div>

      <div class="events" v-if="events.length && showEvents">
        <div v-for="event in events.sort((a, b) => a.time - b.time)">
          {{ t(`event:${event.type}`) }}<span class="time">{{ timeProcessor(event.time) }}<span class="small">.{{
            msProcessor(event.time) }}</span></span>
        </div>
      </div>
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import { Props } from './define.widget';
import { useI18nRef } from '@/composition/useI18n';

import i18n from './i18n.json'
const { t } = useI18nRef(i18n)

const props = defineProps<Props>()

function timeProcessor(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);

  const parts = [
    hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '',
    minutes > 0 ? `${minutes.toString().padStart(hours > 0 ? 2 : 0, '0')}:` : '',
    secondsLeft.toString().padStart(minutes > 0 ? 2 : 0, '0'),
  ];

  return parts.join('');
}

function msProcessor(seconds: number) {
  return Math.floor(seconds % 1 * 100).toString().padStart(2, '0')
}

function pbProcessor(seconds: number) {
  return timeProcessor(seconds) + '.' + msProcessor(seconds)
}
</script>


<style lang="scss" scoped>
@font-face {
  font-family: "Timer";
  src: url("./timer.woff");
}


.main {
  font-size: 1em;
  line-height: 1.2;

  .counter {
    font-size: 6em;
    line-height: 1;
    margin-top: -0.1em;
    text-align: right;
    background-image: linear-gradient(#97f5b0, #4fd369);
    color: transparent;
    background-clip: text;
    font-family: "Timer", "Helvetica", "Arial", sans-serif;

    .small {
      font-size: 0.7em;
    }
  }

  .personal-best {
    width: 100%;
    display: flex;
    align-items: baseline;
    margin-top: 0.7em;
    font-size: 1.3em;
    font-weight: bold;
    line-height: 1;
    gap: 0.5em;
    flex-wrap: wrap;
    color: #ffffffd6;

    .badge {
      padding: 0.2em 0.5em;
      border-radius: 0.5em;
      background-color: #ffffff1a;
      font-size: 0.9em;
      font-family: "Timer", "Helvetica", "Arial", sans-serif;
      text-align: center;
      min-width: 5em;
    }

    &:has(> :nth-child(n+3)) {
      .badge {
        flex: 1;
      }
    }
  }

  .events {
    margin-top: 0.7em;
    width: 100%;
    font-size: 1.5em;
    color: #ffffffd6;
    display: flex;
    flex-direction: column;
    gap: 0.2em;

    div {
      line-height: 1.2;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .time {
        float: right;
        font-family: "Timer", "Helvetica", "Arial", sans-serif;

        .small {
          font-size: 0.7em;
        }
      }
    }

  }
}
</style>