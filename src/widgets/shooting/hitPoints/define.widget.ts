import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Куда полетел снаряд",
  description: "Показывает куда полетел снаряд на круге сведения",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'reset-each-battle', label: 'Сбрасывать каждый бой', default: true },
    { type: 'checkbox', target: 'show-center', label: 'Центр прицела', default: true },
    { type: 'checkbox', target: 'show-circle', label: 'Отображать круг', default: false },
    { type: 'int', target: 'max-hits', label: 'Макс. точек', default: 1000 },
  ]
})