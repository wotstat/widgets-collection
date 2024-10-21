import { playerNameProcessor } from "@/composition/processors/usePlayerNameProcessor"

export const shared = [
  'battles',
  'player',
  'tank',
  'win',
] as const

export const efficiency = [
  'ammo-bay-destroyed', 'ammo-bay-destroyed-avg', 'ammo-bay-destroyed-max',
  'ammo-bay-destroyed-dmg', 'ammo-bay-destroyed-dmg-avg', 'ammo-bay-destroyed-dmg-max',
  'assist', 'assist-avg', 'assist-max',
  'assist-radio', 'assist-radio-avg', 'assist-radio-max',
  'assist-track', 'assist-track-avg', 'assist-track-max',
  'base-capture', 'base-capture-avg', 'base-capture-max',
  'base-defend', 'base-defend-avg', 'base-defend-max',
  'block', 'block-avg', 'block-max',
  'chuck-score', 'chuck-score-avg', 'chuck-score-max',
  'discover', 'discover-avg', 'discover-max',
  'distance', 'distance-avg', 'distance-max',
  'dmg-alt', 'dmg-alt-avg', 'dmg-alt-max',
  'dmg', 'dmg-avg', 'dmg-max',
  'duration', 'duration-avg', 'duration-max',
  'fire', 'fire-avg', 'fire-max', 'fire-dmg', 'fire-dmg-avg', 'fire-dmg-max',
  'kill', 'kill-avg', 'kill-max',
  'lifetime', 'lifetime-avg', 'lifetime-max',
  'position', 'position-avg', 'position-max',
  'ram', 'ram-avg', 'ram-max', 'ram-dmg', 'ram-dmg-avg', 'ram-dmg-max',
  'shot-dmg', 'shot-dmg-avg', 'shot-dmg-max',
  'top1', 'top1-in-row',
  'xp', 'xp-avg', 'xp-max',
  'gun-mark-dmg',
  'gun-mark-percent',
] as const

export type IconType = typeof efficiency[number] | typeof shared[number]

export const inBattleEfficiency = [
  'ammo-bay-destroyed',
  'ammo-bay-destroyed-dmg',
  'assist',
  'assist-radio',
  'assist-track',
  'base-capture',
  'base-defend',
  'block',
  'chuck-score',
  'discover',
  'distance',
  'dmg-alt',
  'dmg',
  'fire',
  'fire-dmg',
  'kill',
  'ram',
  'ram-dmg',
  'shot-dmg-max',
  'shot-dmg-avg',
  'gun-mark-dmg',
  'gun-mark-percent'
] as const satisfies IconType[]


export type InBattleIconType = typeof inBattleEfficiency[number]

const rawProcessor = (value: string | number) => value.toString()
const spaceProcessor = (value: string | number) => Math.round(Number(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const roundProcessor = (precision = 0) => (value: string | number) => (Math.round(Number(value) * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision)

type Processor = (value: string | number) => string

const processorList = {
  'player': (value: string | number) => playerNameProcessor(value.toString()) ?? '',
  'tank': rawProcessor,
  'gun-mark-percent': roundProcessor(2)
} as const satisfies { [key in IconType]?: Processor }

const ignoreAvg = new Set<IconType>(['dmg-avg', 'shot-dmg-avg'])

export function processor(icon: IconType, short = false): Processor {

  const proc = icon in processorList ? processorList[icon as keyof typeof processorList] : null
  if (proc) return proc

  if (icon.endsWith('-avg') && !ignoreAvg.has(icon)) return roundProcessor(1)

  return spaceProcessor
}