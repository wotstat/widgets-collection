import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Урон по засвету",
  description: "Отображает сумму урона по вашим разведданным",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
    { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})