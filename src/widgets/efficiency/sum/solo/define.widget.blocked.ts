import { defineWidget } from "@/utils/defineWidget";

export default defineWidget({
  name: "Blocked",
  postfix: "blocked",
  description: "Отображает сумму заблокированного урона",
  preview: './PreviewBlocked.vue',
  widget: './WidgetBlocked.vue'
})