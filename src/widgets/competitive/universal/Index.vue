<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :slots="query.slots" :data="target" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { arrayOfOneOf, useQueryParams } from '@/composition/useQueryParams';
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { possibleSlots, Props } from './define.widget';
import { toIconType, useBattleHistoryAggregator } from '@/composition/shared/useBattleHistoryAggregator';
import { computed, shallowRef, watch } from 'vue';
import { useWidgetRelay } from '@/composition/useWidgetRelay';
import { passive, useReactiveRelayState } from '@/composition/useReactiveRelayState';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';

const query = useQueryParams({
  channelKey: String,
  allowSquad: Boolean,
  passive: Boolean,
  slots: arrayOfOneOf(possibleSlots)
})

const { relay } = useWidgetRelay(query.channelKey ?? 'default')

const state = useReactiveRelayState<Props['data'][number]>(() => relay, 'data', passive)
const target = computed(() => [...state.all.value.values()])

if (!query.passive) {
  const { sdk } = useWidgetSdk()
  const playerName = useReactiveState(sdk.data.player.name)
  const stats = useBattleHistoryAggregator()

  const data = computed<Props['data'][number]>(() => ({
    player: playerName.value ?? '',
    ...toIconType(stats.value)
  }))

  watch(data, d => {
    state.state.value = d
    state.trigger()
  }, { immediate: true, deep: true })
}



</script>


<style lang="scss" scoped></style>