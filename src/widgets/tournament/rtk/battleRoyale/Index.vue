<template>
  <WidgetRoot autoScale autoHeight v-if="nickname">
    <WidgetCard>
      <Content v-bind="data" :hide-l1="hideL1" :hide-l2="hideL2" :hide-l3="hideL3" />
    </WidgetCard>
  </WidgetRoot>
  <WidgetCardWrapper autoScale autoHeight v-else>
    <Content v-bind="data" :hide-l1="hideL1" :hide-l2="hideL2" :hide-l3="hideL3" />
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
const nicknameId = ref('');

const id = computed(() => nicknameId.value || sdkId.value);

const vehicleForHash = new Map<string, string>(JSON.parse(localStorage.getItem('rtk-vehicleForHash') || '[]'));

function hashForResult(res: { score: number, place: number, damage: number }) {
  return `${res.place}-${res.score}-${res.damage}`
}

const data = ref({
  place: 0,
  battleCount: 0,
  currentSession: 0,
  bestSession: 0,
  scores: [] as { key: string, tank: string, score: number, top: boolean }[]
})

async function load() {
  const position = await fetch(`https://challenge.tanki.su/api/v1/tournaments/708/player/${id.value}?sortby=rating`)
  const { data: place } = await position.json()

  const page = await fetch(`https://challenge.tanki.su/api/v1/tournaments/708?offset=${place - 1}&limit=1`)
  const { data: { participants } } = await page.json()

  const userParticipant = participants.find((p: any) => p.user.spa_id === id.value)
  const { results } = userParticipant

  data.value.place = userParticipant.position
  data.value.battleCount = results.battles

  data.value.currentSession = results.current_total
  data.value.bestSession = results.best_total

  const currentSeries = (results.current_series as any[])
    .map(t => ({ score: t.score, place: t.position, damage: t.damage, compactCd: t.vehicle_type_cd }))

  data.value.scores = currentSeries
    .map(t => ({
      key: hashForResult(t),
      tank: compactDescriptorToTankName[t.compactCd as keyof typeof compactDescriptorToTankName] ?? '???',
      score: t.score,
      top: t.place === 1
    }))
}

async function loadLoop() {
  try {
    await load()
  } catch { }

  setTimeout(loadLoop, 10000)
}

async function loadSpaIdByPlayerName() {
  if (!nickname.value) return

  fetch(`https://challenge.tanki.su/api/v1/tournaments/708/autocomplete?search=${nickname.value}`)
    .then(res => res.json())
    .then(data => {
      try {
        nicknameId.value = data.data.search_results[0].spa_id
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