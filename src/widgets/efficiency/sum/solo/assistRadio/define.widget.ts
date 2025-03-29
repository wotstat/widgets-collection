import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Урон по засвету",
  description: "Отображает сумму урона по вашим разведданным",
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
    { type: 'checkbox', target: 'reverse', label: 'Обратный отсчёт', default: false },
    { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})