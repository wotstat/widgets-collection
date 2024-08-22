import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Счётчик боёв",
  description: "Считает количество проведённых боёв",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
    { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})