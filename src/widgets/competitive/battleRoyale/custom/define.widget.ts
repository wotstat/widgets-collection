import { defineWidget } from "@/utils/defineWidget";


export type SlotValue = 'empty' | 'dmg-max' | 'dmg-avg' | 'frags-max' | 'frags-avg' | 'xp-max' | 'xp-avg' | 'position-max' | 'position-avg' | 'score-max' | 'score-avg' | 'score-in-row-10' | 'score-in-row-10-max' | 'top-in-row' | 'top-sum' | 'battles'
export type Line = {
  name: string

  maxDmg: number
  sumDmg: number

  maxFrags: number
  sumFrags: number

  maxXp: number
  sumXp: number

  maxPosition: number
  sumPosition: number

  maxScore: number
  sumScore: number
  currentScoreInRow: number
  maxScoreInRow: number

  maxTopInRow: number
  sumTop: number

  battlesCount: number
}

const slotVariants = [
  { value: 'empty', label: '-' },

  { value: 'dmg-max', label: 'Урон макс.' },
  { value: 'dmg-avg', label: 'Урон ср.' },

  { value: 'frags-max', label: 'Фраги макс.' },
  { value: 'frags-avg', label: 'Фраги ср.' },

  { value: 'xp-max', label: 'Опыт макс.' },
  { value: 'xp-avg', label: 'Опыт ср.' },

  { value: 'position-max', label: 'Место макс.' },
  { value: 'position-avg', label: 'Место ср.' },

  { value: 'score-max', label: 'Очки макс.' },
  { value: 'score-avg', label: 'Очки ср.' },
  { value: 'score-in-row-10', label: 'Очки серия' },
  { value: 'score-in-row-10-max', label: 'Очки серия макс.' },

  { value: 'top-in-row', label: 'Топов подряд' },
  { value: 'top-sum', label: 'Всего топов' },

  { value: 'battles', label: 'Боёв' },
] satisfies { value: SlotValue, label: string }[]

export default defineWidget({
  name: "Лучшие в Стальном Охотнике [БЕТА]",
  description: "Позволяет соревноваться по максимальным показателям в Стальном Охотнике",
  params: [
    'accentColorParam',
    'backgroundColorParam',
    { type: 'checkbox', target: 'allow-squad', label: 'Учитывать взводы', default: false },
    { type: 'select', target: 'slot-1', label: 'Слот 1', variants: slotVariants, default: 'dmg-avg' },
    { type: 'select', target: 'slot-2', label: 'Слот 2', variants: slotVariants, default: 'frags-avg' },
    { type: 'select', target: 'slot-3', label: 'Слот 3', variants: slotVariants, default: 'top-sum' },
    { type: 'select', target: 'slot-4', label: 'Слот 4', variants: slotVariants, default: 'battles' },
    { type: 'select', target: 'slot-5', label: 'Слот 5', variants: slotVariants, default: 'empty' },
    { type: 'random-string', target: 'save-key', label: 'Ключ сохранения', length: 5 },
    { type: 'random-string', target: 'channel-key', label: 'Ключ канала', length: 8 },
  ]
})