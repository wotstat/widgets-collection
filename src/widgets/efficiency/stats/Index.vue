<template>
  <WidgetWrapper auto-height auto-scale>
    <Content :lines="lines" :soloAlign="params.soloAlign" :anim="params.anim" large />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { SlotValue, slotVariants } from './define.widget';
import { useInBattleCollector } from '@/composition/shared/useInBattleCollector';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';


const possibleSlots = oneOf(slotVariants.map(slot => slot.value))
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
})

const stats = useInBattleCollector()
const gunMark = useGunMarkCalculator()

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
  'ram-dmg': () => stats.value.ramDmg,
  'ammo-bay-destroyed': () => stats.value.ammoBayDestroyed,
  'ammo-bay-destroyed-dmg': () => stats.value.ammoBayDestroyedDamage,
  'base-capture': () => stats.value.baseCapturePoints,
  'base-defend': () => stats.value.baseCaptureDefend,
  'distance': () => Math.round(stats.value.distance),
  'chuck-score': () => stats.value.chuckScore,
  'gun-mark-dmg': () => stats.value.gunMarkDmg,
  'gun-mark-percent': () => gunMark.battleDamageRating.value,
} as const satisfies {
  [key in Exclude<SlotValue, 'empty'>]: () => number | string
}


const lines = computed(() => [params.slot1, params.slot2, params.slot3, params.slot4, params.slot5, params.slot6, params.slot7, params.slot8]
  .filter(t => t != undefined)
  .filter(t => t != 'empty')
  .map(t => ({ icon: t, values: ([valuesMap[t]() ?? '']) as any })
  ))

</script>


<style lang="scss" scoped></style>