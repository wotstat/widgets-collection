import { useReactiveState, useWidgetSdk } from "@/composition/widgetSdk";
import { useWidgetStorage } from "../useWidgetStorage";
import { computed } from "vue";
import { BattleResultWithArenaId, useBattleResult } from "../useOnBattleResult";
import { DeepPartial } from "@/utils";

export function useBattleResultHistory<T extends Object>(processResult?: (parsed: BattleResultWithArenaId, raw: unknown) => DeepPartial<T>,
  { order = 'start', groupByPlayerId = false }: {
    order?: 'result' | 'start',
    groupByPlayerId?: boolean
  } = {}) {

  const { sdk } = useWidgetSdk();

  const battles = useWidgetStorage<Map<number, Partial<T>>>('battles', new Map(), { groupByPlayerId })
  const battlesTimings = useWidgetStorage<Map<number, { start: number, end: number | null, duration: number | null }>>('battlesTimings', new Map(), { groupByPlayerId })
  const battlesOrder = computed(() => Array.from(battlesTimings.value.entries()).sort((a, b) => {
    if (order === 'start') return a[1].start - b[1].start
    if (order === 'result') {
      if (a[1].end && b[1].end) return a[1].end - b[1].end
      if (a[1].end) return -1
      if (b[1].end) return 1
      return a[1].start - b[1].start
    }
    return 0
  }).map(([id]) => id))

  const battlesArray = computed(() => battlesOrder.value.map(id => battles.value.get(id)!))
  const arenaId = useReactiveState(sdk.data.battle.arenaId)
  const currentBattle = computed(() => arenaId.value && battles.value.has(arenaId.value) ? battles.value.get(arenaId.value)! : null)

  useReactiveState(sdk.data.battle.arenaId, arena => {
    if (!arena) return
    if (battles.value.has(arena)) return
    battles.value.set(arena, { result: null } as any)
    battlesTimings.value.set(arena, { start: new Date().getTime(), end: null, duration: null })
    console.log('New battle:', arena)
  })


  useBattleResult((parsed, raw) => {
    const arenaId = parsed.arenaUniqueID
    if (!arenaId || !processResult) return
    battlesTimings.value.set(arenaId, {
      start: new Date(parsed.common.arenaCreateTime * 1000).getTime(),
      end: new Date(parsed.common.arenaCreateTime * 1000 + parsed.common.duration * 1000).getTime(),
      duration: parsed.common.duration
    })
    addDataToBattle(arenaId, processResult(parsed, raw))
  })

  const addDataToBattle = (arenaId: number, data: DeepPartial<T>) => {
    if (!battles.value.has(arenaId)) return
    battles.value.set(arenaId, { ...battles.value.get(arenaId)!, ...data })
  }

  const addDataToCurrentBattle = (data: DeepPartial<T>) => {
    if (!arenaId.value || !currentBattle.value) return false
    addDataToBattle(arenaId.value, data)
  }

  return {
    addDataToCurrentBattle,
    addDataToBattle,
    battlesArray
  }
}