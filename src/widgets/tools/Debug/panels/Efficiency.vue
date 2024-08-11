<template>

  <h3 class="secondary bold">EFFICIENCY <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-if="visible">
    <div class="flex flex-1 ver">
      <Line name="totalDamage" :value="totalDamage" />
      <Line name="totalBlocked" :value="totalBlocked" />
    </div>
    <div class="vr"></div>
    <div class="flex flex-1 ver">
      <Line name="totalAssist" :value="totalAssist" />
      <Line name="totalStun" :value="totalStun" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from '../Line.vue';
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  totalDamage?: number
  totalBlocked?: number
  totalAssist?: number
  totalStun?: number
  collapseKeys: KeyBindingSetting
}>()

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>