import { defineWidget } from "@/utils/defineWidget";


export const defaultGradient = {
  from: '36e3ff',
  to: 'ff6698',
}


export type Props = {
  isInBattle: boolean;
  colorFrom: string;
  colorTo: string;
  title: string;
  period: string;
  showTitle: HangerBattleVariant;
  periodLine: HangerBattleVariant;
  battlesLine: HangerBattleVariant;
  photoLine: boolean;
  photoType: PhotoVariant;
  hpLine: boolean;
}

export type HangerBattleVariant = 'never' | 'hangar' | 'battle' | 'both';
const hangerBattleVariants = [
  { value: 'never', label: 'Не отображать' },
  { value: 'hangar', label: 'В агаре' },
  { value: 'battle', label: 'В бою' },
  { value: 'both', label: 'В агаре и бою' },
]

type PhotoVariant = 'never' | 'photo' | 'tank';
const photoVariants = [
  { value: 'never', label: 'Не отображать' },
  { value: 'photo', label: 'Фото' },
  { value: 'tank', label: 'Танк' },
]


export default defineWidget({
  name: "Чак для боя",
  description: "Отображает счётчик очков Чака внутри боя для всех совзводных. Гибко конфигурируется.",
  params: [
    { type: 'string', target: 'title', label: 'Название', default: 'ТУРНИР МËРФИ', visible: ctx => ctx['show-title'] != 'never' },
    { type: 'string', target: 'period', label: 'Этап', default: 'ЭТАП 1', visible: ctx => ctx['period-line'] != 'never' },
    { type: 'select', target: 'show-title', label: 'Заголовок', variants: hangerBattleVariants, default: 'both' },
    { type: 'select', target: 'period-line', label: 'Раздел этапа', variants: hangerBattleVariants, default: 'both' },
    { type: 'select', target: 'battles-line', label: 'Раздел боёв', variants: hangerBattleVariants, default: 'both' },
    { type: 'checkbox', target: 'photo-line', label: 'Раздел игроков', default: true },
    { type: 'select', target: 'photo-type', label: 'Фото игроков', variants: photoVariants, default: 'photo', visible: ctx => ctx['photo-line'] },
    { type: 'checkbox', target: 'hp-line', label: 'Раздел ХП', default: true },
    { type: 'separator' },
    { type: 'color', target: 'color-from', label: 'Цвет от', default: defaultGradient.from },
    { type: 'color', target: 'color-to', label: 'Цвет до', default: defaultGradient.to },

    // {
    //   type: 'select', target: 'skin', label: 'shared:style:title', variants: [
    //     { value: 'transparent', label: 'shared:style:transparent' },
    //     { value: 'default', label: 'shared:style:default' },
    //   ], default: 'transparent'
    // },
    // { type: 'accentColorParam' },
    // { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
    // { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    // { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})