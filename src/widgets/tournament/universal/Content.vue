<template>
  <div class="main card" :class="`style-${props.skin ?? 'default'}`">
    <div class="content">
      <div class="l1" v-if="!hideL1">
        <p class="secondary">Боёв:<span class="primary number">&nbsp;{{ battleCount }}</span></p>
        <p class="secondary">Место:<span class="accent number bold">&nbsp;{{ place }}</span></p>
      </div>

      <p class="rule secondary" v-if="!hideL2">{{ ruleLabel }}</p>
      <div class="l2" v-if="!hideL2">
        <div class="column primary" v-for="(indexes, column) in columns" :key="column">
          <table>
            <tr v-for="index in indexes" :key="index" :class="{
              'is-last-battle': isLastBattleResultAt(index)
            }">
              <td class="secondary number index">{{ index + 1 }}.</td>
              <td class="secondary tank-name" v-if="bestBattles[index]">
                {{ bestBattles[index].tank ?? '?' }}
              </td>
              <td class="secondary tank-name" v-else></td>
              <td class="number bold right score" :class="{
                'accent': isTodayAt(index),
              }">{{
                bestBattles[index]?.score }}</td>
            </tr>
          </table>
        </div>
        <div class="vr" v-if="columns.length > 1"></div>
      </div>


      <div class="l3" v-if="!hideL3">
        <div class=" flex">
          <div class="flex-1 text-lines nowrap">
            <template v-if="isSeries">
              <p class="secondary nowrap">Текущая серия •
                <span class="primary bold number">{{ currentSeriesSum }}</span>
              </p>
              <p class="secondary nowrap">Лучшая серия •
                <span class="primary bold number">{{ bestSeriesSum }}</span>
              </p>
            </template>
            <template v-else>
              <p class="secondary" v-if="bestBattles.at(-1)">Худший •
                <span :class="isLastBattleResult(bestBattles.at(-1)) ? 'accent' : 'secondary'">
                  {{ bestBattles.at(-1)?.tank ?? '?' }}
                </span>
                •
                <span class="bold number" :class="bestBattles.at(-1)?.today ? 'accent' : 'primary'">
                  {{ bestBattles.at(-1)?.score }}
                </span>
              </p>
              <p class="secondary nowrap" v-else>Худший • </p>
              <p class="secondary nowrap" v-if="lastBattle">Прошлый • {{ lastBattle?.tank ?? '?' }} •
                <span class="primary bold number">
                  {{ lastBattle?.score }}
                </span>
              </p>
              <p class="secondary" v-else>Прошлый • </p>
            </template>
          </div>
          <div class="chart-container">
            <SeriesBarChart :values="chart" :target-count="BAR_COUNT" :gap="3" />
          </div>
        </div>
      </div>

      <div class="l4" v-if="isSeries && !hideL4 && bestSeries.length">
        <p v-for="(item, index) in bestSeries" :key="index" class="number"
          :class="item.today ? 'accent' : 'primary'">
          {{ item.score }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import SeriesBarChart from '@/components/SeriesBarChart.vue'
import { useRoundProcessor } from '@/composition/processors/useRoundProcessor'
import { useTweenComputed } from '@/composition/tween/useTweenRef'
import { computed } from 'vue'
import type { UniversalTournamentProps } from './define.widget'

const BAR_COUNT = 9

const props = defineProps<UniversalTournamentProps>()

const battleCount = useRoundProcessor(useTweenComputed(() => props.battleCount, { duration: 500 }))
const place = useRoundProcessor(useTweenComputed(() => props.place, { duration: 500 }))
const currentSeriesSum = useRoundProcessor(useTweenComputed(() => props.currentSeriesSum, { duration: 500 }))
const bestSeriesSum = useRoundProcessor(useTweenComputed(() => props.bestSeriesSum, { duration: 500 }))

const columns = computed(() => {
  const count = Math.max(props.targetBattleCount, props.bestBattles.length)
  const tableCount = count > 5 && count % 2 === 1 && !props.isSeries && !props.hideL3 ? count - 1 : count
  const columnCount = tableCount > 5 ? 2 : 1
  const rows = Math.ceil(tableCount / columnCount)

  return Array.from({ length: columnCount }, (_, column) => {
    const start = column * rows
    return Array.from({ length: Math.min(rows, tableCount - start) }, (_, row) => start + row)
  })
})

function isLastBattleResult(battle: { tank: string | null, score: number } | undefined) {
  return battle &&
    battle.tank === props.lastBattle?.tank &&
    battle.score === props.lastBattle?.score
}

function isLastBattleResultAt(index: number) {
  return isLastBattleResult(props.bestBattles[index])
}

function isTodayAt(index: number) {
  return props.bestBattles[index]?.today
}

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

  .content {
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

          .is-last-battle {
            .tank-name {
              font-weight: bold;
              color: var(--wotstat-accent);
            }

            .score {
              color: var(--wotstat-accent);
            }
          }

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

    .rule {
      margin-bottom: -0.55em;
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 0.04em;
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
        margin-right: 0.8em;
      }
    }

    .l4 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(1.8em, 1fr));
      gap: 0.35em;
      font-size: 1.05em;
      font-weight: bold;
      text-align: center;
    }
  }

  &.style-transparent {
    background: transparent;
    border: max(1px, 0.1em) solid rgba(255, 255, 255, 0.25);

    .secondary {
      color: white;
    }

    background: radial-gradient(ellipse, rgb(0 0 0 / 40%) 20%, rgba(43, 43, 43, 0.37) 100%);
  }

}
</style>
