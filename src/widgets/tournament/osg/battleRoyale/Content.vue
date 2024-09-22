<template>
  <div class="main">
    <div class="l1" v-if="!hideL1">
      <p class="secondary">Боёв:<span class="primary number">&nbsp;{{ battleCount }}</span></p>
      <p class="secondary">Место:<span class="accent number bold">&nbsp;{{ place }}</span></p>
    </div>

    <div class="l2" v-if="!hideL2">
      <div class="column" v-for="(_, column) in new Array(2).fill(0)">
        <table>
          <tr v-for="(_, index) in new Array(5).fill(0)"
            :key="currentSession[column * 5 + index]?.key ?? `${currentSession[column * 5 + index]?.tank}-${currentSession[column * 5 + index]?.score}`">
            <td class="secondary number">{{ column * 5 + index + 1 }}.</td>
            <td class="secondary">{{ currentSession[column * 5 + index]?.tank }}</td>
            <td class="number bold" :class="currentSession[column * 5 + index]?.top ? 'accent' : 'primary'">{{
              currentSession[column * 5 + index]?.score }}</td>
          </tr>
        </table>
      </div>
      <div class="vr"></div>
    </div>

    <div class="l3" v-if="!hideL3">
      <div class="flex">
        <div class="flex-1">
          <p class="secondary">Текущая серия • <span class="primary bold number">{{ currentSessionSum }}</span></p>
          <p class="secondary">Лучшая серия • <span class="primary bold number">{{ bestSessionSum }}</span></p>
        </div>
        <div class="chart-container">
          <SeriesBarChart :values="chart" :target-count="10" :gap="3" />
        </div>
      </div>
    </div>

    <div class="l4" v-if="!hideL4 && bestSession.length == 10">
      <p v-for="item in bestSession" :class="item.top ? 'accent' : 'primary'">{{ item.score }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import SeriesBarChart from '@/components/SeriesBarChart.vue';
import { useRoundProcessor } from '@/composition/processors/useRoundProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';
import { computed } from 'vue';

const props = defineProps<{
  place: number
  battleCount: number,
  bestSessionSum: number,
  currentSessionSum: number,
  currentSession: {
    key?: string,
    tank: string,
    score: number,
    top: boolean,
  }[],
  bestSession: {
    tank: string,
    score: number,
    top: boolean,
  }[],
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
  hideL4?: boolean,
}>()

const battleCount = useRoundProcessor(useTweenComputed(() => props.battleCount, { duration: 500 }))
const place = useRoundProcessor(useTweenComputed(() => props.place, { duration: 500 }))

const currentSessionSum = useRoundProcessor(useTweenComputed(() => props.currentSessionSum, { duration: 500 }))
const bestSessionSum = useRoundProcessor(useTweenComputed(() => props.bestSessionSum, { duration: 500 }))

const chart = computed(() => {
  return props.currentSession.map((score) => {
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
          padding: 0.07em;
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

  .l4 {
    display: flex;
    justify-content: space-between;
    font-size: 1.2em;
    font-weight: bold;
  }
}
</style>