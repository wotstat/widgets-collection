<template>
  <div class="main">
    <div class="l1" v-if="!hideL1">
      <p class="secondary">Боёв:&nbsp;<span class="primary number">{{ battleCount }}</span></p>
      <p class="secondary">
        Очков:&nbsp;<span class="accent number bold">{{ totalTween }}{{ total > 10000 ? 'K' : '' }}</span></p>
    </div>

    <div class="l2" v-if="!hideL2">
      <MultiColumn :columns="3" :rows="10" v-slot="{ index }" separator>
        <td class="secondary number">{{ index + 1 }}.</td>
        <td class="number bold" :class="last30[index] > last30Average && last30.length > 3 ? 'accent' : 'primary'">{{
          currentSession[index] }}</td>
      </MultiColumn>
    </div>
    <div class="l3" v-if="!hideL3">
      <div class="flex space-between">
        <p class="secondary">Мин:&nbsp;<span class="primary number bold">{{ last30Min }}</span></p>
        <p class="secondary">Макс:&nbsp;<span class="primary number bold">{{ last30Max }}</span></p>
      </div>
      <div class="flex space-between">
        <p class="secondary">Всего:&nbsp;<span class="primary number bold">{{ total }}</span></p>
        <p class="secondary nowrap">В среднем:&nbsp;<span class="primary number bold">{{ last30Average }}</span></p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import MultiColumn from '@/components/MultiColumn.vue'
import { useRoundProcessor } from '@/composition/processors/useRoundProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';
import { computed } from 'vue';

const props = defineProps<{
  battleCount: number,
  currentSession: number[],
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
}>()

const battleCount = useRoundProcessor(useTweenComputed(() => props.battleCount, { duration: 500 }))

const last30 = computed(() => props.currentSession.slice(-30))
const total = computed(() => last30.value.reduce((acc, item) => acc + item, 0))
const totalTween = useRoundProcessor(useTweenComputed(() => total.value > 10000 ? total.value / 1000 : total.value, { duration: 500 }))

const last30Average = useRoundProcessor(useTweenComputed(() => total.value / last30.value.length))
const last30Max = useRoundProcessor(useTweenComputed(() => last30.value.reduce((acc, item) => Math.max(acc, item), 0)))
const last30Min = useRoundProcessor(useTweenComputed(() => last30.value.reduce((acc, item) => Math.min(acc, item), Infinity)))



</script>


<style lang="scss" scoped>
@import '@/styles/widget.scss';

.main {

  display: flex;
  flex-direction: column;
  gap: 1em;

  .l1 {
    display: flex;
    justify-content: space-between;

    p {
      line-height: 1;
      font-size: 1.4em;

      span {
        font-size: 2em;
      }
    }
  }

  .l2 {
    display: flex;
    font-size: 1.4em;

    td {
      padding: 0.03em 0.1em;
    }

    .cell {
      text-align: center;
      padding: 0;
      line-height: 1;
      margin: 0.2em 0.05em;
    }
  }

  .l3 {
    font-size: 1.3em;

    .flex {
      flex-wrap: nowrap;
    }
  }
}
</style>