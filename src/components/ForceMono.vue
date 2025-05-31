<template>
  <span v-for="char in value" :style="{ width: width }">{{ char }}</span>
</template>


<script setup lang="ts">
const props = defineProps<{
  value: string,
  width?: string,
}>()
</script>


<style lang="scss" scoped>
span {
  display: inline-block;
  width: var(--char-width, 0.6em);
  text-align: center;
}
</style>