<template>
  <div class="main card" :class="`style-${props.skin ?? 'default'}`">
    <div class="content">
      <div class="l1" v-if="!hideL1">
        <p class="secondary">Боёв:<span class="primary number">&nbsp;{{ battleCount }}</span></p>
        <p class="secondary">Место:<span class="accent number bold">&nbsp;{{ place }}</span></p>
      </div>

      <div class="l2" v-if="!hideL2 && skin !== 'replay'">
        <div class="column primary" v-for="(_, column) in new Array(2).fill(0)">
          <table>
            <tr v-for="(_, index) in new Array(LINE_COUNT).fill(0)" :class="{
              'is-last-battle': isLastBattleResultAt(column * LINE_COUNT + index)
            }">
              <td class="secondary number index">{{ column * LINE_COUNT + index + 1 }}.</td>
              <td class="secondary tank-name" v-if="bestBattles[column * LINE_COUNT + index]">
                {{ bestBattles[column * LINE_COUNT + index].tank ?? '?' }}
              </td>
              <td class="secondary tank-name" v-else></td>
              <td class="number bold right score" :class="{
                'accent': isTodayAt(column * LINE_COUNT + index),
              }">{{
                bestBattles[column * LINE_COUNT + index]?.score }}</td>
            </tr>
          </table>
        </div>
        <div class="vr"></div>
      </div>


      <div class="l-rep" v-if="skin === 'replay'">
        <table>
          <tr v-for="(_, index) in new Array(bestBattles.length).fill(0)" :class="{
            'is-last-battle': isLastBattleResultAt(index)
          }">
            <td class="secondary number index">{{ index + 1 }}.</td>
            <td class="secondary tank-name" v-if="bestBattles[index]">
              {{ getReplayName(bestBattles[index]) }}
            </td>
            <td class="secondary tank-name" v-else></td>
            <td class="number bold right score" :class="{
              'accent': isTodayAt(index),
            }">
              {{ bestBattles[index]?.score }}
            </td>
          </tr>
        </table>
      </div>

      <div class="l3" v-if="!hideL3 && skin !== 'replay'">
        <div class=" flex">
          <div class="flex-1 text-lines nowrap">
            <p class="secondary" v-if="bestBattles.at(-1)?.score">Худший •
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
          </div>
          <div class="chart-container">
            <SeriesBarChart :values="chart" :target-count="BAR_COUNT" :gap="3" />
          </div>
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
import { queryAsync } from '@/utils/db';

const LINE_COUNT = 5
const BAR_COUNT = 9

const props = defineProps<Props>()

const battleCount = useRoundProcessor(useTweenComputed(() => props.battleCount, { duration: 500 }))
const place = useRoundProcessor(useTweenComputed(() => props.place, { duration: 500 }))

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

const tankTagsData = queryAsync<{ tag: string, name: string }>(`select tag, argMax(shortName, datetime) as name from Vehicles where region = 'RU' group by tag`)

const tankTags = computed(() => new Map(tankTagsData.value.data.map((row) => [row.name, row.tag])))

function getReplayName(line: Props['bestBattles'][number]) {
  if (!line.date || !line.tank) return '???'

  const date = new Date(line.date)
  const YYYY = date.getFullYear()
  const MM = (date.getMonth() + 1).toString().padStart(2, '0')
  const DD = date.getDate().toString().padStart(2, '0')

  const HH = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')

  const datePrefix = `${YYYY}${MM}${DD}_${HH}${mm}`

  if (!tankTags.value.has(line.tank)) return `${datePrefix} (${line.tank})`
  return `${datePrefix}_${tankTags.value.get(line.tank)?.replace(':', '-')}`
}

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

    .l-rep {
      display: flex;
      font-size: 0.85em;

      table {
        width: 100%;

        .tank-name {
          width: 100%;
        }
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
        margin-right: 0.8em;
      }
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