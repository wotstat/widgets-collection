<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :colorFrom :colorTo :title :period :showTitle :periodLine :battlesLine :photoLine :hpLine :photoType
      :isInBattle="isInBattle ?? false" :battles :score="totalScore" :players />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, ref, watch } from 'vue';
import { Color, NumberDefault, oneOf, StringDefault, useQueryParams, } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { defaultGradient } from './define.widget';
import { useBattleResult } from '@/composition/useOnBattleResult';
import { syncRefs, useLocalStorage } from '@vueuse/core';
import { usePlatoonWidgetRelay, useWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';

const { colorFrom, colorTo, title, period, showTitle, periodLine,
  battlesLine, photoLine, photoType, hpLine, channelKey } = useQueryParams({
    colorFrom: Color(defaultGradient.from),
    colorTo: Color(defaultGradient.to),
    title: StringDefault(),
    period: StringDefault(),
    showTitle: oneOf(['never', 'hangar', 'battle', 'both'] as const, 'both'),
    periodLine: oneOf(['never', 'hangar', 'battle', 'both'] as const, 'both'),
    battlesLine: oneOf(['never', 'hangar', 'battle', 'both'] as const, 'both'),
    photoLine: Boolean,
    photoType: oneOf(['never', 'photo', 'tank'] as const, 'photo'),
    hpLine: Boolean,
    channelKey: String,
  })



const { sdk } = useWidgetSdk();

const isInBattle = useReactiveState(sdk.data.battle.isInBattle);
const platoon = useReactiveState(sdk.data.platoon.slots)
const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)

const maxHp = useReactiveState(sdk.data.battle.maxHealth)
const hp = useReactiveState(sdk.data.battle.health)
const vehicle = useReactiveState(sdk.data.battle.vehicle)
const damage = useReactiveState(sdk.data.battle.efficiency.damage)

const battles = useWidgetStorage('battleCount', 0, { groupByPlatoon: true })
const totalScore = useWidgetStorage('score', 0, { groupByPlatoon: true })
const fragsCount = ref(0)

const { relay, uuid } = usePlatoonWidgetRelay(channelKey)
const relayState = useReactiveRelayState(relay, 'stats', {
  id: 0,
  name: '',
  tankName: '',
  score: 0,
  hp: 0,
  maxHp: 0,
  connected: true
})

const currentBattleScore = computed(() => {
  if (!isInBattle.value) return 0;
  return 300 * fragsCount.value + (damage.value ?? 0);
})

const target = computed(() => {
  return {
    id: playerId.value ?? 0,
    name: playerName.value ?? 'Loading...',
    tankName: (isInBattle.value ? vehicle.value?.localizedShortName : '???') ?? '???',
    score: currentBattleScore.value,
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

    if (!remote) return {
      name: slot.name ?? 'Loading...',
      tankName: slot.vehicle?.localizedShortName ?? '???',
      score: 0,
      hp: 0,
      maxHp: 0,
      connected: false,
    }

    return {
      name: remote.name ?? 'Loading...',
      tankName: remote.tankName ?? '???',
      score: remote.score,
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

})


</script>


<style lang="scss" scoped></style>