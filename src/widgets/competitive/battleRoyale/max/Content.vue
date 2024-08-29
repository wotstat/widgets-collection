<template>
  <div class="main center">
    <div class="lines">
      <div class="line header">
        <div class="flex-2"></div>
        <div class="image">
          <Dmg class="icon" />
        </div>
        <div class="image">
          <Kills class="icon" />
        </div>
        <div class="image">
          <Top1 class="icon" />
        </div>
        <div class="image">
          <Battles class="icon" />
        </div>
      </div>
      <div class="line" v-for="line in lines">
        <p class="name" colspan="2">{{ line.name }}</p>
        <p class="number bold" :class="line.maxDmg == Math.max(...lines.map(t => t.maxDmg)) ? 'accent' : ''">
          {{ kProcessor(line.maxDmg) }}
        </p>
        <p class="number bold" :class="line.maxFrags == Math.max(...lines.map(t => t.maxFrags)) ? 'accent' : ''">
          {{ line.maxFrags }}
        </p>
        <p class="number bold" :class="line.maxTopInRow == Math.max(...lines.map(t => t.maxTopInRow)) ? 'accent' : ''">
          {{ line.maxTopInRow }}
        </p>
        <p class="number bold">{{ line.battlesCount }}</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Dmg from '@/assets/actions/avg-dmg.svg'
import Kills from '@/assets/actions/avg-kills.svg'
import Battles from '@/assets/actions/battles.svg'
import Top1 from '@/assets/actions/top1.svg'

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
}>()

function kProcessor(number: number) {
  if (number < 10000) return number
  if (number < 1000000) return (number / 1000).toFixed(1) + 'k'
}

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.3em;
  line-height: 1;

  .lines {
    display: flex;
    flex-direction: column;
    gap: 0.6em;

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