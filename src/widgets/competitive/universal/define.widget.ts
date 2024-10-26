import { efficiency, IconType, multiSlotParamSlot, shared } from "@/components/efficiencyIcon/utils";
import { defineWidget, SelectParam } from "@/utils/defineWidget";
import { i18n } from "@/components/efficiencyIcon/i18n";
import { arrayExclude } from "@/utils";


export const possibleSlots = arrayExclude([...efficiency, ...shared] as const, ['player', 'tank', 'gun-mark-percent'] as const)
type PossibleIconType = typeof possibleSlots[number]
export type Props = {
  slots: PossibleIconType[]
  data: ({ player: string } & { [key in PossibleIconType]: number })[]
  total?: { [key in PossibleIconType]: number }
}

const slots = multiSlotParamSlot.filter(t => !['gun-mark-percent'].includes(t.value))

const totalOption = (target: string, label: string, visible: (params: Record<string, any>) => boolean) => ({
  type: 'select',
  target,
  label,
  variants: ['total', 'avg', 'max', 'min'].map(t => ({ value: t, label: `${t}-long` })),
  visible
} as SelectParam)

export default defineWidget({
  name: "Соревновательный универсальный",
  description: "Позволяет соревноваться с друзьями по разным параметрам",
  beta: true,
  i18n,
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 60, slots, default: ['dmg-avg', 'kill-avg', 'xp-avg', 'fire-dmg-avg', 'battles'] },
    { type: 'checkbox', target: 'total', label: 'Подводить итог', default: false },
    totalOption('battles', 'Бои', t => t['total'] && t['slots'].includes('battles')),
    'separator',
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8 },
    { type: 'checkbox', target: 'passive', label: 'Пассивный режим', default: false },
  ]
})