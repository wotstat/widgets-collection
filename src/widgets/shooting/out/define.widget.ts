import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "За пределы круга",
  description: "Считает количество выстрелов за пределы круга сведения",
  params: [
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'transparent', label: 'shared:style:transparent' },
        { value: 'default', label: 'shared:style:default' },
      ], default: 'transparent'
    },
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam', visible: ctx => ctx['skin'] == 'default' },
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
    { type: 'checkbox', target: 'percent', label: 'В процентах', default: false },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})