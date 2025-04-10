import { defineWidget } from "@/utils/defineWidget";


export const SUPPORTED_ITEMS = [
  'autoExtinguishers',
  'largeMedkit',
  'largeRepairkit',
] as const

export type ContainersData = {
  containers: { tag: string, count: number }[],
  modernizations: { tag: string, count: number }[],
  vehicles: { tag: string, isLegendary: boolean }[],
  crewBooks: { tag: string, count: number }[],
  items: { tag: string, count: number }[],
  battleBoosters: { tag: string, count: number }[],
  boosters: { tag: string, count: number }[],
  currencies: {
    gold: number
    credits: number
    freeXP: number
    premium: number
    mandarins: number
    crystals: number
    equipCoins: number
  },
}

export type Props = ContainersData & {}

export default defineWidget({
  name: "Статистика коробок",
  description: "Подводит итог выпавших ресурсов из коробок",
  params: [
    { type: 'checkbox', target: 'sync', label: 'Синхронизировать с сайтом', default: true },
    // { type: 'checkbox', target: 'hide-l1', label: 'Скрыть коробки', default: false },
    // { type: 'checkbox', target: 'hide-l2', label: 'Скрыть ресурсы', default: false },
    // { type: 'checkbox', target: 'hide-l3', label: 'Скрыть танки', default: false },
    { type: 'separator' },
    {
      type: 'select', target: 'delay', label: 'Задержка', variants: [
        { value: 'disable', label: 'отключена' },
        { value: 'short', label: 'без анимации' },
        { value: 'long', label: 'с анимацией' },
      ], default: 'long'
    },
  ]
})