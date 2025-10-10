<template>
  <WidgetRoot auto-height auto-scale>
    <WidgetStatusWrapper :required-extensions="['wotstat']">
      <Content :values="values" :showCircle="query.showCircle && toggleCircleDisplay" :showCenter="query.showCenter"
        :skin="query.skin" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { ref, watch } from 'vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { BallisticCalculator } from '../ballisticCalc';

const query = useQueryParams({
  resetEachBattle: Boolean,
  showCircle: Boolean,
  showCenter: Boolean,
  maxHits: NumberDefault(0),
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const values = useWidgetStorage<{ r: number; theta: number }[]>('ballistics', [])

const { sdk } = useWidgetSdk();

const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)
const isPressH = useReactiveState(sdk.data.keyboard.KEY_H)

watch(isInBattle, (isInBattle, old) => {
  if (isInBattle === true && old === false && query.resetEachBattle) {
    values.value = []
  }
})

const toggleCircleDisplay = ref(true)
let lastTimeUpH = 0
watch(isPressH, (value) => {
  if (value) return;
  if (performance.now() - lastTimeUpH < 400) {
    toggleCircleDisplay.value = !toggleCircleDisplay.value
    lastTimeUpH = 0
  } else {
    lastTimeUpH = performance.now()
  }
})

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
    values.value.push(ballisticResult)
    if (query.maxHits > 0 && values.value.length > query.maxHits) {
      values.value = values.value.slice(-query.maxHits)
    }
  } catch (error) {
    console.error(`Error calculating client ballistic: ${error}. Event: ${JSON.stringify(e)}`)
  }

})

</script>


<style lang="scss" scoped></style>