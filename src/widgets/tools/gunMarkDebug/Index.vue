<template>
  <WidgetWrapper auto-height auto-scale>
    <Content v-bind="data" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed } from 'vue';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import WidgetWrapper from '@/components/WidgetWrapper.vue';

const gunMark = useGunMarkCalculator()

const data = computed(() => ({
  lastVisibleStats: gunMark.lastVisibleStats.value,
  preLastVisibleStats: gunMark.preLastVisibleStats.value,
  battleGunSum: gunMark.battleGunSum.value,
  battleMovingAvgDamage: gunMark.battleMovingAvgDamage.value,
  battleDamageRating: gunMark.battleDamageRating.value,
  currentDamageRating: gunMark.currentDamageRating.value,
  dossierDamageRating: gunMark.dossierDamageRating.value
}))

</script>


<style lang="scss" scoped></style>