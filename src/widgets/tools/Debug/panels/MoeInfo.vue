<template>
  <h3 class="secondary bold">MOE INFO <span class="float-right">{{ localizedKeys }}</span></h3>
  <template v-if="visible">

    <div class="available" v-if="!available">Not Available</div>

    <template v-if="vehicleTag">
      <Line name="Tag" :value="vehicleTag" />
      <Line name="Battles count" :value="battleCount" />
      <div class="flex flex-1" v-if="available && damageBetterThanNPercent">

        <div class="flex flex-1 ver">
          <Line v-for="(v, i) in [0, 20, 40]" :name="`${v}%`" :value="damageBetterThanNPercent[i]" />
        </div>
        <div class="vr"></div>
        <div class="flex flex-1 ver">
          <Line v-for="(v, i) in [55, 65, 75]" :name="`${v}%`" :value="damageBetterThanNPercent[i + 3]" />
        </div>
        <div class="vr"></div>
        <div class="flex flex-1 ver">
          <Line v-for="(v, i) in [85, 95, 100]" :name="`${v}%`" :value="damageBetterThanNPercent[i + 6]" />
        </div>
      </div>
    </template>
    <div v-else>
      No MOE info
    </div>
  </template>
</template>


<script setup lang="ts">
import Line from "../Line.vue";
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  vehicleTag?: string;
  available?: boolean;
  battleCount?: number;
  damageBetterThanNPercent?: number[];
  collapseKeys: KeyBindingSetting
}>();

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>