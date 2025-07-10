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

export function styleParams(colorScheme: ColorScheme, accent?: string, badge?: string, badgeText?: string) {
  switch (colorScheme) {
    case 'dark': return { accent: 'fff', badge: '000', badgeText: 'fff' }
    case 'red': return { accent: 'ff2e2e', badge: '4d0000', badgeText: 'ffdbdb' }
    case 'orange': return { accent: 'ff7029', badge: '823f12', badgeText: 'fff1e6' }
    case 'green': return { accent: '0f0', badge: '0b3800', badgeText: 'f4fff2' }
    case 'cyan': return { accent: '29f1ff', badge: '012324', badgeText: 'e1fcfc' }
    case 'blue': return { accent: '00a2ff', badge: '062269', badgeText: 'e1e7fc' }
    case 'purple': return { accent: 'c16bff', badge: '49046b', badgeText: 'f5e1fc' }
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
      ], default: 'green'
    },
    { type: 'color', target: 'accent', label: 'Акцент', default: 'ffffff', visible: (params) => params['color-scheme'] === 'custom' },
    { type: 'color', target: 'badge', label: 'Фон бейджей', default: '1b1b1b', visible: (params) => params['color-scheme'] === 'custom' },
    { type: 'color', target: 'badge-text', label: 'Текст бейджей', default: 'ffffff', visible: (params) => params['color-scheme'] === 'custom' },
    { type: 'separator' },
    { type: 'remote-control' }
  ]
})