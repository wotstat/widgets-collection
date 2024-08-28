import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "За пределы круга",
  description: "Считает количество выстрелов за пределы круга сведения",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
    { type: 'checkbox', target: 'percent', label: 'В процентах', default: false },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})