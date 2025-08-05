<template>
  <WidgetWrapper auto-height auto-scale hangar-only :required-extensions="['wotstat']">
    <Content :data="data" :game />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useReactiveTrigger, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';
import Content from './content/Index.vue';
import { computed, watch } from 'vue';
import { DateTimeDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { ContainersData, SUPPORTED_ENTITLEMENTS, SUPPORTED_ITEMS } from './define.widget';
import { query } from '@/utils/db';
import { useWidgetMainTab } from '@/composition/useWidgetMainTab';


const { delay, sync, syncDate } = useQueryParams({
  delay: oneOf(['disable', 'short', 'long'] as const, 'long'),
  sync: Boolean,
  syncDate: DateTimeDefault(new Date(2020, 0, 1))
})

const data = useWidgetStorage<ContainersData>('mainStats', {
  containers: [],
  modernizations: [],
  vehicles: [],
  crewBooks: [],
  items: [],
  battleBoosters: [],
  boosters: [],
  entitlements: [],
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
  'short': 2500,
  'long': 5000,
} as const

const tankDelayTime = {
  'disable': 0,
  'short': 35000,
  'long': 35000,
} as const


const isMain = useWidgetMainTab()

const { sdk } = useWidgetSdk();
useReactiveTrigger(sdk.data.extensions.wotstat.onEvent, (event) => {
  if (!isMain.value) return
  if (event.eventName != 'OnLootboxOpen') return
  console.log('onEvent', event)

  const { containerTag, openCount, parsed } = event

  const container = data.value.containers.find(t => t.tag == containerTag)
  if (container) container.count += 1
  else data.value.containers.push({ tag: containerTag, count: 1, })

  setTimeout(() => {
    for (const element of parsed.items) {
      const [tag, count] = element
      if (tag.startsWith('modernized')) {
        const mod = data.value.modernizations.find(t => t.tag == tag)
        if (mod) mod.count += count
        else data.value.modernizations.push({ tag, count })
      }

      if (SUPPORTED_ITEMS.includes(tag as any)) {
        const item = data.value.items.find(t => t.tag == tag)
        if (item) item.count += count
        else data.value.items.push({ tag, count })
      }

      if (tag.endsWith('BattleBooster')) {
        const item = data.value.battleBoosters.find(t => t.tag == tag)
        if (item) item.count += count
        else data.value.battleBoosters.push({ tag, count })
      }
    }

    for (const crewBook of parsed.crewBooks) {
      const [tag, count] = crewBook
      const fixedTag = tag.split(':')[0]
      const crewBookItem = data.value.crewBooks.find(t => t.tag == fixedTag)
      if (crewBookItem) crewBookItem.count += count
      else data.value.crewBooks.push({ tag: fixedTag, count })
    }

    for (const booster of parsed.boosters) {
      const [tag, time, value, count] = booster
      const targetTag = `${tag}:${value}`
      const boosterItem = data.value.boosters.find(t => t.tag == targetTag)
      if (boosterItem) boosterItem.count += count
      else data.value.boosters.push({ tag: targetTag, count })
    }

    // TODO: remove this after entitlements will be parsed correctly
    if (parsed.entitlements === undefined) {
      try {
        let rawEntitlementsTags: string[] = []
        let rawEntitlementsCount: number[] = []
        const raw = JSON.parse(event.raw)
        if ('entitlements' in raw && typeof raw.entitlements === 'object' && raw.entitlements !== null) {
          const entitlements = raw.entitlements
          const keys = Object.keys(entitlements)
          rawEntitlementsTags = keys
          rawEntitlementsCount = keys.map(k => {
            const v = entitlements[k as keyof typeof entitlements] as unknown
            if (typeof v === 'object' && v !== null && 'count' in v && typeof v.count === 'number') return v.count
            return 0
          })
        }
        parsed.entitlements = rawEntitlementsTags.map((tag, index) => [tag, rawEntitlementsCount[index]])
      } catch (error) {
        console.error('Failed to parse entitlements from raw data:', error)
        parsed.entitlements = []
      }
    }

    for (const entitlement of parsed.entitlements || []) {
      const [tag, count] = entitlement
      if (SUPPORTED_ENTITLEMENTS.includes(tag as any)) {
        const item = data.value.entitlements.find(t => t.tag == tag)
        if (item) item.count += count
        else data.value.entitlements.push({ tag, count })
      }
    }

    data.value.currencies.gold += parsed.gold
    data.value.currencies.credits += parsed.credits
    data.value.currencies.freeXP += parsed.freeXP
    data.value.currencies.premium += parsed.premium_plus
    data.value.currencies.mandarins += parsed.extraTokens.filter(t => t[0] == 'ny25_mandarin').reduce((acc, [, count]) => acc + count, 0)
    data.value.currencies.crystals += parsed.crystal
    data.value.currencies.equipCoins += (parsed as any).equipCoin
  }, delayTime[delay])

  if (parsed.addedVehicles.length) {
    setTimeout(() => {
      for (const tag of parsed.addedVehicles) {
        const tank = data.value.vehicles.find(t => t.tag == tag)
        if (tank) continue
        data.value.vehicles.push({ tag, isLegendary: LEGENDARY_TANKS.includes(tag) })
      }
    }, tankDelayTime[delay])
  }
})

const playerName = useReactiveState(sdk.data.player.name)
// const playerName = computed(() => 'Sh0tnik')

const LEGENDARY_TANKS = [
  'ussr:R219_Waffentrager_E100_Gold',
  'uk:GB110_FV4201_Chieftain_Prototype_B',
  'germany:G171_E77_02',
  'ussr:R227_Object_407_MZ',
  'france:F130_AMX_Tracteur_D'
]

const region = useReactiveState(sdk.data.game.region)
const game = computed(() => region.value == 'RU' ? 'mt' : 'wot')

watch(playerName, async player => {
  await new Promise(resolve => setTimeout(resolve, 1))

  if (!sync) return
  if (!isMain.value) return

  const result = await query<{
    containersCount: [string, number][];
    itemsCount: [string, number][];
    addedVehicles: [string, number][];
    crewBooks: [string, number][];
    boosters: [string, number][];
    entitlements: [string, number][];
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
            where playerName = '${playerName.value}' and dateTime > ${syncDate.getTime() / 1000}
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
                toUInt32(sum(gold)) as gold
            from data
        ),
        items as (
            select 
              multiIf(startsWith(tag, 'ration'), 'ration', tag) as tag,
              sum(count) as count
            from data
            array join items.tag as tag, items.count as count
            where 
              startsWith(tag, 'modernized')
              or startsWith(tag, 'ration')
              or endsWith(tag, 'BattleBooster')
              or tag in (${SUPPORTED_ITEMS.map(t => `'${t}'`).join(',')})
            group by tag
        ),
        itemsCount as (
            select arrayZip(groupArray(tag), groupArray(toUInt32(count))) as itemsCount from items
        ),
        vehicles as (
            select addedVehicles, level, toUInt8(addedVehicles in LEGENDARY_TANKS) as isLegend, min(data.dateTime) as firstOpen
            from data
            array join addedVehicles
            join VehiclesLatest on addedVehicles = tag
            group by addedVehicles, level
            order by isLegend desc, level desc, firstOpen
        ),
        vehiclesGroup as (
            select arrayZip(groupArray(addedVehicles), groupArray(isLegend)) as addedVehicles
            from vehicles
        ),
        crewBooks as (
            select splitByChar(':', tag)[1] as tag, toUInt32(sum(count)) as count
            from data
            array join crewBooks.tag as tag, crewBooks.count as count
            group by tag
        ),
        crewBooksGroup as (
            select arrayZip(groupArray(tag), groupArray(count)) as crewBooks
            from crewBooks
        ),
        boosters as (
            select concat(tag, ':', value) as tag, toUInt32(sum(count)) as count
            from data
            array join boosters.tag as tag, boosters.value as value, boosters.count as count
            group by tag
        ),
        boostersGroup as (
            select arrayZip(groupArray(tag), groupArray(count)) as boosters
            from boosters
        ),
        entitlements as (
          select tag, toUInt32(sum(count)) as count
          from data
          array join entitlements.tag as tag, entitlements.count as count
          where tag in (${SUPPORTED_ENTITLEMENTS.map(t => `'${t}'`).join(',')})
          group by tag
        ),
        entitlementsGroup as (
          select arrayZip(groupArray(tag), groupArray(count)) as entitlements
          from entitlements
        )
    select *
    from containersCount, currencies, itemsCount, vehiclesGroup, crewBooksGroup, boostersGroup, entitlementsGroup;
    `)


  if (result.data.length == 0) return
  const first = result.data[0]


  console.log(first);
  if (player != playerName.value) return

  data.value.containers = first.containersCount.map(t => ({ tag: t[0], count: t[1] }))
  data.value.modernizations = first.itemsCount.filter(t => t[0].startsWith('modernized')).map(t => ({ tag: t[0], count: t[1] }))
  data.value.vehicles = first.addedVehicles.map(t => ({ tag: t[0], isLegendary: t[1] == 1 }))
  data.value.crewBooks = first.crewBooks.map(t => ({ tag: t[0], count: t[1] }))
  data.value.entitlements = first.entitlements.map(t => ({ tag: t[0], count: t[1] }))
  data.value.battleBoosters = first.itemsCount.
    filter(t => t[0].endsWith('BattleBooster'))
    .map(t => ({ tag: t[0], count: t[1] }))
  data.value.items = first.itemsCount.
    filter(t => !t[0].startsWith('modernized') && !t[0].endsWith('BattleBooster'))
    .map(t => ({ tag: t[0], count: t[1] }))

  data.value.boosters = first.boosters.map(t => ({ tag: t[0], count: t[1] }))

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