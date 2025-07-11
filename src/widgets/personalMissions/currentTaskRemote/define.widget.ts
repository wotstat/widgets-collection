import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  header: {
    title: string;
    subtitle: TaskType | string;
    levels: [number, number]
  }
  tasks: {
    type: string
    description: {
      iconID?: string
      isInOrGroup: boolean
      title: string | null
      description: string
      containerType: 'body' | 'header'
    }
    config: {
      isMain: boolean
      groupID?: number
    }
  }[][]
  styleParams: {
    accent: string
    badge: string
    badgeText: string
  }
}

export const enum TaskType {
  HIT,
  KILLS,
  ASSIST,
  BATTLE,
  MASTER,
  UNKNOWN
}

export type ColorScheme = 'dark' | 'red' | 'orange' | 'green' | 'cyan' | 'blue' | 'purple' | 'custom';

export const accentColors = {
  dark: 'fff',
  red: 'ff4245',
  orange: 'ffa500',
  green: '33ff65',
  cyan: '29f1ff',
  blue: '50b3ff',
  purple: 'be63ff',
} as const;

export function styleParams(colorScheme: ColorScheme, accent?: string, badge?: string, badgeText?: string) {
  switch (colorScheme) {
    case 'dark': return { accent: 'fff', badge: '000', badgeText: 'fff' }
    case 'red': return { accent: accentColors.red, badge: '4d0001', badgeText: 'ffdbdb' }
    case 'orange': return { accent: accentColors.orange, badge: '361b00', badgeText: 'fff1e6' }
    case 'green': return { accent: accentColors.green, badge: '003d0f', badgeText: 'f4fff2' }
    case 'cyan': return { accent: accentColors.cyan, badge: '00393d', badgeText: 'e1fcfc' }
    case 'blue': return { accent: accentColors.blue, badge: '00233d', badgeText: 'e1e7fc' }
    case 'purple': return { accent: accentColors.purple, badge: '2d004d', badgeText: 'f5e1fc' }
    default:
      return {
        accent: accent || 'fff',
        badge: badge || '000',
        badgeText: badgeText || 'fff',
      }
  }
}

export default defineWidget({
  name: "Текущая ЛБЗ (удалённое управление)",
  description: "Позволяет вывести на экран текущую выполняемую ЛБЗ",
  params: [
    {
      type: 'select', target: 'color-scheme', label: 'shared:color-palette:title', variants: [
        { value: 'dark', label: 'Тёмный' },
        { value: 'red', label: 'Красный' },
        { value: 'orange', label: 'Оранжевый' },
        { value: 'green', label: 'Зелёный' },
        { value: 'cyan', label: 'Голубой' },
        { value: 'blue', label: 'Синий' },
        { value: 'purple', label: 'Фиолетовый' },
        { value: 'custom', label: 'Свой' },
      ], default: 'orange'
    },
    { type: 'color', target: 'accent', label: 'Акцент', default: 'ffffff', visible: (params) => params['color-scheme'] === 'custom' },
    { type: 'color', target: 'badge', label: 'Фон бейджей', default: '1b1b1b', visible: (params) => params['color-scheme'] === 'custom' },
    { type: 'color', target: 'badge-text', label: 'Текст бейджей', default: 'ffffff', visible: (params) => params['color-scheme'] === 'custom' },
    { type: 'separator' },
    { type: 'remote-control' }
  ]
})