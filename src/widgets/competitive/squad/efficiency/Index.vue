<template>
  <WidgetWrapper auto-height auto-scale>
    <Content :lines="lines" :soloAlign="params.soloAlign" :anim="params.anim" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from '../../../efficiency/stats/Content.vue';
import { computed } from 'vue';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { SlotValue, slotVariants } from './define.widget';
import { useInBattleCollector } from '@/composition/shared/useInBattleCollector';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import { useReactiveWidgetRelay } from '@/composition/useWidgetRelay';
import { useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { syncRefs } from '@vueuse/core';


const possibleSlots = oneOf(slotVariants.map(slot => slot.value))
const params = useQueryParams({
  startFrom: NumberDefault(),
  anim: Boolean,
  channelKey: String,
  soloAlign: oneOf(['left', 'right'] as const),
  slot1: possibleSlots,
  slot2: possibleSlots,
  slot3: possibleSlots,
  slot4: possibleSlots,
  slot5: possibleSlots,
  slot6: possibleSlots,
  slot7: possibleSlots,
  slot8: possibleSlots,
})

const { sdk } = useWidgetSdk();
const stats = useInBattleCollector()

const playerName = useReactiveState(sdk.data.player.name)
const battleTank = useReactiveState(sdk.data.battle.vehicle)
const hangarTank = useReactiveState(sdk.data.hangar.vehicle.info)
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const gunMark = useGunMarkCalculator()

const target = computed(() => ({
  player: playerName.value ?? '',
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
  'fire-dmg': 'fireDamage',
  'ram': 'ram',
  'ram-dmg': 'ramDmg',
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

const platoonSlots = useReactiveState(sdk.data.platoon.slots)
const platoonId = computed(() => platoonSlots.value?.filter(t => t?.name)
  .map(t => t?.name)
  .toSorted()
  .join('-') || playerName.value)
const relayPostfix = computed(() => (platoonId.value || 'default') + '_' + (params.channelKey ?? ''))
const { relay, uuid } = useReactiveWidgetRelay(relayPostfix)

const state = useReactiveRelayState(relay, 'stats', target.value)
syncRefs(target, state.state)

const lines = computed(() => {
  const all = [...state.all.value.entries()]
  const values = all.length >= 3 ? all.filter(t => t[0] != uuid) : all
  const target = values.sort((a, b) => {
    if (a[0] == uuid) return 1
    if (b[0] == uuid) return 1
    return a[1].player.localeCompare(b[1].player)
  }).slice(0, 2).map(v => v[1])

  return [params.slot1, params.slot2, params.slot3, params.slot4, params.slot5, params.slot6, params.slot7, params.slot8]
    .filter(t => t != undefined)
    .filter(t => t != 'empty')
    .map(t => {
      const values = target.map(v => v[slotToTarget[t]])
      return { icon: t, values: values as any }
    })
})

</script>


<style lang="scss" scoped></style>