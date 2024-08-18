<template>
  <div>
    <h1 v-if="title" class="title primary">{{ title }}</h1>
    <p class="counter accent num">{{ value }}</p>
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  title?: string
  value: number
}>();

</script>


<style lang="scss" scoped>
.title {
  font-size: 2em;
  text-align: center;
  margin: 0;
}

.counter {
  font-weight: bold;
  font-size: 4em;
  text-align: center;
  margin: 0;
  line-height: 1;
}
</style>