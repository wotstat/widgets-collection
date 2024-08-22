<template>
  <ResultSummer :title="'УРОНА ПО ЗАСВЕТУ'" :stat="'damageAssistedRadio'" :value="value" />
</template>


<script setup lang="ts">
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const query = useQueryParams<{ saveKey: string }>()
const value = useWidgetStorage(query.saveKey ?? '_empty', 0)

const { sdk } = useWidgetSdk();
useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'radioAssist') value.value += feedback.data.damage
})

</script>


<style lang="scss" scoped></style>