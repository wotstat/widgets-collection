import { defineWidget } from '@/utils/defineWidget'

export type Props = {
  position: number | null
  delta: number | null
  isNew?: boolean
  isNotFound?: boolean
  hideIcon?: boolean
  hideDelta?: boolean
  skin?: 'transparent' | 'default'
}

export default defineWidget({
  name: 'Позиция в Натиске',
  description: 'Текущее место в таблице лидеров Натиска и изменение позиции с последнего обновления',
  params: [
    { type: 'checkbox', target: 'hide-icon', label: 'Скрыть иконку', default: false },
    { type: 'checkbox', target: 'hide-delta', label: 'Скрыть изменение позиции', default: false },
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'transparent', label: 'Тень' },
        { value: 'default', label: 'shared:style:default' },
      ], default: 'transparent'
    },
    { type: 'backgroundColorParam', visible: params => params.skin === 'default' },
  ]
})
