<template>
  <div>
    <h1 v-if="title" class="title primary">{{ title }}</h1>
    <p class="counter accent number">{{ target }}</p>
  </div>
</template>


<script setup lang="ts">
import { useRoundSpaceProcessor } from '@/composition/processors/useRoundSpaceProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';

const props = defineProps<{
  title?: string
  value: number
}>();

const tweenedValue = useTweenComputed(() => props.value, { duration: 1000 });
const target = useRoundSpaceProcessor(tweenedValue);

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
</style>