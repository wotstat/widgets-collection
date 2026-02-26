<template>
  <WidgetWrapper autoScale autoHeight>
    <Content v-bind="{ ...settings, ...data }" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue'
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk'
import Content from './Content.vue'
import { watch } from 'vue'
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams'
import { useWidgetStorage } from '@/composition/useWidgetStorage'
import { SettingsProps } from './define.widget'
import { useBattleResult } from '@/composition/useOnBattleResult'

const { skin, hideTitle, lastBattle, totalBattles, timeInBattles, averagePerBattle, averagePerHour } = useQueryParams({
  skin: oneOf(['transparent', 'semi-transparent', 'default'] as const, 'transparent'),
  hideTitle: Boolean,
  lastBattle: Boolean,
  totalBattles: Boolean,
  timeInBattles: Boolean,
  averagePerBattle: Boolean,
  averagePerHour: Boolean,
})

const settings = { skin, hideTitle, lastBattle, totalBattles, timeInBattles, averagePerBattle, averagePerHour } satisfies SettingsProps

const data = useWidgetStorage('data', {
  value: 0,
  lastBattleValue: 0,
  totalBattlesValue: 0,
  timeInBattlesValue: 0,
  averagePerBattleValue: 0,
  averagePerHourValue: 0,
}, { groupByPlayerId: true })

useBattleResult((parsed, result: any) => {
  const personal = result.personal
  const results = Object.keys(personal).filter(t => t != 'avatar').map(t => personal[t])

  const currencies = results.map(t => ({
    credits: t.credits,
    autoLoadCost: t.autoLoadCost[0],
    autoEquipCost: t.autoEquipCost[0],
    autoRepairCost: t.autoRepairCost
  }))

  const sum = currencies.map(t => t.credits - t.autoLoadCost - t.autoEquipCost - t.autoRepairCost).reduce((a, v) => a + v, 0)

  data.value.value += sum
  data.value.lastBattleValue = sum
  data.value.totalBattlesValue += 1
  data.value.timeInBattlesValue += parsed.common.duration
  data.value.averagePerBattleValue = data.value.value / data.value.totalBattlesValue
  data.value.averagePerHourValue = data.value.timeInBattlesValue > 0 ? data.value.value / (data.value.timeInBattlesValue / 3600) : 0
})

</script>


<style lang="scss" scoped></style>