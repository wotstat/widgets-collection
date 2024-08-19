import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Турнир Ростелекома",
  description: "Виджет отображает прогресс в турнире Ростелекома в Стальном Охотнике",
  widget: '../battleRoyale/Index.vue',
  preview: '../battleRoyale/Preview.vue',
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть график', default: false },
    { type: 'string', target: 'nickname', label: 'Никнейм', default: '' },
  ]
})