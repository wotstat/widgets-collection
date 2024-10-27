<template>
  <div class="main center" :style="{ fontSize }">
    <WidgetCard>
      <div class="lines" v-if="slots">
        <div class="line header" v-if="slots.length">
          <div class="name" v-if="data.length > 1"></div>
          <div class="image" v-for="slot in slots">
            <EfficiencyIcon :icon="slot" class="icon" />
          </div>
        </div>
        <div class="line" v-for="(line, i) in data" :key="line.player">
          <p class="name" v-if="data.length > 1">{{ line.player }}</p>
          <p v-for="(slot, i) in slots" class="number bold"
            :class="{ accent: bestPerSlot[i] == line[slot] && data.length > 1 }">
            <TweenValue v-if="line[slot] != undefined" :value="line[slot]" :processor="processor(slot, true)" />
            <span v-else>{{ line[slot] }}*</span>
          </p>
        </div>
      </div>
    </WidgetCard>
    <template v-if="total && data.length > 1">
      <div class="space"></div>
      <WidgetCard>
        <div class="lines total">
          <div class="line">
            <p class="name bold">Итог</p>
            <p v-for="(slot, i) in slots" class="number bold">
              <TweenValue v-if="total[slot] != undefined" :value="total[slot]" :processor="processor(slot, true)" />
              <span v-else>{{ total[slot] }}*</span>
            </p>
          </div>
        </div>
      </WidgetCard>
    </template>
  </div>
</template>


<script setup lang="ts">

import EfficiencyIcon from "@/components/efficiencyIcon/Icon.vue";

import WidgetCard from '@/components/WidgetCard.vue';

import { comparator, processor } from '@/components/efficiencyIcon/utils';
import TweenValue from '@/components/TweenValue.vue';
import { computed } from 'vue'
import { Props } from "./define.widget";
import { maxByComparator } from "@/utils";


const props = defineProps<Props>()

const bestPerSlot = computed(() => props.slots.map(slot => maxByComparator(props.data.map(t => t[slot]), comparator(slot))))

const fontSize = computed(() => {
  const size = () => {
    switch (props.slots?.length) {
      case 0: return 2.4
      case 1: return 2.1
      case 2: return 1.4
      case 3: return 1.1
      case 4: return 1
      case 5: return 0.9
      case 6: return 0.8
      default: return (6 / props.slots?.length)
    }
  }

  return (size() + (props.data.length > 1 ? 0 : 1.5 / props.slots?.length)) + 'em'
})

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.3em;
  line-height: 1.2;

  .space {
    height: 0.5em;
  }

  .lines {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    &.total {
      margin: -0.5em 0;
    }

    .line {
      display: flex;

      &.header {
        .image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            height: 2.2em;
            margin: -0.7em;
            margin-bottom: -0.4em;
          }
        }
      }

      p {
        flex: 1;
        overflow: hidden;
        text-align: center;
      }

      .name {
        min-width: 6.5em;
        max-width: 6.5em;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }
    }
  }

}
</style>