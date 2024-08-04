<template>
  <WidgetRoot auto-scale auto-height>
    <WidgetStatusWrapper :ctx>
      <WidgetCard>
        <h3 class="secondary bold">GAME</h3>
        <div class="flex">
          <div class="flex flex-1 ver">
            <Line name="Version" :value="gameVersion" />
            <Line name="Region" :value="gameRegion" />
          </div>
          <div class="vr"></div>
          <div class="flex flex-1 ver">
            <Line name="Language" :value="gameLanguage" />
            <Line name="Server" :value="gameServer" />
          </div>
        </div>
      </WidgetCard>

      <div class="spacer" />

      <WidgetCard>
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

      <div class="spacer" />

      <WidgetCard>
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

      <div class="spacer" />

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

      <div class="spacer" />

      <WidgetCard>

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
            <Line name="InBattle" :value="isInBattle ? '+' : '-'" />
          </div>
          <div class="vr"></div>
          <div class="flex-1">
            <Line name="IsBroken" :value="isBroken ? '+' : '-'" />
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
            <!-- {{ item ? item.endsWith('_1') ? '&leftarrow;' : '&rightarrow;' :
              postProgression?.unlockedModifications.includes(item) }} -->
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
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";
import Line from "./Line.vue";
import { useWidgetSdk, useReactiveState } from '@/composition/widgetSdk';
import { onMounted } from "vue";

// @ts-ignore
// onMounted(() => window.wotstatEmulator.connectAndInit())


const ctx = useWidgetSdk()
const sdk = ctx.sdk

function getModificationIcon(mod: string, i: number) {
  if (mod) return mod.endsWith('_1') ? `←` : '→'
  console.log(postProgression.value?.unlockedModifications, mod);

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

const accountCredits = useReactiveState(sdk.data.account.credits)
const accountGold = useReactiveState(sdk.data.account.gold)
const accountCrystal = useReactiveState(sdk.data.account.crystal)
const accountFreeXp = useReactiveState(sdk.data.account.freeXp)
const accountPremium = useReactiveState(sdk.data.account.premium)

const hangarTankInfo = useReactiveState(sdk.data.hangar.vehicle.info)
const hangarTankShells = useReactiveState(sdk.data.hangar.vehicle.shells)
const optDevices = useReactiveState(sdk.data.hangar.vehicle.optDevices)
const consumables = useReactiveState(sdk.data.hangar.vehicle.consumables)
const boosters = useReactiveState(sdk.data.hangar.vehicle.boosters)
const crew = useReactiveState(sdk.data.hangar.vehicle.crew)
const postProgression = useReactiveState(sdk.data.hangar.vehicle.postProgression)
const isBroken = useReactiveState(sdk.data.hangar.vehicle.isBroken)
const isInBattle = useReactiveState(sdk.data.hangar.vehicle.isInBattle)
const xp = useReactiveState(sdk.data.hangar.vehicle.xp)

const isInPlatoon = useReactiveState(sdk.data.platoon.isInPlatoon)
const platoonCommander = useReactiveState(sdk.data.platoon.commander)
const platoonSlots = useReactiveState(sdk.data.platoon.slots)


sdk.onAnyChange((path, value) => {
  console.log('onAnyChange', path, value)
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

.flex {
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
</style>