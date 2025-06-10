<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :colorFrom="targetGradient.from" :colorTo="targetGradient.to" :title :period :showTitle :periodLine
      :battlesLine :photoLine :hpLine :photoType :isInBattle="isInBattle ?? false" :battles :score="totalScore" :players
      :gradient :animation :widgetStyle />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, ref, watch } from 'vue';
import { Color, oneOf, StringDefault, useQueryParams, } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { merfiGradient } from './define.widget';
import { useBattleResult } from '@/composition/useOnBattleResult';
import { syncRefs } from '@vueuse/core';
import { usePlatoonWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { useWidgetMainTab } from '@/composition/useWidgetMainTab';

function personalScore(damage: number, frags: number): number {
  return damage + frags * 300;
}

function teamScore(isWin: boolean) {
  return isWin ? 3000 : 0;
}

const { colorFrom, colorTo, title, period, showTitle, periodLine,
  battlesLine, photoLine, photoType, hpLine, channelKey, gradient, widgetStyle, animation, accent } = useQueryParams({
    colorFrom: Color(merfiGradient.from),
    colorTo: Color(merfiGradient.to),
    title: StringDefault(),
    period: StringDefault(),
    showTitle: oneOf(['never', 'hangar', 'battle', 'both'] as const, 'both'),
    periodLine: oneOf(['never', 'hangar', 'battle', 'both'] as const, 'both'),
    battlesLine: oneOf(['never', 'hangar', 'battle', 'both'] as const, 'both'),
    photoLine: Boolean,
    animation: Boolean,
    photoType: oneOf(['never', 'photo', 'tank'] as const, 'photo'),
    widgetStyle: oneOf(['merfi', 'simple', 'custom'] as const, 'custom'),
    hpLine: Boolean,
    gradient: Boolean,
    channelKey: String,
    accent: Color('#ff9800')
  })

const targetGradient = computed(() => {
  let from = merfiGradient.from;
  let to = merfiGradient.to;

  if (widgetStyle === 'simple') {
    from = accent;
    to = accent;
  } else if (widgetStyle === 'custom') {
    from = colorFrom ?? merfiGradient.from;
    to = colorTo ?? merfiGradient.to;
  }

  return { from, to };
});


const { sdk } = useWidgetSdk();

const isInBattle = useReactiveState(sdk.data.battle.isInBattle);
const platoon = useReactiveState(sdk.data.platoon.slots)
const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)

const maxHp = useReactiveState(sdk.data.battle.maxHealth)
const hp = useReactiveState(sdk.data.battle.health)
const vehicle = useReactiveState(sdk.data.battle.vehicle)
const hangarVehicle = useReactiveState(sdk.data.hangar.vehicle.info)
const damage = useReactiveState(sdk.data.battle.efficiency.damage)

const battles = useWidgetStorage('battleCount', 0, { groupByPlatoon: true })
const totalScore = useWidgetStorage('score', 0, { groupByPlatoon: true })
const scoreByPlayer = useWidgetStorage('scoreByPlayer',
  new Map<number, { frags: number, damage: number }>(),
  { groupByPlatoon: true })
const fragsCount = ref(0)

const isMain = useWidgetMainTab()

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

const currentBattleScore = computed(() => {
  if (!isInBattle.value) return 0;
  return personalScore(damage.value ?? 0, fragsCount.value);
})

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


watch(isInBattle, (inBattle) => fragsCount.value = 0, { immediate: true })
useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'kill') fragsCount.value += 1
})


useBattleResult((parsed, result) => {
  if (!isMain.value) return;

  battles.value += 1
  totalScore.value += parsed.platoon
    .filter(p => p !== undefined)
    .map(p => personalScore(p.stats.damageDealt, p.stats.kills))
    .reduce((a, b) => a + b, 0) + teamScore(parsed.result == 'win')

  for (const person of parsed.platoon) {
    if (!person || person.player == 'bot') continue;
    const current = scoreByPlayer.value.get(person.player.bdid) ?? { frags: 0, damage: 0 }
    scoreByPlayer.value.set(person.player.bdid, {
      frags: current.frags + person.stats.kills,
      damage: current.damage + person.stats.damageDealt
    })
  }
})


</script>


<style lang="scss" scoped></style>