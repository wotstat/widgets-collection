<template>

  <WidgetRoot auto-height auto-scale>
    <WidgetStatusWrapper :ctx :required-extensions="['wotstat']">
      <Content :values="values" :shadow="query.showShadow === 'true'" :center="query.showCenter === 'true'" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { BallisticCalculator } from './ballisticCalc';

const query = useQueryParams<{
  resetEachBattle: string
  showShadow: string
  showCenter: string
  maxHits: string
  saveKey: string
}>()


const values = useWidgetStorage<{ r: number; theta: number }[]>(query.saveKey + '_ballistics', [])
const maxHits = computed(() => parseInt(query.maxHits ?? '0') || 0)

const ctx = useWidgetSdk();
const { sdk } = ctx;

const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)

watch(isInBattle, (isInBattle, old) => {
  if (isInBattle === true && old === false && query.resetEachBattle === 'true') {
    values.value = []
  }
})

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
    values.value.push(ballisticResult)
    if (maxHits.value > 0 && values.value.length > maxHits.value) {
      values.value = values.value.slice(-maxHits.value)
    }
  } catch (error) {
    console.error(`Error calculating client ballistic: ${error}. Event: ${JSON.stringify(e)}`)
  }

})

</script>


<style lang="scss" scoped></style>