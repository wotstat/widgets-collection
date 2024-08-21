<template>
  <ResultSummer :title="'НАНЕСЕНО УРОНА'" :stat="'damageDealt'" :value="battleDamage" />
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";

const { sdk } = useWidgetSdk();
const battleDamage = useReactiveState(sdk.data.battle.efficiency.damage)

</script>


<style lang="scss" scoped></style>