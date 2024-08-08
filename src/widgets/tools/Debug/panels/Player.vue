<template>
  <h3 class="secondary bold">PLAYER</h3>
  <div class="flex">
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

defineProps<{
  playerName?: string;
  playerClan?: string;
  playerId?: number;
  playerClanId?: number;
}>();
</script>


<style lang="scss" scoped></style>