import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  hideL1: boolean,
  hideL2: boolean,
  hideL3: boolean,
  skin?: 'default' | 'transparent' | 'replay',
  place: number
  battleCount: number,
  bestBattles: {
    tank: string | null,
    date: number | null,
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
  name: "Турнир EviL_GrannY",
  description: "Виджет отображает прогресс в турнире Gendarme VS FV4005 - Выбери Своего Бойца!",
  params: [
    {
      type: 'select', target: 'skin', label: 'Стиль', variants: [
        { value: 'default', label: 'Стандартный' },
        { value: 'transparent', label: 'Прозрачный' },
        { value: 'replay', label: 'Название реплеев' },
      ], default: 'default'
    },
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть график', default: false },
  ]
})