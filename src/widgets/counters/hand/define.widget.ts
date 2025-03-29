import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Ручной счётчик",
  description: "Изменяйте значение счётчика вручную с помощью кнопок на клавиатуре",
  params: [{
    type: 'select', target: 'skin', label: 'shared:style:title', variants: [
      { value: 'transparent', label: 'shared:style:transparent' },
      { value: 'default', label: 'shared:style:default' },
    ], default: 'transparent'
  },
  { type: 'accentColorParam' },
  { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
  { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
  { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})