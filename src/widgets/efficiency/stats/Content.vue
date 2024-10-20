<template>
  <DefineLine v-slot="{ value, icon }">
    <p>
      <TweenValue :value="value" :processor="processor(icon)" v-if="typeof value == 'number' && anim" />
      <template v-else>{{ processor(icon)(value) }}</template>
    </p>
  </DefineLine>

  <div class="main preview-card wg-game-font" :class="{ isSolo, large, [`align-${props.soloAlign ?? 'left'}`]: true }">
    <div class="line" v-for="line in lines" :class="{ isSolo, [line.icon]: true }">
      <template v-if="isSolo">
        <EfficiencyIcon :icon="line.icon" class="icon" />
        <Line :value="line.values[0]" :icon="line.icon" />
      </template>

      <template v-else-if="line.values.length == 1">
        <p></p>
        <EfficiencyIcon :icon="line.icon" class="icon" />
        <Line :value="line.values[0]" :icon="line.icon" />
      </template>

      <template v-else-if="line.values.length == 2">
        <Line class="right" :value="line.values[0]" :icon="line.icon" />
        <EfficiencyIcon :icon="line.icon" class="icon" />
        <Line :value="line.values[1]" :icon="line.icon" />
      </template>
    </div>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import EfficiencyIcon from '@/components/efficiencyIcon/Icon.vue'
import { Props } from '../../competitive/squad/efficiency/define.widget';
import { computed } from 'vue';
import { processor } from '@/components/efficiencyIcon/utils';
import { createReusableTemplate } from '@vueuse/core';

const [DefineLine, Line] = createReusableTemplate<{ value: number | string, icon: Props['lines'][number]['icon'] }>()

const props = defineProps<Props & { large?: boolean }>()

const isSolo = computed(() => props.lines.every(line => line.values.length == 1))

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.5em;
  line-height: 1.2;
  padding-top: 0.65em;
  padding-bottom: 0.65em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1em;

  &.isSolo {
    font-size: 3em;
  }

  &.large {
    font-size: 4em;
  }

  &.isSolo {
    align-items: flex-start;

    .line {
      width: 100%;
    }

    &.align-right {
      align-items: flex-end;

      .icon {
        order: 1;
      }

      p {
        text-align: right;
      }
    }
  }

  .line {
    display: flex;
    align-items: center;
    flex: 1;
    width: 70%;
    position: relative;

    &.player,
    &.tank {
      width: 100%;
    }

    &::after {
      z-index: 0;
      content: '';
      width: 100%;
      height: 180%;
      transform: translateY(20%);
      background-image: radial-gradient(rgba(0, 0, 0, 0.3) 0%, transparent 60%);
      filter: drop-shadow(0 0 0.7em #000);
      position: absolute;
      bottom: 0;
    }

    .icon {
      fill: var(--wotstat-accent);
      filter: brightness(5) drop-shadow(0 0 0.1em #0000001f) drop-shadow(0 0 0.1em var(--wotstat-accent)) drop-shadow(0 0 0.4em var(--wotstat-accent));
      height: 2.2em;
      margin: -0.25em 0.2em;
      z-index: 100;
    }

    p {
      font-size: 1em;
      flex: 1;
      font-weight: bold;
      font-variant-numeric: tabular-nums;
      z-index: 100;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

}
</style>