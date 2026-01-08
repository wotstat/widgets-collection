<template>
  <div class="equipment-slot-container">
    <div class="equipment-slot">
      <img class="modernized" v-if="is('modernized_1').value" :src="modernized1">
      <img class="modernized" v-if="is('modernized_2').value" :src="modernized2">
      <img class="modernized" v-if="is('modernized_3').value" :src="modernized3">
      <img class="modernized" v-if="is('trophyBasic').value" :src="trophyBasic">
      <img class="modernized" v-if="is('trophyUpgraded').value" :src="trophyUpgraded">
      <img class="modernized" v-if="is('deluxe').value" :src="plus">
      <img class="booster-background" v-if="isBattleBooster" :src="boosterBackground">
      <img class="battleBooster" v-if="isBattleBooster" :src="isSkillBooster ? skillBooster : equipmentBooster">

      <img class="equipment" :class="{ 'hd': hd, 'booster': isBattleBooster }" v-if="tag && icon" :key="tag + hd"
        :src="icon" :style="{ transform: getTransformString(elementTransform) }" />
      <PlusImg class="empty" v-else />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { getEquipmentByTag, getDeviceByTag, getDeviceIconByTag, getEquipmentIconByTag, isEquipmentTag, getTransformByDeviceTag, getTransformString } from './equipment';

import modernized1 from './assets/equipment/overlay/modernized_1.png'
import modernized2 from './assets/equipment/overlay/modernized_2.png'
import modernized3 from './assets/equipment/overlay/modernized_3.png'

import plus from './assets/equipment/overlay/plus.png'
import PlusImg from './assets/equipment/utils/plus.svg'
import trophyBasic from './assets/equipment/overlay/trophyBasic.png'
import trophyUpgraded from './assets/equipment/overlay/trophyUpgraded.png'
import boosterBackground from './assets/equipment/overlay/boosterBackground.png'
import equipmentBooster from './assets/equipment/overlay/equipmentBooster.png'
import skillBooster from './assets/equipment/overlay/skillBooster.png'

const props = defineProps<{
  tag: string | null
  hd?: boolean
}>()

const isBattleBooster = computed(() => props.tag && isEquipmentTag(props.tag).value)
const element = computed(() => {
  if (!props.tag) return null

  if (isBattleBooster.value) {
    return getEquipmentByTag(props.tag).value
  } else {
    return getDeviceByTag(props.tag).value
  }
})

const elementTransform = computed(() => getTransformByDeviceTag(icon.value ?? '', props.hd))

const isSkillBooster = computed(() => element.value?.tags?.includes('crewSkillBattleBooster'))

const icon = computed(() => {
  if (!element.value || !props.tag) return null

  if (isBattleBooster.value) return getEquipmentIconByTag(props.tag, props.hd).value
  else return getDeviceIconByTag(props.tag, props.hd).value
})

function is(target: 'modernized_1' | 'modernized_2' | 'modernized_3' | 'trophyBasic' | 'trophyUpgraded' | 'deluxe') {
  return computed(() => element.value?.tags?.includes(target))
}

</script>


<style lang="scss" scoped>
.equipment-slot-container {
  height: 100%;
  margin: 0;
  aspect-ratio: 1 / 1;

  & * {
    pointer-events: none;
  }


  .equipment-slot {
    height: 100%;
    width: 100%;
    padding: 5%;
    position: relative;
    overflow: hidden;

    background-color: rgb(0 0 0 / 45%);
    border-radius: 0.1em;

    .equipment {
      height: 100%;
      width: 100%;
      object-fit: contain;
      z-index: 1;

      &.hd {
        scale: 1.2;
      }

      &.booster {
        filter: drop-shadow(0 0 15px #00ff2a72);
      }
    }

    .empty {
      position: absolute;
      height: 32%;
      width: 32%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #bda273ac;
    }

    .booster-background {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }

    .battleBooster {
      position: absolute;
      height: 40%;
      width: 40%;
      bottom: 0;
      left: -2%;
      z-index: 10;
    }

    .modernized {
      position: absolute;
      z-index: 2;
      width: 250%;
      top: -45%;
      left: -40%;
    }
  }
}
</style>