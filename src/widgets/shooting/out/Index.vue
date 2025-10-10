<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :title :percent :total :miss :skin />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { BallisticCalculator } from '../ballisticCalc';

const { title, percent, skin } = useQueryParams({
  title: Boolean,
  percent: Boolean,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const total = useWidgetStorage('total', 0)
const miss = useWidgetStorage('miss', 0)

const { sdk } = useWidgetSdk();

const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)

useReactiveTrigger(sdk.data.extensions.wotstat.onShotBallisticEvent, e => {
  const gravity = e.gravity ?? -(e.acceleration?.y ?? 0)
  const shared = {
    gravity: -gravity,
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