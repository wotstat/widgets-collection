import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Турнир Ростелекома",
  description: "Виджет отображает прогресс в турнире Ростелекома в Стальном Охотнике",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть график', default: false },
    { type: 'checkbox', target: 'hideL4', label: 'Скрыть лучшую серию', default: false },
  ]
})