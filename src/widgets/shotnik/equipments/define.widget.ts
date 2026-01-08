import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Оборудование и модернизация от Sh0tnik",
  description: "Рекомендуемое оборудование и полевая модернизация для каждого танка",
  params: [
    { type: 'checkbox', target: 'show-tank-name', label: 'Название танка', default: false },
    { type: 'select', target: 'variant', label: 'shared:style:title', variants: [{ value: 'default', label: 'Стандартный' }, { value: 'compact', label: 'Компактный' }], default: 'compact' },
    { type: 'checkbox', target: 'hd', label: 'HD качество', default: true },
    { type: 'checkbox', target: 'post-progression', label: 'Модернизация', default: true },
    { type: 'checkbox', target: 'post-progression-current', label: 'Текущий выбор', default: true, visible: ctx => ctx['post-progression'] },
    { type: 'separator' },
    { type: 'checkbox', target: 'author', label: 'Показывать автора', default: true },
  ]
})