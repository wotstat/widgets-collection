<template>
  <WidgetWrapper auto-height auto-scale>
    <Content v-bind="targetProps" :hideIcon :skin />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed, ref, watch } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { Props } from './define.widget';
import { queryAsync } from '@/utils/db';
import { useBattleResultHistory } from '@/composition/shared/useBattleResultHistory';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const { hideIcon, historyLength, skin } = useQueryParams({
  hideIcon: Boolean,
  historyLength: Number,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})


const { sdk } = useWidgetSdk()
const region = useReactiveState(sdk.data.game.region)
const vehicle = useReactiveState(sdk.data.hangar.vehicle.info)
const dossier = useReactiveState(sdk.data.dossier.current)


const getAwaitedDossierKey = (totalBattles: number, tankTag: string) => `${totalBattles}_${tankTag}`
const awaitedDossiers = useWidgetStorage('awaited-dossiers', new Map<string, { arenaId: number, damageRating: number }>())
const knownDossiers = useWidgetStorage('known-dossiers', new Map<number, { totalBattles: number, tankTag: string, damageRating: number, damageRatingDelta: number }>(), { groupByPlayerId: true })

const { battlesArray: history } = useBattleResultHistory((parsed, raw) => {
  if (!parsed.personal || parsed.personal.player == 'bot') return {}
  return {
    battleResult: parsed.result,
    arena: parsed.common.arenaId,
    bonusType: parsed.common.bonusType,
    arenaUniqueID: parsed.arenaUniqueID
  }
}, { order: 'result', groupByPlayerId: true })

useReactiveState(sdk.data.battle.arenaId, arena => {
  if (!arena || !vehicle.value || !dossier.value) return
  const key = getAwaitedDossierKey(dossier.value.battlesCount + 1, vehicle.value.tag)
  if (awaitedDossiers.value.has(key)) return
  awaitedDossiers.value.set(key, { arenaId: arena, damageRating: dossier.value.damageRating ?? 0 })
})

const arenas = queryAsync<{ id: number, name: string }>(`select id, argMax(name, datetime) as name from Arenas where region = 'RU' group by id;`)

function getArenaName(id: number) {
  return arenas.value.data.find(a => a.id == id)?.name ?? '...'
}

watch(dossier, (newValue, oldValue) => {
  if (!newValue || !vehicle.value) return
  const tankTag = vehicle.value.tag

  const key = getAwaitedDossierKey(newValue.battlesCount, tankTag)
  if (!awaitedDossiers.value.has(key)) return

  const awaited = awaitedDossiers.value.get(key)!
  awaitedDossiers.value.delete(key)

  knownDossiers.value.set(awaited.arenaId, {
    totalBattles: newValue.battlesCount,
    tankTag,
    damageRating: newValue.damageRating,
    damageRatingDelta: newValue.damageRating - awaited.damageRating
  })
}, { immediate: true })


const targetProps = computed<Props>(() => {
  return {
    currentPercent: dossier.value?.damageRating ?? 0,
    history: history.value.filter(t => t.arenaUniqueID && knownDossiers.value.get(t.arenaUniqueID)).toReversed().slice(0, historyLength).map(t => {

      const knownDossier = knownDossiers.value.get(t.arenaUniqueID ?? -1)
      const delta = !knownDossier ? 0 : knownDossier.damageRatingDelta

      return {
        arena: getArenaName(t?.arena ?? 0),
        delta: delta,
        key: `${t.arena}_${delta}_${t.arenaUniqueID}`,
        result: t.battleResult,
      }
    }),
    game: region.value == 'RU' ? 'lesta' : 'wg',
  }
})


</script>


<style lang="scss" scoped></style>