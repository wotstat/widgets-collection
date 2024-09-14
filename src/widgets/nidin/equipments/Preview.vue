<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.43">
    <Content :hd="hd ?? true" :variant="isMiniPreview || !variant ? 'compact' : variant"
      :showTankName="isMiniPreview || showTankName" :sets :tank-name="'Т-100 ЛТ'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';

defineProps<{
  isMiniPreview: boolean
  hd?: boolean
  showTankName?: boolean
  variant?: 'default' | 'compact'
}>();

const sets: Props['sets'] = [
  {
    slots: [
      { equipment: 'commandersView', specialization: 'stealth' },
      { equipment: 'trophyUpgradedAdditionalInvisibilityDevice', specialization: 'firepower' },
      { equipment: 'deluxCoatedOptics', specialization: null }
    ],
    booster: 'smoothTurretBattleBooster'
  },
  {
    slots: [
      { equipment: 'deluxImprovedVentilation', specialization: 'stealth' },
      { equipment: 'deluxRammer', specialization: 'firepower' },
      { equipment: 'deluxAimingStabilizer', specialization: null }
    ],
    booster: 'rammerBattleBooster'
  }
]


</script>


<style lang="scss" scoped></style>