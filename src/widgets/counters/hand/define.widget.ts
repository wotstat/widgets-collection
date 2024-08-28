import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Ручной счётчик",
  description: "Изменяйте значение счётчика вручную с помощью кнопок на клавиатуре",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'int', target: 'start-from', label: 'Начать с', default: 0 },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})