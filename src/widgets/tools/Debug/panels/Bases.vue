<template>
  <h3 class="secondary bold">Bases</h3>
  <div class="flex ver">
    <div class="team-base-progress team-colors" v-if="battleBases" v-for="[team, bases] in Object.entries(battleBases)">
      <div class="team-base" :class="team == playerTeam?.toString() ? 'enemy' : 'ally'" v-for="base in bases">

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
</template>


<script setup lang="ts">
defineProps<{
  battleBases?: {
    [team: string]: {
      points: number;
      invadersCount: number;
      timeLeft: number;
      capturingStopped: boolean;
    }[];
  };
  playerTeam?: number;
}>();
</script>


<style lang="scss" scoped>
.team-base-progress {
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