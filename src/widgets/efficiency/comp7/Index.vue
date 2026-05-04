<template>
  <WidgetWrapper auto-height auto-scale>
    <Content v-bind="targetProps" :hideIcon :skin />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue'
import { computed, onMounted, onUnmounted, shallowRef } from 'vue'
import { oneOf, useQueryParams } from '@/composition/useQueryParams'
import WidgetWrapper from '@/components/WidgetWrapper.vue'
import { Props } from './define.widget'
import { LONG_CACHE_SETTINGS, query, queryAsync, queryComputed } from '@/utils/db'
import { useBattleResultHistory } from '@/composition/shared/useBattleResultHistory'
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk'


const COMP_7_BONUS_TYPE = 43

const { hideIcon, historyLength, skin } = useQueryParams({
  hideIcon: Boolean,
  historyLength: Number,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

let eliteRatingInterval: ReturnType<typeof setInterval> | null = null
const eliteRatingStats = shallowRef(new Map<string, number>())

const { sdk } = useWidgetSdk()
const region = useReactiveState(sdk.data.game.region)
const gameLanguage = useReactiveState(sdk.data.game.language)

const { battlesArray: history } = useBattleResultHistory((parsed, raw) => {
  if (!parsed.personal || parsed.personal.player == 'bot') return { delta: 0, rating: 0 }
  return {
    delta: parsed.personal.comp7.ratingDelta ?? 0,
    rating: parsed.personal.comp7.rating ?? 0,
    isQualification: parsed.personal.comp7.qualActive ?? false,
    battleResult: parsed.result,
    arena: parsed.common.arenaId,
    bonusType: parsed.common.bonusType,
    arenaUniqueID: parsed.arenaUniqueID
  }
}, { order: 'result', groupByPlayerId: true })

const comp7History = computed(() => history.value.filter(h => h?.arena != null && h.bonusType == COMP_7_BONUS_TYPE))


const LANGUAGE_TO_REGION: Record<string, string> = {
  'en': 'EU',
  'ru': 'RU',
  'be': 'RU',
}

const arenas = queryComputed<{ id: number, name: string }>(() =>
  `select id, argMax(name, datetime) as name from Arenas where region = '${LANGUAGE_TO_REGION[gameLanguage.value ?? 'en'] || 'EU'}' group by id;`
)

async function reloadEliteRating() {
  const res = await query<{ region: string, lastElite: number }>(`
    select region, argMax(eliteRating, dateTime) as lastElite
    from Event_OnComp7Info
    group by region
  `, { settings: LONG_CACHE_SETTINGS, allowCache: false })

  eliteRatingStats.value = new Map(res.data.map(r => [r.region, r.lastElite]))
}

function getArenaName(id: number) {
  const fullName = arenas.value.data.find(a => a.id == id)?.name
  if (!fullName) return '...'

  return fullName
    .replace('(новогодняя)', 'НГ')
}

const targetProps = computed<Omit<Props, 'hideIcon'>>(() => (comp7History.value.length == 0 ? { currentRank: 0, eliteRating: null, history: [], game: 'lesta' } : {
  currentRank: (comp7History.value[comp7History.value.length - 1].rating ?? 0) + (comp7History.value[comp7History.value.length - 1].delta ?? 0),
  eliteRating: eliteRatingStats.value.get(region.value ?? '') || null,
  history: comp7History.value.toReversed().slice(0, historyLength).map(t => ({
    arena: getArenaName(t?.arena ?? 0),
    delta: t.delta ?? 0,
    key: `${t.arena}_${t.delta}_${t.rating}_${t.arenaUniqueID}`,
    result: t.battleResult,
  })),
  game: region.value == 'RU' ? 'lesta' : 'wg'
}))

onMounted(() => {
  reloadEliteRating()
  eliteRatingInterval = setInterval(() => reloadEliteRating(), 60_000)
})

onUnmounted(() => {
  if (eliteRatingInterval) {
    clearInterval(eliteRatingInterval)
    eliteRatingInterval = null
  }
})

</script>


<style lang="scss" scoped></style>