import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Битва Блогеров. TROVO",
  description: "Виджет индивидуальной прогрессии для турнира Битва Блогеров на платформе TROVO",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'transparent-background', label: 'Прозрачный фон', default: true },
    { type: 'checkbox', target: 'show-best', label: 'Отображать лучшие бои', default: true },
  ]
})