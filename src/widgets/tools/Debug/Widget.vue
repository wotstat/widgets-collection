<template>
  <WidgetRoot auto-scale auto-height>
    <WidgetStatusWrapper :ctx>
      <WidgetCard>
        <p>debug</p>
        <!-- <p>PlayerName: {{ playerName }} ({{ playerId }})</p>
        <p>PlayerName: {{ playerName }} ({{ playerId }})</p>
        <p>PlayerName: {{ playerName }} ({{ playerId }})</p>
        <p>PlayerName: {{ playerName }} ({{ playerId }})</p> -->
      </WidgetCard>
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";
import { useWidgetSdk, useReactiveState } from '@/composition/widgetSdk';

const ctx = useWidgetSdk()
const sdk = ctx.sdk

const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)
</script>


<style lang="scss" scoped></style>