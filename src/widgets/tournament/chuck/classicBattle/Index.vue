<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :skin :totalScoreDisplay :border :isInBattle="isInBattle ?? false" :startedBattlesCount="startedBattles"
      :score="resultedBattleScore || battleScore" :totalScore :players="players" :battlesCount="battles" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, ref, watch, watchEffect } from 'vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useBattleResult } from '@/composition/useOnBattleResult';
import { useWidgetMainTab } from '@/composition/useWidgetMainTab';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { usePlatoonWidgetRelay } from '@/composition/useWidgetRelay';
import { syncRefs } from '@vueuse/core';

function personalScore(damage: number, frags: number): number {
  return damage + frags * 300;
}

function teamScore(isWin: boolean) {
  return isWin ? 3000 : 0;
}

const { skin, border, channelKey, totalScore: totalScoreDisplay } = useQueryParams({
  skin: oneOf(['transparent', 'default', 'dot'] as const, 'transparent'),
  border: Boolean,
  channelKey: String,
  totalScore: oneOf(['never', 'hangar', 'both'] as const, 'both')
})

const { sdk } = useWidgetSdk();

const platoon = useReactiveState(sdk.data.platoon.slots)
const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)
const isInBattle = useReactiveState(sdk.data.battle.isInBattle);
const arenaId = useReactiveState(sdk.data.battle.arenaId)

const maxHp = useReactiveState(sdk.data.battle.maxHealth)
const hp = useReactiveState(sdk.data.battle.health)
const vehicle = useReactiveState(sdk.data.battle.vehicle)
const hangarVehicle = useReactiveState(sdk.data.hangar.vehicle.info)
const damage = useReactiveState(sdk.data.battle.efficiency.damage)


const { relay, uuid } = usePlatoonWidgetRelay(channelKey)
const relayState = useReactiveRelayState(relay, 'stats', {
  id: 0,
  name: '',
  tankName: '',
  tankTag: '',
  totalScore: 0,
  score: 0,
  hp: 0,
  maxHp: 0,
  connected: true
})

const battles = useWidgetStorage('battleCount', 0, { groupByPlatoon: true })
const totalScore = useWidgetStorage('score', 0, { groupByPlatoon: true })
const scoreByPlayer = useWidgetStorage('scoreByPlayer',
  new Map<number, { frags: number, damage: number, lastFrags: number, lastDamage: number }>(),
  { groupByPlatoon: true })

const startedBattles = useWidgetStorage('startedBattles', 0, { groupByPlatoon: true })
const battleScore = useWidgetStorage('battleScore', 0, { groupByPlatoon: true })
const resultedBattleScore = useWidgetStorage('resultedBattleScore', 0, { groupByPlatoon: true })
const battleFrags = useWidgetStorage('battleFrags', 0, { groupByPlatoon: true })
const battleDamage = useWidgetStorage('battleDamage', 0, { groupByPlatoon: true })
watch(isInBattle, (inBattle, old) => {
  if (old == false && inBattle) {
    resultedBattleScore.value = 0
    battleFrags.value = 0
    battleScore.value = 0
    battleDamage.value = 0
    startedBattles.value += 1
  }
}, { immediate: true })

let lastArenaId = 0
watch(arenaId, (id, old) => {
  if (id) lastArenaId = id
}, { immediate: true })

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => { if (feedback.type == 'kill') battleFrags.value += 1 })
watch(() => damage.value, (newDamage) => {
  if (!newDamage) return
  battleDamage.value = newDamage
})

const currentBattleScore = computed(() => personalScore(battleDamage.value, battleFrags.value))

const target = computed(() => {
  const totalInfo = scoreByPlayer.value.get(playerId.value ?? -1) ?? { frags: 0, damage: 0 }
  const totalScore = personalScore(totalInfo.damage, totalInfo.frags)

  return {
    id: playerId.value ?? 0,
    name: playerName.value ?? 'Loading...',
    tankName: (isInBattle.value ? vehicle.value?.localizedShortName : hangarVehicle.value?.localizedShortName) ?? '???',
    tankTag: (isInBattle.value ? vehicle.value?.tag : hangarVehicle.value?.tag) ?? 'unknown',
    score: currentBattleScore.value,
    totalScore,
    hp: hp.value ?? 0,
    maxHp: maxHp.value ?? 0,
    connected: true
  }
})

syncRefs(target, relayState.state)

const relayValuesByPlayerId = computed(() => {
  const values = relayState.all.value.entries();
  const resMap = new Map([...values].map(([uuid, value]) => [value.id, value]))
  resMap.set(target.value.id, target.value)
  return resMap
})


const players = computed(() => {
  const platoonSlots = platoon.value?.filter(t => t != null) ?? []

  if (platoonSlots.length <= 1) return [target.value]

  return platoonSlots.map(slot => {
    const id = slot.dbid
    const remote = relayValuesByPlayerId.value.get(id)

    const totalInfo = scoreByPlayer.value.get(id) ?? { frags: 0, damage: 0 }
    const totalScore = personalScore(totalInfo.damage, totalInfo.frags)

    if (!remote) return {
      name: slot.name ?? 'Loading...',
      tankName: slot.vehicle?.localizedShortName ?? '???',
      tankTag: slot.vehicle?.tag ?? 'unknown',
      score: 0,
      totalScore,
      hp: 0,
      maxHp: 0,
      connected: false,
    }

    return {
      name: remote.name ?? 'Loading...',
      tankName: remote.tankName ?? '???',
      tankTag: remote.tankTag ?? 'unknown',
      score: remote.score,
      totalScore,
      hp: remote.hp,
      maxHp: remote.maxHp,
      connected: remote.connected,
    }
  })
})



watch(() => players.value, (p) => battleScore.value = p.reduce((acc, player) => acc + player.score, 0))

const isMain = useWidgetMainTab()

useBattleResult((parsed, result) => {
  if (!isMain.value) return;

  battles.value += 1

  const score = parsed.platoon
    .filter(p => p !== undefined)
    .map(p => personalScore(p.stats.damageDealt, p.stats.kills))
    .reduce((a, b) => a + b, 0) + teamScore(parsed.result == 'win')

  totalScore.value += score
  if (lastArenaId == parsed.arenaUniqueID)
    resultedBattleScore.value = score

  for (const person of parsed.platoon) {
    if (!person || person.player == 'bot') continue;
    const current = scoreByPlayer.value.get(person.player.bdid) ?? { frags: 0, damage: 0 }
    scoreByPlayer.value.set(person.player.bdid, {
      frags: current.frags + person.stats.kills,
      damage: current.damage + person.stats.damageDealt,
      lastFrags: person.stats.kills,
      lastDamage: person.stats.damageDealt,
    })
  }
})


</script>


<style lang="scss" scoped></style>