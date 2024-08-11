<template>

  <h3 class="secondary bold">BATTLE <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-show="visible">
    <div class="flex flex-3 ver">
      <Line name="Id" :value="arenaId" />
      <Line name="Arena" :value="arena?.tag" />
      <Line name="Mode" :value="arena?.mode" />
      <Line name="Gameplay" :value="arena?.gameplay" />
      <Line name="IsAlive" :value="isAlive" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-2 ver start">
      <Line name="Team" :value="arena?.team" />
      <Line name="Period" :value="arenaPeriod?.tag" />
      <Line v-if="arenaPeriod && serverTime" name="Length" :value="arenaPeriod.length" />
      <Line v-if="arenaPeriod && serverTime" name="Left" :value="Math.round(arenaPeriod.endTime - serverTime)" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from '../Line.vue';
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  arenaId?: number;
  arena?: {
    tag: string;
    mode: string;
    gameplay: string;
    team: number;
  };
  arenaPeriod?: {
    tag: string;
    length: number;
    endTime: number;
  };
  serverTime?: number;
  isAlive?: boolean;
  collapseKeys: KeyBindingSetting;
}>();

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>