<template>
  <div class="rc-inspector-style">
    <label class="no-ident">
      <span>Emulate data-provider</span>
      <input type="checkbox" v-model="enabled">
    </label>
    <br>

    <Section title="Game">
      <Options title="Game state" m-key="game.state" :model-value="'hangar'"
        :variants="['loading', 'battle', 'hangar', 'login']" />
      <Options title="Region" m-key="game.region" :model-value="'RU'" :variants="['RU', 'EU']" />
      <Options title="Language" m-key="game.language" :model-value="'ru'" :variants="['ru', 'en']" />
      <Options title="Server" m-key="game.server" :model-value="'ru2'"
        :variants="['ru1', 'ru2', 'ru3', 'eu1', 'na1', 'rpt1']" />
    </Section>

    <br>

    <Section title="Account">
      <String title="Name" m-key="player.name" :model-value="'Nickname'" />
      <Number title="Id" m-key="player.id" :model-value="1" />
      <Number title="Clan Id" m-key="player.clanId" />
      <String title="Clan Tag" m-key="player.clanTag" :model-value="'TAG'" />

      <Section title="Currencies">
        <Number title="Credits" m-key="account.credits" />
        <Number title="Gold" m-key="account.gold" />
        <Number title="Crystal" m-key="account.crystal" />
        <Number title="Free xp" m-key="account.freeXp" />
      </Section>
    </Section>

    <br>

    <Section title="Platoon">
      <Checkbox title="Is in Platoon" m-key="platoon.isInPlatoon" />
      <Number title="Max slots" v-model="platoonSlotsCount" />
      <Number title="Commander" m-key="platoon.commander" :model-value="0" />

      <Section :title="`Player_${i}`" v-for="(info, i) in platoonCrewmateInfo" :key="i">
        <Checkbox title="Joined" v-model="info.joined" />
        <Checkbox title="Ready" v-model="info.isReady" />
        <String title="Name" v-model="info.name" />
        <Number title="Id" v-model="info.id" />
        <Options title="Vehicle" v-model="info.vehicle" :variants="vehicles" />
      </Section>
    </Section>

    <br>

    <Section title="Dossier">
      <Number title="Battles Count" v-model="dossierBattlesCount" />
      <Number title="Percent" v-model="dossierDamageRating" />
      <Number title="Mov damage" v-model="dossierMovAvgDamage" />
    </Section>

    <br>

    <Section title="Moe Info">
      <Checkbox title="Available" m-key="moeInfo.isAvailable" :model-value="true" />
      <Options title="Vehicle" v-model="moeVehicle" :variants="vehicles" />
      <Number title="Battles count" v-model="moeBattlesCount" />

      <Section title="Damage distribution">
        <Number v-for="(v, i) in [0, 20, 40, 55, 65, 75, 85, 95, 100]" :title="`To ${v}%`"
          v-model="moeDistribution[i]" />
      </Section>
    </Section>

    <br>

    <Section title="Hangar">
      <Checkbox title="Is in hangar" m-key="hangar.isInHangar" :model-value="true" />
      <Options title="Vehicle" v-model="vehicle" :variants="vehicles" />
      <Options title="Mode" v-model="battleMode" :variants="['REGULAR', 'TRAINING']" />
    </Section>

    <br>

    <Section title="Battle">
      <Checkbox title="Is in battle" m-key="battle.isInBattle" />
      <Section title="Arena">
        <Number title="Arena id" v-model="arenaId" />
        <Options title="Arena" m-key="battle.arena" :model-value="'02_malinovka'"
          :variants="['02_malinovka', '05_prohorovka']" />
        <Options title="Mode" v-model="battleMode" :variants="['REGULAR', 'TRAINING']" />
        <Options title="Period" v-model="battlePeriod"
          :variants="['IDLE', 'WAITING', 'PREBATTLE', 'BATTLE', 'AFTERBATTLE']" />
      </Section>

      <Section title="Vehicle">
        <Checkbox title="Is Alive" m-key="battle.isAlive" :model-value="true" />
        <Options title="Vehicle" v-model="vehicle" :variants="vehicles" />
        <Number title="HP" m-key="battle.health" :model-value="1500" />
        <Number title="Max HP" m-key="battle.maxHealth" :model-value="2000" />
      </Section>

      <Section title="Aiming">
        <Checkbox title="Auto aim" m-key="battle.aiming.isAutoAim" />
        <Checkbox title="Server aim" m-key="battle.aiming.isServerAim" />
        <Number title="Ideal Dispersion" m-key="battle.aiming.idealDispersion" :model-value="0.5" />
        <Number title="Server Dispersion" m-key="battle.aiming.serverDispersion" :model-value="0.5" />
        <Number title="Client Dispersion" m-key="battle.aiming.clientDispersion" :model-value="0.5" />
        <Number title="Aiming Time" m-key="battle.aiming.aimingTime" :model-value="4" />
        <Options title="Aiming mode" m-key="battle.aiming.aimingMode" :model-value="'sniper'"
          :variants="[...aimingModes]" />
      </Section>

      <Section title="Efficiency">
        <Number title="Damage" m-key="battle.efficiency.damage" />
        <Number title="Assist" m-key="battle.efficiency.assist" />
        <Number title="Blocked" m-key="battle.efficiency.blocked" />
        <Number title="Stun" m-key="battle.efficiency.stun" />
      </Section>

      <Section title="Triggers">
        <Button title="Feedback kill" @trigger="feedbackTrigger('kill')" />
        <Button title="Feedback damage" @trigger="feedbackTrigger('damage')" />
        <Button title="Damage by self" @trigger="onDamageTrigger('bySelf')" />
        <Button title="Damage to self" @trigger="onDamageTrigger('toSelf')" />
        <Button title="Damage id10 -> id11" @trigger="onDamageTrigger('id10ToId11')" />
        <Button title="Damage id11 -> id10" @trigger="onDamageTrigger('id11ToId10')" />
        <Button title="Battle result" @trigger="onBattleResult(false)" />
        <Button title="Battle result platoon" @trigger="onBattleResult(true)" />
      </Section>

    </Section>

    <br>

    <Section title="Keyboard">
      <Checkbox title="Proxy keys" v-model="passKeyboard" />
    </Section>

    <br>

    <Section title="Wotstat Analytics">
      <Checkbox title="Installed" v-model="wotstatAnalyticsEmulated" />
      <Checkbox title="Platoon" v-model="wotstatAnalyticsEmulatedPlatoon" />
      <Button title="Event_OnBattleStart" @trigger="wotstatAnalyticsTrigger('onBattleStart')" />
      <Button title="Event_OnShot" @trigger="wotstatAnalyticsTrigger('onShot')" />
      <Button title="Event_OnBattleResult" @trigger="wotstatAnalyticsTrigger('onBattleResult')" />
    </Section>

  </div>
</template>


<script setup lang="ts">
import { SdkDebugConnection } from '@/composition/widgetSdk';
import { computed, provide, ref, toRaw, watch } from 'vue';
import { useEventListener, useTimestamp } from '@vueuse/core';
import { stateMapKey } from './drawer/useSetStateMap';
import Section from './drawer/Section.vue';
import Options from './drawer/Options.vue';
import Checkbox from './drawer/Checkbox.vue';
import String from './drawer/String.vue';
import Button from './drawer/Button.vue';
import Number from './drawer/Number.vue';
import { aimingModes, vehicleInfo, vehicles } from './constants';
import { getOnBattleResult, getOnBattleStart, getOnShot, getFeedback, getOnDamage, getOnBattleResultRaw } from '../exampleData/exampleData';


const { debug } = defineProps<{
  debug: SdkDebugConnection
}>()

const mapState = ref<Map<string, any>>(new Map());
provide(stateMapKey, mapState);

const enabled = ref(true);
const passKeyboard = ref(true);
const battleMode = ref('REGULAR');
const vehicle = ref<typeof vehicles[number]>('60TP');
const battlePeriod = ref('BATTLE');
const platoonSlotsCount = ref(3);
const arenaId = ref(1);
const wotstatAnalyticsEmulated = ref(true);
const wotstatAnalyticsEmulatedPlatoon = ref(true);

const platoonCrewmateInfo = ref<{
  name: string, joined: boolean,
  id: number, isReady: boolean,
  vehicle: typeof vehicles[number] | undefined
}[]>([])

const registeredExtensions = computed(() => {
  const result = []

  if (wotstatAnalyticsEmulated.value) result.push('wotstat')

  return result
});

watch(platoonSlotsCount, c => {
  platoonCrewmateInfo.value = new Array(c).fill(0)
    .map((_, i) => ({
      joined: platoonCrewmateInfo.value[i]?.joined ?? false,
      name: platoonCrewmateInfo.value[i]?.name ?? `Player_${i + 1}`,
      id: platoonCrewmateInfo.value[i]?.id ?? i + 1,
      vehicle: platoonCrewmateInfo.value[i]?.vehicle ?? vehicles[i % vehicles.length],
      isReady: platoonCrewmateInfo.value[i]?.isReady ?? false
    }));
}, { immediate: true });

const time = useTimestamp({ interval: 1000 });
const serverTime = computed(() => Math.round(time.value / 1000) - 1.74e9);

const platoonSlots = computed(() => {
  return platoonCrewmateInfo.value.map((info, i) => {
    if (!info.joined) return null;
    return {
      name: info.name,
      clanTag: '[TAG]',
      dbid: info.id,
      rating: 10000 + i * 1000,
      timeJoin: Math.round(Date.now() / 1000) - 1.74e9,
      isOffline: false,
      vehicle: info.vehicle ? vehicleInfo[info.vehicle] : null,
      isReady: info.isReady
    }
  })
})

const battlePeriodFormat = computed(() => ({ tag: battlePeriod.value, length: 300, endTime: (Date.now() / 1000 - 1.74e9) + 300 }))
const totalState = computed(() => ({
  ...Object.fromEntries(mapState.value.entries()),
  'game.dataProviderVersion': 10,
  'game.version': 'ru_1.35.0.0',
  'game.state': '',
  'game.serverTime': serverTime.value,
  'game.ping': 0.015,
  'game.fps': 144,
  'game.isInReplay': false,
  'battle.arenaId': arenaId.value,
  'battle.arena': {
    tag: mapState.value.get('battle.arena'),
    localizedName: mapState.value.get('battle.arena'),
    mode: battleMode.value,
    gameplay: 'cft',
    team: 1
  },
  'battle.period': battlePeriodFormat.value,
  'battle.vehicle': vehicleInfo[vehicle.value],
  'battle.position': [0, 0, 0],
  'battle.rotation': [-0.05, 0.5, 0.02],
  'battle.velocity': [8, 0.2],
  'battle.turretYaw': -0.5,
  'battle.gunPitch': 0.1,
  'battle.turretRotationSpeed': 0.1,
  'hangar.vehicle.info': vehicleInfo[vehicle.value],
  'hangar.vehicle.shells': [
    { tag: 'ARMOR_PIERCING_CR', count: 10 },
    { tag: 'ARMOR_PIERCING', count: 20 },
    { tag: 'HOLLOW_CHARGE', count: 30 }
  ],
  'hangar.vehicle.InBattle': false,
  'hangar.vehicle.isBroken': false,
  'hangar.vehicle.xp': 555,
  'hangar.isInQueue': false,
  'hangar.battleMode': battleMode.value,
  'platoon.slots': platoonSlots.value,
  'platoon.maxSlots': platoonSlotsCount.value,
  'registeredExtensions': registeredExtensions.value,
  'extensions.wotstat.version': wotstatAnalyticsEmulated.value ? 1 : null,
}))


watch(enabled, v => {
  if (v) {
    debug.enable()
    debug.sendInit(totalState.value)
  } else {
    debug.disable()
  }
}, { immediate: true });

watch(totalState, (newState: Record<string, any>, oldState: Record<string, any>) => {
  const diff = new Map<string, any>()
  for (const [key, value] of Object.entries(newState)) {
    if (oldState[key] !== value) {
      diff.set(key, value)
    }
  }

  for (const [key, value] of diff) debug.sendChangeState(key, value)

})

useEventListener(window, 'keypress', e => {
  if (!passKeyboard.value) return;
  const key = `${e.code.replace('Key', 'KEY_').replace('Digit', 'KEY_')}`;
  debug.sendChangeState(`keyboard.${key}`, true);
  debug.sendTrigger('keyboard.onAnyKey', { 'key': key, 'isKeyDown': true });
});

useEventListener(window, 'keyup', e => {
  if (!passKeyboard.value) return;
  const key = `${e.code.replace('Key', 'KEY_').replace('Digit', 'KEY_')}`;
  debug.sendChangeState(`keyboard.KEY_${key}`, false);
  debug.sendTrigger('keyboard.onAnyKey', { 'key': key, 'isKeyDown': false });
})

async function wotstatAnalyticsTrigger(event: 'onBattleStart' | 'onShot' | 'onBattleResult') {
  if (!wotstatAnalyticsEmulated.value) return;

  const overrides = {
    playerName: mapState.value.get('player.name'),
    isPlatoon: wotstatAnalyticsEmulatedPlatoon.value,
  }

  let targetEvent = null as any
  if (event == 'onBattleStart')
    targetEvent = await getOnBattleStart(overrides)
  else if (event == 'onShot') {
    targetEvent = await getOnShot(overrides)
    debug.sendTrigger(`extensions.wotstat.onShotBallisticEvent`, {
      gravity: targetEvent.gravity,
      gunPoint: targetEvent.gunPoint,
      shellSpeed: targetEvent.shellSpeed,
      tracerStart: targetEvent.tracerStart,
      tracerVel: targetEvent.tracerVel,
      clientMarkerPoint: targetEvent.clientMarkerPoint,
      clientShotDispersion: targetEvent.clientShotDispersion,
      serverMarkerPoint: targetEvent.serverMarkerPoint,
      serverShotDispersion: targetEvent.serverShotDispersion
    });
  }
  else if (event == 'onBattleResult')
    targetEvent = await getOnBattleResult(overrides)

  debug.sendTrigger(`extensions.wotstat.onEvent`, targetEvent);

}

async function feedbackTrigger(type: 'kill' | 'damage') {
  const feedback = await getFeedback(type, {
    playerName: mapState.value.get('player.name'),
    isPlatoon: wotstatAnalyticsEmulatedPlatoon.value,
  });

  debug.sendTrigger(`battle.onPlayerFeedback`, feedback);
}

async function onDamageTrigger(type: 'bySelf' | 'toSelf' | 'id10ToId11' | 'id11ToId10') {

  const attackerId = (() => {
    if (type === 'bySelf') return mapState.value.get('player.id');
    if (type === 'toSelf') return 404;
    if (type === 'id10ToId11') return 10;
    if (type === 'id11ToId10') return 11;
    return 0;
  })()

  const targetId = (() => {
    if (type === 'bySelf') return 404;
    if (type === 'toSelf') return mapState.value.get('player.id');
    if (type === 'id10ToId11') return 11;
    if (type === 'id11ToId10') return 10;
    return 0;
  })()

  const damage = await getOnDamage({
    attackerId,
    targetId
  })

  debug.sendTrigger(`battle.onDamage`, damage);
}

async function onBattleResult(platoon: boolean) {

  const playerId = mapState.value.get('player.id');
  arenaId.value++

  const result = await getOnBattleResultRaw({
    playerId: playerId,
    arenaUniqueID: arenaId.value,
    platoon: platoon ?
      platoonCrewmateInfo.value
        .filter(t => t.id != playerId && t.joined)
        .map(t => t.id) :
      null,
  })

  debug.sendTrigger(`battle.onBattleResult`, result);
}


const dossierBattlesCount = ref(0);
const dossierDamageRating = ref(0);
const dossierMovAvgDamage = ref(0);

watch(() => [dossierBattlesCount.value, dossierDamageRating.value, dossierMovAvgDamage.value], () => {
  debug.sendChangeState('dossier.current', {
    battlesCount: dossierBattlesCount.value,
    damageRating: dossierDamageRating.value,
    movingAvgDamage: dossierMovAvgDamage.value
  });
}, { immediate: true })


const moeVehicle = ref<typeof vehicles[number]>('60TP');
const moeBattlesCount = ref(0);
const moeDistribution = ref<number[]>([0, 20, 40, 55, 65, 75, 85, 95, 100].map(v => v * 100));
watch(() => [moeVehicle.value, moeBattlesCount.value, moeDistribution.value], () => {
  debug.sendChangeState('moeInfo.current', {
    vehicleTag: moeVehicle.value,
    battleCount: moeBattlesCount.value,
    damageBetterThanNPercent: toRaw(moeDistribution.value)
  });
}, { immediate: true, deep: true })

</script>

<style lang="scss" scoped></style>
