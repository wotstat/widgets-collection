<template>
  <WidgetWrapper autoScale autoHeight battleOnly hideSlotOnWarning>
    <Content v-if="display" :percent="percent" :time="time" :tangent="100 * (currentDispersion ?? 0)" :historyTime
      :historyTangent :skin="skin" :displayTitle="title" :displayValue="value" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { computed, ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { skins } from './define.widget';


const { skin, source, title, value } = useQueryParams({
  skin: oneOf(skins, 'protanki-new'),
  source: oneOf(['auto', 'server', 'client'] as const, 'auto'),
  title: Boolean,
  value: Boolean,
})

const { sdk } = useWidgetSdk();

const aimingTime = useReactiveState(sdk.data.battle.aiming.aimingTime)
const idealDispersion = useReactiveState(sdk.data.battle.aiming.idealDispersion)
const clientDispersion = useReactiveState(sdk.data.battle.aiming.clientDispersion)
const serverDispersion = useReactiveState(sdk.data.battle.aiming.serverDispersion)
const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)
const period = useReactiveState(sdk.data.battle.period)
const isAlive = useReactiveState(sdk.data.battle.isAlive)

const currentDispersion = computed(() => {
  if (source == 'client') return clientDispersion.value
  if (source == 'server') return serverDispersion.value
  return isServerAim.value ? serverDispersion.value : clientDispersion.value
})

const display = computed(() => period.value?.tag == 'BATTLE' && isAlive.value)

const time = computed(() => {
  if (!aimingTime.value || !idealDispersion.value || !currentDispersion.value) return 0
  return aimingTime.value * Math.log(currentDispersion.value / idealDispersion.value);
});

const percent = computed(() => {
  if (!aimingTime.value || !idealDispersion.value || !currentDispersion.value) return 0
  return (100 - 20 * Math.log(currentDispersion.value / idealDispersion.value)) / 100
})

const historyTime = ref<number[]>(new Array(300).fill(0))
const historyTangent = ref<number[]>(new Array(300).fill(0))

useIntervalFn(() => {
  if (historyTime.value.length > 300) historyTime.value.shift()
  historyTime.value.push((time.value ?? 0))

  if (historyTangent.value.length > 300) historyTangent.value.shift()
  historyTangent.value.push((currentDispersion.value ?? 0) * 100)
}, 100, { immediate: true })


</script>


<style lang="scss" scoped></style>