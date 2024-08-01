<template>
  <p>debug</p>
  <p>PlayerName: {{ playerName }} ({{ playerId }})</p>
</template>


<script setup lang="ts">
import { useWidgetSdk, useReactiveState } from '@/composition/widgetSdk';

const sdk = useWidgetSdk()

const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)
</script>


<style lang="scss" scoped></style>