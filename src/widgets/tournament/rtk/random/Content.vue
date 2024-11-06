<template>
  <div class="main">
    <div class="l1" v-if="!hideL1">
      <p class="secondary">Боёв:<span class="primary number">&nbsp;{{ battleCount }}</span></p>
      <p class="secondary">Место:<span class="accent number bold">&nbsp;{{ place }}</span></p>
    </div>

    <div class="l2" v-if="!hideL2">
      <div class="column" v-for="(_, column) in new Array(2).fill(0)">
        <table>
          <tr v-for="(_, index) in new Array(LINE_COUNT).fill(0)">
            <td class="secondary number index">{{ column * LINE_COUNT + index + 1 }}.</td>
            <td class="secondary tank-name" v-if="bestBattles[column * LINE_COUNT + index]">
              {{ bestBattles[column * LINE_COUNT + index].tank ?? '?' }}
            </td>
            <td class="secondary tank-name" v-else></td>
            <td class="number bold right"
              :class="bestBattles[column * LINE_COUNT + index]?.today ? 'accent' : 'primary'">{{
                bestBattles[column * LINE_COUNT + index]?.score }}</td>
          </tr>
        </table>
      </div>
      <div class="vr"></div>
    </div>

    <div class="l3" v-if="!hideL3">
      <div class="flex">
        <div class="flex-1 text-lines">
          <p class="secondary" v-if="bestBattles.at(-1)?.score">Худший • {{ bestBattles.at(-1)?.tank ?? '?' }} • <span
              class="primary bold number">
              {{ bestBattles.at(-1)?.score }}
            </span>
          </p>
          <p class="secondary" v-else>Худший • </p>
          <p class="secondary" v-if="lastBattle">Прошлый • {{ lastBattle?.tank ?? '?' }} •
            <span class="primary bold number">
              {{ lastBattle?.score }}
            </span>
          </p>
          <p class="secondary" v-else>Прошлый • </p>
        </div>
        <div class="chart-container">
          <SeriesBarChart :values="chart" :target-count="BAR_COUNT" :gap="3" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import SeriesBarChart from '@/components/SeriesBarChart.vue';
import { useRoundProcessor } from '@/composition/processors/useRoundProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';
import { computed } from 'vue';
import { Props } from './define.widget';

const LINE_COUNT = 7
const BAR_COUNT = 9

const props = defineProps<Props>()

const battleCount = useRoundProcessor(useTweenComputed(() => props.battleCount, { duration: 500 }))
const place = useRoundProcessor(useTweenComputed(() => props.place, { duration: 500 }))

// const currentSessionSum = useRoundProcessor(useTweenComputed(() => props.currentSessionSum, { duration: 500 }))
// const bestSessionSum = useRoundProcessor(useTweenComputed(() => props.bestSessionSum, { duration: 500 }))

const chart = computed(() => {
  return props.last10.slice(-BAR_COUNT).map((score) => {
    return {
      key: `${score}`,
      value: score
    }
  })
})

</script>


<style lang="scss" scoped>
@use'@/styles/widget.scss';

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
    font-size: 0.9em;

    .column {
      flex: 1;

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        line-height: 1.5;

        td {
          font-size: 1.2em;
          padding: 0.07em;
          text-wrap: none;
          white-space: nowrap;

          &.tank-name {
            width: 100%;
          }

          &.index {
            padding-right: 0.3em;
          }
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
      width: 7.5em;
    }

    .text-lines {
      gap: 0.7em;
      display: flex;
      flex-direction: column;
      line-height: 1;
    }
  }

}
</style>