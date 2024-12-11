<template>
  <WidgetWrapper auto-height auto-scale hangar-only>
    <Content v-bind="data" :hideL1 :hideL2 :hideL3 :tanks />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useReactiveTrigger, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { Props } from './define.widget';
import { query } from '@/utils/db';


const { hideL1, hideL2, hideL3, sync } = useQueryParams({
  hideL1: Boolean,
  hideL2: Boolean,
  hideL3: Boolean,
  sync: Boolean
})

const data = useWidgetStorage<Omit<Props, 'hideL1' | 'hideL2' | 'hideL3' | 'tanks'>>('mainStats', {
  opened: {
    small: 0,
    big: 0,
    surprise: 0,
    tanks: 0,
  },
  currencies: {
    gold: 0,
    credits: 0,
    freeXP: 0,
    premium: 0,
    mandarins: 0,
  },
}, { groupByPlayerId: true })

const tanksSet = useWidgetStorage('tanks', new Set<string>(), { groupByPlayerId: true })
const tanks = computed(() => [...tanksSet.value.values()])
WidgetMetaTags.setPreferredTopLayer(true)

const { sdk } = useWidgetSdk();
const alreadyOpenedGroup = new Set<string>()
useReactiveTrigger(sdk.data.extensions.wotstat.onEvent, (event) => {
  if (event.eventName != 'OnLootboxOpen') return
  if (alreadyOpenedGroup.has(event.openGroup)) return
  console.log('onEvent', event)
  alreadyOpenedGroup.add(event.openGroup)

  const { containerTag, openCount, parsed } = event

  if (containerTag == 'ny_2025_big') data.value.opened.big += 1
  else if (containerTag == 'ny_2025_tanks') data.value.opened.tanks += 1
  else if (containerTag == 'ny_2025_small') data.value.opened.small += 1
  else if (containerTag == 'ny_2025_surprise') data.value.opened.surprise += 1
  else return


  data.value.currencies.gold += parsed.gold
  data.value.currencies.credits += parsed.credits
  data.value.currencies.freeXP += parsed.freeXP
  data.value.currencies.premium += parsed.premium_plus
  data.value.currencies.mandarins += parsed.extraTokens.filter(t => t[0] == 'ny25_mandarin').reduce((acc, [, count]) => acc + count, 0)

  for (const tank of parsed.addedVehicles) tanksSet.value.add(tank)
})

const playerName = useReactiveState(sdk.data.player.name)

watch(playerName, async player => {
  if (!sync) return
  await new Promise(resolve => setTimeout(resolve, 1))
  const result = await query<{
    countSmall: number,
    countBig: number,
    countTanks: number,
    countSurprise: number,
    gold: number,
    credits: number,
    freeXp: number,
    premium: number,
    mandarin25: number,
    vehicles: string[]
  }>(`
    select 
        toUInt32(countIf(containerTag = 'ny_2025_small')) as countSmall,
        toUInt32(countIf(containerTag = 'ny_2025_big')) as countBig,
        toUInt32(countIf(containerTag = 'ny_2025_tanks')) as countTanks,
        toUInt32(countIf(containerTag = 'ny_2025_surprise')) as countSurprise,
        toUInt32(sum(gold)) as gold,
        toUInt32(sum(credits)) as credits,
        toUInt32(sum(freeXP)) as freeXp,
        toUInt32(sum(premiumPlus)) as premium,
        toUInt32(sum(arraySum(arrayFilter(t -> t.1 == 'ny25_mandarin', arrayZip(extra.tag, extra.count)).2))) as mandarin25,
        arrayDistinct(arrayFlatten(groupArray(addedVehicles))) as vehicles
    from Event_OnLootboxOpen
    where playerName = '${player}'
      and containerTag in ('ny_2025_small', 'ny_2025_big', 'ny_2025_tanks', 'ny_2025_surprise')
    `)

  if (result.data.length == 0) return
  const first = result.data[0]

  if (player != playerName.value) return

  data.value = {
    opened: {
      small: first.countSmall,
      big: first.countBig,
      tanks: first.countTanks,
      surprise: first.countSurprise,
    },
    currencies: {
      gold: first.gold,
      credits: first.credits,
      freeXP: first.freeXp,
      premium: first.premium,
      mandarins: first.mandarin25,
    }
  }

  for (const tank of first.vehicles) tanksSet.value.add(tank)
}, { immediate: true })

</script>


<style lang="scss" scoped></style>