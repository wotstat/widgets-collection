<template>

  <h3 class="secondary bold">DAMAGES <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-if="visible">
    <div class="flex flex-1 ver team-colors">
      <p v-for="item in damages">
        <span :class="classByTeam(item.from[1], item.from[2])">{{ item.from[0] }}</span>
        →
        <span :class="classByTeam(item.to[1], item.to[2])">{{ item.to[0] }}</span>
        :
        {{ item.dmg }} / {{ (item.health + item.dmg) }}
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  damages?: {
    from: [tag: string, team: number, player: number]
    to: [tag: string, team: number, player: number]
    dmg: number
    health: number
  }[];
  playerTeam?: number
  playerId?: number
  collapseKeys: KeyBindingSetting
}>();

function classByTeam(team: number, id: number) {
  if (team == -1) return 'unknown'
  if (id == props.playerId) return 'self'
  return team == props.playerTeam ? 'ally' : 'enemy'
}

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>