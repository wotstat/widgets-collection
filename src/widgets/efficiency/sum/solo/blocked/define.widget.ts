import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Blocked",
  description: "Отображает сумму заблокированного урона",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
    { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    { type: 'random-string', target: 'saveId', label: 'Ключ сохранения', length: 5 },
  ]
})