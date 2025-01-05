<template>
  <WidgetWrapper auto-scale auto-height>
    <TitledCounter :title="titleEnabled ? (reverse ? 'ОСТАЛОСЬ УРОНА ТАРАНОМ' : 'УРОНА ТАРАНОМ') : false"
      :value="formattedCount" :skin />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import TitledCounter from '../TitledCounter.vue';
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { computed } from 'vue';


const { startFrom, title: titleEnabled, reverse, skin } = useQueryParams({
  startFrom: NumberDefault(),
  title: Boolean,
  reverse: Boolean,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const { sdk } = useWidgetSdk();
const value = useWidgetStorage('value', 0)

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'damage' && feedback.data.attackReason == 'ramming') value.value += feedback.data.damage * (reverse ? -1 : 1)
})

const targetCount = computed(() => startFrom + value.value)
const formattedCount = computed(() => reverse && startFrom >= 0 ? Math.max(0, targetCount.value) : targetCount.value)

</script>


<style lang="scss" scoped></style>