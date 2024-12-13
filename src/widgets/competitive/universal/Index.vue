<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :slots="query.slots" :skin="query.skin" :data="target" :total="query.total ? total : undefined" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { arrayOfOneOf, oneOf, useQueryParams } from '@/composition/useQueryParams';
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { possibleSlots, Props, variants } from './define.widget';
import { AggregatorResult, toIconType, totalAggregator, useBattleHistoryAggregator } from '@/composition/shared/useBattleHistoryAggregator';
import { computed, watch } from 'vue';
import { useWidgetRelay } from '@/composition/useWidgetRelay';
import { passive, useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { uniqBy } from '@/utils';

const query = useQueryParams({
  channelKey: String,
  allowSquad: Boolean,
  total: Boolean,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
  topInRow: oneOf(variants),
  battles: oneOf(variants),
  passive: Boolean,
  slots: arrayOfOneOf(possibleSlots)
})

const { relay } = useWidgetRelay(query.channelKey ?? 'default')

type SyncData = {
  player: string,
  results: AggregatorResult
}

const state = useReactiveRelayState<SyncData>(() => relay, 'data', passive)
const target = computed<Props['data']>(() => uniqBy([...state.all.value.values()], t => t.player).map(t => ({ player: t.player, ...toIconType(t.results) })))
const total = computed<Props['total']>(() => {
  const results = [...state.all.value.values()].map(t => t.results)
  return toIconType(totalAggregator(results, { battle: query.battles ?? 'max', top1InRow: query.topInRow ?? 'max' }))
})

if (!query.passive) {
  const { sdk } = useWidgetSdk()
  const playerName = useReactiveState(sdk.data.player.name)
  const stats = useBattleHistoryAggregator()

  const data = computed<SyncData>(() => ({
    player: playerName.value ?? '',
    results: stats.value,
  }))

  watch(data, d => {
    state.state.value = d
    state.trigger()
  }, { immediate: true, deep: true })
}



</script>


<style lang="scss" scoped></style>