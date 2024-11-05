import { computed, watch } from "vue";
import { BattleResultWithArenaId, useBattleResult } from "../useOnBattleResult";
import { useWidgetStorage } from "../useWidgetStorage";
import { useReactiveState, useWidgetSdk } from "../widgetSdk";
import { defaultStats, useInBattleCollector } from "./useInBattleCollector";
import { objectEntries } from "@vueuse/core";
import { IconType } from "@/components/efficiencyIcon/utils";
import { Prettify } from "@/utils";


type Battle = typeof defaultBattle
const defaultBattle = {
  ...defaultStats,
  xp: 0,
  position: null as number | null,
  duration: 0,
  lifetime: 0,
  result: 'unknown' as 'win' | 'lose' | 'draw' | 'unknown',
  hasResult: false,
}

type BattleNumericFields = keyof {
  [key in keyof Battle]: Battle[key] extends number ? key : never
}

type BattleResultStats = NonNullable<BattleResultWithArenaId['personal']>['stats']
type BattleResultDetails = NonNullable<BattleResultWithArenaId['personal']>['details']

export function useBattleHistoryAggregator() {
  const { sdk } = useWidgetSdk()
  const stats = useInBattleCollector()

  const battles = useWidgetStorage<Map<number, Battle>>('battles', new Map())
  const battlesOrder = useWidgetStorage<number[]>('battlesOrder', [])
  const battlesArray = computed(() => battlesOrder.value.map(id => battles.value.get(id)!))

  useReactiveState(sdk.data.battle.arenaId, arena => {
    if (!arena) return
    if (battles.value.has(arena)) return
    battles.value.set(arena, structuredClone(defaultBattle))
    battlesOrder.value.push(arena)
    console.log('New battle:', arena)
  })

  const battleResultsToStats = {
    'damage': 'damageDealt',
    'assist': (s, d, b) => s.damageAssistedRadio + s.damageAssistedTrack,
    'blocked': 'damageBlockedByArmor',
    'stun': 'damageAssistedStun',
    'frags': 'kills',
    'radioAssist': 'damageAssistedRadio',
    'trackAssist': 'damageAssistedTrack',
    'stunAssist': 'damageAssistedStun',
    'distance': 'mileage',
    'discover': 'spotted',
    'baseCapturePoints': 'capturePoints',
    'baseCaptureDefend': 'droppedCapturePoints',
    'fireDamage': null,
    'fire': null,
    'ram': null,
    'ramDamage': null,
    'ammoBayDestroyed': null,
    'ammoBayDestroyedDamage': null,
    'gunMarkDmg': (s, d, b) => s.damageDealt + Math.max(s.damageAssistedRadio, s.damageAssistedTrack, s.damageAssistedStun),
    'chuckScore': (s, d, b) => s.damageDealt + s.kills * 200,
    'shotDamage': null,
    'damagedShotsCount': null,
    'shotDamageMax': null,
    'shotDamageMin': null,
    'lifetime': 'lifeTime',
    'duration': null,
    'crits': (s, d, b) => d.map(t => t.crits.length).reduce((a, b) => a + b, 0)
  } as const satisfies {
    [key in keyof typeof defaultStats]: ((result: BattleResultStats, details: BattleResultDetails, battle: Battle) => number) | keyof BattleResultStats | null
  }

  useBattleResult((result, raw) => {
    if (!result.arenaUniqueID) return
    if (!battles.value.has(result.arenaUniqueID)) return

    const battle = battles.value.get(result.arenaUniqueID)!
    battle.hasResult = true
    console.log('Battle result:', result, raw);

    if (!result.personal) return

    const { stats, details, player } = result.personal
    battle.xp = stats.xp
    battle.lifetime = stats.lifeTime
    battle.result = result.result
    battle.position = player != 'bot' ? player.avatar.playerRank ?? null : null
    battle.duration = result.common.duration

    for (const [key, value] of objectEntries(battleResultsToStats)) {
      if (value === null) continue
      if (typeof value === 'function') battle[key] = value(stats, details, battle)
      else battle[key] = stats[value]
    }

  })

  const arenaId = useReactiveState(sdk.data.battle.arenaId)
  const currentBattle = computed(() => arenaId.value && battles.value.has(arenaId.value) ? battles.value.get(arenaId.value)! : null)

  watch(stats, s => {
    if (!currentBattle.value) return
    if (currentBattle.value.hasResult) return
    for (const [key, value] of objectEntries(s)) {
      if (typeof value === 'number') currentBattle.value[key] = value
    }
  }, { deep: true })

  type AggregatorResult<T extends string> = { [K in `${T}Min` | `${T}Max` | `${T}Total` | `${T}Avg`]: number }
  const minMaxTotalAggregator = <T extends BattleNumericFields>(key: T) => {
    const values = battlesArray.value.map(b => b[key]) as number[]
    const total = values.reduce((a, b) => a + b, 0)

    if (values.length <= 0) return {
      [`${key}Min`]: 0,
      [`${key}Max`]: 0,
      [`${key}Total`]: 0,
      [`${key}Avg`]: 0,
    } as AggregatorResult<T>

    return {
      [`${key}Min`]: Math.min(...values),
      [`${key}Max`]: Math.max(...values),
      [`${key}Total`]: total,
      [`${key}Avg`]: total / values.length,
    } as AggregatorResult<T>
  }

  const targetUnwrap = ['damage', 'assist', 'blocked', 'stun', 'frags', 'radioAssist', 'trackAssist', 'stunAssist',
    'distance', 'baseCapturePoints', 'baseCaptureDefend', 'discover', 'fireDamage', 'fire', 'ram', 'ramDamage',
    'ammoBayDestroyed', 'ammoBayDestroyedDamage', 'gunMarkDmg', 'chuckScore', 'xp', 'lifetime', 'duration',
    'position', 'crits'] as const satisfies BattleNumericFields[]

  return computed(() => {

    const battlesCount = battlesArray.value.length

    const aggregated = targetUnwrap
      .map(k => minMaxTotalAggregator(k))
      .flatMap(t => objectEntries(t))
    const aggregations = Object.fromEntries(aggregated) as AggregatorResult<typeof targetUnwrap[number]>

    const top1InRow = battlesArray.value.reduce((acc, b) => {
      if (b.position === 1) return acc + 1
      return 0
    }, 0)

    const top1InRowMax = battlesArray.value.reduce((acc, b) => {
      if (b.position === 1) return { current: acc.current + 1, max: Math.max(acc.current + 1, acc.max) }
      return { current: 0, max: acc.max }
    }, { current: 0, max: 0 })

    const totalShotDamage = battlesArray.value.reduce((a, b) => a + b.shotDamage, 0)
    const countDamagedShots = battlesArray.value.reduce((a, b) => a + b.damagedShotsCount, 0)

    return {
      battles: battlesCount,
      wins: battlesArray.value.filter(b => b.result === 'win').length,
      ...aggregations,
      ...{
        shotDamageMin: Math.min(...battlesArray.value.map(b => b.shotDamageMin)),
        shotDamageMax: battlesCount <= 0 ? 0 : Math.max(...battlesArray.value.map(b => b.shotDamageMax)),
        shotDamageTotal: totalShotDamage,
        shotDamageAvg: countDamagedShots <= 0 ? 0 : totalShotDamage / countDamagedShots,
        countDamagedShots
      },
      ...{
        top1: battlesArray.value.filter(b => b.position === 1).length,
        top1InRow,
        top1InRowMax: top1InRowMax.max,
      }
    }
  })

}


const unsupportedIconTypes = [
  'player', 'tank', 'gun-mark-percent', 'hp'
] as const satisfies IconType[]

export type AggregatorResult = ReturnType<typeof useBattleHistoryAggregator>['value']
export type SupportedIconType = Exclude<IconType, typeof unsupportedIconTypes[number]>

export type AggregatorResultPrefixKey<T = keyof AggregatorResult> = T extends `${infer Prefix}Avg` ? Prefix : never

const nameMap = <T extends SupportedIconType, V extends AggregatorResultPrefixKey>(key: T, target: V) => {
  return {
    [key]: `${target}Total`,
    [`${key}-avg`]: `${target}Avg`,
    [`${key}-max`]: `${target}Max`,
  } as { [K in T]: `${V}Total` } & { [K in `${T}-avg`]: `${V}Avg` } & { [K in `${T}-max`]: `${V}Max` }
}

const battleToIconType = {
  ...nameMap('ammo-bay-destroyed', 'ammoBayDestroyed'),
  ...nameMap('ammo-bay-destroyed-dmg', 'ammoBayDestroyedDamage'),
  ...nameMap('assist', 'assist'),
  ...nameMap('assist-radio', 'radioAssist'),
  ...nameMap('assist-track', 'trackAssist'),
  ...nameMap('base-capture', 'baseCapturePoints'),
  ...nameMap('base-defend', 'baseCaptureDefend'),
  ...nameMap('block', 'blocked'),
  ...nameMap('crits', 'crits'),
  ...nameMap('chuck-score', 'chuckScore'),
  ...nameMap('discover', 'discover'),
  ...nameMap('distance', 'distance'),
  ...nameMap('dmg', 'damage'),
  ...nameMap('duration', 'duration'),
  ...nameMap('fire', 'fire'),
  ...nameMap('fire-dmg', 'fireDamage'),
  ...nameMap('kill', 'frags'),
  ...nameMap('lifetime', 'lifetime'),
  ...nameMap('position', 'position'),
  ...nameMap('ram', 'ram'),
  ...nameMap('ram-dmg', 'ramDamage'),
  ...nameMap('xp', 'xp'),
  ...nameMap('gun-mark-dmg', 'gunMarkDmg'),
  ...nameMap('shot-dmg', 'shotDamage'),
  'battles': 'battles',
  'win': 'wins',
  'top1': 'top1',
  'top1-in-row': 'top1InRow',
  'top1-in-row-max': 'top1InRowMax',
} as const satisfies {
  [key in SupportedIconType]: keyof AggregatorResult
}

export function toIconType(result: AggregatorResult): { [key in SupportedIconType]: number } {
  return Object.fromEntries(objectEntries(battleToIconType).map(([key, value]) => [key, result[value]])) as any
}



const defaultAggregatorOptions = {
  battle: 'max' as 'total' | 'max' | 'min' | 'avg',
  top1InRow: 'max' as 'total' | 'max' | 'min' | 'avg',
} as const

type TotalAggregatorOptions = typeof defaultAggregatorOptions

const sum = (key: keyof AggregatorResult) => (result: AggregatorResult[]) => result.reduce((a, b) => a + b[key], 0)
const total = (key: keyof AggregatorResult) => (result: AggregatorResult[]) => sum(key)(result)
const avg = (key: keyof AggregatorResult, total: number) => (result: AggregatorResult[]) => total == 0 ? 0 : sum(key)(result) / total
const min = (key: keyof AggregatorResult) => (result: AggregatorResult[]) => Math.min(...result.map(r => r[key]))
const max = (key: keyof AggregatorResult) => (result: AggregatorResult[]) => Math.max(...result.map(r => r[key]))

type TotalAggregator = (result: AggregatorResult[]) => number
const groupAggregator = <K extends AggregatorResultPrefixKey>(key: K, battleCount: number) => {
  return {
    [`${key}Total`]: total(`${key}Total`),
    [`${key}Avg`]: avg(`${key}Total`, battleCount),
    [`${key}Max`]: (result: AggregatorResult[]) => Math.max(...result.map(r => r[`${key}Max`])),
    [`${key}Min`]: (result: AggregatorResult[]) => Math.min(...result.map(r => r[`${key}Min`])),
  } as Prettify<{ [key in `${K}Total`]: TotalAggregator } & { [key in `${K}Avg`]: TotalAggregator } & { [key in `${K}Max`]: TotalAggregator } & { [key in `${K}Min`]: TotalAggregator }>
}

// примитивные аггрегаторы, которые всегда сумма/мин/макс/среднее по боям
const simpleTotalAggregators = [
  'damage', 'assist', 'blocked', 'stun', 'frags', 'radioAssist', 'trackAssist', 'stunAssist',
  'distance', 'baseCapturePoints', 'baseCaptureDefend', 'discover', 'fireDamage', 'fire', 'ram', 'ramDamage',
  'ammoBayDestroyed', 'ammoBayDestroyedDamage', 'gunMarkDmg', 'chuckScore', 'xp', 'lifetime', 'duration',
  'position', 'crits'
] as const satisfies AggregatorResultPrefixKey[]

export function totalAggregator(data: AggregatorResult[], options: Partial<TotalAggregatorOptions> = {}) {
  const optionsWithDefaults = { ...defaultAggregatorOptions, ...options }

  const totalBattles = sum('battles')(data)
  const totalShots = sum('countDamagedShots')(data)

  const simple = simpleTotalAggregators
    .map(k => groupAggregator(k, totalBattles))
    .reduce((a, b) => ({ ...a, ...b }))

  const byPlayerAvg = (key: keyof AggregatorResult) => ({
    'max': max(key),
    'min': min(key),
    'avg': (r: AggregatorResult[]) => r.length == 0 ? 0 : total(key)(r) / r.length,
    'total': total(key)
  })

  const all = {
    ...simple,
    shotDamageTotal: total('shotDamageTotal'),
    shotDamageAvg: avg('shotDamageTotal', totalShots),
    shotDamageMax: max('shotDamageMax'),
    shotDamageMin: min('shotDamageMin'),
    countDamagedShots: (r) => totalShots,
    top1: total('top1'),
    top1InRow: byPlayerAvg('top1InRow')[optionsWithDefaults.top1InRow],
    top1InRowMax: byPlayerAvg('top1InRowMax')[optionsWithDefaults.top1InRow],
    wins: byPlayerAvg('wins')[optionsWithDefaults.battle],
    battles: byPlayerAvg('battles')[optionsWithDefaults.battle],
  } as const satisfies { [key in keyof AggregatorResult]: TotalAggregator }


  return Object.fromEntries(objectEntries(all).map(([key, value]) => [key, value(data)])) as AggregatorResult
}
