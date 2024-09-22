<template>
  <DefineTemplate>
    <Content v-bind="data" :hide-l1="hideL1" :hide-l2="hideL2" :hide-l3="hideL3" />
  </DefineTemplate>

  <WidgetRoot autoScale autoHeight v-if="nickname">
    <WidgetCard>
      <ReuseTemplate />
    </WidgetCard>
  </WidgetRoot>
  <WidgetCardWrapper autoScale autoHeight v-else>
    <ReuseTemplate />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';

import Content from './Content.vue';
import { LocationQueryValue, useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import { watchOnce } from '@vueuse/core';

import { createReusableTemplate } from '@vueuse/core'
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const route = useRoute();
const hideL1 = computed(() => route.query.hideL1 === 'true');
const hideL2 = computed(() => route.query.hideL2 === 'true');
const hideL3 = computed(() => route.query.hideL3 === 'true');
const nickname = computed(() => route.query.nickname as LocationQueryValue);

const compactDescriptorToTankName = {
  13057: 'Варяг',
  43793: 'Walküre',
  42785: 'Raven',
  13377: 'Arlequin',
  41553: 'Harbinger',
  13361: 'Bái Láng',
  5777: 'Huragan',
  5761: 'Beowulf'
}

const { sdk } = useWidgetSdk();

const sdkId = useReactiveState(sdk.data.player.id);
const nicknameId = ref<null | string>(null);

const id = computed(() => nicknameId.value || sdkId.value);

function hashForResult(res: { score: number, place: number, timestamp: number }) {
  return `${res.place}-${res.score}-${res.timestamp}`
}

const data = ref({
  place: 0,
  battleCount: 0,
  currentSessionSum: 0,
  bestSessionSum: 0,
  currentSession: [] as { key: string, tank: string, score: number, top: boolean }[],
  bestSession: [] as { tank: string, score: number, top: boolean }[]
})

async function load() {
  const position = await fetch(`https://challenge.tanki.su/api/v1/tournaments/801/player/${id.value}?sortby=rating`)
  const { data: place } = await position.json()

  const page = await fetch(`https://challenge.tanki.su/api/v1/tournaments/801?offset=${place - 1}&limit=1`)
  const { data: { participants } } = await page.json()

  const userParticipant = participants.find((p: any) => p.user.spa_id == id.value)
  const { results } = userParticipant

  data.value.place = userParticipant.position
  data.value.battleCount = results.battles

  data.value.currentSessionSum = results.current_total
  data.value.bestSessionSum = results.best_total

  const currentSeries = (results.current_series as any[])
    .map(t => ({
      score: t.score,
      place: t.position,
      timestamp: t.timestamp,
      compactCd: t.vehicle_type_cd
    }))

  data.value.currentSession = currentSeries
    .map(t => ({
      key: hashForResult(t),
      tank: compactDescriptorToTankName[t.compactCd as keyof typeof compactDescriptorToTankName] ?? '???',
      score: t.score,
      top: t.place === 1
    }))

  data.value.bestSession = (results.best_series as any[]).map(t => ({
    tank: compactDescriptorToTankName[t.vehicle_type_cd as keyof typeof compactDescriptorToTankName] ?? '???',
    score: t.score,
    top: t.position === 1
  }))
  console.log(results);

}

async function loadLoop() {
  try {
    await load()
  } catch (e) {
    console.error(e)
  }

  setTimeout(loadLoop, 10000)
}

async function loadSpaIdByPlayerName() {
  if (!nickname.value) return

  fetch(`https://challenge.tanki.su/api/v1/tournaments/801/autocomplete?search=${nickname.value}`)
    .then(res => res.json())
    .then(data => {
      try {
        const search_results: { name: string, spa_id: number }[] = data.data.search_results
        const target = nickname.value?.toLowerCase()
        nicknameId.value = search_results.find(t => t.name.toLowerCase() === target)?.spa_id.toString() ?? ''
      } catch (error) { }
    })
}

onMounted(() => {
  loadSpaIdByPlayerName()
})

watchOnce(id, loadLoop)

useReactiveTrigger(sdk.data.battle.onBattleResult, r => {
  load()
})


</script>


<style lang="scss" scoped></style>