<template>
  <WidgetCardWrapper auto-height auto-scale>
    <Content :showLosses :align :battles="counter.battles" :wins="counter.wins" :loses="counter.losses" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useBattleResult } from '@/composition/useOnBattleResult';

const { align, showLosses, battleOnResult } = useQueryParams({
  align: oneOf(['left', 'center', 'right'] as const, 'center'),
  showLosses: Boolean,
  battleOnResult: Boolean,
})

const { sdk } = useWidgetSdk();
const counter = useWidgetStorage('counter', { battles: 0, wins: 0, losses: 0 })
const lastArenaId = useWidgetStorage('lastArenaId', 0)

const arenaId = useReactiveState(sdk.data.battle.arenaId);
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
watch(isInBattle, value => {
  if (battleOnResult) return;
  if (!value) return;
  if (!arenaId.value) return;
  if (lastArenaId.value == arenaId.value) return;

  lastArenaId.value = arenaId.value
  counter.value.battles += 1
})

useBattleResult(res => {
  if (battleOnResult) counter.value.battles += 1
  if (res.result == 'win') counter.value.wins += 1
  if (res.result != 'win') counter.value.losses += 1
})

</script>


<style lang="scss" scoped></style>