import { defineWidget } from "@/utils/defineWidget";
import { accentColors } from "../currentTaskRemote/define.widget";

export type Props = {
  targetTank: 'ARMT' | 'TF-2 Clark' | 'Project Murat'
  section1: number
  section2: number
  section3: number
  perfect: number
  accent: string
  backgroundScheme: BackgroundScheme
  backColorFrom?: string
  backColorTo?: string
}


export type BackgroundScheme = 'default' | 'color' | 'gradient';
export type ColorScheme = 'red' | 'orange' | 'green' | 'cyan' | 'blue' | 'purple' | 'custom';
export function styleParams(colorScheme: ColorScheme, accent?: string) {
  if (colorScheme === 'custom') return accent || 'fff'
  return accentColors[colorScheme] || 'fff'
}

export default defineWidget({
  name: "Прогресс ЛБЗ (удалённое управление)",
  description: "Позволяет вывести на экран прогресс выполнения ЛБЗ",
  params: [{
    type: 'select', target: 'color-scheme', label: 'shared:color-palette:title', variants: [
      { value: 'red', label: 'Красный' },
      { value: 'orange', label: 'Оранжевый' },
      { value: 'green', label: 'Зелёный' },
      { value: 'cyan', label: 'Голубой' },
      { value: 'blue', label: 'Синий' },
      { value: 'purple', label: 'Фиолетовый' },
      { value: 'custom', label: 'Свой' },
    ], default: 'orange'
  },
  { type: 'accentColorParam', visible: (params) => params['color-scheme'] === 'custom' },
  {
    type: 'select', target: 'background-scheme', label: 'Вариант фона', variants: [
      { value: 'default', label: 'Стандартный' },
      { value: 'color', label: 'Цвет' },
      { value: 'gradient', label: 'Градиент' },
    ], default: 'default'
  },
  { type: 'backgroundColorParam', visible: (params) => params['background-scheme'] === 'color' },
  { type: 'color', target: 'back-color-from', label: 'Цвет От', default: '1c1c1c', visible: (params) => params['background-scheme'] === 'gradient' },
  { type: 'color', target: 'back-color-to', label: 'Цвет До', default: '1a1a1a69', visible: (params) => params['background-scheme'] === 'gradient' },
  { type: 'separator' },
  { type: 'remote-control' }
  ]
})