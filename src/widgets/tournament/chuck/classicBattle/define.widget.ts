import { defineWidget } from "@/utils/defineWidget";
import i18n from './i18n.json'

export type Props = {
  skin: 'transparent' | 'default' | 'dot'
  totalScoreDisplay: 'never' | 'hangar' | 'both'
  isInBattle: boolean
  border: boolean
  battlesCount: number
  startedBattlesCount: number
  score: number
  totalScore: number
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
}

export default defineWidget({
  name: "Очки и ХП по правилам Чака",
  description: "В стилистике Турнира Чака 2025",
  i18n,
  params: [
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'dot', label: 'settings:style:dot' },
        { value: 'transparent', label: 'settings:style:gradient' },
        { value: 'default', label: 'shared:style:default' },
      ], default: 'dot'
    },
    { type: 'backgroundColorParam', visible: ctx => ctx.skin === 'default' },
    { type: 'checkbox', target: 'border', label: 'settings:style:border', default: false, visible: ctx => ctx.skin !== 'default' },
    { type: 'separator' },
    {
      type: 'select', target: 'total-score', label: 'settings:style:total-score', variants: [
        { value: 'never', label: 'options:hangar:never' },
        { value: 'hangar', label: 'options:hangar:hangar' },
        { value: 'both', label: 'options:hangar:both' },
      ], default: 'hangar'
    }
  ]
})