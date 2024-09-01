<template>
  <WidgetCardWrapper auto-height auto-scale>
    <Content :lines="lines" :dmg="query.dmg" :frags="query.frags" :top="query.top" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { computed, watch } from 'vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useStorageRelayState } from '@/composition/useStorageRelayState';
import { useWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { v4 as uuidv4 } from "uuid";
import { useBattleResult } from '@/composition/useOnBattleResult';


const checkIsTop = (rank: number | null) => rank !== null && rank == 1

const query = useQueryParams<{
  startFrom: string
  title: string
  saveKey: string
  channelKey: string
  dmg: 'max' | 'avg'
  frags: 'max' | 'avg'
  top: 'in-row' | 'sum'
}>()

const { sdk } = useWidgetSdk();

const { relay } = useWidgetRelay(query.channelKey ?? uuidv4())

const playerNamesRelay = useReactiveRelayState(relay.createState('playerName', ''))
const statsRelay = useStorageRelayState(relay, 'stats', (query.saveKey ?? '') + '_stats', {
  battlesCount: 0,
  maxDmg: 0,
  sumDmg: 0,
  maxFrags: 0,
  sumFrags: 0,
  sumTop: 0,
  maxTopInRow: 0,
})

const lines = computed(() => {
  const uniqValues = new Map([...playerNamesRelay.all.value.entries()].map(([id, name]) => ([name, id])))

  return [...uniqValues.entries()].map(([name, id]) => {
    const stats = statsRelay.all.value.get(id)
    return {
      name,
      maxDmg: stats?.maxDmg ?? 0,
      maxFrags: stats?.maxFrags ?? 0,
      maxTopInRow: stats?.maxTopInRow ?? 0,
      sumTop: stats?.sumTop ?? 0,
      sumDmg: stats?.sumDmg ?? 0,
      sumFrags: stats?.sumFrags ?? 0,
      battlesCount: stats?.battlesCount ?? 0,
    }
  }).filter(l => l.name != '')
})

const playerName = useReactiveState(sdk.data.player.name)
watch(playerName, (name) => playerNamesRelay.state.value = name ?? '')

const battlesHistory = useWidgetStorage<{ id: number, rank: number | null }[]>((query.saveKey ?? '') + 'startedBattles', [])
const arenaInfo = useReactiveState(sdk.data.battle.arena)
const arenaId = useReactiveState(sdk.data.battle.arenaId)
watch(() => [arenaInfo.value, arenaId.value] as const, ([info, arenaId]) => {
  if (!info || !arenaId) return
  if (info.mode !== 'BATTLE_ROYALE_SOLO') return

  if (battlesHistory.value.some(b => b.id == arenaId)) return

  battlesHistory.value.push({ id: arenaId, rank: null })
  console.log('Started battle: ', arenaId);
})

function calculateTopInRow() {
  let maxTopInRow = 0
  let currentTopInRow = 0
  for (const battle of battlesHistory.value) {
    if (checkIsTop(battle.rank)) {
      currentTopInRow++
      maxTopInRow = Math.max(maxTopInRow, currentTopInRow)
    } else {
      currentTopInRow = 0
    }
  }
  return maxTopInRow
}

function smartStripResults() {
  let lastNonTopIndex = 0

  for (let i = 0; i < battlesHistory.value.length; i++) {
    const rank = battlesHistory.value[i].rank
    if (rank === null) break
    if (!checkIsTop(rank)) lastNonTopIndex = i
  }

  if (lastNonTopIndex > 0) {
    battlesHistory.value = battlesHistory.value.slice(lastNonTopIndex + 1)
  }
}

useBattleResult((parsed) => {
  if (parsed.common.bonusType != 29) return console.log('Not a battle royale battle')

  const arenaId = parsed.arenaUniqueID
  const battleHistoryIndex = battlesHistory.value.findIndex(b => b.id == arenaId)
  if (battleHistoryIndex == -1) return console.error(`Battle result for unknown battle: ${arenaId}`);

  console.log('Battle result for: ', arenaId);

  const dmg = parsed.personal?.stats.damageDealt ?? 0
  const frags = parsed.personal?.stats.kills ?? 0
  const rank = parsed.personal?.player.avatar.playerRank ?? 0
  const isTop = checkIsTop(rank)
  battlesHistory.value[battleHistoryIndex].rank = rank
  const maxTopInRow = calculateTopInRow()

  const current = statsRelay.state.value
  current.battlesCount += 1
  current.maxDmg = Math.max(current.maxDmg, dmg)
  current.sumDmg += dmg
  current.maxFrags = Math.max(current.maxFrags, frags)
  current.sumFrags += frags
  current.sumTop += isTop ? 1 : 0
  current.maxTopInRow = Math.max(current.maxTopInRow, maxTopInRow)

  console.log('Stats updated: ', current);

  smartStripResults()

  console.log('Battles history updated: ', battlesHistory.value);

  statsRelay.trigger()
})

</script>


<style lang="scss" scoped></style>