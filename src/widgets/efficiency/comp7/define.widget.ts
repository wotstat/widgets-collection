import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  currentRank: number
  history: {
    delta: number
    arena: string
    key: string
    result?: "draw" | "win" | "lose",
  }[],
  hideIcon: boolean
  game: 'lesta' | 'wg'
  skin?: 'default' | 'transparent'
}

export default defineWidget({
  name: "Прогрессия Натиска",
  description: "Отображает текущий ранг и прогресс в натиске",
  params: [
    { type: 'checkbox', target: 'hide-icon', label: 'Скрыть иконку', default: false },
    { type: 'select', target: 'history-length', label: 'Длина истории', variants: [0, 1, 2, 3, 4, 5, 6].map(t => ({ value: `${t}`, label: `${t}` })), default: '4' },
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'transparent', label: 'shared:style:transparent' },
        { value: 'default', label: 'shared:style:default' },
      ], default: 'transparent'
    },
    { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
  ]
})