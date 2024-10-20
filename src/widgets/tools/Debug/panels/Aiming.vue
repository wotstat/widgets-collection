<template>
  <h3 class="secondary bold">AIMING <span class="float-right">{{ localizedKeys }}</span></h3>
  <template v-if="visible">
    <div class="flex">
      <div class="flex flex-1 ver">
        <Line name="isAutoAim" :value="isAutoAim" />
        <Line name="ClientDisp" :value="(clientDispersion ?? 0).toFixed(7)" />
        <Line name="IdealDisp" :value="(idealDispersion ?? 0).toFixed(7)" />
        <Line name="AimingMode" :value="aimingMode" />
      </div>
      <div class="vr"></div>
      <div class="flex flex-1 ver">
        <Line name="isServerAim" :value="isServerAim" />
        <Line name="ServerDisp" :value="(serverDispersion ?? 0).toFixed(7)" />
        <Line name="AimingTime" :value="(aimingTime ?? 0).toFixed(7)" />
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import Line from '../Line.vue';
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  isAutoAim?: boolean
  clientDispersion?: number
  isServerAim?: boolean
  serverDispersion?: number
  idealDispersion?: number
  aimingTime?: number
  aimingMode?: string
  collapseKeys: KeyBindingSetting
}>()

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>