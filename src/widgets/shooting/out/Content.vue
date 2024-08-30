<template>
  <div>
    <h1 class="title primary" v-if="title">УКРАДЕНО</h1>
    <p class="counter accent number" v-if="!percent">
      <TweenValue :value="miss" />
      <span>/</span>
      <TweenValue :value="total" />
    </p>
    <p class="counter percent accent number" v-else>
      <TweenValue :value="percentValue" :precision="2" v-slot="{ value }">{{ value }}%
      </TweenValue>
    </p>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { computed } from 'vue';

const props = defineProps<{
  title?: boolean
  miss: number
  total: number
  percent?: boolean
}>();

const percentValue = computed(() => props.total > 0 ? props.miss / props.total * 100 : 0);

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