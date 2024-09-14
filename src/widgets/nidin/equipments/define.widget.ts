import type { EquipmentTag, ConsumableTag, SpecializationTag } from "@/components/equipment/equipment";
import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Оборудование от __NIDIN__",
  description: "Рекомендуемое оборудование для каждого танка",
  params: [
    { type: 'checkbox', target: 'show-tank-name', label: 'Название танка', default: true },
    { type: 'select', target: 'variant', label: 'Стиль', variants: [{ value: 'default', label: 'Стандартный' }, { value: 'compact', label: 'Компактный' }], default: 'compact' },
    { type: 'checkbox', target: 'hd', label: 'HD качество', default: true },
  ]
})

export type Props = {
  hd?: boolean
  showTankName?: boolean
  tankName: string
  variant: 'default' | 'compact'
  sets: {
    slots: {
      equipment: EquipmentTag | null
      specialization: SpecializationTag | null
    }[]
    booster: ConsumableTag | null
  }[]
}