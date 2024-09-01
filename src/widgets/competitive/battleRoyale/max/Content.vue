<template>
  <div class="main center">
    <div class="lines">
      <div class="line header">
        <div class="flex-2"></div>
        <div class="image">
          <DmgMax v-if="dmg == 'max'" class="icon" />
          <DmgAvg v-else class="icon" />
        </div>
        <div class="image">
          <KillsMax v-if="frags == 'max'" class="icon" />
          <KillsAvg v-else class="icon" />
        </div>
        <div class="image">
          <Top1InRow v-if="top == 'in-row'" class="icon" />
          <Top1 v-else class="icon" />
        </div>
        <div class="image">
          <Battles class="icon" />
        </div>
      </div>
      <div class="line" v-for="(line, i) in lines" :key="line.name">
        <p class="name">{{ line.name }}</p>
        <p class="number bold" :class="dmgValues[i].isMax ? 'accent' : ''">
          <TweenValue :value="dmgValues[i].value" :processor="kProcessor" />
        </p>
        <p class="number bold" :class="killsValues[i].isMax ? 'accent' : ''">
          <TweenValue :value="killsValues[i].value" :precision="frags == 'avg' ? 1 : undefined" />
        </p>
        <p class="number bold" :class="topValues[i].isMax ? 'accent' : ''">
          <TweenValue :value="topValues[i].value" />
        </p>
        <p class="number bold">
          <TweenValue :value="line.battlesCount" />
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import DmgMax from '@/assets/actions/dmg-max.svg'
import DmgAvg from '@/assets/actions/dmg-avg.svg'
import KillsMax from '@/assets/actions/kill-max.svg'
import KillsAvg from '@/assets/actions/kill-avg.svg'
import Battles from '@/assets/actions/battles.svg'
import Top1 from '@/assets/actions/top1.svg'
import Top1InRow from '@/assets/actions/top1-in-row.svg'
import TweenValue from '@/components/TweenValue.vue';
import { computed } from 'vue'

const props = defineProps<{
  lines: {
    name: string
    maxDmg: number
    maxFrags: number
    maxTopInRow: number
    sumTop: number
    sumDmg: number
    sumFrags: number
    battlesCount: number
  }[]
  showBattleCount?: boolean
  dmg?: 'max' | 'avg'
  frags?: 'max' | 'avg'
  top?: 'in-row' | 'sum'
}>()

function kProcessor(number: number) {
  if (number < 10000) return Math.round(number)
  if (number < 1000000) return (number / 1000).toFixed(1) + 'k'
}

const dmgValues = computed(() => {
  const res = props.lines.map(t => props.dmg == 'max' ? t.maxDmg : t.sumDmg / t.battlesCount)
  const max = Math.max(...res)
  return res.map(t => ({
    value: t,
    isMax: t == max
  }))
})

const killsValues = computed(() => {
  const res = props.lines.map(t => props.frags == 'max' ? t.maxFrags : t.sumFrags / t.battlesCount)
  const max = Math.max(...res)
  return res.map(t => ({
    value: t,
    isMax: t == max
  }))
})

const topValues = computed(() => {
  const res = props.lines.map(t => props.top == 'in-row' ? t.maxTopInRow : t.sumTop)
  const max = Math.max(...res)
  return res.map(t => ({
    value: t,
    isMax: t == max
  }))
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
            height: 1.8em;
            margin: -0.8em;
            margin-bottom: -0.5em;
            fill: white;
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