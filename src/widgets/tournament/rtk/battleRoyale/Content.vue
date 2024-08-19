<template>
  <div class="main">
    <div class="l1" v-if="!hideL1">
      <p class="secondary">Боёв:<span class="primary num">&nbsp;{{ battleCount }}</span></p>
      <p class="secondary">Место:<span class="accent num bold">&nbsp;{{ place }}</span></p>
    </div>

    <div class="l2" v-if="!hideL2">
      <div class="column" v-for="(_, column) in new Array(2).fill(0)">
        <table>
          <tr v-for="(_, index) in new Array(5).fill(0)"
            :key="`${scores[column * 5 + index]?.tank}-${scores[column * 5 + index]?.score}`">
            <td class="secondary num">{{ column * 5 + index + 1 }}.</td>
            <td class="secondary">{{ scores[column * 5 + index]?.tank }}</td>
            <td class="num bold" :class="scores[column * 5 + index]?.top ? 'accent' : 'primary'">{{
              scores[column * 5 + index]?.score }}</td>
          </tr>
        </table>
      </div>
      <div class="vr"></div>
    </div>

    <div class="l3" v-if="!hideL3">
      <div class="flex">
        <div class="flex-1">
          <p class="secondary">Текущая серия • <span class="primary bold num">{{ currentSession }}</span></p>
          <p class="secondary">Лучшая серия • <span class="primary bold num">{{ bestSession }}</span></p>
        </div>
        <div class="chart-container">
          <SeriesBarChart :values="chart" :target-count="10" :gap="3" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import SeriesBarChart from '@/components/SeriesBarChart.vue';
import { computed } from 'vue';

const props = defineProps<{
  place: number
  battleCount: number,
  bestSession: number,
  currentSession: number,
  scores: {
    key?: string,
    tank: string,
    score: number,
    top: boolean,
  }[],
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
}>()

const chart = computed(() => {
  return props.scores.map((score) => {
    return {
      key: score.key ?? `${score.tank}-${score.score}`,
      value: score.score
    }
  })
})
</script>


<style lang="scss" scoped>
@import '@/styles/widget.scss';

.main {

  display: flex;
  flex-direction: column;
  gap: 1em;

  .l1 {
    display: flex;
    justify-content: space-between;

    p {
      line-height: 1;
      font-size: 1.4em;

      span {
        font-size: 2em;
      }
    }
  }

  .l2 {
    display: flex;

    .column {
      flex: 1;

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;

        td {
          font-size: 1.2em;
          text-wrap: none;
          white-space: nowrap;
        }
      }
    }

    .column:nth-child(2) {
      order: 2;
    }

    .vr {
      order: 1;
    }
  }

  .l3 {
    p {
      font-size: 1.2em;
    }

    .chart-container {
      width: 8em;
    }
  }
}
</style>