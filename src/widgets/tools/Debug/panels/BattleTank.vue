<template>

  <h3 class="secondary bold">TANK<span class="float-right">{{ localizedKeys }}</span></h3>
  <template v-if="visible">

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
    <Line v-if="turretRotationSpeed != null" name="Turret Rotation Speed" :value="radToRoundDec(turretRotationSpeed)" />

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
  </template>
</template>


<script setup lang="ts">
import Line from "../Line.vue";

import RightTank from '@/components/tank/RightView.vue'
import TopTank from '@/components/tank/TopView.vue'
import FrontTank from '@/components/tank/FrontView.vue'
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

function radToRoundDec(rad: number) {
  return Math.round(radToDec(rad) * 10) / 10
}

function radToDec(rad: number) {
  return rad * 180 / Math.PI
}

const props = defineProps<{
  battleTank?: {
    tag: string
    localizedName: string
    role: string
    level: number
    class: string
  };
  health?: number
  maxHealth?: number
  battleTankRotation?: number[]
  turretYaw?: number
  gunPitch?: number
  battleTankVelocity?: number[]
  turretRotationSpeed?: number
  battleTankPosition?: number[]
  collapseKeys: KeyBindingSetting
}>();


const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)

</script>


<style lang="scss" scoped>
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
</style>