import { efficiency, IconType, multiSlotParamSlot, shared } from "@/components/efficiencyIcon/utils";
import { defineWidget } from "@/utils/defineWidget";
import { i18n } from "@/components/efficiencyIcon/i18n";
import { arrayExclude } from "@/utils";


export const possibleSlots = arrayExclude([...efficiency, ...shared] as const, ['player', 'tank', 'gun-mark-percent'] as const)
type PossibleIconType = typeof possibleSlots[number]
export type Props = {
  slots: PossibleIconType[]
  data: ({ player: string } & { [key in PossibleIconType]: number })[]
}

const slots = multiSlotParamSlot.filter(t => !['gun-mark-percent'].includes(t.value))

export default defineWidget({
  name: "Соревновательный универсальный",
  description: "Позволяет соревноваться с друзьями по разным параметрам",
  beta: true,
  i18n,
  params: [
    'accentColorParam',
    'backgroundColorParam',
    // { type: 'checkbox', target: 'allow-squad', label: 'Учитывать взводы', default: false },
    { type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 60, slots, default: ['dmg-avg', 'kill-avg', 'xp-avg', 'fire-dmg-avg', 'battles'] },
    // { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8 },
    { type: 'checkbox', target: 'passive', label: 'Пассивный режим', default: false },
  ]
})