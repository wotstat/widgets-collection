import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Битва Блогеров. TROVO",
  description: "Виджет отображает серию в 30 боёв на ТТ10",
  params: [
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam' },
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть статистику', default: false },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})