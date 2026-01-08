<template>
  <div class="specialization-container">
    <img class="specialization" :class="{ 'isOn': isOn }" :src="targetImg">
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { getDeviceByTag, SpecializationTag } from './equipment';

import firepowerOff from './assets/equipment/specialization/firepower_off.png'
import firepowerOn from './assets/equipment/specialization/firepower_on.png'
import mobilityOff from './assets/equipment/specialization/mobility_off.png'
import mobilityOn from './assets/equipment/specialization/mobility_on.png'
import stealthOff from './assets/equipment/specialization/stealth_off.png'
import stealthOn from './assets/equipment/specialization/stealth_on.png'
import survivabilityOff from './assets/equipment/specialization/survivability_off.png'
import survivabilityOn from './assets/equipment/specialization/survivability_on.png'


const props = defineProps<{
  tag: SpecializationTag | null
  slotEquipmentTag?: string | null
  isOn?: boolean
}>()


const device = computed(() => props.slotEquipmentTag ? getDeviceByTag(props.slotEquipmentTag).value : null)
const isOn = computed(() => props.isOn ||
  props.tag &&
  device.value?.tags?.includes(props.tag) &&
  !device.value.tags.includes('deluxe') &&
  !device.value.tags.includes('trophyBasic') &&
  !device.value.tags.includes('trophyUpgraded')
)

const targetImg = computed(() => {
  if (props.tag === 'firepower') {
    return isOn.value ? firepowerOn : firepowerOff
  } else if (props.tag === 'mobility') {
    return isOn.value ? mobilityOn : mobilityOff
  } else if (props.tag === 'stealth') {
    return isOn.value ? stealthOn : stealthOff
  } else if (props.tag === 'survivability') {
    return isOn.value ? survivabilityOn : survivabilityOff
  }
})

</script>


<style lang="scss" scoped>
.specialization-container {
  height: 100%;
  margin: 0;
  aspect-ratio: 1 / 1;

  & * {
    pointer-events: none;
  }

  .specialization {
    height: 100%;
    width: 100%;
    object-fit: contain;
    display: block;

    &:not(.isOn) {
      filter: drop-shadow(0 0 0.2em rgba(0, 0, 0, 1));
    }
  }
}
</style>