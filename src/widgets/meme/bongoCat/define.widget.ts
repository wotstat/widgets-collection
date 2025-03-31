import { defineWidget } from "@/utils/defineWidget";


export type Background = 'tour-eiffel'
export type UnderLeg = 'baguette'
export type Eye = null | 'normal' | 'x' | 'close'
export type Mouth = null | 'normal' | 'dot' | 'x' | 'o'

export default defineWidget({
  name: "Bongo Cat",
  description: "Bongo Cat тапает лапками каждый клик мышки",
  params: [
    { type: 'checkbox', target: 'flip-x', default: false, label: 'Отзеркалить по горизонтали' },
    { type: 'checkbox', target: 'flip-y', default: false, label: 'Вверх ногами' },
  ]
})