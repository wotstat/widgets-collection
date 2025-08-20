<template>
  <WidgetWrapper auto-height auto-scale>
    <Content :lines="(lines as any)" :soloAlign="params.soloAlign" :anim="params.anim" large />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { arrayOfOneOf, NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { SlotValue } from './define.widget';
import { useInBattleCollector } from '@/composition/shared/useInBattleCollector';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { inBattleEfficiency } from '@/components/efficiencyIcon/utils';


const params = useQueryParams({
  startFrom: NumberDefault(),
  anim: Boolean,
  soloAlign: oneOf(['left', 'right'] as const),
  slots: arrayOfOneOf([...inBattleEfficiency, 'tank', 'player'] as const),
})

const stats = useInBattleCollector()
const gunMark = useGunMarkCalculator()
const { sdk } = useWidgetSdk()

const health = useReactiveState(sdk.data.battle.health)
const player = useReactiveState(sdk.data.player.name)
const hangarTank = useReactiveState(sdk.data.hangar.vehicle.info)
const battleTank = useReactiveState(sdk.data.battle.vehicle)

const valuesMap = {
  'player': () => player.value ?? '?',
  'tank': () => battleTank.value?.localizedShortName ?? hangarTank.value?.localizedShortName ?? '?',
  'dmg': () => stats.value.damage,
  'shot-dmg-avg': () => stats.value.damagedShotsCount == 0 ? 0 : stats.value.shotDamage / stats.value.damagedShotsCount,
  'shot-dmg-max': () => stats.value.shotDamageMax,
  'block': () => stats.value.blocked,
  'assist': () => stats.value.assist,
  'discover': () => stats.value.discover,
  'assist-radio': () => stats.value.radioAssist,
  'assist-track': () => stats.value.trackAssist,
  'fire': () => stats.value.fire,
  'fire-dmg': () => stats.value.fireDamage,
  'fire-dmg-max': () => stats.value.fireDamageMax,
  'ram': () => stats.value.ram,
  'ram-dmg': () => stats.value.ramDamage,
  'ram-dmg-max': () => stats.value.ramDamageMax,
  'ammo-bay-destroyed': () => stats.value.ammoBayDestroyed,
  'ammo-bay-destroyed-dmg': () => stats.value.ammoBayDestroyedDamage,
  'ammo-bay-destroyed-dmg-max': () => stats.value.ammoBayDestroyedDamageMax,
  'base-capture': () => stats.value.baseCapturePoints,
  'base-defend': () => stats.value.baseCaptureDefend,
  'distance': () => Math.round(stats.value.distance),
  'chuck-score': () => stats.value.chuckScore,
  'gun-mark-dmg': () => stats.value.gunMarkDmg,
  'gun-mark-percent': () => gunMark.battleDamageRating.value,
  'kill': () => stats.value.frags,
  'duration': () => stats.value.duration,
  'lifetime': () => stats.value.lifetime,
  'crits': () => stats.value.crits,
  'hp': () => health.value ?? 0,
} as const satisfies {
  [key in SlotValue]: () => number | string
}


const lines = computed(() => params.slots
  .filter(t => t != undefined)
  .map(t => ({ icon: t, values: ([valuesMap[t]() ?? '']) as any })))

</script>


<style lang="scss" scoped></style>