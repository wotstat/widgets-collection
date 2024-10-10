<template>
  <div class="widgets-sdk-styles">
    <div class="autoscale" v-if="autoScale">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { useReactiveState, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';
import { isInit as isMetrikaInit, metrikaId } from '@/composition/ym/metrika';
import { onMounted, watch } from 'vue';

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean
  hangarOnly?: boolean
}>()

onMounted(() => {
  WidgetMetaTags.setAutoHeight(props.autoHeight)
  WidgetMetaTags.setHangarOnly(props.hangarOnly)
})

const { sdk } = useWidgetSdk()

const playerName = useReactiveState(sdk.data.player.name)
const playerRegion = useReactiveState(sdk.data.game.region)
const gameVersion = useReactiveState(sdk.data.game.version)

watch(() => [isMetrikaInit.value, playerName.value, playerRegion.value, gameVersion.value] as const, ([isMetrikaInit, playerName, playerRegion, gameVersion]) => {
  if (!isMetrikaInit || !playerName || !playerRegion || !gameVersion) return
  ym(metrikaId, 'params', {
    playerName,
    playerRegion,
    gameVersion
  })
})

</script>

<style lang="scss" scoped>
.widgets-sdk-styles {
  position: relative;
  color: var(--wotstat-primary)
}
</style>