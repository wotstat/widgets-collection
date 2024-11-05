<template>
  <DefineTemplate>
    <Content v-bind="data" :hide-l1="query.hideL1" :hide-l2="query.hideL2" :hide-l3="query.hideL3" />
  </DefineTemplate>

  <!-- <WidgetRoot autoScale autoHeight v-if="nickname">
    <WidgetCard>
      <ReuseTemplate />
    </WidgetCard>
  </WidgetRoot>
  <WidgetCardWrapper autoScale autoHeight v-else>
    <ReuseTemplate />
  </WidgetCardWrapper> -->

  <WidgetRoot autoScale autoHeight>
    <WidgetCard>
      <ReuseTemplate />
    </WidgetCard>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetRoot from '@/components/WidgetRoot.vue';

import Content from './Content.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import { watchOnce } from '@vueuse/core';

import { createReusableTemplate } from '@vueuse/core'
import { useQueryParams } from '@/composition/useQueryParams';
import { Props } from './define.widget';
import { useBattleResultHistory } from '@/composition/useBattleResultHistory';
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const TOURNAMENT_ID = 916
const HOUR_MS = 1000 * 60 * 60

const query = useQueryParams({
  hideL1: Boolean,
  hideL2: Boolean,
  hideL3: Boolean,
  nickname: String
})

const { sdk } = useWidgetSdk();

const sdkId = useReactiveState(sdk.data.player.id);
const isInBattle = useReactiveState(sdk.data.battle.isInBattle);
const vehicle = useReactiveState(sdk.data.battle.vehicle);
const nicknameId = ref<null | string>(null);

const id = computed(() => nicknameId.value || sdkId.value);

const battleHistory = useBattleResultHistory<{ xp: number, tank: string, date: number }>((parsed) => ({ xp: parsed.personal?.stats.xp ?? 0 }))

watch(() => [isInBattle.value, vehicle.value] as const, ([isInBattle, vehicle]) => {
  if (!isInBattle) return
  if (!vehicle) return

  battleHistory.addDataToCurrentBattle({
    tank: vehicle.localizedShortName,
    date: new Date().getTime()
  })
})

const data = ref<Omit<Props, 'hideL1' | 'hideL2' | 'hideL3'>>({
  place: 0,
  battleCount: 0,
  bestBattles: [],
  last10: [],
  lastBattle: undefined,
})

const currentSessionStart = computed(() => {
  const battles = battleHistory.battlesArray.value.map(t => t.date).filter(t => t != undefined).toReversed()

  for (let i = 1; i < battles.length; i++) {
    const last = battles[i - 1]
    const current = battles[i];
    const delta = current - last
    if (delta > 4 * HOUR_MS) return current
  }

  return battles.at(-1) ?? new Date().getTime()
})


async function load() {
  const position = await fetch(`https://challenge.tanki.su/api/v1/tournaments/${TOURNAMENT_ID}/player/${id.value}?sortby=rating`)
  const { data: place } = await position.json()

  const page = await fetch(`https://challenge.tanki.su/api/v1/tournaments/${TOURNAMENT_ID}?offset=${place - 1}&limit=1`)
  const { data: { participants } } = await page.json()

  const userParticipant = participants.find((p: any) => p.user.spa_id == id.value)
  const { results } = userParticipant

  data.value.place = userParticipant.position
  data.value.battleCount = results.battles

  const xpMap = new Map<number, ({ tank?: string, date?: number })[]>()
  for (const battle of battleHistory.battlesArray.value) {
    const xp = battle.xp
    if (!xp) continue
    if (!xpMap.has(xp)) xpMap.set(xp, [])
    xpMap.get(xp)?.push(battle)
  }


  data.value.bestBattles = (results.history as number[]).toSorted((a, b) => b - a).map(xp => {

    const battle = xpMap.get(xp)?.pop() ?? null

    return {
      tank: battle?.tank ?? null,
      score: xp,
      today: currentSessionStart.value <= (battle?.date ?? 0)
    }
  })

  data.value.last10 = battleHistory.battlesArray.value.slice(-10).map(t => t.xp).filter(t => t != undefined)
  const last = battleHistory.battlesArray.value.at(-1)
  if (last && last.xp != undefined) {
    data.value.lastBattle = {
      tank: last.tank ?? null,
      score: last.xp ?? 0,
    }
  }
}

async function loadLoop() {
  try {
    await load()
  } catch (e) {
    console.error(e)
  }

  setTimeout(loadLoop, 5000)
}

async function loadSpaIdByPlayerName() {
  if (!query.nickname) return

  fetch(`https://challenge.tanki.su/api/v1/tournaments/${TOURNAMENT_ID}/autocomplete?search=${query.nickname}`)
    .then(res => res.json())
    .then(data => {
      try {
        const search_results: { name: string, spa_id: number }[] = data.data.search_results
        const target = query.nickname?.toLowerCase()
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