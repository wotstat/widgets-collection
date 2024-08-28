<template>
  <WidgetCardWrapper auto-height auto-scale>
    <Content :title="query.title !== 'false'" :percent="query.percent !== 'false'" :total :miss />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { BallisticCalculator } from '../ballisticCalc';

const query = useQueryParams<{
  title: string
  saveKey: string
  percent: string
}>()

const total = useWidgetStorage(`${query.saveKey ?? '_default'}_total`, 0)
const miss = useWidgetStorage(`${query.saveKey ?? '_default'}_miss`, 0)

const { sdk } = useWidgetSdk();

const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)

useReactiveTrigger(sdk.data.extensions.wotstat.onShotBallisticEvent, e => {
  const shared = {
    gravity: -e.gravity,
    gunPos: e.gunPoint,
    shellSpeed: e.shellSpeed * 0.8,
    tracerStart: e.tracerStart,
    tracerVelocity: e.tracerVel,
  }

  try {
    const ballisticResult = BallisticCalculator.calculate({
      ...shared,
      markerPos: isServerAim.value ? e.serverMarkerPoint : e.clientMarkerPoint,
      dispersionAngle: isServerAim.value ? e.serverShotDispersion : e.clientShotDispersion,
    })

    total.value++
    if (ballisticResult.r > 1.01) miss.value++

  } catch (error) {
    console.error(`Error calculating client ballistic: ${error}. Event: ${JSON.stringify(e)}`)
  }

})

</script>


<style lang="scss" scoped></style>