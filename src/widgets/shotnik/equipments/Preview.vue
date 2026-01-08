<template>
  <WidgetPreviewRoot auto-scale :predictedAspectRatio>
    <Content :hd="hd ?? true" :variant :showTankName="isMiniPreview || showTankName"
      :postProgression="isMiniPreview || postProgression" :sets :tank-name="'Т-100 ЛТ'" :postProgressionSetup
      :postProgressionCurrent="isMiniPreview || postProgressionCurrent" :author="'Sh0tnik'" :displayAuthor="author" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from '../../nidin/equipments/Content.vue';
import { Props } from '../../nidin/equipments/define.widget';
import { computed } from 'vue';

const props = defineProps<{
  isMiniPreview: boolean
  hd?: boolean
  showTankName?: boolean
  postProgression?: boolean
  postProgressionCurrent?: boolean
  variant?: 'default' | 'compact'
  author?: boolean
}>();

const variant = computed(() => props.isMiniPreview || !props.variant ? 'compact' : props.variant)

const predictedAspectRatio = computed(() => {
  if (variant.value == 'compact') {
    if (props.postProgression) return 2.2
    return 1.7
  }

  if (variant.value == 'default') {
    if (props.postProgression) return 1.69
    return 1.36
  }
})

const sets: Props['sets'] = [
  {
    slots: [
      { equipment: 'commandersView', specialization: 'stealth' },
      { equipment: 'trophyUpgradedAdditionalInvisibilityDevice', specialization: 'firepower' },
      { equipment: 'deluxCoatedOptics', specialization: null }
    ],
    booster: 'additInvisibilityDeviceBattleBooster'
  },
  {
    slots: [
      { equipment: 'modernizedTankRammerSights1', specialization: 'stealth' },
      { equipment: 'deluxImprovedVentilation', specialization: 'firepower' },
      { equipment: 'deluxCoatedOptics', specialization: null }
    ],
    booster: 'improvedVentilationBattleBooster'
  }
]

const postProgressionSetup: Props['postProgressionSetup'] = {
  available: [
    ['role_lightTank_pair_1_1', 'role_lightTank_pair_1_2'],
    ['role_lightTank_pair_2_1', 'role_lightTank_pair_2_2'],
    ['role_lightTank_pair_3_1', 'role_lightTank_pair_3_2'],
    ['role_LT_universal_pair_4_1', 'role_LT_universal_pair_4_2'],
    ['role_LT_universal_pair_5_1', 'role_LT_universal_pair_5_2'],
  ],
  recommended: [
    'role_lightTank_pair_1_2',
    'role_lightTank_pair_2_1',
    'role_lightTank_pair_3_2',
    'role_LT_universal_pair_4_1',
    'role_LT_universal_pair_5_2'
  ],
  current: [
    'role_lightTank_pair_1_2',
    'role_lightTank_pair_2_1',
    'role_lightTank_pair_3_2',
    'role_LT_universal_pair_4_2',
    'role_LT_universal_pair_5_2'
  ]
}


</script>


<style lang="scss" scoped></style>