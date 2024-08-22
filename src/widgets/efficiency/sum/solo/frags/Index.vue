<template>
  <ResultSummer :title="'ФРАГОВ'" :stat="'kills'" :value="frags" />
</template>


<script setup lang="ts">
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";
import { ref } from 'vue';

const { sdk } = useWidgetSdk();
const frags = ref(0)
useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'kill') frags.value += 1
})


</script>


<style lang="scss" scoped></style>