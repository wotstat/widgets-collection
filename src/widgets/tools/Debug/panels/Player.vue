<template>
  <h3 class="secondary bold">PLAYER <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-if="visible">
    <div class="flex flex-1 ver">
      <Line name="Name" :value="playerName" />
      <Line name="Clan" :value="playerClan ?? '-'" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-1 ver">
      <Line name="Id" :value="playerId" />
      <Line name="ClanId" :value="playerClanId" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from "../Line.vue";
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  playerName?: string
  playerClan?: string
  playerId?: number
  playerClanId?: number
  collapseKeys: KeyBindingSetting
}>();

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>