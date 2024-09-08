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
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useBattleResult } from '@/composition/useOnBattleResult';

const query = useQueryParams<{
  saveKey: string
  align: 'left' | 'center' | 'right'
  showLosses: string
  battleOnResult: string
}>()

const showLosses = computed(() => query.showLosses !== 'false');
const align = computed(() => query.align ?? 'center');
const battleOnResult = query.battleOnResult !== 'false'

const { sdk } = useWidgetSdk();
const counter = useWidgetStorage(query.saveKey ?? '_empty', { battles: 0, wins: 0, losses: 0 })
const lastArenaId = useWidgetStorage(`${query.saveKey}_arenaId` ?? '_empty', 0)

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