<template>
  <h3 class="secondary bold">PLATOON</h3>
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
</template>


<script setup lang="ts">
import Line from "../Line.vue";

defineProps<{
  isInPlatoon?: boolean;
  platoonCommander?: number;
  platoonSlots?: Array<{
    name: string
    // clanTag: string
    // dbid: number
    rating: number
    // timeJoin: number
    // isOffline: boolean
    vehicle: {
      localizedShortName: string
    } | null;
    // vehicle: Vehicle | null;
    isReady: boolean
  } | null>;
}>();
</script>


<style lang="scss" scoped></style>