import { defineWidget } from '@/utils/defineWidget'

export type SettingsProps = {
  skin: 'transparent' | 'semi-transparent' | 'default',
  hideTitle: boolean,
  lastBattle: boolean,
  totalBattles: boolean,
  timeInBattles: boolean,
  averagePerBattle: boolean,
  averagePerHour: boolean,
}

export default defineWidget({
  name: 'Счётчик фарма',
  description: 'Изменяйте значение счётчика вручную с помощью кнопок на клавиатуре',
  params: [
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'transparent', label: 'shared:style:transparent' },
        { value: 'semi-transparent', label: 'shared:style:semi-transparent' },
        { value: 'default', label: 'shared:style:default' },
      ], default: 'transparent'
    },
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam', visible: cfx => cfx.skin === 'default' },
    { type: 'separator' },
    { type: 'checkbox', target: 'hide-title', label: 'Скрыть заголовок', default: false },
    { type: 'separator' },
    { type: 'checkbox', target: 'last-battle', label: 'За прошлый бой', default: true },
    { type: 'checkbox', target: 'total-battles', label: 'Всего боёв', default: true },
    { type: 'checkbox', target: 'time-in-battles', label: 'Время в боях', default: true },
    { type: 'checkbox', target: 'average-per-battle', label: 'В среднем за бой', default: false },
    { type: 'checkbox', target: 'average-per-hour', label: 'В среднем за час', default: true },
  ]
})