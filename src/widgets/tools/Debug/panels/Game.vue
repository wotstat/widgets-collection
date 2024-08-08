<template>
  <h3 class="secondary bold">GAME</h3>
  <div class="flex">
    <div class="flex flex-1 ver">
      <Line name="Version" :value="gameVersion" />
      <Line name="Region" :value="gameRegion" />
      <Line name="State" :value="gameState" />
      <Line v-if="fps" name="Fps" :value="Math.round(fps)" />
      <Line v-if="IsInReplay" name="IsReplay" :value="IsInReplay" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-1 ver">
      <Line name="Language" :value="gameLanguage" />
      <Line name="Server" :value="gameServer" />
      <Line name="ServerTime" :value="serverTime ? Math.round(serverTime * 10) / 10 : ''" />
      <Line v-if="ping" name="Ping" :value="`${Math.round(ping * 1000)}ms`" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { MaybeRef } from "vue";
import Line from "../Line.vue";

const props = defineProps<{
  gameVersion: string
  gameRegion: string
  gameState: string
  gameLanguage: string
  gameServer: string
  serverTime: number
  ping?: number
  fps?: number
  IsInReplay?: boolean
}>()
</script>


<style lang="scss" scoped></style>