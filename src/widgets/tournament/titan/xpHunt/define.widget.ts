import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Охота за опытом. Titan Agency",
  description: "Виджет индивидуальной прогрессии для турнира Охота за опытом от Titan Agency.",
  params: [
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam' },
    { type: 'checkbox', target: 'transparent-background', label: 'Прозрачный фон', default: true },
    { type: 'checkbox', target: 'show-best', label: 'Отображать лучшие бои', default: true },
  ]
})