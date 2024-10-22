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
  anim?: boolean
}

export const slotVariants = [
  { value: 'player', label: 'player' },
  { value: 'tank', label: 'tank' },
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
  name: "Взводная эффективность",
  description: "Отображает эффективность ваших совзводных в бою",
  i18n,
  beta: true,
  params: [
    'accentColorParam',
    { type: 'checkbox', target: 'anim', label: 'Анимация', default: true },
    {
      type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 10,
      slots: slotVariants.map(t => ({ icon: t.value, label: t.label, value: t.value })),
      default: ['player', 'tank', 'dmg', 'block', 'assist']
    },
    { type: 'checkbox', target: 'channel-key-enable', label: 'Использовать ключ канала', default: false },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8, visible: t => t['channel-key-enable'] }
  ]
})