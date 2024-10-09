<template>
  <DefineTemplate>
    <Content v-bind="data" :transparentBackground :showBest />
  </DefineTemplate>

  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper v-if="!queryPlayerId">
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

const { transparentBackground, showBest, playerId: queryPlayerId } = useQueryParams({
  transparentBackground: Boolean,
  showBest: Boolean,
  playerId: String,
})

const { sdk } = useWidgetSdk();
const playerId = useReactiveState(sdk.data.player.id);

const targetId = computed(() => playerId.value || queryPlayerId);

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
    const result = await fetch(`https://api.tanks.live/api/wot/tournaments/3c715b20-c871-4d0b-9a4b-acc650be8aab/accounts/public?wotId=${targetId.value}`)
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