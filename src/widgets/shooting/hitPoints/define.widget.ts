import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Куда полетел снаряд",
  description: "Показывает куда полетел снаряд на круге сведения",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'reset-each-battle', label: 'Сбрасывать каждый бой', default: false },
    { type: 'checkbox', target: 'show-shadow', label: 'Тень', default: false },
    { type: 'checkbox', target: 'show-center', label: 'Центр прицела', default: true },
    { type: 'int', target: 'max-hits', label: 'Отображать попаданий', default: 1000 },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})