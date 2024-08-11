<template>
  <h3 class="secondary bold">GAME <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-show="visible">
    <div class="flex flex-1 ver">
      <Line name="Version" :value="gameVersion" />
      <Line name="Region" :value="gameRegion" />
      <Line name="State" :value="gameState" />
      <Line v-if="fps" name="Fps" :value="Math.round(fps)" />
      <Line v-if="isInReplay" name="IsReplay" :value="isInReplay" />
      <Line name="ServerTime" :value="serverTime ? Math.round(serverTime * 10) / 10 : ''" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-1 ver">
      <Line name="DataProvider" :value="dataProviderVersion" />
      <Line name="Language" :value="gameLanguage" />
      <Line name="Server" :value="gameServer" />
      <Line v-if="ping" name="Ping" :value="`${Math.round(ping * 1000)}ms`" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from "../Line.vue";
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  gameVersion: string
  gameRegion: string
  gameState: string
  gameLanguage: string
  gameServer: string
  serverTime: number
  ping?: number
  fps?: number
  isInReplay?: boolean
  dataProviderVersion?: number
  collapseKeys: KeyBindingSetting
}>()


const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>