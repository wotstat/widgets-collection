import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  skin: 'transparent' | 'default'
  battlesCount: number
  players: { name: string, avg: number, last: number }[]
  totalAvg: number
  totalLast: number
}

export default defineWidget({
  name: "Чак классический",
  description: "Подсчитывает очки каждого игрока во взводе по правилам турнира Чака",
  params: [{
    type: 'select', target: 'skin', label: 'shared:style:title', variants: [
      { value: 'transparent', label: 'shared:style:transparent' },
      { value: 'default', label: 'shared:style:default' },
    ], default: 'transparent'
  },
  { type: 'accentColorParam' },
  { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
  ]
})