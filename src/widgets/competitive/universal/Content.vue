<template>
  <div class="main center" :style="{ fontSize }">
    <WidgetCard>
      <div class="lines" v-if="slots">
        <div class="line header" v-if="slots.length">
          <div class="flex-2"></div>
          <div class="image" v-for="slot in slots">
            <EfficiencyIcon :icon="slot" class="icon" />
            <!-- <component :is="getIconForSlot(slot)" class="icon" /> -->
          </div>
        </div>
        <!-- <div class=" line" v-for="(line, i) in lines" :key="line.name">
          <p class="name">{{ line.name }}</p>
          <p v-for="slot in slots" class="number bold" :class="slot.value[i].isBest ? 'accent' : ''"
            :key="slot.value[i].type">
            <TweenValue :value="slot.value[i].value" :processor="getProcessorForSlot(slot.value[i].type)"
              :precision="getPrecisionForSlot(slot.value[i].type)" />
          </p>
          <p class="number bold">
            <TweenValue :value="123" />
          </p>
        </div> -->
      </div>
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">

import EfficiencyIcon from "@/components/efficiencyIcon/Icon.vue";

import WidgetCard from '@/components/WidgetCard.vue';

import TweenValue from '@/components/TweenValue.vue';
import { computed } from 'vue'
import { Props } from "./define.widget";


const props = defineProps<Props>()

// const minIsBest = new Set<SlotValue>(['position-avg', 'position-max'])
// function getSlotResult(slotValue: SlotValue) {
//   const values = getValuesForSlot(slotValue)
//   const best = minIsBest.has(slotValue) ? Math.min(...values) : Math.max(...values)
//   return values.map(t => ({
//     value: t,
//     type: slotValue,
//     isBest: slotValue !== 'battles' && t == best
//   }))
// }

// const slot1 = computed(() => getSlotResult(props.slot1 ?? 'empty'))
// const slot2 = computed(() => getSlotResult(props.slot2 ?? 'empty'))
// const slot3 = computed(() => getSlotResult(props.slot3 ?? 'empty'))
// const slot4 = computed(() => getSlotResult(props.slot4 ?? 'empty'))
// const slot5 = computed(() => getSlotResult(props.slot5 ?? 'empty'))

// const slotsTypes = computed(() => [props.slot1, props.slot2, props.slot3, props.slot4, props.slot5].filter(s => s && s != 'empty') as SlotValue[])

// const slots = computed(() => {
//   return [slot1, slot2, slot3, slot4, slot5].filter(s => s.value[0].type != 'empty')
// })

const fontSize = computed(() => {
  switch (props.slots?.length) {
    case 0: return '2.4em'
    case 1: return '2.1em'
    case 2: return '1.6em'
    case 3: return '1.35em'
    case 4: return '1.2em'
    case 5: return '1em'
    default: return '1em'
  }
})

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.3em;
  line-height: 1.2;

  .lines {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    .line {
      display: flex;

      &.header {
        .image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;

          .icon {
            height: 2.3em;
            margin: -0.7em;
            margin-bottom: -0.4em;
            // fill: var(--wotstat-accent);
          }
        }
      }

      p {
        flex: 1;
        overflow: hidden;
        text-align: center;
      }

      .name {
        flex: 2;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }
    }
  }

}
</style>