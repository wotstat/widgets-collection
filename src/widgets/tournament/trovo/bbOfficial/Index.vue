<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper :ctx v-if="!params.playerId">
      <Content v-bind="data" :transparentBackground="params.transparentBackground == 'true'"
        :showBest="params.showBest == 'true'" />
    </WidgetStatusWrapper>
    <Content v-else v-bind="data" :transparentBackground="params.transparentBackground == 'true'"
      :showBest="params.showBest == 'true'" />
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';

import Content from './Content.vue';
import { computed, ref } from 'vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { useQueryParams } from '@/composition/useQueryParams';
import { watchOnce } from '@vueuse/core';

const params = useQueryParams<{
  transparentBackground: string,
  showBest: string,
  playerId: string,
}>()

const ctx = useWidgetSdk();
const playerId = useReactiveState(ctx.sdk.data.player.id);

const targetId = computed(() => playerId.value || params.playerId);

const data = ref({
  place: 0,
  avgDamage: 0,
  battles: 0,
  resets: 0,
  places: [],
})

async function load() {

  console.log(targetId.value);

  try {
    const result = await fetch(`https://tournaments-live-ae31c4b3d978.herokuapp.com/api/wot/tournaments/c1aaa6c3-57f5-44a2-a6f8-7d477df3befb/public`)
    const { data: { accounts } } = await result.json()

    const account = accounts.find((account: any) => account.wotId == targetId.value)
    const results: {
      battleScores: number
      battles: number
      bonusScores: number
      damage: number
      deletedBattles: number
      frags: number
      totalScores: number
      wins: number
    } = account.results

    data.value.battles = results.battles
    data.value.avgDamage = Math.round(results.damage / results.battles)
    data.value.resets = results.deletedBattles

    const sorted = accounts.sort((a: any, b: any) => b.results.totalScores - a.results.totalScores)
    data.value.place = sorted.findIndex((account: any) => account.wotId == targetId.value) + 1

  } catch (error) {
    console.error(error);
  }


  setTimeout(load, 60000);
}

if (targetId.value) load()
watchOnce(targetId, load)

</script>


<style lang="scss" scoped></style>