<template>
  <WidgetWrapper auto-scale auto-height>
    <TitledCounter :title="titleEnabled ? ((reverse && reversedTitle) ? reversedTitle : title) : false"
      :value="formattedCount" :skin />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import TitledCounter from './TitledCounter.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { computed, watch } from 'vue';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useBattleResult } from '@/composition/useOnBattleResult';

const props = defineProps<{
  title: string
  reversedTitle?: string
  value: number | undefined
  stat: 'damageBlockedByArmor' | 'damageDealt' | 'damageAssistedRadio' | 'kills'
}>()

const { sdk } = useWidgetSdk();

const { startFrom, title: titleEnabled, reverse, skin } = useQueryParams({
  startFrom: NumberDefault(),
  title: Boolean,
  reverse: Boolean,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const tempResults = useWidgetStorage('tempResults', new Map<number, number>())

const arenaId = useReactiveState(sdk.data.battle.arenaId)
const collected = useWidgetStorage('collected', 0)

watch(() => props.value, (value, old) => {
  if (value == 0 || value == undefined || old == undefined) return
  const delta = value - old
  collected.value += reverse ? -delta : delta;

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
  collected.value += reverse ? -delta : delta;
})

const targetCount = computed(() => startFrom + collected.value)
const formattedCount = computed(() => reverse && startFrom >= 0 ? Math.max(0, targetCount.value) : targetCount.value)

</script>


<style lang="scss" scoped></style>