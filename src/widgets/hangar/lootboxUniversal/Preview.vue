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
    { tag: "tanks_birthday_2025_small", count: 3165 },
    { tag: "tanks_birthday_2025_large", count: 9810 },
  ],
  modernizations: [
    // { tag: "modernizedTankRammerSights1", count: 89 },
    // { tag: "modernizedDamageVentilation1", count: 91 }
  ],
  items: [],
  entitlements: [
    { tag: 'birthday2025_golden_ticket', count: 324 }
  ],
  vehicles: [
    { tag: "uk:GB110_FV4201_Chieftain_Prototype", isLegendary: false },
    { tag: "usa:A146_TL_7_120", isLegendary: false },
  ],
  crewBooks: [],
  battleBoosters: [],
  boosters: [],
  currencies: {
    premium: 1268,
    credits: 3470000,
    freeXP: 26200,
    crystals: 0,
    equipCoins: 0,
    gold: 0,
    mandarins: 0,
  },
}))

</script>


<style lang="scss" scoped></style>