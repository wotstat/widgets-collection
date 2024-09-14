<template>
  <div class="equipment-slot-container">
    <div class="equipment-slot">
      <img class="modernized" v-if="is('modernized_1')" :src="modernized1">
      <img class="modernized" v-if="is('modernized_2')" :src="modernized2">
      <img class="modernized" v-if="is('modernized_3')" :src="modernized3">
      <img class="modernized" v-if="is('trophyBasic')" :src="trophyBasic">
      <img class="modernized" v-if="is('trophyUpgraded')" :src="trophyUpgraded">
      <img class="modernized" v-if="is('deluxe')" :src="plus">
      <img class="booster-background" v-if="isBattleBooster" :src="boosterBackground">
      <img class="battleBooster" v-if="isBattleBooster" :src="isSkillBooster ? skillBooster : equipmentBooster">
      <img class="equipment" :class="{ 'hd': hd, 'booster': isBattleBooster }" v-if="tag" :key="tag + hd" :src="icon">
      <PlusImg class="empty" v-else />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { ConsumableTag, EquipmentTag, getConsumableById, getEquipmentById, getEquipmentIconByTag, getConsumableIconByTag, isConsumableTag } from './equipment';

import modernized1 from '@/assets/artefact/equipment/overlay/modernized_1.png'
import modernized2 from '@/assets/artefact/equipment/overlay/modernized_2.png'
import modernized3 from '@/assets/artefact/equipment/overlay/modernized_3.png'

import plus from '@/assets/artefact/equipment/overlay/plus.png'
import PlusImg from '@/assets/artefact/equipment/utils/plus.svg'
import trophyBasic from '@/assets/artefact/equipment/overlay/trophyBasic.png'
import trophyUpgraded from '@/assets/artefact/equipment/overlay/trophyUpgraded.png'
import boosterBackground from '@/assets/artefact/equipment/overlay/boosterBackground.png'
import equipmentBooster from '@/assets/artefact/equipment/overlay/equipmentBooster.png'
import skillBooster from '@/assets/artefact/equipment/overlay/skillBooster.png'

const props = defineProps<{
  tag: EquipmentTag | ConsumableTag | null
  hd?: boolean
}>()

const isBattleBooster = computed(() => props.tag && isConsumableTag(props.tag))
const element = computed(() => {
  if (!props.tag) return null

  if (isConsumableTag(props.tag)) {
    return getConsumableById(props.tag)
  } else {
    return getEquipmentById(props.tag)
  }
})

const isSkillBooster = computed(() => element.value?.tags?.includes('crewSkillBattleBooster'))

const icon = computed(() => {
  if (!element.value || !props.tag) return null

  if (isConsumableTag(props.tag)) {
    return getConsumableIconByTag(props.tag, props.hd)
  } else {
    return getEquipmentIconByTag(props.tag, props.hd)
  }
})

function is(target: 'modernized_1' | 'modernized_2' | 'modernized_3' | 'trophyBasic' | 'trophyUpgraded' | 'deluxe') {
  return element.value?.tags?.includes(target)
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