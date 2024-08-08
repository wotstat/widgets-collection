<template>

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
</template>


<script setup lang="ts">

const props = defineProps<{
  damages?: {
    from: [string, number];
    to: [string, number];
    dmg: number;
    health: number;
  }[];
  playerTeam?: number;
}>();

function classByTeam(team: number) {
  if (team == -1) return 'unknown'
  return team == props.playerTeam ? 'ally' : 'enemy'
}

</script>


<style lang="scss" scoped></style>