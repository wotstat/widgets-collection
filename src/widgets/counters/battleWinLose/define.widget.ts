import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Счётчик результатов",
  description: "Считает количество проведённых боёв, побед и поражений",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    {
      type: 'select', target: 'align',
      variants: [{ value: 'left', 'label': 'Слева' }, { value: 'center', 'label': 'По центру' }, { value: 'right', 'label': 'Справа' }], label: 'Выравнивание', default: 'center'
    },
    { type: 'checkbox', target: 'show-losses', label: 'Показывать поражения', default: true },
    { type: 'checkbox', target: 'battle-on-result', label: 'Считать бой по результату', default: false },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
  ]
})