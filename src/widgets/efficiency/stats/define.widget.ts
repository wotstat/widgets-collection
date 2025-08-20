import { defineWidget, MultiSlotParamSlot } from "@/utils/defineWidget";

import { InBattleIconType, modificationLabel } from '@/components/efficiencyIcon/utils'
import { i18n } from "@/components/efficiencyIcon/i18n";

export type Line = {
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
  anim?: boolean
}

export const inBattleEfficiencyWithMods = ([
  'dmg',
  { icon: 'shot-dmg', modifications: ['shot-dmg-avg', 'shot-dmg-max'] },
  'kill',
  'block',
  'crits',
  'assist',
  'discover',
  'assist-radio',
  'assist-track',
  'fire',
  { icon: 'fire-dmg', modifications: ['fire-dmg', 'fire-dmg-max'] },
  'ram',
  { icon: 'ram-dmg', modifications: ['ram-dmg', 'ram-dmg-max'] },
  'ammo-bay-destroyed',
  { icon: 'ammo-bay-destroyed-dmg', modifications: ['ammo-bay-destroyed-dmg', 'ammo-bay-destroyed-dmg-max'] },
  'base-capture',
  'base-defend',
  'distance',
  'lifetime',
  'duration',
  'chuck-score',
  'hp',
  'gun-mark-dmg',
] as const).map(t => {
  if (typeof t === 'string') return { value: t, icon: t, label: t, modifications: [] }

  return {
    value: t.icon, icon: t.icon, label: t.icon,
    modifications: t.modifications.map(t => ({ value: t, icon: t, label: modificationLabel(t), }))
  }
}) satisfies MultiSlotParamSlot[]

export type SlotValue = InBattleIconType | 'tank' | 'player'

export default defineWidget({
  name: "Расширенная эффективность",
  description: "Отображает расширенную эффективность в бою. Настройте под себя до 8 параметров из 18 доступных",
  i18n,
  params: [
    { type: 'accentColorParam' },
    { type: 'select', target: 'solo-align', label: 'Выравнивание', variants: [{ value: 'left', label: 'Слева' }, { value: 'right', label: 'Справа' }], default: 'left' },
    { type: 'checkbox', target: 'anim', label: 'Анимация', default: true },
    {
      type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 10,
      slots: inBattleEfficiencyWithMods,
      default: ['dmg', 'block', 'assist', 'fire-dmg', 'ram-dmg']
    },
  ]
})