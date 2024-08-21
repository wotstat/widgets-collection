<template>
  <WidgetCardWrapper auto-scale auto-height>
    <TitledCounter :title :value="targetCount" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import TitledCounter from '../TitledCounter.vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { computed, watch } from 'vue';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { parseBattleResult } from '@/utils/battleResultParser';

const { sdk } = useWidgetSdk();

const query = useQueryParams<{
  saveKey: string,
  startFrom: string,
  title: string
}>()

const tempResults = new Map<number, number>()

const title = computed(() => query.title !== 'false' ? 'ЗАБЛОКИРОВАНО' : undefined)
const startFrom = computed(() => query.startFrom && Number.parseInt(query.startFrom) ? Number.parseInt(query.startFrom) : 0)
const collected = useWidgetStorage(query.saveKey ?? '_empty', 0)

const battleBlocked = useReactiveState(sdk.data.battle.efficiency.blocked)
const arenaId = useReactiveState(sdk.data.battle.arenaId)

watch(battleBlocked, (value, old) => {
  if (value == 0 || value == undefined || old == undefined) return
  const delta = value - old
  collected.value += delta

  if (arenaId.value) tempResults.set(arenaId.value, value)
})

useReactiveTrigger(sdk.data.battle.onBattleResult, result => {
  const parsed = parseBattleResult(result)
  if (!parsed) return

  const arenaId = parsed.arenaUniqueID
  const resultValue = parsed.personal?.stats.damageBlockedByArmor
  if (!arenaId || !resultValue) return

  const tempValue = tempResults.get(arenaId)
  const delta = resultValue - (tempValue ?? 0)
  console.log(result);


  console.log(`Got battle result for arena ${arenaId}: ${resultValue} (temp: ${tempValue}) delta = ${delta}`)
  collected.value += delta
})

const targetCount = computed(() => startFrom.value + collected.value)

</script>


<style lang="scss" scoped></style>