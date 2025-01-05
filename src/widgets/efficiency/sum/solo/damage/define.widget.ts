import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Нанесённый урон",
  description: "Отображает сумму нанесённого урона",
  params: [
    {
      type: 'select', target: 'skin', label: 'Стиль', variants: [
        { value: 'transparent', label: 'Прозрачный' },
        { value: 'default', label: 'Классический' },
      ], default: 'transparent'
    },
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
    { type: 'checkbox', target: 'reverse', label: 'Обратный отсчёт', default: false },
    { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})