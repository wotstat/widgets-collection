<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :lines="lines" :slot1="query.slot1" :slot2="query.slot2" :slot3="query.slot3" :slot4="query.slot4"
        :slot5="query.slot5" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { computed, watch } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useStorageRelayState } from '@/composition/useStorageRelayState';
import { useWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { v4 as uuidv4 } from "uuid";
import { useBattleResult } from '@/composition/useOnBattleResult';
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { Line, slotValues } from './define.widget';


const checkIsTop = (rank: number | null) => rank !== null && rank == 1

const query = useQueryParams({
  startFrom: { type: Number, default: 0 },
  title: Boolean,
  channelKey: String,
  allowSquad: Boolean,
  slot1: oneOf(slotValues, 'empty'),
  slot2: oneOf(slotValues, 'empty'),
  slot3: oneOf(slotValues, 'empty'),
  slot4: oneOf(slotValues, 'empty'),
  slot5: oneOf(slotValues, 'empty')
})

const allowBattles = new Set(['BATTLE_ROYALE_SOLO', 'BATTLE_ROYALE_SQUAD'])
if (query.allowSquad) allowBattles.delete('BATTLE_ROYALE_SQUAD')

const { sdk } = useWidgetSdk();
const { relay } = useWidgetRelay(query.channelKey ?? uuidv4())

const playerNamesRelay = useReactiveRelayState(relay, 'playerName', '')
const statsRelay = useStorageRelayState<Omit<Line, 'name'>>(relay, 'stats', {
  maxDmg: 0,
  sumDmg: 0,
  maxFrags: 0,
  sumFrags: 0,
  maxXp: 0,
  sumXp: 0,
  bestPosition: 0,
  sumPosition: 0,
  maxScore: 0,
  sumScore: 0,
  currentScoreInRow: 0,
  maxScoreInRow: 0,
  maxTopInRow: 0,
  sumTop: 0,
  battlesCount: 0,
})

const lines = computed(() => {
  const uniqValues = new Map([...playerNamesRelay.all.value.entries()].map(([id, name]) => ([name, id])))

  return [...uniqValues.entries()].map(([name, id]) => {
    const stats = statsRelay.all.value.get(id)
    return {
      name,
      maxDmg: stats?.maxDmg ?? 0,
      maxFrags: stats?.maxFrags ?? 0,
      maxXp: stats?.maxXp ?? 0,
      bestPosition: stats?.bestPosition ?? 0,
      maxScore: stats?.maxScore ?? 0,
      maxScoreInRow: stats?.maxScoreInRow ?? 0,
      currentScoreInRow: stats?.currentScoreInRow ?? 0,
      maxTopInRow: stats?.maxTopInRow ?? 0,
      sumTop: stats?.sumTop ?? 0,
      sumDmg: stats?.sumDmg ?? 0,
      sumFrags: stats?.sumFrags ?? 0,
      sumXp: stats?.sumXp ?? 0,
      sumPosition: stats?.sumPosition ?? 0,
      sumScore: stats?.sumScore ?? 0,
      battlesCount: stats?.battlesCount ?? 0,
    }
  }).filter(l => l.name != '')
})

const playerName = useReactiveState(sdk.data.player.name)
watch(playerName, (name) => playerNamesRelay.state.value = name ?? '')

const battlesHistoryTop = useWidgetStorage<{ id: number, rank: number | null }[]>('startedBattles', [])
const battlesHistoryScore = useWidgetStorage<{ id: number, score: number | null }[]>('scoreBattles', [])
const arenaInfo = useReactiveState(sdk.data.battle.arena)
const arenaId = useReactiveState(sdk.data.battle.arenaId)

watch(() => [arenaInfo.value, arenaId.value] as const, ([info, arenaId]) => {
  if (!info || !arenaId) return
  if (!allowBattles.has(info.mode)) return

  if (battlesHistoryTop.value.some(b => b.id == arenaId)) return

  battlesHistoryTop.value.push({ id: arenaId, rank: null })
  battlesHistoryScore.value.push({ id: arenaId, score: null })
  console.log('Started battle: ', arenaId);
})

function calculateScore(rank: number, frags: number) {
  if (rank === 0) return 0
  const scoreByRank = [37, 30, 27, 24, 22, 20, 18, 16, 14, 12, 10, 9, 8, 7, 6]
  return scoreByRank[rank - 1] + frags * 2
}

function calculateTopInRow() {
  let maxTopInRow = 0
  let currentTopInRow = 0
  for (const battle of battlesHistoryTop.value) {
    if (checkIsTop(battle.rank)) {
      currentTopInRow++
      maxTopInRow = Math.max(maxTopInRow, currentTopInRow)
    } else {
      currentTopInRow = 0
    }
  }
  return maxTopInRow
}

function calculateScoreInRow() {
  const array = battlesHistoryScore.value
  const firstNullIndex = array.findIndex(b => b.score === null)
  const lastIndex = firstNullIndex === -1 ? array.length : firstNullIndex

  let sum = 0
  for (let i = Math.max(0, lastIndex - 10); i < lastIndex; i++) {
    const score = array[i].score
    if (score === null) {
      console.error('Score in row calculation error')
      return 0
    }
    sum += score
  }

  return sum
}

function calculateMaxScoreInRow() {
  const array = battlesHistoryScore.value
  let currentMovingSum = array.slice(0, 10).reduce((acc, b) => acc + (b.score ?? 0), 0)
  let max = currentMovingSum

  for (let i = 10; i < array.length; i++) {
    currentMovingSum += (array[i].score ?? 0) - (array[i - 10].score ?? 0)
    max = Math.max(max, currentMovingSum)
  }

  return max
}

function smartStripResults() {
  let lastNonTopIndex = 0

  for (let i = 0; i < battlesHistoryTop.value.length; i++) {
    const rank = battlesHistoryTop.value[i].rank
    if (rank === null) break
    if (!checkIsTop(rank)) lastNonTopIndex = i
  }

  if (lastNonTopIndex > 0) {
    battlesHistoryTop.value = battlesHistoryTop.value.slice(lastNonTopIndex + 1)
  }
}

useBattleResult((parsed) => {
  const arenaId = parsed.arenaUniqueID
  const battleHistoryIndex = battlesHistoryTop.value.findIndex(b => b.id == arenaId)
  const battleScoreIndex = battlesHistoryScore.value.findIndex(b => b.id == arenaId)
  if (battleHistoryIndex == -1 || battleScoreIndex == -1) return console.error(`Battle result for unknown battle: ${arenaId}`);

  console.log('Battle result for: ', arenaId);

  const dmg = parsed.personal?.stats.damageDealt ?? 0
  const frags = parsed.personal?.stats.kills ?? 0
  const xp = parsed.personal?.stats.xp ?? 0
  const rank = parsed.personal?.player.avatar.playerRank ?? 0
  const score = calculateScore(rank, frags)
  const isTop = checkIsTop(rank)

  battlesHistoryTop.value[battleHistoryIndex].rank = rank
  const maxTopInRow = calculateTopInRow()

  battlesHistoryScore.value[battleScoreIndex].score = score
  const scoreInRow = calculateScoreInRow()

  const c = statsRelay.state.value

  statsRelay.state.value = {
    battlesCount: c.battlesCount + 1,

    maxDmg: Math.max(c.maxDmg, dmg),
    sumDmg: c.sumDmg + dmg,

    maxFrags: Math.max(c.maxFrags, frags),
    sumFrags: c.sumFrags + frags,

    maxTopInRow: Math.max(c.maxTopInRow, maxTopInRow),
    sumTop: c.sumTop + (isTop ? 1 : 0),

    bestPosition: Math.min(c.bestPosition, rank),
    sumPosition: c.sumPosition + rank,

    maxScore: Math.max(c.maxScore, score),
    sumScore: c.sumScore + score,

    maxXp: Math.max(c.maxXp, xp),
    sumXp: c.sumXp + xp,

    currentScoreInRow: scoreInRow,
    maxScoreInRow: calculateMaxScoreInRow(),
  }

  console.log('Stats updated: ', statsRelay.state.value);

  smartStripResults()

  console.log('Battles history updated: ', battlesHistoryTop.value);

  statsRelay.trigger()
})

</script>


<style lang="scss" scoped></style>