<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :skin="skin" :battlesCount="battles" :totalAvg :totalLast="lastBattleTotalScore || 0" :players />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch, watchEffect } from 'vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useBattleResult } from '@/composition/useOnBattleResult';
import { useWidgetMainTab } from '@/composition/useWidgetMainTab';

function personalScore(damage: number, frags: number): number {
  return damage + frags * 300;
}

function teamScore(isWin: boolean) {
  return isWin ? 3000 : 0;
}

const { skin } = useQueryParams({
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const { sdk } = useWidgetSdk();
const platoon = useReactiveState(sdk.data.platoon.slots)
const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)

const battles = useWidgetStorage('battleCount', 0, { groupByPlatoon: true })
const totalScore = useWidgetStorage('score', 0, { groupByPlatoon: true })
const scoreByPlayer = useWidgetStorage('scoreByPlayer',
  new Map<number, { frags: number, damage: number, lastFrags: number, lastDamage: number }>(),
  { groupByPlatoon: true })

const players = computed(() => {
  const platoonSlots = platoon.value?.filter(t => t != null) ?? []

  if (platoonSlots.length <= 1) {
    const player = scoreByPlayer.value.get(playerId.value ?? -1);
    if (!player || battles.value == 0) return [{ name: playerName.value ?? '???', avg: 0, last: 0 }];

    return [{
      name: playerName.value ?? '???',
      avg: personalScore(player.damage, player.frags) / battles.value,
      last: personalScore(player.lastDamage, player.lastFrags)
    }];
  }

  return platoonSlots.map(slot => {
    const player = scoreByPlayer.value.get(slot.dbid ?? -1);
    if (!player || battles.value == 0) return { name: slot.name ?? '???', avg: 0, last: 0 };

    return {
      name: slot.name ?? '???',
      avg: personalScore(player.damage, player.frags) / battles.value,
      last: personalScore(player.lastDamage, player.lastFrags)
    };
  });

})

const totalAvg = computed(() => totalScore.value == 0 ? 0 : totalScore.value / battles.value)

const lastBattleTotalScore = useWidgetStorage<number>('lastBattleTotalScore', 0, { groupByPlatoon: true })
const isMain = useWidgetMainTab()

useBattleResult((parsed, result) => {
  if (!isMain.value) return;

  battles.value += 1

  const battleScore = parsed.platoon
    .filter(p => p !== undefined)
    .map(p => personalScore(p.stats.damageDealt, p.stats.kills))
    .reduce((a, b) => a + b, 0) + teamScore(parsed.result == 'win')

  totalScore.value += battleScore
  lastBattleTotalScore.value = battleScore

  for (const person of parsed.platoon) {
    if (!person || person.player == 'bot') continue;
    const current = scoreByPlayer.value.get(person.player.bdid) ?? { frags: 0, damage: 0 }
    scoreByPlayer.value.set(person.player.bdid, {
      frags: current.frags + person.stats.kills,
      damage: current.damage + person.stats.damageDealt,
      lastFrags: person.stats.kills,
      lastDamage: person.stats.damageDealt,
    })
  }
})


</script>


<style lang="scss" scoped></style>