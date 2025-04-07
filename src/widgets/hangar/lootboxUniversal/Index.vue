<template>
  <WidgetWrapper auto-height auto-scale hangar-only>
    <Content :data="data" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useReactiveTrigger, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { ContainersData, Props } from './define.widget';
import { query } from '@/utils/db';


// const { hideL1, hideL2, hideL3, sync, delay } = useQueryParams({
//   hideL1: Boolean,
//   hideL2: Boolean,
//   hideL3: Boolean,
//   delay: oneOf(['disable', 'short', 'long'] as const, 'long'),
//   sync: Boolean
// })

const data = useWidgetStorage<ContainersData>('mainStats', {
  containers: [],
  currencies: {
    gold: 0,
    credits: 0,
    freeXP: 0,
    premium: 0,
    mandarins: 0,
    crystals: 0,
  },
}, { groupByPlayerId: true })

// const tanksSet = useWidgetStorage('tanks', new Set<string>(), { groupByPlayerId: true })
// const tanks = computed(() => [...tanksSet.value.values()])
// WidgetMetaTags.setPreferredTopLayer(true)

// const delayTime = {
//   'disable': 0,
//   'short': 3000,
//   'long': 5000,
// } as const

// const tankDelayTime = {
//   'disable': 0,
//   'short': 32000,
//   'long': 32000,
// } as const

const { sdk } = useWidgetSdk();
// useReactiveTrigger(sdk.data.extensions.wotstat.onEvent, (event) => {
//   if (event.eventName != 'OnLootboxOpen') return
//   console.log('onEvent', event)

//   const { containerTag, openCount, parsed } = event

//   if (containerTag == 'ny_2025_big') data.value.opened.big += 1
//   else if (containerTag == 'ny_2025_tanks') data.value.opened.tanks += 1
//   else if (containerTag == 'ny_2025_small') data.value.opened.small += 1
//   else if (containerTag == 'ny_2025_surprise') data.value.opened.surprise += 1
//   else return

//   setTimeout(() => {
//     data.value.currencies.gold += parsed.gold
//     data.value.currencies.credits += parsed.credits
//     data.value.currencies.freeXP += parsed.freeXP
//     data.value.currencies.premium += parsed.premium_plus
//     data.value.currencies.mandarins += parsed.extraTokens.filter(t => t[0] == 'ny25_mandarin').reduce((acc, [, count]) => acc + count, 0)
//   }, containerTag == 'ny_2025_surprise' ? 0 : delayTime[delay])

//   for (const tank of parsed.addedVehicles) setTimeout(() => tanksSet.value.add(tank), containerTag == 'ny_2025_surprise' ? 0 : tankDelayTime[delay])
// })

// const playerName = useReactiveState(sdk.data.player.name)

const playerName = computed(() => 'Renou')
watch(playerName, async player => {
  await new Promise(resolve => setTimeout(resolve, 1))
  const result = await query<{
    containersCount: [string, number][];
  }>(`
    with
        data as (
            select *
            from Event_OnLootboxOpen
            where playerName = 'Renou' or True
        ),
        containers as (
            select containerTag, toUInt32(count()) as count
            from data
            group by containerTag
        ),
        containersCount as (
            select arrayZip(groupArray(containerTag), groupArray(count)) as containersCount
            from containers
        )
    select *
    from containersCount
    `)


  if (result.data.length == 0) return
  const first = result.data[0]


  console.log(first);
  if (player != playerName.value) return


  data.value.containers = first.containersCount.map(t => ({
    tag: t[0],
    count: t[1],
  }))

  // data.value = {
  //   opened: {
  //     small: first.countSmall,
  //     big: first.countBig,
  //     tanks: first.countTanks,
  //     surprise: first.countSurprise,
  //   },
  //   currencies: {
  //     gold: first.gold,
  //     credits: first.credits,
  //     freeXP: first.freeXp,
  //     premium: first.premium,
  //     mandarins: first.mandarin25,
  //   }
  // }

  // for (const tank of first.vehicles) tanksSet.value.add(tank)
}, { immediate: true })

</script>


<style lang="scss" scoped></style>