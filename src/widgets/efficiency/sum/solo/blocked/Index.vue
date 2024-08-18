<template>
  <WidgetCardWrapper auto-scale auto-height>
    <TitledCounter :title="'ЗАБЛОКИРОВАНО'" :value="blocked ?? 0" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import TitledCounter from '../TitledCounter.vue';


const { sdk } = useWidgetSdk();

const blocked = useReactiveState(sdk.data.battle.efficiency.blocked)

</script>


<style lang="scss" scoped></style>