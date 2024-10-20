<template>
  <div class="main">
    <WidgetCard>
      <div class="line">
        <p class="secondary">last:
          <span class="primary num">{{ lastVisibleStats.movingAvgDamage }} // {{ lastVisibleStats.damageRating }}</span>
        </p>
        <p class="secondary">pre last:
          <span class="primary num">
            {{ preLastVisibleStats.movingAvgDamage }} // {{ preLastVisibleStats.damageRating }}
          </span>
        </p>

        <p class="secondary">sum: <span class="primary num">{{ battleGunSum }}</span></p>
        <p class="secondary">moving avg: <span class="primary num">{{ battleMovingAvgDamage.toFixed(0) }}</span></p>
        <p class="secondary">battle rating: <span class="primary num">{{ battleDamageRating.toFixed(2) }}</span></p>
        <p class="secondary">current rating: <span class="primary num">{{ currentDamageRating.toFixed(2) }}</span></p>
      </div>
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';

const props = defineProps<{
  lastVisibleStats: {
    movingAvgDamage: number;
    damageRating: number;
  },
  preLastVisibleStats: {
    movingAvgDamage: number;
    damageRating: number;
  },
  battleGunSum: number,
  battleMovingAvgDamage: number,
  battleDamageRating: number,
  currentDamageRating: number
}>()


</script>


<style lang="scss" scoped>
.main {
  font-size: 1.8em;

  span {
    float: right;
  }
}
</style>