import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Открытые киберспортивные игры",
  description: "Виджет отображает прогресс в турнире Открытые киберспортивные игры в Стальном Охотнике",
  widget: '../battleRoyale/Index.vue',
  preview: '../battleRoyale/Preview.vue',
  params: [
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam' },
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть график', default: false },
    { type: 'checkbox', target: 'hideL4', label: 'Скрыть лучшую серию', default: false },
    { type: 'string', target: 'nickname', label: 'Никнейм', default: '' },
  ]
})