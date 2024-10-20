import { defineWidget } from "@/utils/defineWidget";

import { InBattleIconType } from '@/components/efficiencyIcon/utils'
import { i18n } from "@/components/efficiencyIcon/i18n";

type Line = {
  icon: 'player'
  values: string[]
} | {
  icon: 'tank'
  values: string[]
} | {
  icon: InBattleIconType
  values: number[]
}

export type Props = {
  lines: Line[]
  soloAlign?: 'left' | 'right'
}

export const slotVariants = [
  { value: 'empty', label: '-' },

  { value: 'dmg', label: 'dmg' },
  { value: 'block', label: 'block' },
  { value: 'assist', label: 'assist' },
  { value: 'discover', label: 'discover' },
  { value: 'assist-radio', label: 'assist-radio' },
  { value: 'assist-track', label: 'assist-track' },
  { value: 'fire', label: 'fire' },
  { value: 'fire-dmg', label: 'fire-dmg' },
  { value: 'ram', label: 'ram' },
  { value: 'ram-dmg', label: 'ram-dmg' },
  { value: 'ammo-bay-destroyed', label: 'ammo-bay-destroyed' },
  { value: 'ammo-bay-destroyed-dmg', label: 'ammo-bay-destroyed-dmg' },
  { value: 'base-capture', label: 'base-capture' },
  { value: 'base-defend', label: 'base-defend' },
  { value: 'distance', label: 'distance' },
  { value: 'chuck-score', label: 'chuck-score' },
  { value: 'gun-mark-dmg', label: 'gun-mark-dmg' },
  { value: 'gun-mark-percent', label: 'gun-mark-percent' }

] satisfies { value: Line['icon'] | 'empty', label: string }[]

export type SlotValue = typeof slotVariants[number]['value']

export default defineWidget({
  name: "Расширенная эффективность",
  description: "Отображает расширенную эффективность в бою. Настройте под себя до 8 параметров из 18 доступных",
  i18n,
  params: [
    'accentColorParam',
    { type: 'select', target: 'solo-align', label: 'Выравнивание', variants: [{ value: 'left', label: 'Слева' }, { value: 'right', label: 'Справа' }], default: 'left' },
    { type: 'checkbox', target: 'anim', label: 'Анимация', default: true },
    { type: 'select', target: 'slot-1', label: 'Слот 1', variants: slotVariants, default: 'dmg' },
    { type: 'select', target: 'slot-2', label: 'Слот 2', variants: slotVariants, default: 'block' },
    { type: 'select', target: 'slot-3', label: 'Слот 3', variants: slotVariants, default: 'assist' },
    { type: 'select', target: 'slot-4', label: 'Слот 4', variants: slotVariants, default: 'fire-dmg' },
    { type: 'select', target: 'slot-5', label: 'Слот 5', variants: slotVariants, default: 'ram-dmg' },
    { type: 'select', target: 'slot-6', label: 'Слот 6', variants: slotVariants, default: 'empty' },
    { type: 'select', target: 'slot-7', label: 'Слот 7', variants: slotVariants, default: 'empty' },
    { type: 'select', target: 'slot-8', label: 'Слот 8', variants: slotVariants, default: 'empty' },
  ]
})