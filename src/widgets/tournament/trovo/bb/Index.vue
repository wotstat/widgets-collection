<template>
  <WidgetCardWrapper autoScale autoHeight>
    <Content :battleCount="battleCount" :currentSession="battleScores" :hide-l1="hideL1" :hide-l2="hideL2" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';

import Content from './Content.vue';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import { parseBattleResult } from '@/utils/battleResultParser';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const route = useRoute();
const hideL1 = computed(() => route.query.hideL1 === 'true');
const hideL2 = computed(() => route.query.hideL2 === 'true');

const { sdk } = useWidgetSdk();

const isInBattle = useReactiveState(sdk.data.battle.isInBattle);
const vehicle = useReactiveState(sdk.data.battle.vehicle);
const arenaId = useReactiveState(sdk.data.battle.arenaId);

const query = useQueryParams<{ saveKey: string }>()
const battleCount = useWidgetStorage(`${query.saveKey}_battleCount` ?? '_battleCount', 0)
const battleScores = useWidgetStorage<number[]>(`${query.saveKey}_battleScores` ?? '_battleScores', [])

const supportedBattles = useWidgetStorage(`${query.saveKey}_started` ?? '_started', new Set<number>())

watch(isInBattle, value => {
  if (!value) return;
  if (!vehicle.value) return;
  if (!arenaId.value) return;

  if (vehicle.value.level == 10 && vehicle.value.class == 'heavyTank') {
    supportedBattles.value.add(arenaId.value)
  }
})

useReactiveTrigger(sdk.data.battle.onBattleResult, result => {
  const parsed = parseBattleResult(result);
  if (!parsed || !parsed.arenaUniqueID || !parsed.personal) return;
  if (!supportedBattles.value.has(parsed.arenaUniqueID)) return;
  supportedBattles.value.delete(parsed.arenaUniqueID)

  battleScores.value.push(parsed.personal.stats.damageDealt);
  battleCount.value++
})


</script>


<style lang="scss" scoped></style>