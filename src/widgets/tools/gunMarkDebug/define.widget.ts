import { defineWidget } from "@/utils/defineWidget";


export default defineWidget({
  name: "Debug отметок",
  description: "Этот виджет позволяет проверить алгоритм расчёта отметки во время боя.",
  params: [
    'backgroundColorParam',
  ]
})