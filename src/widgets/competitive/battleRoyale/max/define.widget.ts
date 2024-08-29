import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Лучшие в Стальном Охотнике",
  description: "Позволяет соревноваться по максимальным показателям в Стальном Охотнике",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8 },
  ]
})