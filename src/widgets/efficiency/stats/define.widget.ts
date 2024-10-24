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
  { value: 'dmg', label: 'dmg' },
  { value: 'kill', label: 'kill' },
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
  { value: 'lifetime', label: 'lifetime' },
  { value: 'duration', label: 'duration' },
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
    {
      type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 10,
      slots: slotVariants.map(t => ({ icon: t.value, label: t.label, value: t.value })),
      default: ['dmg', 'block', 'assist', 'fire-dmg', 'ram-dmg']
    },
  ]
})