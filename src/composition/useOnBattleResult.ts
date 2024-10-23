import { useReactiveTrigger, useWidgetSdk } from "@/composition/widgetSdk";
import { parseBattleResult } from "@/utils/battleResultParser";

export type BattleResult = NonNullable<ReturnType<typeof parseBattleResult>>
export type BattleResultWithArenaId = BattleResult & { arenaUniqueID: number }

export function useBattleResult(callback: (parsed: BattleResultWithArenaId, result: unknown) => void) {

  const { sdk } = useWidgetSdk();

  const processedResults = new Set<number>()
  useReactiveTrigger(sdk.data.battle.onBattleResult, result => {
    const parsed = parseBattleResult(result)
    if (!parsed) return console.error('Failed to parse battle result:', result)

    const arenaId = parsed.arenaUniqueID
    if (!arenaId) return console.error('Missing arenaUniqueID:', result)

    if (processedResults.has(arenaId)) return console.error(`Duplicated battle result for: ${arenaId}`);
    processedResults.add(arenaId)

    callback(parsed as BattleResultWithArenaId, result)
  })
}