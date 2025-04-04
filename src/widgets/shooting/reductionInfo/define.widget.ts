import { defineWidget } from "@/utils/defineWidget";

export const skins = ['protanki-old', 'protanki-new', 'time', 'tangent', 'percent', 'chart-time', 'chart-tangent'] as const;

export default defineWidget({
  name: "Индикатор сведения",
  description: "Отображает текущий прогресс сведения. Есть несколько стилей. График за последние 30 секунд.",
  params: [
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'protanki-old', label: 'ProTanki старый' },
        { value: 'protanki-new', label: 'ProTanki новый' },
        { value: 'time', label: 'Время' },
        { value: 'percent', label: 'Процент' },
        { value: 'tangent', label: 'Разброс' },
        { value: 'chart-time', label: 'График времени' },
        { value: 'chart-tangent', label: 'График разброса' },
      ], default: 'protanki-new'
    },
    {
      type: 'select', target: 'source', label: 'Источник данных', variants: [
        { value: 'auto', label: 'Как в игре' },
        { value: 'server', label: 'Серверный прицел' },
        { value: 'client', label: 'Клиентский прицел' },
      ], default: 'auto'
    },
    { type: 'separator', visible: ctx => ctx['skin'] == 'chart-time' || ctx['skin'] == 'chart-tangent' },
    { type: 'checkbox', target: 'title', label: 'Заголовок', default: true, visible: ctx => ctx['skin'] == 'chart-time' || ctx['skin'] == 'chart-tangent' },
    { type: 'checkbox', target: 'value', label: 'Значение', default: true, visible: ctx => ctx['skin'] == 'chart-time' || ctx['skin'] == 'chart-tangent' },
  ]
})