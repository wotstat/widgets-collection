<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.26">
    <Content v-bind="data" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';

const data = {
  lastVisibleStats: {
    movingAvgDamage: 2200,
    damageRating: 51.10
  },
  preLastVisibleStats: {
    movingAvgDamage: 2300,
    damageRating: 52.34
  },
  battleGunSum: 5510,
  battleMovingAvgDamage: 2241,
  battleDamageRating: 50.21,
  currentDamageRating: 52.21,
  dossierDamageRating: 51.21
}

</script>


<style lang="scss" scoped></style>