<template>
  <h3 class="secondary bold">HANGAR <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-if="visible">
    <div class="flex-2">
      <Line name="BattleMode" :value="hangarBattleMode" />
    </div>
    <div class="vr"></div>
    <div class="flex-1">
      <Line name="InQueue" :value="isInQueue" />
    </div>
  </div>
</template>


<script setup lang="ts">
import Line from "../Line.vue";
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  hangarBattleMode?: string
  isInQueue?: boolean
  collapseKeys: KeyBindingSetting
}>();

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>