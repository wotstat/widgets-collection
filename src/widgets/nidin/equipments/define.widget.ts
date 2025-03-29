import type { EquipmentTag, ConsumableTag, SpecializationTag } from "@/components/equipment/equipment";
import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Оборудование и модернизация от __NIDIN__",
  description: "Рекомендуемое оборудование и полевая модернизация для каждого танка",
  params: [
    { type: 'checkbox', target: 'show-tank-name', label: 'Название танка', default: true },
    { type: 'select', target: 'variant', label: 'shared:style:title', variants: [{ value: 'default', label: 'Стандартный' }, { value: 'compact', label: 'Компактный' }], default: 'compact' },
    { type: 'checkbox', target: 'hd', label: 'HD качество', default: true },
    { type: 'checkbox', target: 'post-progression', label: 'Модернизация', default: true },
    { type: 'checkbox', target: 'post-progression-current', label: 'Текущий выбор', default: true, visible: ctx => ctx['post-progression'] },
  ]
})

export type Props = {
  hd?: boolean
  showTankName?: boolean
  tankName: string
  postProgression?: boolean
  postProgressionCurrent?: boolean
  postProgressionSetup?: {
    available: [string, string][]
    recommended: (string | null)[]
    current: (string | null)[]
  }
  variant: 'default' | 'compact'
  sets: {
    slots: {
      equipment: EquipmentTag | null
      specialization: SpecializationTag | null
    }[]
    booster: ConsumableTag | null
  }[]
}