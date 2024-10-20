<template>
  <div class="main center" :style="{ fontSize }">
    <WidgetCard>
      <div class="lines">
        <div class="line header" v-if="slotsTypes.length">
          <div class="flex-2"></div>
          <div class="image" v-for="slot in slotsTypes">
            <component :is="getIconForSlot(slot)" class="icon" />
          </div>
          <div class="image">
            <EfficiencyIcon :icon="'ammo-bay-destroyed-dmg-avg'" class="icon" />
          </div>
        </div>
        <div class=" line" v-for="(line, i) in lines" :key="line.name">
          <p class="name">{{ line.name }}</p>
          <p v-for="slot in slots" class="number bold" :class="slot.value[i].isBest ? 'accent' : ''"
            :key="slot.value[i].type">
            <TweenValue :value="slot.value[i].value" :processor="getProcessorForSlot(slot.value[i].type)"
              :precision="getPrecisionForSlot(slot.value[i].type)" />
          </p>
          <p class="number bold">
            <TweenValue :value="123" />
          </p>
        </div>
      </div>
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">

import EfficiencyIcon from "@/components/efficiencyIcon/Icon.vue";

import WidgetCard from '@/components/WidgetCard.vue';

import DmgMax from '@/assets/actions/dmg-max.svg'
import DmgAvg from '@/assets/actions/dmg-avg.svg'

import KillsMax from '@/assets/actions/kill-max.svg'
import KillsAvg from '@/assets/actions/kill-avg.svg'

import XpMax from '@/assets/actions/xp-max.svg'
import XpAvg from '@/assets/actions/xp-avg.svg'

import PosMax from '@/assets/actions/position-max.svg'
import PosAvg from '@/assets/actions/position-avg.svg'

import ScoreMax from '@/assets/actions/score-max.svg'
import ScoreAvg from '@/assets/actions/score-avg.svg'
import ScoreInRow from '@/assets/actions/score-in-row-10.svg'
import ScoreInRowMax from '@/assets/actions/score-in-row-10-max.svg'

import Top1 from '@/assets/actions/top1.svg'
import Top1InRow from '@/assets/actions/top1-in-row.svg'
import Battles from '@/assets/actions/battles.svg'

import TweenValue from '@/components/TweenValue.vue';
import { computed } from 'vue'
import { Line, SlotValue } from './define.widget'


const props = defineProps<{
  lines: Line[]
  slot1?: SlotValue
  slot2?: SlotValue
  slot3?: SlotValue
  slot4?: SlotValue
  slot5?: SlotValue
}>()

function kProcessor(number: number) {
  if (number < 10000) return Math.round(number)
  if (number < 1000000) return (number / 1000).toFixed(1) + 'k'
}

function getAvg(value: number, battlesCount: number) {
  if (battlesCount == 0) return 0
  return value / battlesCount
}

function getProcessorForSlot(slotValue: SlotValue) {
  switch (slotValue) {
    case 'dmg-max': return kProcessor
    case 'dmg-avg': return kProcessor
    default: return undefined
  }
}

function getIconForSlot(slotValue: SlotValue) {
  switch (slotValue) {
    case 'dmg-max': return DmgMax
    case 'dmg-avg': return DmgAvg
    case 'frags-max': return KillsMax
    case 'frags-avg': return KillsAvg
    case 'xp-max': return XpMax
    case 'xp-avg': return XpAvg
    case 'position-max': return PosMax
    case 'position-avg': return PosAvg
    case 'score-max': return ScoreMax
    case 'score-avg': return ScoreAvg
    case 'score-in-row-10-max': return ScoreInRowMax
    case 'score-in-row-10': return ScoreInRow
    case 'top-in-row': return Top1InRow
    case 'top-sum': return Top1
    case 'battles': return Battles
    default: return undefined
  }
}

function getPrecisionForSlot(slotValue: SlotValue) {
  switch (slotValue) {
    case 'dmg-avg':
    case 'frags-avg':
    case 'position-avg':
    case 'score-avg': return 1
    default: return undefined
  }
}

function getValuesForSlot(slotValue: SlotValue) {
  return props.lines.map(t => {
    switch (slotValue) {
      case 'dmg-max': return t.maxDmg
      case 'dmg-avg': return getAvg(t.sumDmg, t.battlesCount)
      case 'frags-max': return t.maxFrags
      case 'frags-avg': return getAvg(t.sumFrags, t.battlesCount)
      case 'xp-max': return t.maxXp
      case 'xp-avg': return getAvg(t.sumXp, t.battlesCount)
      case 'position-max': return t.bestPosition
      case 'position-avg': return getAvg(t.sumPosition, t.battlesCount)
      case 'score-max': return t.maxScore
      case 'score-avg': return getAvg(t.sumScore, t.battlesCount)
      case 'score-in-row-10-max': return t.maxScoreInRow
      case 'score-in-row-10': return t.currentScoreInRow
      case 'top-in-row': return t.maxTopInRow
      case 'top-sum': return t.sumTop
      case 'battles': return t.battlesCount
      default: return 0
    }
  })
}

const minIsBest = new Set<SlotValue>(['position-avg', 'position-max'])
function getSlotResult(slotValue: SlotValue) {
  const values = getValuesForSlot(slotValue)
  const best = minIsBest.has(slotValue) ? Math.min(...values) : Math.max(...values)
  return values.map(t => ({
    value: t,
    type: slotValue,
    isBest: slotValue !== 'battles' && t == best
  }))
}

const slot1 = computed(() => getSlotResult(props.slot1 ?? 'empty'))
const slot2 = computed(() => getSlotResult(props.slot2 ?? 'empty'))
const slot3 = computed(() => getSlotResult(props.slot3 ?? 'empty'))
const slot4 = computed(() => getSlotResult(props.slot4 ?? 'empty'))
const slot5 = computed(() => getSlotResult(props.slot5 ?? 'empty'))

const slotsTypes = computed(() => [props.slot1, props.slot2, props.slot3, props.slot4, props.slot5].filter(s => s && s != 'empty') as SlotValue[])

const slots = computed(() => {
  return [slot1, slot2, slot3, slot4, slot5].filter(s => s.value[0].type != 'empty')
})

const fontSize = computed(() => {
  switch (slotsTypes.value.length) {
    case 0: return '2.4em'
    case 1: return '2.1em'
    case 2: return '1.6em'
    case 3: return '1.35em'
    case 4: return '1.2em'
    case 5: return '1em'
    default: return '1em'
  }
})

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.3em;
  line-height: 1.2;

  .lines {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    .line {
      display: flex;

      &.header {
        .image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            height: 2.3em;
            margin: -0.7em;
            margin-bottom: -0.4em;
            fill: var(--wotstat-accent);
          }
        }
      }

      p {
        flex: 1;
        overflow: hidden;
        text-align: center;
      }

      .name {
        flex: 2;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }
    }
  }

}
</style>