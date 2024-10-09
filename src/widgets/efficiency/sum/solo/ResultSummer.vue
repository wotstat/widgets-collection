<template>
  <WidgetCardWrapper auto-scale auto-height>
    <TitledCounter :title :value="targetCount" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import TitledCounter from './TitledCounter.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import { NumberDefault, useQueryParams } from '@/composition/useQueryParams';
import { computed, watch } from 'vue';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useBattleResult } from '@/composition/useOnBattleResult';

const props = defineProps<{
  title: string
  value: number | undefined
  stat: 'damageBlockedByArmor' | 'damageDealt' | 'damageAssistedRadio' | 'kills'
}>()

const { sdk } = useWidgetSdk();

const { saveKey, startFrom, title } = useQueryParams({
  saveKey: String,
  startFrom: NumberDefault(),
  title: Boolean
})

const tempResults = useWidgetStorage(`${saveKey ?? ''}_tempResults`, new Map<number, number>())

const arenaId = useReactiveState(sdk.data.battle.arenaId)
const collected = useWidgetStorage(saveKey ?? '_empty', 0)

watch(() => props.value, (value, old) => {
  if (value == 0 || value == undefined || old == undefined) return
  const delta = value - old
  collected.value += delta

  if (arenaId.value) {
    const old = tempResults.value.get(arenaId.value) ?? 0
    tempResults.value.set(arenaId.value, old + delta)
  }
})

useBattleResult((parsed, res) => {
  if (!parsed) return
  const arenaId = parsed.arenaUniqueID
  const resultValue = parsed.personal?.stats[props.stat]

  if (!resultValue) return

  const tempValue = tempResults.value.get(arenaId)
  const delta = resultValue - (tempValue ?? 0)
  tempResults.value.delete(arenaId)

  console.log(`Got battle result for arena ${arenaId}: ${resultValue} (temp: ${tempValue}) delta = ${delta}`)
  collected.value += delta
})

const targetCount = computed(() => startFrom + collected.value)

</script>


<style lang="scss" scoped></style>