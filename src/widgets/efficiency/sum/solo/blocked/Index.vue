<template>
  <ResultSummer :title="'ЗАБЛОКИРОВАНО'" :stat="'damageBlockedByArmor'" :value="battleBlocked" />
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import ResultSummer from "../ResultSummer.vue";

const { sdk } = useWidgetSdk();
const battleBlocked = useReactiveState(sdk.data.battle.efficiency.blocked)

</script>


<style lang="scss" scoped></style>