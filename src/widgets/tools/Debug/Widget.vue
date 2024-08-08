<template>
  <WidgetRoot auto-scale auto-height>
    <WidgetStatusWrapper :ctx>
      <WidgetCard>
        <Game v-bind="gameProps" />
      </WidgetCard>

      <template v-if="isInHangar">
        <div class="spacer"></div>
        <WidgetCard>
          <Player v-bind="playerProps" />
        </WidgetCard>

        <div class="spacer"></div>
        <WidgetCard>
          <Account v-bind="accountProps" />
        </WidgetCard>

        <div class="spacer"></div>
        <WidgetCard>
          <Hangar v-bind="hangarProps" />
        </WidgetCard>
      </template>

      <div class="spacer"></div>
      <WidgetCard>
        <Platoon v-bind="platoonProps" />
      </WidgetCard>

      <template v-if="isInHangar">
        <div class="spacer"></div>
        <WidgetCard>
          <HangarTank v-bind="hangarTankProps" />
        </WidgetCard>
      </template>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <Battle v-bind="battleProps" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <Aiming v-bind="aimingProps" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <BattleTank v-bind="battleTankProps" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <Efficiency v-bind="efficiencyProps" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <DamageLog v-bind="damageLogProps" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <FeedbackLog :feedbacks="feedbacks" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle && battleBases">
        <Bases v-bind="basesProps" />
      </WidgetCard>

    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";
import { useWidgetSdk, useReactiveState, useReactiveTrigger, I18n } from '@/composition/widgetSdk';
import { computed, onMounted, ref, shallowRef, triggerRef } from "vue";

import Game from './panels/Game.vue'
import Player from './panels/Player.vue'
import Account from './panels/Account.vue'
import Hangar from './panels/Hangar.vue'
import Platoon from './panels/Platoon.vue'
import HangarTank from './panels/HangarTank.vue'
import Battle from './panels/Battle.vue'
import Aiming from './panels/Aiming.vue'
import BattleTank from "./panels/BattleTank.vue";
import Efficiency from "./panels/Efficiency.vue";
import DamageLog from "./panels/DamageLog.vue";
import Bases from "./panels/Bases.vue";
import FeedbackLog from "./panels/FeedbackLog.vue";


// @ts-ignore
// onMounted(() => window.wotstatEmulator.connectAndInit())


const ctx = useWidgetSdk()
const sdk = ctx.sdk

console.log('sdk', sdk);

const playerName = useReactiveState(sdk.data.player.name)
const playerId = useReactiveState(sdk.data.player.id)
const playerClan = useReactiveState(sdk.data.player.clanTag)
const playerClanId = useReactiveState(sdk.data.player.clanId)
const gameVersion = useReactiveState(sdk.data.game.version)
const gameRegion = useReactiveState(sdk.data.game.region)
const gameLanguage = useReactiveState(sdk.data.game.language)
const gameServer = useReactiveState(sdk.data.game.server)
const gameState = useReactiveState(sdk.data.game.state)
const serverTime = useReactiveState(sdk.data.game.serverTime)
const fps = useReactiveState(sdk.data.game.fps)
const ping = useReactiveState(sdk.data.game.ping)
const IsInReplay = useReactiveState(sdk.data.game.isInReplay)

const accountCredits = useReactiveState(sdk.data.account.credits)
const accountGold = useReactiveState(sdk.data.account.gold)
const accountCrystal = useReactiveState(sdk.data.account.crystal)
const accountFreeXp = useReactiveState(sdk.data.account.freeXp)
const accountPremium = useReactiveState(sdk.data.account.premium)

const isInHangar = useReactiveState(sdk.data.hangar.isInHangar)
const hangarTankInfo = useReactiveState(sdk.data.hangar.vehicle.info)
const hangarTankShells = useReactiveState(sdk.data.hangar.vehicle.shells)
const optDevices = useReactiveState(sdk.data.hangar.vehicle.optDevices)
const consumables = useReactiveState(sdk.data.hangar.vehicle.consumables)
const boosters = useReactiveState(sdk.data.hangar.vehicle.boosters)
const crew = useReactiveState(sdk.data.hangar.vehicle.crew)
const postProgression = useReactiveState(sdk.data.hangar.vehicle.postProgression)
const hangarTankIsBroken = useReactiveState(sdk.data.hangar.vehicle.isBroken)
const hangarTankIsInBattle = useReactiveState(sdk.data.hangar.vehicle.isInBattle)
const xp = useReactiveState(sdk.data.hangar.vehicle.xp)
const hangarBattleMode = useReactiveState(sdk.data.hangar.battleMode)
const isInQueue = useReactiveState(sdk.data.hangar.isInQueue)

const isInPlatoon = useReactiveState(sdk.data.platoon.isInPlatoon)
const platoonCommander = useReactiveState(sdk.data.platoon.commander)
const platoonSlots = useReactiveState(sdk.data.platoon.slots)

const arena = useReactiveState(sdk.data.battle.arena)
const arenaId = useReactiveState(sdk.data.battle.arenaId)
const arenaPeriod = useReactiveState(sdk.data.battle.period)

const battleTank = useReactiveState(sdk.data.battle.vehicle)
const health = useReactiveState(sdk.data.battle.health)
const maxHealth = useReactiveState(sdk.data.battle.maxHealth)
const battleTankPosition = useReactiveState(sdk.data.battle.position)
const battleTankRotation = useReactiveState(sdk.data.battle.rotation)
const battleTankVelocity = useReactiveState(sdk.data.battle.velocity)
const turretYaw = useReactiveState(sdk.data.battle.turretYaw)
const gunPitch = useReactiveState(sdk.data.battle.gunPitch)
const turretRotationSpeed = useReactiveState(sdk.data.battle.turretRotationSpeed)
const battleBases = useReactiveState(sdk.data.battle.teamBases)
const isAlive = useReactiveState(sdk.data.battle.isAlive)

const isInBattle = useReactiveState(sdk.data.battle.isInBattle)

const isAutoAim = useReactiveState(sdk.data.battle.aiming.isAutoAim)
const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)
const serverDispersion = useReactiveState(sdk.data.battle.aiming.serverDispersion)
const clientDispersion = useReactiveState(sdk.data.battle.aiming.clientDispersion)
const idealDispersion = useReactiveState(sdk.data.battle.aiming.idealDispersion)

const totalDamage = useReactiveState(sdk.data.battle.efficiency.damage)
const totalBlocked = useReactiveState(sdk.data.battle.efficiency.blocked)
const totalAssist = useReactiveState(sdk.data.battle.efficiency.assist)
const totalStun = useReactiveState(sdk.data.battle.efficiency.stun)

const aimingProps = computed(() => ({
  isAutoAim: isAutoAim.value,
  clientDispersion: clientDispersion.value,
  isServerAim: isServerAim.value,
  serverDispersion: serverDispersion.value,
  idealDispersion: idealDispersion.value,
}))

const gameProps = computed(() => ({
  gameVersion: gameVersion.value ?? '',
  gameRegion: gameRegion.value ?? '',
  gameState: gameState.value ?? '',
  gameLanguage: gameLanguage.value ?? '',
  gameServer: gameServer.value ?? '',
  serverTime: serverTime.value ?? 0,
  ping: ping.value,
  fps: fps.value,
  IsInReplay: IsInReplay.value,
}))

const playerProps = computed(() => ({
  playerName: playerName.value,
  playerId: playerId.value,
  playerClan: playerClan.value,
  playerClanId: playerClanId.value,
}))

const accountProps = computed(() => ({
  accountCredits: accountCredits.value,
  accountGold: accountGold.value,
  accountCrystal: accountCrystal.value,
  accountFreeXp: accountFreeXp.value,
  accountPremium: accountPremium.value,
}))

const hangarProps = computed(() => ({
  hangarBattleMode: hangarBattleMode.value,
  isInQueue: isInQueue.value,
}))

const hangarTankProps = computed(() => ({
  hangarTankIsInBattle: hangarTankIsInBattle.value,
  hangarTankIsBroken: hangarTankIsBroken.value,
  xp: xp.value,
  postProgression: postProgression.value,
  optDevices: optDevices.value,
  consumables: consumables.value,
  boosters: boosters.value,
  hangarTankShells: hangarTankShells.value,
  crew: crew.value,
  hangarTankInfo: hangarTankInfo.value,
}))

const platoonProps = computed(() => ({
  isInPlatoon: isInPlatoon.value,
  platoonCommander: platoonCommander.value,
  platoonSlots: platoonSlots.value,
}))

const battleTankProps = computed(() => ({
  battleTank: battleTank.value,
  health: health.value,
  maxHealth: maxHealth.value,
  battleTankPosition: battleTankPosition.value,
  battleTankRotation: battleTankRotation.value,
  battleTankVelocity: battleTankVelocity.value,
  turretYaw: turretYaw.value,
  gunPitch: gunPitch.value,
  turretRotationSpeed: turretRotationSpeed.value,
}))

const battleProps = computed(() => ({
  arenaId: arenaId.value,
  arena: arena.value,
  arenaPeriod: arenaPeriod.value,
  serverTime: serverTime.value,
  isAlive: isAlive.value,
}))

const efficiencyProps = computed(() => ({
  totalDamage: totalDamage.value,
  totalBlocked: totalBlocked.value,
  totalAssist: totalAssist.value,
  totalStun: totalStun.value,
}))

const damageLogProps = computed(() => ({
  damages: damages.value,
  playerTeam: arena.value?.team,
  playerId: playerId.value,
}))

const basesProps = computed(() => ({
  battleBases: battleBases.value,
  playerTeam: arena.value?.team,
}))


const damages = ref<{ from: [tag: string, team: number, player: number], to: [tag: string, team: number, player: number], dmg: number, health: number }[]>([])

useReactiveTrigger(sdk.data.battle.onDamage, t => {
  damages.value.push({
    from: [t.attacker?.localizedShortName ?? '?', t.attacker?.team ?? -1, t.attacker?.playerId ?? -1],
    to: [t.target?.localizedShortName ?? '?', t.target?.team ?? -1, t.target?.playerId ?? -1],
    dmg: t.damage,
    health: t.health
  })

  if (damages.value.length > 5) damages.value.shift()
})

const feedbacks = ref<{ eventType: string, text: string }[]>([])

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, t => {
  const eventType = t.type
  let text = ''

  if (t.data) {
    if ('attackReason' in t.data) text += `${t.data.attackReason} `
    if ('damage' in t.data) {
      if ('shellType' in t.data && t.data.shellType) text += `${t.data.damage} (${I18n.shortShellName(t.data.shellType, 'ru')}) `
      else text += `${t.data.damage} `
    }
    if ('critsCount' in t.data) text += `${t.data.critsCount} `
    if ('vehicle' in t.data) text += `→ ${t.data.vehicle.localizedShortName}`
  }


  feedbacks.value.push({ eventType, text })
  if (feedbacks.value.length > 5) feedbacks.value.shift()
})


useReactiveTrigger(sdk.data.battle.isInBattle, t => {
  damages.value = []
  feedbacks.value = []
})

</script>


<style lang="scss" scoped>
@function hex-to-rgba($color, $alpha) {
  @return rgba(red($color), green($color), blue($color), $alpha);
}

h1 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 0.7em;
}

br {
  margin: 1em;
}

:deep(h3) {
  font-size: 0.7em;
}

:deep(.multi-cards) {
  gap: 0.5em;
  max-width: 100%;
  overflow: hidden;
  margin-top: 0.5em;

  .card {
    border: calc(0.05em) solid var(--wotstat-separator);
    padding: 0.3em;
    border-radius: 0.5em;
    text-overflow: ellipsis;
    line-height: 1;
  }
}

:deep(.team-colors) {
  .enemy {
    color: rgb(255, 138, 138);
  }

  .ally {
    color: rgb(132, 225, 132);
  }

  .self {
    color: rgb(255 221 132);
  }
}
</style>