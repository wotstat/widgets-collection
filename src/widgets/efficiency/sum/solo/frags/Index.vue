<template>
  <ResultSummer :title="'ФРАГОВ'" :stat="'kills'" :value="value" />
</template>


<script setup lang="ts">
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";
import { ref } from 'vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const { sdk } = useWidgetSdk();
const query = useQueryParams<{ saveKey: string }>()
const value = useWidgetStorage(query.saveKey ?? '_empty', 0)
useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'kill') value.value += 1
})


</script>


<style lang="scss" scoped></style>