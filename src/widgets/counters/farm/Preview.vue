<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2">
    <Content v-bind="{ ...settings, ...values }" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  skin?: 'transparent' | 'default'
  hideTitle?: boolean
  lastBattle?: boolean,
  totalBattles?: boolean,
  timeInBattles?: boolean,
  averagePerBattle?: boolean,
  averagePerHour?: boolean,
}>();

const data = computed(() => props.isMiniPreview ? { startFrom: 42 } : props);

const settings = computed(() => ({
  skin: props.skin ?? 'transparent',
  hideTitle: props.hideTitle,
  lastBattle: props.lastBattle || props.isMiniPreview,
  totalBattles: props.totalBattles || props.isMiniPreview,
  timeInBattles: props.timeInBattles,
  averagePerBattle: props.averagePerBattle,
  averagePerHour: props.averagePerHour,
}))

const values = {
  value: 63783434,
  lastBattleValue: 1434554,
  totalBattlesValue: 8,
  timeInBattlesValue: 3 * 3600 + 42 * 60,
  averagePerBattleValue: 685540,
  averagePerHourValue: 2554127,
}

</script>


<style lang="scss" scoped></style>