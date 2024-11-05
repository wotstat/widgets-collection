import { useReactiveState, useWidgetSdk } from "@/composition/widgetSdk";
import { useWidgetStorage } from "./useWidgetStorage";
import { computed } from "vue";
import { BattleResultWithArenaId, useBattleResult } from "./useOnBattleResult";
import { DeepPartial } from "@/utils";



export function useBattleResultHistory<T extends Object>(processResult?: (parsed: BattleResultWithArenaId, raw: unknown) => DeepPartial<T>) {

  const { sdk } = useWidgetSdk();

  const battles = useWidgetStorage<Map<number, Partial<T>>>('battles', new Map())
  const battlesOrder = useWidgetStorage<number[]>('battlesOrder', [])
  const battlesArray = computed(() => battlesOrder.value.map(id => battles.value.get(id)!))
  const arenaId = useReactiveState(sdk.data.battle.arenaId)
  const currentBattle = computed(() => arenaId.value && battles.value.has(arenaId.value) ? battles.value.get(arenaId.value)! : null)

  useReactiveState(sdk.data.battle.arenaId, arena => {
    if (!arena) return
    if (battles.value.has(arena)) return
    battles.value.set(arena, { result: null } as any)
    battlesOrder.value.push(arena)
    console.log('New battle:', arena)
  })


  useBattleResult((parsed, raw) => {
    const arenaId = parsed.arenaUniqueID
    if (!arenaId || !processResult) return
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