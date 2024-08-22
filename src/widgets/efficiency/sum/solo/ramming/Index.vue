<template>
  <WidgetCardWrapper auto-scale auto-height>
    <TitledCounter :title="'УРОНА ТАРАНОМ'" :value="value" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import TitledCounter from '../TitledCounter.vue';
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import { ref } from 'vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const { sdk } = useWidgetSdk();
const query = useQueryParams<{ saveKey: string }>()
const value = useWidgetStorage(query.saveKey ?? '_empty', 0)

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'damage' && feedback.data.attackReason == 'ramming') value.value += feedback.data.damage
})


</script>


<style lang="scss" scoped></style>