import { defineWidget, MultiSlotParamSlot } from "@/utils/defineWidget";

import { i18n } from "@/components/efficiencyIcon/i18n";
import { Line } from "@/widgets/efficiency/stats/define.widget";
import { InBattleIconType, modificationLabel } from "@/components/efficiencyIcon/utils";

export type Props = {
  lines: Line[]
  soloAlign?: 'left' | 'right'
  anim?: boolean
}


export const inBattleEfficiencyWithMods = ([
  'player',
  'tank',
  'hp',
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
  'gun-mark-dmg',
  'gun-mark-percent'
] as const).map(t => {
  if (typeof t === 'string') return { value: t, icon: t, label: t, modifications: [] }

  return {
    value: t.icon, icon: t.icon, label: t.icon,
    modifications: t.modifications.map(t => ({ value: t, icon: t, label: modificationLabel(t), }))
  }
}) satisfies MultiSlotParamSlot[]

export type SlotValue = InBattleIconType | 'player' | 'tank'


export default defineWidget({
  name: "Взводная эффективность",
  description: "Отображает эффективность ваших совзводных в бою",
  i18n,
  params: [
    'accentColorParam',
    { type: 'checkbox', target: 'anim', label: 'Анимация', default: true },
    {
      type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 10,
      slots: inBattleEfficiencyWithMods,
      default: ['player', 'tank', 'dmg', 'block', 'assist']
    },
    { type: 'checkbox', target: 'channel-key-enable', label: 'Использовать ключ канала', default: false },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8, visible: t => t['channel-key-enable'] }
  ]
})