<template>
  <div class="main center">
    <p class="primary" v-if="title">Боёв: <span class="accent number bold">{{ target }}</span></p>
    <p class="accent number bold big" v-else>{{ target }}</p>
  </div>
</template>


<script setup lang="ts">
import { useRoundSpaceProcessor } from '@/composition/processors/useRoundSpaceProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';

const props = defineProps<{
  value: number
  title: boolean
}>()

const tweenedValue = useTweenComputed(() => props.value, { duration: 1000 });
const target = useRoundSpaceProcessor(tweenedValue);

</script>


<style lang="scss" scoped>
.main {
  font-size: 3.2em;
  line-height: 1.2;

  .accent {
    font-size: 1.5em;
  }

  .big {
    font-size: 2.5em;
  }
}
</style>