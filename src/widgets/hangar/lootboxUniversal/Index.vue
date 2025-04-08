<template>
  <WidgetWrapper auto-height auto-scale hangar-only :required-extensions="['wotstat']">
    <Content :data="data" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useReactiveTrigger, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';
import Content from './content/Index.vue';
import { computed, watch } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { ContainersData, Props } from './define.widget';
import { query } from '@/utils/db';


const { delay } = useQueryParams({
  delay: oneOf(['disable', 'short', 'long'] as const, 'long'),
})

const data = useWidgetStorage<ContainersData>('mainStats', {
  containers: [],
  modernizations: [],
  vehicles: [],
  currencies: {
    gold: 0,
    credits: 0,
    freeXP: 0,
    premium: 0,
    mandarins: 0,
    crystals: 0,
    equipCoins: 0,
  },
}, { groupByPlayerId: true })

WidgetMetaTags.setPreferredTopLayer(true)

const delayTime = {
  'disable': 0,
  'short': 3000,
  'long': 5000,
} as const

const tankDelayTime = {
  'disable': 0,
  'short': 35000,
  'long': 35000,
} as const

const { sdk } = useWidgetSdk();
useReactiveTrigger(sdk.data.extensions.wotstat.onEvent, (event) => {
  if (event.eventName != 'OnLootboxOpen') return
  console.log('onEvent', event)

  const { containerTag, openCount, parsed } = event

  const container = data.value.containers.find(t => t.tag == containerTag)
  if (container) container.count += 1
  else data.value.containers.push({ tag: containerTag, count: 1, })

  setTimeout(() => {
    for (const element of parsed.items) {
      const [tag, count] = element
      if (!tag.startsWith('modernized')) continue

      const mod = data.value.modernizations.find(t => t.tag == tag)
      if (mod) mod.count += count
      else data.value.modernizations.push({ tag, count, })
    }

    data.value.currencies.gold += parsed.gold
    data.value.currencies.credits += parsed.credits
    data.value.currencies.freeXP += parsed.freeXP
    data.value.currencies.premium += parsed.premium_plus
    data.value.currencies.mandarins += parsed.extraTokens.filter(t => t[0] == 'ny25_mandarin').reduce((acc, [, count]) => acc + count, 0)
    data.value.currencies.crystals += parsed.crystal
    data.value.currencies.equipCoins += (parsed as any).equipCoin
  }, delayTime[delay])

  if (parsed.addedVehicles.length)
    setTimeout(() => {
      for (const tag of parsed.addedVehicles) {
        const tank = data.value.vehicles.find(t => t.tag == tag)
        if (tank) continue
        data.value.vehicles.push({ tag, isLegendary: LEGENDARY_TANKS.includes(tag) })
      }
    }, tankDelayTime[delay])
})

const playerName = useReactiveState(sdk.data.player.name)
// const playerName = computed(() => 'Renou')

const LEGENDARY_TANKS = [
  'ussr:R219_Waffentrager_E100_Gold',
  'uk:GB110_FV4201_Chieftain_Prototype_B',
  'germany:G171_E77_02',
]


watch(playerName, async player => {
  await new Promise(resolve => setTimeout(resolve, 1))
  const result = await query<{
    containersCount: [string, number][];
    modernizedCount: [string, number][];
    addedVehicles: [string, number][];
    prem: number;
    gold: number;
    credits: number;
    freeXP: number;
    crystal: number;
    equipCoin: number;
    mandarin25: number;
    compensatedMandarin25: number;
  }>(`
    with
        (${LEGENDARY_TANKS.map(t => `'${t}'`).join(',')}) as LEGENDARY_TANKS,
        data as (
            select *
            from Event_OnLootboxOpen
            where playerName = '${playerName.value}' and dateTime >= now() - INTERVAL 1 DAY
        ),
        containers as (
            select containerTag, toUInt32(count()) as count
            from data
            group by containerTag
        ),
        containersCount as (
            select arrayZip(groupArray(containerTag), groupArray(count)) as containersCount
            from containers
        ),
        currencies as (
            select
                toUInt32(sum(premiumPlus)) as prem,
                toUInt32(sum(credits)) as credits,
                toUInt32(sum(freeXP)) as freeXP,
                toUInt32(sum(crystal)) as crystal,
                toUInt32(sum(equipCoin)) as equipCoin,
                toUInt32(sum(gold) + sum(arraySum(compensatedVehicles.gold))) as gold
            from data
        ),
        modernized as (
            select modernizedTag, sum(modernizedCount) as modernizedCount
            from data
            array join items.tag as modernizedTag, items.count as modernizedCount
            where startsWith(modernizedTag, 'modernized')
            group by modernizedTag
        ),
        modernizedCount as (
            select arrayZip(groupArray(modernizedTag), groupArray(toUInt32(modernizedCount))) as modernizedCount from modernized
        ),
        vehicles as (
            select addedVehicles, level, toUInt8(addedVehicles in LEGENDARY_TANKS) as isLegelnd, min(data.dateTime) as firstOpen
            from data
            array join addedVehicles
            join VehiclesLatest on addedVehicles = tag
            group by addedVehicles, level
            order by isLegelnd desc, level desc, firstOpen
        ),
        vehiclesGroup as (
            select arrayZip(groupArray(addedVehicles), groupArray(isLegelnd)) as addedVehicles
            from vehicles
        )
    select *
    from containersCount, currencies, modernizedCount, vehiclesGroup;
    `)


  if (result.data.length == 0) return
  const first = result.data[0]


  console.log(first);
  if (player != playerName.value) return


  data.value.containers = first.containersCount.map(t => ({
    tag: t[0],
    count: t[1],
  }))

  data.value.modernizations = first.modernizedCount.map(t => ({
    tag: t[0],
    count: t[1],
  }))

  data.value.vehicles = first.addedVehicles.map(t => ({
    tag: t[0],
    isLegendary: t[1] == 1,
  }))

  data.value.currencies = {
    gold: first.gold,
    credits: first.credits,
    freeXP: first.freeXP,
    premium: first.prem,
    crystals: first.crystal,
    mandarins: 0,
    // mandarins: first.mandarin25 + first.compensatedMandarin25,
    equipCoins: first.equipCoin,
  }
}, { immediate: true })


</script>


<style lang="scss" scoped></style>