<template>

  <h3 class="secondary bold">TANK <span class="float-right">{{ localizedKeys }}</span></h3>

  <template v-if="visible">

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

    <div class="flex space-between post-progression">
      <p v-for="(item, i) in postProgression?.selectedModifications">
        {{ getModificationIcon(item, i) }}
      </p>
    </div>

    <div class="flex ver multi-cards">
      <div class="card flex-1" v-for="item in optDevices">
        <p class="secondary">{{ item.specialization }}</p>
        <p class="primary">{{ item.tag ?? '-' }}</p>
      </div>
    </div>

    <div class="flex multi-cards">
      <div class="card flex-1" v-for="item in boosters">
        <p class="primary">{{ item ?? '-' }}</p>
      </div>
    </div>

    <div class="flex multi-cards">
      <div class="flex space-between card flex-1" v-for="(item, i) in hangarTankShells">
        <p class="secondary">{{ item.tag.split('_').map(t => t[0]).join('') }}</p>
        <p class="primary">{{ item.count }}</p>
      </div>
    </div>

    <div class="flex multi-cards">
      <div class="card flex-1 overflow-hidden" v-for="item in consumables">
        <p class="primary">{{ item ?? '-' }}</p>
      </div>
    </div>

    <div class="crew">
      <div class="flex tankman" v-for="item in crew">
        <template v-if="item">
          <p class="nowrap secondary">
            {{ item.roles.join(', ') }} <span class="primary">{{ item.efficiencyRoleLevel }}%</span>
          </p>
          <div class="skill secondary" v-for="skill in item.skills">
            <p>{{ last(skill.tag.split('_')) }} <span class="primary">{{ skill.level }}%</span></p>
          </div>
        </template>
        <p v-else>-</p>
      </div>
    </div>
  </template>

</template>


<script setup lang="ts">
import Line from '../Line.vue';
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  collapseKeys: KeyBindingSetting
  hangarTankInfo?: {
    tag: string;
    localizedName: string;
    level: number;
    role: string;
    class: string;
  }
  hangarTankIsInBattle?: boolean
  hangarTankIsBroken?: boolean
  xp?: number
  postProgression?: {
    level: number;
    features: {
      optSwitchEnabled: boolean;
      shellsSwitchEnabled: boolean;
    };
    selectedModifications: Array<string>;
    unlockedModifications: Array<string>;
  }
  optDevices?: Array<{
    specialization: string | null;
    tag: string | null;
  }>
  boosters?: Array<string | null>;
  hangarTankShells?: Array<{
    tag: string;
    count: number;
  }>
  consumables?: Array<string | null>;
  crew?: Array<{
    roles: Array<string>;
    efficiencyRoleLevel: number;
    skills: Array<{
      tag: string;
      level: number;
    }>;
  } | null>
}>()

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)

function last<T>(t: T[]) {
  return t[t.length - 1]
}

function getModificationIcon(mod: string, i: number) {
  if (mod) return mod.endsWith('_1') ? `←` : '→'
  if (props.postProgression?.unlockedModifications.find(t => t.endsWith(`_${i + 1}`))) return '–'
  return '⨯'
}
</script>


<style lang="scss" scoped>
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