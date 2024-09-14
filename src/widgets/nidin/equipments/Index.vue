<template>
  <WidgetRoot auto-height auto-scale>
    <WidgetStatusWrapper :ctx>
      <Content :hd="query.hd === 'true'" :show-tank-name="query.showTankName === 'true'"
        :variant="query.variant == 'default' ? 'default' : 'compact'" :tank-name="tankName" :sets />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed } from 'vue';
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { NidinTankEquipment } from '../api';
import { useFetch } from '@vueuse/core';
import { getConsumableByIndex, getEquipmentByIndex, SpecializationTag } from '@/components/equipment/equipment';
import { Props } from './define.widget';

const query = useQueryParams<{
  hd: string
  showTankName: string
  variant: string
}>()

const { data } = useFetch('https://nidin.ru/table/equipment/tankEquipment.json').json<NidinTankEquipment.Data>()
const dataById = computed(() => {
  if (!data.value) return null
  return new Map(data.value.tanks.map(i => [i.id, i]))
})

const ctx = useWidgetSdk();
const { sdk } = ctx;

const vehicle = useReactiveState(sdk.data.hangar.vehicle.info)
const optDevices = useReactiveState(sdk.data.hangar.vehicle.optDevices)

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



const sets = computed<Props['sets']>(() => {
  if (!dataById.value || !tankTag.value) return []

  const tank = dataById.value.get(tankTag.value)

  if (!tank) return []

  const specialization = tank.roleslot_2 ? NidinTankEquipment.roleSlotToSpecialization(tank.roleslot_2) : null
  const specifications = [tankSpecialization.value, specialization, null]

  const sets = [tank.equipment.Set1, tank.equipment.Set2]
    .map(set => {
      const equipmentSlots = set.equipmentSlots
        .map(i => i.index)
        .map(i => i ? getEquipmentByIndex(i) : null)
        .map(i => i?.id)

      const booster = set.instructionSlot.map(i => i.index).map(i => i ? getConsumableByIndex(i)?.id : null).shift() ?? null
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