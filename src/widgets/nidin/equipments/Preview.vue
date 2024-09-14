<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="variant == 'compact' ? 1.89 : 1.46">
    <Content :hd="hd ?? true" :variant :showTankName="isMiniPreview || showTankName" :sets :tank-name="'Т-100 ЛТ'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';
import { computed } from 'vue';

const props = defineProps<{
  isMiniPreview: boolean
  hd?: boolean
  showTankName?: boolean
  variant?: 'default' | 'compact'
}>();

const variant = computed(() => props.isMiniPreview || !props.variant ? 'compact' : props.variant)

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