<template>
  <div class="main" :class="align">
    <p class="primary">Боёв:
      <span class="accent number bold">
        <TweenValue :value="battles" />
      </span>
    </p>

    <p class="primary">Побед:
      <span class="accent number bold">
        <TweenValue :value="wins" />
      </span>
    </p>


    <p class="primary" v-if="showLosses !== false">Поражений:
      <span class="accent number bold">
        <TweenValue :value="loses" />
      </span>
    </p>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';

const props = defineProps<{
  battles: number
  wins: number
  loses: number
  align: 'left' | 'center' | 'right'
  showLosses?: boolean
}>()

</script>


<style lang="scss" scoped>
.main {
  font-size: 2.8em;
  line-height: 1.2;

  .accent {
    font-size: 1.1em;
  }
}
</style>