<template>
  <div>
    <h1 class="title primary" v-if="title">УКРАДЕНО</h1>
    <p class="counter accent number" v-if="!percent">{{ missTween }}/{{ totalTween }}</p>
    <p class="counter percent accent number" v-else>{{ percentTween }}%</p>
  </div>
</template>


<script setup lang="ts">
import { useRoundProcessor } from '@/composition/processors/useRoundProcessor';
import { useRoundTweenProcessor } from '@/composition/processors/useRoundTweenProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';
import { computed } from 'vue';

const props = defineProps<{
  title?: boolean
  miss: number
  total: number
  percent?: boolean
}>();

const missTween = useRoundTweenProcessor(() => props.miss, { duration: 1000 });
const totalTween = useRoundTweenProcessor(() => props.total, { duration: 1000 });

const percentValue = computed(() => props.total > 0 ? props.miss / props.total * 100 : 0);
const percentTween = useRoundProcessor(useTweenComputed(() => percentValue.value, { duration: 1000 }), 2);

</script>


<style lang="scss" scoped>
.title {
  font-size: 2em;
  text-align: center;
  margin: 0;
  line-height: 1;
  margin-bottom: 0.2em;
}

.counter {
  font-weight: bold;
  font-size: 4em;
  text-align: center;
  margin: 0;
  line-height: 1;
}

.percent {
  font-size: 5.5em;
}
</style>