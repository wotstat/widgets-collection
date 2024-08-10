<template>
  <h3 class="secondary bold">KEYBOARD <span class="float-right">H+7</span></h3>
  <div class="keys">
    <div v-for="key in pressed" :key="key" class="key">{{ key.replace('KEY_', '') }}</div>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  pressed: string[];
}>();
</script>


<style lang="scss" scoped>
.keys {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2em;

  .key {
    padding: 0.2em 0.4em;
    background: #505050;
    color: #fff;
    border-radius: 0.3em;
  }
}
</style>