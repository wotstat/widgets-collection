import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  opened: {
    small: number
    big: number
    tanks: number
    surprise: number
  },
  currencies: {
    gold: number
    credits: number
    freeXP: number
    premium: number
    mandarins: number
  },
  tanks: string[],
  hideL1: boolean
  hideL2: boolean
  hideL3: boolean
}

export default defineWidget({
  name: "Статистика коробок (новогодний)",
  description: "Подводит итог выпавших ресурсов из новогодних коробок 2025 года от Лесты",
  params: [
    { type: 'checkbox', target: 'sync', label: 'Синхронизировать с сайтом', default: true },
    { type: 'checkbox', target: 'hide-l1', label: 'Скрыть коробки', default: false },
    { type: 'checkbox', target: 'hide-l2', label: 'Скрыть ресурсы', default: false },
    { type: 'checkbox', target: 'hide-l3', label: 'Скрыть танки', default: false },
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