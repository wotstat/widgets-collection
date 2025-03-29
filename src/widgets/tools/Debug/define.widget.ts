import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Debug",
  description: "Этот виджет содержит техническое отображения практически всех данных, которые доступны в моде.",
  params: [
    { type: 'backgroundColorParam' }
  ]
})