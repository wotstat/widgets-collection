<template>
  <h3 class="secondary bold">PLATOON <span class="float-right">{{ localizedKeys }}</span></h3>
  <template v-if="visible">
    <template v-if="isInPlatoon">
      <div class="flex multi-cards">
        <div class="card flex-1" v-for="(item, i) in platoonSlots">
          <template v-if="item">
            <p class="center "><span v-if="i == platoonCommander">👑</span>{{ item.name }}</p>
            <div class="flex space-between">
              <p class="secondary">Ready:</p>
              <p class="primary">{{ item.isReady }}</p>
            </div>
            <div class="flex space-between">
              <p class="secondary">Rating:</p>
              <p class="primary">{{ item.rating }}</p>
            </div>
            <p class="center primary">{{ item.vehicle?.localizedShortName }}</p>
          </template>
          <p v-else class="center">Empty</p>
        </div>
      </div>
    </template>
    <p v-else class="center secondary">Not in platoon</p>
  </template>
</template>


<script setup lang="ts">
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  isInPlatoon?: boolean
  platoonCommander?: number
  platoonSlots?: Array<{
    name: string
    rating: number
    vehicle: {
      localizedShortName: string
    } | null;
    isReady: boolean
  } | null>
  collapseKeys: KeyBindingSetting
}>();


const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>