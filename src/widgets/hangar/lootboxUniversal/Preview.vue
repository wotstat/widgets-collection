<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="0.74">
    <Content :data="targetProps" :game="'mt'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './content/Index.vue';
import { ContainersData, Props } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
}>();


const targetProps = computed<ContainersData>(() => ({
  containers: [
    { tag: "cosm_2025_silver", count: 3165 },
    { tag: "cosmic_2025_standart", count: 9810 },
  ],
  modernizations: [
    // { tag: "modernizedTankRammerSights1", count: 89 },
    // { tag: "modernizedDamageVentilation1", count: 91 }
  ],
  items: [],
  entitlements: [],
  vehicles: [
    { tag: "uk:GB110_FV4201_Chieftain_Prototype", isLegendary: false },
    { tag: "usa:A146_TL_7_120", isLegendary: false },
  ],
  crewBooks: [],
  battleBoosters: [],
  boosters: [],
  currencies: {
    premium: 0,
    credits: 3470000,
    freeXP: 26200,
    crystals: 0,
    equipCoins: 44740,
    gold: 42325,
    mandarins: 0,
  },
}))

</script>


<style lang="scss" scoped></style>