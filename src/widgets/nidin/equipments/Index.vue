<template>
  <WidgetWrapper auto-height auto-scale hangar-only>
    <Content :hd :showTankName :postProgression :postProgressionCurrent :variant :tank-name="tankName" :sets
      :postProgressionSetup />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { NidinTankEquipment, NidinTankModifications } from '../api';
import { useFetch } from '@vueuse/core';
import { getConsumableByIndex, getEquipmentByIndex, SpecializationTag } from '@/components/equipment/equipment';
import { Props } from './define.widget';

const { hd, showTankName, variant, postProgression, postProgressionCurrent } = useQueryParams({
  hd: Boolean,
  showTankName: Boolean,
  variant: oneOf(['default', 'compact'] as const, 'default'),
  postProgression: Boolean,
  postProgressionCurrent: Boolean
})

const { data } = useFetch(NidinTankEquipment.URL).json<NidinTankEquipment.Data>()
const dataById = computed(() => {
  if (!data.value) return null
  return new Map(data.value.tanks.map(i => [i.id, i]))
})

const { data: modifications } = useFetch(NidinTankModifications.URL).json<NidinTankModifications.Data>()
const modificationsById = computed(() => {
  if (!modifications.value) return null
  return new Map(modifications.value.tanks.map(i => [i.id, i]))
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

  if (!modificationsById.value || !tankTag.value || !vehicle.value) return undefined

  const tank = modificationsById.value.get(tankTag.value)
  const level = vehicle.value.level
  if (!tank) return undefined

  const availableCount = level <= 5 ? 0 : level <= 7 ? 3 : level <= 9 ? 4 : 5
  const available = (vehicleMods.value as [string, string][]).slice(0, availableCount)

  return {
    available,
    recommended: available.map((t, i) => {
      const recommended = tank.pairM.at(i)
      if (recommended == '1') return t[0]
      if (recommended == '2') return t[1]
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

  const specialization = tank.roleslot_2 ? NidinTankEquipment.roleSlotToSpecialization(tank.roleslot_2) : null
  const specifications = [tankSpecialization.value, specialization, null]

  const sets = [tank.equipment.Set1, tank.equipment.Set2]
    .filter(i => i != undefined)
    .map(set => {
      const equipmentSlots = (set.equipmentSlots ?? [])
        .map(i => i.index)
        .map(i => i ? getEquipmentByIndex(i) : null)
        .map(i => i?.id)

      const booster = set.instructionSlot?.map(i => i.index).map(i => i ? getConsumableByIndex(i)?.id : null).shift() ?? null
      return {
        slots: equipmentSlots.map((equipment, i) => ({
          equipment: equipment ?? null,
          specialization: specifications[i] ?? null
        })),
        booster
      }
    })

  return sets
})

</script>


<style lang="scss" scoped></style>