<template>
  <WidgetWrapper auto-height auto-scale>
    <Content :lines="lines" :soloAlign="params.soloAlign" :anim="params.anim" large />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { arrayOfOneOf, NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { SlotValue, slotVariants } from './define.widget';
import { useInBattleCollector } from '@/composition/shared/useInBattleCollector';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';


const possibleSlots = oneOf([...slotVariants.map(slot => slot.value), 'empty'])
const params = useQueryParams({
  startFrom: NumberDefault(),
  anim: Boolean,
  soloAlign: oneOf(['left', 'right'] as const),
  slot1: possibleSlots,
  slot2: possibleSlots,
  slot3: possibleSlots,
  slot4: possibleSlots,
  slot5: possibleSlots,
  slot6: possibleSlots,
  slot7: possibleSlots,
  slot8: possibleSlots,
  slots: arrayOfOneOf(slotVariants.map(slot => slot.value)),
})

const stats = useInBattleCollector()
const gunMark = useGunMarkCalculator()
const { sdk } = useWidgetSdk()

const health = useReactiveState(sdk.data.battle.health)

const valuesMap = {
  'dmg': () => stats.value.damage,
  'block': () => stats.value.blocked,
  'assist': () => stats.value.assist,
  'discover': () => stats.value.discover,
  'assist-radio': () => stats.value.radioAssist,
  'assist-track': () => stats.value.trackAssist,
  'fire': () => stats.value.fire,
  'fire-dmg': () => stats.value.fireDamage,
  'ram': () => stats.value.ram,
  'ram-dmg': () => stats.value.ramDamage,
  'ammo-bay-destroyed': () => stats.value.ammoBayDestroyed,
  'ammo-bay-destroyed-dmg': () => stats.value.ammoBayDestroyedDamage,
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
  [key in Exclude<SlotValue, 'empty'>]: () => number | string
}


const lines = computed(() => (params.slots && params.slots.length > 0 ? params.slots : [params.slot1, params.slot2, params.slot3, params.slot4, params.slot5, params.slot6, params.slot7, params.slot8])
  .filter(t => t != undefined)
  .filter(t => t != 'empty')
  .map(t => ({ icon: t, values: ([valuesMap[t]() ?? '']) as any })))

</script>


<style lang="scss" scoped></style>