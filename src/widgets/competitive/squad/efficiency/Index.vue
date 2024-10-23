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
import { SlotValue, slotVariants } from './define.widget';
import { useInBattleCollector } from '@/composition/shared/useInBattleCollector';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import { usePlatoonWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { syncRefs } from '@vueuse/core';

const params = useQueryParams({
  startFrom: NumberDefault(),
  anim: Boolean,
  channelKey: String,
  slots: arrayOfOneOf(slotVariants.map(slot => slot.value)),
})

const { sdk } = useWidgetSdk();
const stats = useInBattleCollector()

const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)
const battleTank = useReactiveState(sdk.data.battle.vehicle)
const hangarTank = useReactiveState(sdk.data.hangar.vehicle.info)
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const gunMark = useGunMarkCalculator()

const target = computed(() => ({
  player: playerName.value ?? '',
  playerId: playerId.value,
  tank: (isInBattle.value ? battleTank.value?.localizedShortName ?? hangarTank.value?.localizedShortName : hangarTank.value?.localizedShortName) ?? '',
  gunMarkPercent: gunMark.battleDamageRating.value,
  ...stats.value,
  distance: Math.round(stats.value.distance),
}))

const slotToTarget = {
  'player': 'player',
  'tank': 'tank',
  'dmg': 'damage',
  'block': 'blocked',
  'assist': 'assist',
  'discover': 'discover',
  'assist-radio': 'radioAssist',
  'assist-track': 'trackAssist',
  'fire': 'fire',
  'kill': 'frags',
  'fire-dmg': 'fireDamage',
  'ram': 'ram',
  'ram-dmg': 'ramDamage',
  'ammo-bay-destroyed': 'ammoBayDestroyed',
  'ammo-bay-destroyed-dmg': 'ammoBayDestroyedDamage',
  'base-capture': 'baseCapturePoints',
  'base-defend': 'baseCaptureDefend',
  'distance': 'distance',
  'chuck-score': 'chuckScore',
  'gun-mark-dmg': 'gunMarkDmg',
  'gun-mark-percent': 'gunMarkPercent',
} as const satisfies {
  [key in Exclude<SlotValue, 'empty'>]: keyof typeof target['value']
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
      const values = target.map(v => v[slotToTarget[t]])
      return { icon: t, values: values as any }
    })
})

</script>


<style lang="scss" scoped></style>