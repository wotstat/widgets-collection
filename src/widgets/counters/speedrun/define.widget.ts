import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  value: number,
  pb: number[],
  events: { type: Events, time: number, }[],
  showPb: boolean,
  showEvents: boolean,
}

export const events = ['dmg', 'ram', 'kill', 'kill-spg', 'death', 'receive-dmg', 'loss-50hp', 'base-capture-80'] as const
export type Events = typeof events[number]

export const target = [...events, 'end-battle'] as const
export type Target = typeof target[number]

import i18n from "./i18n.json";

export default defineWidget({
  name: "Спидран таймер",
  description: "Точный счётчик времени с начала боя до разных событий",
  i18n,
  params: [
    { type: 'backgroundColorParam' },
    { type: 'checkbox', target: 'show-pb', label: 'Показывать рекорды', default: true },
    { type: 'checkbox', target: 'show-events', label: 'Показывать события', default: true },
    { type: 'separator' },
    {
      type: 'select', target: 'target', label: 'target', variants: [
        { value: 'end-battle', label: 'endOfBattle' },
        { value: 'dmg', label: 'damage' },
        { value: 'ram', label: 'ram' },
        { value: 'kill', label: 'kill' },
        { value: 'kill-spg', label: 'killSpg' },
        // { value: 'death', label: 'death' },
        // { value: 'receive-dmg', label: 'receiveDamage' },
        // { value: 'loss-50hp', label: 'loss50hp' },
        // { value: 'base-capture-80', label: 'baseCapture80' },
      ] satisfies { value: Target, label: string }[], default: 'end-battle'
    },
  ]
})