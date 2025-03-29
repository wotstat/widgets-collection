import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Счётчик боёв",
  description: "Считает количество проведённых боёв",
  params: [{
    type: 'select', target: 'skin', label: 'shared:style:title', variants: [
      { value: 'transparent', label: 'shared:style:transparent' },
      { value: 'default', label: 'shared:style:default' },
    ], default: 'transparent'
  },
  { type: 'accentColorParam' },
  { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
  { type: 'checkbox', target: 'title', label: 'Заголовок', default: true },
  { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
  { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})