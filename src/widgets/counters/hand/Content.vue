<template>
  <div class="main center">
    <p class="accent number bold big">
      <TweenValue :value space />
    </p>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';

defineProps<{
  value: number
}>()

</script>


<style lang="scss" scoped>
.main {
  font-size: 3.2em;
  line-height: 1.2;

  .big {
    font-size: 2.5em;
    margin-top: -0.1em;
  }
}
</style>