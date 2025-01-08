<template>
  <WidgetWrapper auto-height auto-scale>
    <Content v-bind="targetProps" :hideIcon />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed } from 'vue';
import { useQueryParams } from '@/composition/useQueryParams';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { Props } from './define.widget';
import { queryAsync } from '@/utils/db';
import { useBattleResultHistory } from '@/composition/shared/useBattleResultHistory';


const { hideIcon, historyLength } = useQueryParams({
  hideIcon: Boolean,
  historyLength: Number
})

const { battlesArray: history } = useBattleResultHistory((parsed, raw) => {
  if (!parsed.personal || parsed.personal.player == 'bot') return { delta: 0, rating: 0 }
  return {
    delta: parsed.personal.comp7.ratingDelta ?? 0,
    rating: parsed.personal.comp7.rating ?? 0,
    arena: parsed.common.arenaId,
    bonusType: parsed.common.bonusType,
    arenaUniqueID: parsed.arenaUniqueID
  }
}, { order: 'result', groupByPlayerId: true })

const comp7History = computed(() => history.value.filter(h => h?.arena != null && h.bonusType == 43))

const arenas = queryAsync<{ id: number, name: string }>(`select id, argMax(name, datetime) as name from Arenas where region = 'RU' group by id;`)

function getArenaName(id: number) {
  return arenas.value.data.find(a => a.id == id)?.name ?? '...'
}

const targetProps = computed<Omit<Props, 'hideIcon'>>(() => (comp7History.value.length == 0 ? { currentRank: 0, history: [] } : {
  currentRank: (comp7History.value[comp7History.value.length - 1].rating ?? 0) + (comp7History.value[comp7History.value.length - 1].delta ?? 0),
  history: comp7History.value.toReversed().slice(0, historyLength).map(t => ({
    arena: getArenaName(t?.arena ?? 0),
    delta: t.delta ?? 0,
    key: `${t.arena}_${t.delta}_${t.rating}_${t.arenaUniqueID}`
  }))
}))


</script>


<style lang="scss" scoped></style>