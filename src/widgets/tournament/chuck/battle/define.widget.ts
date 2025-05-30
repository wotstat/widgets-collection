import { defineWidget } from "@/utils/defineWidget";
import i18n from './i18n.json'


export const defaultGradient = {
  from: '36e3ff',
  to: 'ff6698',
}


export type Props = {
  isInBattle: boolean;
  score: number;
  battles: number;
  players: {
    name: string
    tankName: string
    score: number
    hp: number
    maxHp: number
    connected: boolean;
  }[]

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
export const hangerBattleVariants = [
  { value: 'never', label: 'options:hangar:never' },
  { value: 'hangar', label: 'options:hangar:hangar' },
  { value: 'battle', label: 'options:hangar:battle' },
  { value: 'both', label: 'options:hangar:both' },
]

export type PhotoVariant = 'never' | 'photo' | 'tank';
export const photoVariants = [
  { value: 'never', label: 'options:photo:never' },
  { value: 'photo', label: 'options:photo:photo' },
  { value: 'tank', label: 'options:photo:tank' },
]


export default defineWidget({
  name: "Чак для боя",
  description: "Отображает счётчик очков Чака внутри боя для всех совзводных. Гибко конфигурируется.",
  i18n,
  params: [
    { type: 'string', target: 'title', label: 'options:name', default: 'ТУРНИР МËРФИ', visible: ctx => ctx['show-title'] != 'never' },
    { type: 'string', target: 'period', label: 'options:step', default: 'ЭТАП 1', visible: ctx => ctx['period-line'] != 'never' },
    { type: 'select', target: 'show-title', label: 'options:title', variants: hangerBattleVariants, default: 'both' },
    { type: 'select', target: 'period-line', label: 'options:period-line', variants: hangerBattleVariants, default: 'both' },
    { type: 'select', target: 'battles-line', label: 'options:battles-line', variants: hangerBattleVariants, default: 'both' },
    { type: 'select', target: 'photo-type', label: 'options:photo-type', variants: photoVariants, default: 'photo', visible: ctx => ctx['photo-line'] },
    { type: 'checkbox', target: 'photo-line', label: 'options:photo-line', default: true },
    { type: 'checkbox', target: 'hp-line', label: 'options:hp-line', default: true },
    { type: 'separator' },
    { type: 'color', target: 'color-from', label: 'options:color-from', default: defaultGradient.from },
    { type: 'color', target: 'color-to', label: 'options:color-to', default: defaultGradient.to },
  ]
})