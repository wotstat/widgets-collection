<template>
  <h3 class="secondary bold">DOSSIER <span class="float-right">{{ localizedKeys }}</span></h3>
  <template v-if="visible">
    <div class="flex">
      <div class="flex flex-1 ver">
        <Line name="Mark percent" :value="damageRating" />
        <Line name="Battles count" :value="battlesCount" />
      </div>
      <div class="vr"></div>
      <div class="flex flex-1 ver">
        <Line name="Mark damage" :value="movingAvgDamage" />
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import Line from "../Line.vue";
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  damageRating?: number
  movingAvgDamage?: number
  battlesCount?: number
  collapseKeys: KeyBindingSetting
}>();

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>