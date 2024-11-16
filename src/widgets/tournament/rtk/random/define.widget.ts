import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  hideL1: boolean,
  hideL2: boolean,
  hideL3: boolean,
  skin?: 'default' | 'transparent',
  place: number
  battleCount: number,
  bestBattles: {
    tank: string | null,
    score: number,
    today: boolean,
  }[],
  last10: number[],
  lastBattle?: {
    tank: string | null,
    score: number
  }
}

export default defineWidget({
  name: "Турнир Ростелекома",
  description: "Виджет отображает прогресс в турнире Ростелекома Третий этап",
  params: [
    {
      type: 'select', target: 'skin', label: 'Стиль', variants: [
        { value: 'default', label: 'Стандартный' },
        { value: 'transparent', label: 'Прозрачный' },
      ], default: 'default'
    },
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть график', default: false },
  ]
})