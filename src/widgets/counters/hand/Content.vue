<template>
  <div class="main center">
    <p class="accent number bold big">{{ target }}</p>
  </div>
</template>


<script setup lang="ts">
import { useRoundSpaceProcessor } from '@/composition/processors/useRoundSpaceProcessor';
import { useTweenComputed } from '@/composition/tween/useTweenRef';

const props = defineProps<{
  value: number
}>()

const tweenedValue = useTweenComputed(() => props.value, { duration: 1000 });
const target = useRoundSpaceProcessor(tweenedValue);

</script>


<style lang="scss" scoped>
.main {
  font-size: 3.2em;
  line-height: 1.2;

  .big {
    font-size: 2.5em;
  }
}
</style>