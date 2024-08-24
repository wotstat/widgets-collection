<template>
  <ResultSummer :title="'ФРАГОВ'" :stat="'kills'" :value="value" />
</template>


<script setup lang="ts">
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";
import { ref } from 'vue';

const { sdk } = useWidgetSdk();
const value = ref(0)

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'kill') value.value += 1
})

</script>


<style lang="scss" scoped></style>