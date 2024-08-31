<template>
  <DefineTemplate>
    <Content v-bind="data" :transparentBackground="params.transparentBackground == 'true'"
      :showBest="params.showBest == 'true'" />
  </DefineTemplate>

  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper :ctx v-if="!params.playerId">
      <ReuseTemplate />
    </WidgetStatusWrapper>
    <ReuseTemplate v-else />
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

import { createReusableTemplate } from '@vueuse/core'
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

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
  places: [] as number[],
})

async function load() {

  console.log(targetId.value);

  try {
    const result = await fetch(`https://api.tanks.live/api/wot/tournaments/c1aaa6c3-57f5-44a2-a6f8-7d477df3befb/accounts/public?wotId=${targetId.value}`)
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
      place: number
    } = account.results

    data.value.battles = results.battles
    data.value.avgDamage = Math.round(results.damage / results.battles)
    data.value.resets = results.deletedBattles
    data.value.place = results.place

    const battles: {
      scores: number
    }[] = account.battles

    data.value.places = battles.map(t => t.scores).sort((a, b) => b - a).slice(0, 3)

  } catch (error) {
    console.error(error);
  }


  setTimeout(load, 60000);
}

if (targetId.value) load()
watchOnce(targetId, load)

</script>


<style lang="scss" scoped></style>