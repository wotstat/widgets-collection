import { defineWidget } from "@/utils/defineWidget";
import i18n from './i18n.json'

export const skins = ['protanki-old', 'protanki-new', 'time', 'tangent', 'percent', 'chart-time', 'chart-tangent'] as const;

export default defineWidget({
  name: "Индикатор сведения",
  description: "Отображает текущий прогресс сведения. Есть несколько стилей. График за последние 30 секунд.",
  i18n,
  params: [
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'protanki-old', label: 'options:protanki1' },
        { value: 'protanki-new', label: 'options:protanki2' },
        { value: 'time', label: 'options:time' },
        { value: 'percent', label: 'options:percent' },
        { value: 'tangent', label: 'options:tangent' },
        { value: 'chart-time', label: 'options:chart-time' },
        { value: 'chart-tangent', label: 'options:chart-tangent' },
      ], default: 'protanki-new'
    },
    {
      type: 'select', target: 'source', label: 'options:source', variants: [
        { value: 'auto', label: 'options:source:auto' },
        { value: 'server', label: 'options:source:server' },
        { value: 'client', label: 'options:source:client' },
      ], default: 'auto'
    },
    { type: 'separator', visible: ctx => ctx['skin'] == 'chart-time' || ctx['skin'] == 'chart-tangent' },
    { type: 'checkbox', target: 'title', label: 'title', default: true, visible: ctx => ctx['skin'] == 'chart-time' || ctx['skin'] == 'chart-tangent' },
    { type: 'checkbox', target: 'value', label: 'value', default: true, visible: ctx => ctx['skin'] == 'chart-time' || ctx['skin'] == 'chart-tangent' },
  ]
})