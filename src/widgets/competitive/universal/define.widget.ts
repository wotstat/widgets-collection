import { IconType, multiSlotParamSlot } from "@/components/efficiencyIcon/utils";
import { defineWidget } from "@/utils/defineWidget";
import { i18n } from "@/components/efficiencyIcon/i18n";

export type Props = {
  slots: IconType[]
}

export default defineWidget({
  name: "Соревновательный универсальный",
  description: "Позволяет соревноваться с друзьями по разным параметрам",
  beta: true,
  i18n,
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'allow-squad', label: 'Учитывать взводы', default: false },
    { type: 'multi-slot', target: 'slots', label: 'Слоты', min: 1, max: 6, slots: multiSlotParamSlot, default: ['dmg-avg', 'block-avg', 'assist-avg', 'xp-avg', 'battles'] },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8 },
  ]
})