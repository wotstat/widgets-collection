<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :value="timer" :showEvents :showPb :pb="personalBest" :events />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, ref, watch } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { objectEntries, timestamp, useTimestamp } from '@vueuse/core';
import { Events, Target, target as targets } from './define.widget';

const { showEvents, showPb, target } = useQueryParams({
  showEvents: Boolean,
  showPb: Boolean,
  target: oneOf(targets),
})

const { sdk } = useWidgetSdk();

const startTime = ref(0)
const personalBest = useWidgetStorage<number[]>('personalBest', [])

const eventsMap = ref<Map<Events, number>>(new Map())
const events = computed(() => [...eventsMap.value.entries()].map(([type, time]) => ({ type, time })))

const { timestamp: time, pause, resume, isActive } = useTimestamp({
  interval: 40,
  controls: true,
  immediate: false
})

const timer = computed(() => {
  if (startTime.value == 0) return 0
  if (time.value - startTime.value < 0) return 0
  return (time.value - startTime.value) / 1000
})

const isInBattle = useReactiveState(sdk.data.battle.isInBattle, isInBattle => {
  if (!isInBattle) return
  startTime.value = 0
  eventsMap.value.clear()
})

const period = useReactiveState(sdk.data.battle.period)

function reachTarget() {
  if (!isActive.value) return

  pause()
  const delta = timer.value
  if (delta <= 0) return
  personalBest.value.push(delta)
  personalBest.value = personalBest.value.sort((a, b) => a - b).slice(0, 5)
}

function startTimer() {
  if (isActive.value) return
  eventsMap.value.clear()
  resume()
  startTime.value = timestamp()
}

function onEvent(type: Target) {
  if (target == type) reachTarget()

  console.log(`Event: ${type} (${timer.value})`);

  if (type == 'end-battle') return

  if (!eventsMap.value.has(type)) {
    eventsMap.value.set(type, timer.value)
  } else {
    eventsMap.value.set(type, Math.min(eventsMap.value.get(type)!, timer.value))
  }
}

watch(period, (period, old) => { if (old?.tag == 'PREBATTLE' && period?.tag == 'BATTLE') startTimer() })
watch(period, (period, old) => {
  if (old?.tag == 'BATTLE' && period?.tag != 'BATTLE') {
    onEvent('end-battle')
    pause()
  }
})

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  switch (feedback.type) {
    case 'damage':
      if (feedback.data.attackReason == 'ramming') {
        onEvent('ram')
      } else {
        onEvent('dmg')
      }
      break;
    case 'kill':
      onEvent('kill')
      if (feedback.data.vehicle.class == 'SPG') onEvent('kill-spg')
      break;
    case 'receivedDamage':
      onEvent('receive-dmg')
      break;
    default:
      break;
  }
})

const health = useReactiveState(sdk.data.battle.health)
const maxHealth = useReactiveState(sdk.data.battle.maxHealth)

watch([isInBattle, health, maxHealth], ([isInBattle, health, maxHealth]) => {
  if (!isInBattle || health == undefined || maxHealth == undefined) return
  if (health < maxHealth * 0.5 && !eventsMap.value.has('loss-50hp')) onEvent('loss-50hp')
})

const arena = useReactiveState(sdk.data.battle.arena)
useReactiveState(sdk.data.battle.teamBases, bases => {
  if (bases == undefined) return

  const enemyBases = objectEntries(bases).find(([team]) => team != arena.value?.team)?.[1]

  const base = enemyBases?.find(base => base.points >= 80)
  if (base && !eventsMap.value.has('base-capture-80')) onEvent('base-capture-80')
})

const isAlive = useReactiveState(sdk.data.battle.isAlive)
watch(isAlive, (isAlive, oldAlive) => {
  if (oldAlive && !isAlive) onEvent('death')
})
</script>


<style lang="scss" scoped></style>