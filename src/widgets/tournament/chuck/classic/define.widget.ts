import { defineWidget } from "@/utils/defineWidget";
import i18n from "./i18n.json";

export type Props = {
  skin: 'transparent' | 'default' | 'dot'
  border: boolean
  battlesCount: number
  players: { name: string, avg: number, last: number }[]
  totalAvg: number
  totalLast: number
}


export default defineWidget({
  name: "Чак классический",
  description: "Подсчитывает очки каждого игрока во взводе по правилам турнира Чака",
  i18n,
  params: [
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'dot', label: 'settings:style:dot' },
        { value: 'transparent', label: 'shared:style:gradient' },
        { value: 'default', label: 'shared:style:default' },
      ], default: 'dot'
    },
    { type: 'checkbox', target: 'border', label: 'settings:style:border', default: false, visible: ctx => ctx.skin !== 'default' },
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
  ]
})