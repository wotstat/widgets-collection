<template>
  <WidgetWrapper auto-height auto-scale>
    <Content :lines="lines" :anim="params.anim" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from '../../../efficiency/stats/Content.vue';
import { computed } from 'vue';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { arrayOfOneOf, NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { Props, SlotValue } from './define.widget';
import { useInBattleCollector } from '@/composition/shared/useInBattleCollector';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import { usePlatoonWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { syncRefs } from '@vueuse/core';
import { inBattleEfficiency } from '@/components/efficiencyIcon/utils';

const params = useQueryParams({
  startFrom: NumberDefault(),
  anim: Boolean,
  channelKey: String,
  slots: arrayOfOneOf([...inBattleEfficiency, 'player', 'tank']),
})



const { sdk } = useWidgetSdk();
const stats = useInBattleCollector()
const health = useReactiveState(sdk.data.battle.health)

const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)
const battleTank = useReactiveState(sdk.data.battle.vehicle)
const hangarTank = useReactiveState(sdk.data.hangar.vehicle.info)
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const gunMark = useGunMarkCalculator()

const target = computed(() => ({
  player: playerName.value ?? 'Loading...',
  playerId: playerId.value,
  tank: (isInBattle.value ? battleTank.value?.localizedShortName ?? hangarTank.value?.localizedShortName : hangarTank.value?.localizedShortName) ?? '',
  gunMarkPercent: gunMark.dossierDamageRating.value,
  ...stats.value,
  distance: Math.round(stats.value.distance),
  lifetime: Math.round(stats.value.lifetime),
  duration: Math.round(stats.value.duration),
  health: health.value,
}))

const slotToTarget = {
  'player': 'player',
  'tank': 'tank',
  'dmg': 'damage',
  'block': 'blocked',
  'assist': 'assist',
  'assist-radio': 'radioAssist',
  'assist-track': 'trackAssist',
  'shot-dmg-max': 'shotDamageMax',
  'shot-dmg-avg': s => s.damagedShotsCount == 0 ? 0 : s.shotDamage / s.damagedShotsCount,
  'discover': 'discover',
  'fire': 'fire',
  'kill': 'frags',
  'fire-dmg': 'fireDamage',
  'fire-dmg-max': 'fireDamageMax',
  'ram': 'ram',
  'ram-dmg': 'ramDamage',
  'ram-dmg-max': 'ramDamageMax',
  'ammo-bay-destroyed': 'ammoBayDestroyed',
  'ammo-bay-destroyed-dmg': 'ammoBayDestroyedDamage',
  'ammo-bay-destroyed-dmg-max': 'ammoBayDestroyedDamageMax',
  'base-capture': 'baseCapturePoints',
  'base-defend': 'baseCaptureDefend',
  'distance': 'distance',
  'chuck-score': 'chuckScore',
  'gun-mark-dmg': 'gunMarkDmg',
  'gun-mark-percent': 'gunMarkPercent',
  'lifetime': 'lifetime',
  'duration': 'duration',
  'crits': 'crits',
  'hp': 'health',
} as const satisfies {
  [key in SlotValue]: (keyof typeof target['value']) | ((stats: typeof target['value']) => number)
}

const { relay, uuid } = usePlatoonWidgetRelay(params.channelKey)

const state = useReactiveRelayState(relay, 'stats', target.value)
syncRefs(target, state.state)

const lines = computed(() => {
  const all = [...state.all.value.entries()]
  const allUnique = [...new Map(all.map(item => [item[1].playerId, item])).values()];

  const values = allUnique.length >= 3 ? allUnique.filter(t => t[0] != uuid) : allUnique
  const target = values.sort((a, b) => {
    if (a[0] == uuid) return 1
    if (b[0] == uuid) return 1
    return a[1].player.localeCompare(b[1].player)
  }).slice(0, 2).map(v => v[1])

  return params.slots
    .filter(t => t != undefined)
    .map(t => {
      const proc = slotToTarget[t]
      const values = typeof proc === 'function' ? target.map(v => proc(v)) : target.map(v => v[proc])
      return { icon: t, values: values } as Props['lines'][number]
    })
})

</script>


<style lang="scss" scoped></style>