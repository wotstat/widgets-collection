<template>
  <ResultSummer :title="'УРОНА ПО ЗАСВЕТУ'" :stat="'damageAssistedRadio'" :value="value" />
</template>


<script setup lang="ts">
import { useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";
import { ref } from 'vue';

const { sdk } = useWidgetSdk();
const value = ref(0)

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, feedback => {
  if (feedback.type == 'radioAssist') value.value += feedback.data.damage
})

</script>


<style lang="scss" scoped></style>