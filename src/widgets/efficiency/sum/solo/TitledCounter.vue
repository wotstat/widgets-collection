<template>
  <div>
    <h1 v-if="title" class="title primary">{{ title }}</h1>
    <p class="counter accent number">
      <TweenValue :value space />
    </p>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';

const props = defineProps<{
  title?: boolean | string
  reversedTitle?: string
  value: number
}>();

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