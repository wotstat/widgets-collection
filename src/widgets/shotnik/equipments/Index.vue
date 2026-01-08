<template>
  <WidgetWrapper auto-height auto-scale hangar-only>
    <Content :hd :showTankName :postProgression :postProgressionCurrent :variant :tank-name="tankName" :sets
      :postProgressionSetup :author="'Sh0tnik'" :displayAuthor="author" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from '../../nidin/equipments/Content.vue';
import { computed, watchEffect } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { ShotnikTankEquipment } from '../api';
import { useFetch } from '@vueuse/core';
import { getEquipmentById, getDeviceById, SpecializationTag, getBestAvailableDeviceUpgrade } from '@/components/equipment/equipment';
import { Props } from '../../nidin/equipments/define.widget';

const { hd, showTankName, variant, postProgression, postProgressionCurrent, author } = useQueryParams({
  hd: Boolean,
  showTankName: Boolean,
  variant: oneOf(['default', 'compact'] as const, 'default'),
  postProgression: Boolean,
  author: Boolean,
  postProgressionCurrent: Boolean
})

const { data } = useFetch(ShotnikTankEquipment.URL).json<ShotnikTankEquipment.Data>()
const dataById = computed(() => {
  if (!data.value) return null
  return new Map(data.value ? Object.entries(data.value) : [])
})


const { sdk } = useWidgetSdk();

const vehicle = useReactiveState(sdk.data.hangar.vehicle.info)
const optDevices = useReactiveState(sdk.data.hangar.vehicle.optDevices)
const postProgressionState = useReactiveState(sdk.data.hangar.vehicle.postProgression)

const vehicleMods = computed(() => {
  if (!postProgressionState.value?.modifications) return null
  return postProgressionState.value.modifications
})

const tankSpecialization = computed(() => {
  if (!optDevices.value) return null
  const spec = optDevices.value.shift()?.specialization
  if (!spec) return null

  return spec as SpecializationTag
})

const tankName = computed(() => vehicle.value?.localizedShortName ?? '-')
const tankTag = computed(() => {
  if (!vehicle.value) return null
  const tag = vehicle.value.tag.split(':')[1]
  return tag.replace('_7x7', '')
})

const postProgressionSetup = computed<Props['postProgressionSetup']>(() => {
  if (!vehicleMods.value) return undefined

  if (!dataById.value || !tankTag.value || !vehicle.value) return undefined

  const tank = dataById.value.get(tankTag.value)
  const level = vehicle.value.level
  if (!tank) return undefined

  const availableCount = level <= 5 ? 0 : level <= 7 ? 3 : level <= 9 ? 4 : 5
  const available = (vehicleMods.value as [string, string][]).slice(0, availableCount)

  const modByIndex = new Map(tank.pairs.map(([idx, i]) => [idx, i]))

  return {
    available,
    recommended: available.map((t, i) => {
      const recommended = modByIndex.get(i)

      if (recommended == 1) return t[0]
      if (recommended == 2) return t[1]
      return null
    }),
    current: postProgressionState.value?.selectedModifications ?? []
  }
})

const emptySet: Props['sets'] = [
  { slots: [{ equipment: null, specialization: null }, { equipment: null, specialization: null }, { equipment: null, specialization: null }], booster: null },
  { slots: [{ equipment: null, specialization: null }, { equipment: null, specialization: null }, { equipment: null, specialization: null }], booster: null }
]

const sets = computed<Props['sets']>(() => {
  if (!dataById.value || !tankTag.value) return emptySet

  const tank = dataById.value.get(tankTag.value)
  if (!tank) return emptySet

  const sets = [tank.groups.at(0), tank.groups.at(1)]
    .filter(i => i != undefined)
    .map(set => {
      const equipmentSlots = (set.slice(set.length == 5 ? 1 : 0, -1) ?? [])
        .map(i => i ? getDeviceById(i).value : null)
        .map(i => i ? getBestAvailableDeviceUpgrade(i.tag).value : null)
        .map(i => i?.tag ?? null)

      const booster = set.at(-1) ? getEquipmentById(set.at(-1)!)?.value?.tag : null


      const specs = [
        tankSpecialization.value,
        vehicle.value && set.length == 5 ? ShotnikTankEquipment.roleSlotToSpecialization(set[0], vehicle.value.class) : null,
        null
      ]

      return {
        slots: equipmentSlots.map((equipment, i) => ({
          equipment: equipment ?? null,
          specialization: specs[i]
        })),
        booster: booster ?? null
      }
    })

  return sets
})

watchEffect(() => console.log(sets.value, dataById.value?.get(tankTag.value ?? '')?.groups))
</script>


<style lang="scss" scoped></style>