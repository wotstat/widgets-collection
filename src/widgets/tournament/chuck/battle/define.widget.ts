import { defineWidget } from "@/utils/defineWidget";
import i18n from './i18n.json'


export const merfiGradient = {
  from: '36e3ff',
  to: 'ff6698',
}

export const customGradient = {
  from: 'ffd23d',
  to: 'ff9900',
}

export type Props = {
  isInBattle: boolean;
  score: number;
  battles: number;
  players: {
    name: string
    tankName: string
    tankTag: string
    score: number
    totalScore: number
    hp: number
    maxHp: number
    connected: boolean
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
  gradient: boolean;
  animation: boolean;
  widgetStyle: WidgetStyle;
  lastBattleTotalScore: number | null;
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

export type WidgetStyle = 'merfi' | 'simple' | 'custom'

export default defineWidget({
  name: "Чак для боя",
  description: "Отображает счётчик очков Чака. Гибко конфигурируется.",
  i18n,
  params: [
    { type: 'string', target: 'title', label: 'options:name', default: 'ТУРНИР ЧАКА', visible: ctx => ctx['show-title'] != 'never' },
    { type: 'string', target: 'period', label: 'options:step', default: 'ЭТАП 1', visible: ctx => ctx['period-line'] != 'never' },
    { type: 'separator', visible: ctx => ctx['show-title'] != 'never' || ctx['period-line'] != 'never' },

    { type: 'select', target: 'show-title', label: 'options:title', variants: hangerBattleVariants, default: 'never' },
    { type: 'select', target: 'period-line', label: 'options:period-line', variants: hangerBattleVariants, default: 'never' },
    { type: 'select', target: 'battles-line', label: 'options:battles-line', variants: hangerBattleVariants, default: 'both' },
    { type: 'select', target: 'photo-type', label: 'options:photo-type', variants: photoVariants, default: 'tank', visible: ctx => ctx['photo-line'] },
    { type: 'checkbox', target: 'photo-line', label: 'options:photo-line', default: true },
    { type: 'checkbox', target: 'hp-line', label: 'options:hp-line', default: true },
    { type: 'checkbox', target: 'animation', label: 'options:animation', default: true },
    { type: 'separator' },
    {
      type: 'select', target: 'widget-style', label: 'options:widget-style', variants: [
        { value: 'merfi', label: 'options:widget-style:merfi' },
        { value: 'simple', label: 'options:widget-style:simple' },
        { value: 'custom', label: 'options:widget-style:custom' }
      ], default: 'merfi'
    },
    { type: 'checkbox', target: 'gradient', label: 'options:gradient', default: true, visible: ctx => ctx['widget-style'] != 'simple' },
    { type: 'color', target: 'color-from', label: 'options:color-from', default: customGradient.from, visible: ctx => ctx['widget-style'] == 'custom' },
    { type: 'color', target: 'color-to', label: 'options:color-to', default: customGradient.to, visible: ctx => ctx['widget-style'] == 'custom' },
    { type: 'accentColorParam', visible: ctx => ctx['widget-style'] == 'simple' },
    { type: 'backgroundColorParam', visible: ctx => ctx['widget-style'] == 'simple' },
  ]
})