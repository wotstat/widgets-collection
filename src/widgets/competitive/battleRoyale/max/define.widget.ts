import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Лучшие в Стальном Охотнике",
  description: "Позволяет соревноваться по максимальным показателям в Стальном Охотнике",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'select', target: 'dmg', label: 'Урон', variants: [{ value: 'max', label: 'максимум' }, { value: 'avg', label: 'средний' }], default: 'max' },
    { type: 'select', target: 'frags', label: 'Фраги', variants: [{ value: 'max', label: 'максимум' }, { value: 'avg', label: 'средний' }], default: 'max' },
    { type: 'select', target: 'top', label: 'Топы', variants: [{ value: 'in-row', label: 'подряд' }, { value: 'sum', label: 'всего' }], default: 'in-row' },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8 },
  ]
})