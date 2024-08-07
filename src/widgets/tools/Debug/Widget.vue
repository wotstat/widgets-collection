<template>
  <WidgetRoot auto-scale auto-height>
    <WidgetStatusWrapper :ctx>
      <WidgetCard>
        <h3 class="secondary bold">GAME</h3>
        <div class="flex">
          <div class="flex flex-1 ver">
            <Line name="Version" :value="gameVersion" />
            <Line name="Region" :value="gameRegion" />
            <Line name="State" :value="gameState" />
            <Line v-if="fps" name="Fps" :value="Math.round(fps)" />
          </div>
          <div class="vr"></div>
          <div class="flex flex-1 ver">
            <Line name="Language" :value="gameLanguage" />
            <Line name="Server" :value="gameServer" />
            <Line name="ServerTime" :value="serverTime ? Math.round(serverTime * 10) / 10 : ''" />
            <Line v-if="ping" name="Ping" :value="`${Math.round(ping * 1000)}ms`" />
          </div>
        </div>
      </WidgetCard>

      <div class="spacer" v-if="isInHangar"></div>

      <WidgetCard v-if="isInHangar">
        <h3 class="secondary bold">PLAYER</h3>
        <div class="flex">
          <div class="flex flex-1 ver">
            <Line name="Name" :value="playerName" />
            <Line name="Clan" :value="playerClan ?? '-'" />
          </div>
          <div class="vr"></div>
          <div class="flex flex-1 ver">
            <Line name="Id" :value="playerId" />
            <Line name="ClanId" :value="playerClanId" />
          </div>
        </div>
      </WidgetCard>

      <div class="spacer" v-if="isInHangar"></div>

      <WidgetCard v-if="isInHangar">
        <h3 class="secondary bold">ACCOUNT</h3>
        <div class="flex">
          <div class="flex flex-1 ver">
            <Line name="Credits" :value="accountCredits" />
            <Line name="Crystal" :value="accountCrystal" />
          </div>
          <div class="vr"></div>
          <div class="flex flex-1 ver">
            <Line name="Gold" :value="accountGold" />
            <Line name="FreeXp" :value="accountFreeXp" />
          </div>
        </div>
        <div class="flex opt-devices" v-if="accountPremium">
          <div class="device secondary flex-1" v-for="item in Object.entries(accountPremium)">
            <div class="flex">
              <p>{{ item[0] }}</p>
              <p class="primary">{{ item[1].active }}</p>
            </div>
            <p class="primary center">{{ new Date(item[1].expiration * 1000).toLocaleDateString('en-US') }}</p>
          </div>
        </div>
      </WidgetCard>

      <div class="spacer" v-if="isInHangar"></div>

      <WidgetCard v-if="isInHangar">
        <h3 class="secondary bold">HANGAR</h3>
        <div class="flex">
          <div class="flex-2">
            <Line name="BattleMode" :value="hangarBattleMode" />
          </div>
          <div class="vr"></div>
          <div class="flex-1">
            <Line name="IsInQueue" :value="isInQueue" />
          </div>
        </div>
      </WidgetCard>

      <div class="spacer"></div>

      <WidgetCard>
        <h3 class="secondary bold">PLATOON</h3>
        <template v-if="isInPlatoon">
          <div class="flex opt-devices" v-if="accountPremium">
            <div class="device secondary flex-1" v-for="(item, i) in platoonSlots">
              <template v-if="item">
                <p class="center "><span v-if="i == platoonCommander">👑</span>{{ item.name }}</p>
                <div class="flex">
                  <p>Ready:</p>
                  <p class="primary">{{ item.isReady }}</p>
                </div>
                <div class="flex">
                  <p>Rating:</p>
                  <p class="primary">{{ item.rating }}</p>
                </div>
                <p class="center primary">{{ item.vehicle?.localizedShortName }}</p>
              </template>
              <p v-else class="center">Empty</p>
            </div>
          </div>
        </template>
      </WidgetCard>

      <div class="spacer" v-if="isInHangar"></div>

      <WidgetCard v-if="isInHangar">

        <h3 class="secondary bold">TANK</h3>

        <div class="flex ver">
          <Line name="Tag" :value="hangarTankInfo?.tag" />
        </div>

        <div class="flex">
          <div class="flex-3">
            <Line name="Name" :value="hangarTankInfo?.localizedName" />
          </div>
          <div class="vr"></div>
          <div class="flex-2">
            <Line name="Level" :value="hangarTankInfo?.level" />
          </div>
        </div>

        <div class="flex">
          <div class="flex-3">
            <Line name="Role" :value="hangarTankInfo?.role" />
          </div>
          <div class="vr"></div>
          <div class="flex-2">
            <Line name="Class" :value="hangarTankInfo?.class" />
          </div>
        </div>

        <div class="flex">
          <div class="flex-1">
            <Line name="InBattle" :value="hangarTankIsInBattle ? '+' : '-'" />
          </div>
          <div class="vr"></div>
          <div class="flex-1">
            <Line name="IsBroken" :value="hangarTankIsBroken ? '+' : '-'" />
          </div>
          <div class="vr"></div>
          <div class="flex-1">
            <Line name="xp" :value="xp" />
          </div>
        </div>

        <div class="flex">
          <div class="flex-1">
            <Line name="Mod" :value="postProgression?.level" />
          </div>
          <div class="vr"></div>
          <div class="flex-1">
            <Line name="OptSwitch" :value="postProgression?.features.optSwitchEnabled ? '+' : '-'" />
          </div>
          <div class="vr"></div>
          <div class="flex-1">
            <Line name="ShellSwitch" :value="postProgression?.features.shellsSwitchEnabled ? '+' : '-'" />
          </div>
        </div>

        <div class="flex post-progression">
          <p v-for="(item, i) in postProgression?.selectedModifications">
            {{ getModificationIcon(item, i) }}
          </p>
        </div>

        <div class="flex ver opt-devices">
          <div class="device secondary flex-1" v-for="item in optDevices">
            <p>{{ item.specialization }}</p>
            <p class="primary">{{ item.tag ?? '-' }}</p>
          </div>
        </div>

        <div class="flex opt-devices">
          <div class="device secondary flex-1" v-for="item in boosters">
            <p class="primary">{{ item ?? '-' }}</p>
          </div>
        </div>

        <div class="flex opt-devices">
          <div class="flex device secondary flex-1" v-for="(item, i) in hangarTankShells">
            <p>{{ item.tag.split('_').map(t => t[0]).join('') }}</p>
            <p class="primary">{{ item.count }}</p>
          </div>
        </div>

        <div class="flex opt-devices">
          <div class="device secondary flex-1" v-for="item in consumables">
            <p class="primary">{{ item ?? '-' }}</p>
          </div>
        </div>

        <div class="crew">
          <div class="flex tankman secondary" v-for="item in crew">
            <template v-if="item">
              <p class="nowrap">{{ item.roles.join(', ') }} <span class="primary">{{ item.efficiencyRoleLevel }}%</span>
              </p>
              <div class="skill" v-for="skill in item.skills">
                <p>{{ last(skill.tag.split('_')) }} <span class="primary">{{ skill.level }}%</span></p>
              </div>
            </template>
            <p v-else>-</p>
          </div>
        </div>

      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <h3 class="secondary bold">BATTLE</h3>
        <div class="flex">
          <div class="flex flex-3 ver">
            <Line name="Id" :value="arenaId" />
            <Line name="Arena" :value="arena?.tag" />
            <Line name="Mode" :value="arena?.mode" />
            <Line name="Gameplay" :value="arena?.gameplay" />
          </div>
          <div class="vr"></div>
          <div class="flex flex-2 ver start">
            <Line name="Team" :value="arena?.team" />
            <Line name="Period" :value="arenaPeriod?.tag" />
            <Line v-if="arenaPeriod && serverTime" name="Length" :value="arenaPeriod.length" />
            <Line v-if="arenaPeriod && serverTime" name="Left" :value="Math.round(arenaPeriod.endTime - serverTime)" />
          </div>
        </div>
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <h3 class="secondary bold">AIMING</h3>
        <div class="flex">
          <div class="flex flex-1 ver">
            <Line name="isAutoAim" :value="isAutoAim" />
          </div>
          <div class="vr"></div>
          <div class="flex flex-1 ver">
            <Line name="isServerAim" :value="isServerAim" />
          </div>
        </div>
        <Line name="IdealDisp" :value="(idealDispersion ?? 0).toFixed(7)" />
        <Line name="ClientDisp" :value="(clientDispersion ?? 0).toFixed(7)" />
        <Line name="ServerDisp" :value="(serverDispersion ?? 0).toFixed(7)" />
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">

        <h3 class="secondary bold">TANK</h3>

        <div class="flex ver">
          <Line name="Tag" :value="battleTank?.tag" />
        </div>

        <div class="flex">
          <div class="flex-3">
            <Line name="Name" :value="battleTank?.localizedName" />
            <Line name="Role" :value="battleTank?.role" />
          </div>
          <div class="vr"></div>
          <div class="flex-2">
            <Line name="Level" :value="battleTank?.level" />
            <Line name="Class" :value="battleTank?.class" />
          </div>
        </div>
        <div class="hp-progress-bar">
          {{ `${health}/${maxHealth}` }}
          <div class="progress" :style="{ right: `${100 - (health! / maxHealth!) * 100}%` }"></div>
        </div>

        <div class="rotation-circles" v-if="battleTankRotation && turretYaw != null && gunPitch != null">
          <div>
            <div class="circle">
              <div class="tank-container">
                <RightTank :body-angle="-radToRoundDec(battleTankRotation[0])" :gun-angle="-radToDec(gunPitch)" />
              </div>
            </div>
            <p class="center">{{ radToRoundDec(battleTankRotation[0]) }}</p>
          </div>

          <div>
            <div class="circle">
              <div class="tank-container">
                <TopTank :body-angle="90 - radToDec(battleTankRotation[1])" :turret-angle="-radToDec(turretYaw)" />
              </div>
            </div>
            <p class="center">{{ radToRoundDec(battleTankRotation[1]) }}</p>
          </div>


          <div>
            <div class="circle">
              <div class="tank-container">
                <FrontTank :body-angle="radToDec(battleTankRotation[2])" />
              </div>
            </div>
            <p class="center">{{ radToRoundDec(battleTankRotation[2]) }}</p>
          </div>
        </div>

        <Line v-if="battleTankVelocity" name="Tank Speed" :value="Math.round(battleTankVelocity[0] * 3.6 * 10) / 10" />
        <Line v-if="battleTankVelocity" name="Rotation Speed" :value="radToRoundDec(battleTankVelocity[1])" />
        <Line v-if="turretRotationSpeed != null" name="Turret Rotation Speed"
          :value="radToRoundDec(turretRotationSpeed)" />

        <div class="flex" v-if="battleTankPosition">
          <div class="flex-1">
            <Line name="X" :value="Math.round(battleTankPosition[0] * 10) / 10" />
          </div>
          <div class="flex-1">
            <Line name="Y" :value="Math.round(battleTankPosition[1] * 10) / 10" />
          </div>
          <div class="flex-1">
            <Line name="Z" :value="Math.round(battleTankPosition[2] * 10) / 10" />
          </div>
        </div>


      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle">
        <h3 class="secondary bold">Damages</h3>
        <div class="flex">
          <div class="flex flex-1 ver team-colors">
            <p v-for="item in damages">
              <span :class="classByTeam(item.from[1])">{{ item.from[0] }}</span>
              →
              <span :class="classByTeam(item.to[1])">{{ item.to[0] }}</span>
              :
              {{ item.dmg }} / {{ (item.health + item.dmg) }}
            </p>
          </div>
        </div>
      </WidgetCard>

      <div class="spacer" v-if="isInBattle"></div>

      <WidgetCard v-if="isInBattle && battleBases">
        <h3 class="secondary bold">Bases</h3>
        <div class="flex ver">
          <div class="team-base-progress team-colors" v-for="[team, bases] in Object.entries(battleBases)">
            <div class="team-base" :class="team == arena?.team.toString() ? 'enemy' : 'ally'" v-for="base in bases">

              <p class="bold center" v-if="base.invadersCount">
                {{ base.points }}%
                ({{ base.invadersCount }})
                Осталось {{ base.timeLeft }}с
                {{ base.capturingStopped ? '[Заблокирован]' : '' }}
              </p>
              <p v-else class="bold center">-</p>

              <div class="progress" :style="{
                right: `${100 - base.points}%`,
              }"></div>

            </div>

          </div>
        </div>
      </WidgetCard>

    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";
import Line from "./Line.vue";
import { useWidgetSdk, useReactiveState, useReactiveTrigger } from '@/composition/widgetSdk';
import { onMounted, ref } from "vue";

import RightTank from '@/components/tank/RightView.vue'
import TopTank from '@/components/tank/TopView.vue'
import FrontTank from '@/components/tank/FrontView.vue'

// @ts-ignore
// onMounted(() => window.wotstatEmulator.connectAndInit())

function radToRoundDec(rad: number) {
  return Math.round(radToDec(rad) * 10) / 10
}

function radToDec(rad: number) {
  return rad * 180 / Math.PI
}


const ctx = useWidgetSdk()
const sdk = ctx.sdk

console.log('sdk', sdk);


function getModificationIcon(mod: string, i: number) {
  if (mod) return mod.endsWith('_1') ? `←` : '→'
  if (postProgression.value?.unlockedModifications.find(t => t.endsWith(`_${i + 1}`))) return '–'
  return '⨯'
}

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

const isInBattle = useReactiveState(sdk.data.battle.isInBattle)

const isAutoAim = useReactiveState(sdk.data.battle.aiming.isAutoAim)
const isServerAim = useReactiveState(sdk.data.battle.aiming.isServerAim)
const serverDispersion = useReactiveState(sdk.data.battle.aiming.serverDispersion)
const clientDispersion = useReactiveState(sdk.data.battle.aiming.clientDispersion)
const idealDispersion = useReactiveState(sdk.data.battle.aiming.idealDispersion)

const damages = ref<{ from: [string, number], to: [string, number], dmg: number, health: number }[]>([])
sdk.data.battle.onDamage.watch(t => {
  damages.value.push({
    from: [t.attacker?.localizedShortName ?? '?', t.attacker?.team ?? -1],
    to: [t.target?.localizedShortName ?? '?', t.target?.team ?? -1],
    dmg: t.damage,
    health: t.health
  })

  if (damages.value.length > 5) damages.value.shift()
})

function classByTeam(team: number) {
  if (team == -1) return 'unknown'
  return team == arena?.value?.team ? 'ally' : 'enemy'
}

// sdk.onAnyChange((path, value) => {
//   console.log('onAnyChange', path, value)
// })

sdk.onAnyTrigger((path, value) => {
  console.log('onAnyTrigger', path, value)
})

function last<T>(t: T[]) {
  return t[t.length - 1]
}

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

.flex:not(.start) {
  justify-content: space-between;
}

.opt-devices {
  gap: 0.5em;
  max-width: 100%;
  overflow: hidden;
  margin-top: 0.5em;

  .device {
    border: calc(0.05em) solid var(--wotstat-separator);
    padding: 0.3em;
    border-radius: 0.5em;
    text-overflow: ellipsis;
    line-height: 1;
  }
}

.crew {
  margin-top: 0.5em;

  .tankman {
    font-size: 0.8em;
    line-height: 1.1;
    // flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.2em;

    .skill {
      text-wrap: nowrap;
      border: calc(0.05em) solid var(--wotstat-separator);
      border-radius: 0.5em;
      padding: 0 0.1em;
    }
  }
}

.post-progression {
  margin-top: 0.5em;

  p {
    min-width: 2em;
    text-align: center;
    font-size: 2em;
    line-height: 0.8;
    padding-bottom: 0.15em;
    border: calc(0.05em/2) solid var(--wotstat-separator);
    border-radius: 0.2em;
  }
}

.team-colors {
  .enemy {
    color: rgb(255, 138, 138);
  }

  .ally {
    color: rgb(132, 225, 132);
  }
}

.hp-progress-bar {
  text-align: center;
  font-weight: bold;
  margin: 0.5em 0;
  position: relative;

  border: 0.1em solid var(--wotstat-separator);
  border-radius: 0.4em;
  overflow: hidden;

  .progress {
    background: var(--wotstat-separator);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
}

.rotation-circles {
  display: flex;
  gap: 0.5em;
  margin-top: 1em;
  justify-content: space-around;

  .circle {
    width: 4em;
    height: 4em;
    border: 0.1em solid var(--wotstat-separator);
    border-radius: 50%;

    .tank-container {
      width: 100%;
      height: 100%;
      scale: 1.3;
    }
  }
}

.team-base-progress {
  // display: flex;
  margin-bottom: 0.5em;

  .team-base {
    position: relative;
    border: 0.1em solid var(--wotstat-separator);
    border-radius: 0.4em;

    p {
      position: relative;
      z-index: 2;
    }

    .progress {
      background: var(--wotstat-separator);
      position: absolute;
      border-radius: 0.4em;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>