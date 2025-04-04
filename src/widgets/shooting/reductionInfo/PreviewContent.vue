<template>
  <div class="main-container">
    <Old :percent="0.53" :time="1.4" class="old" />
    <div class="new">
      <New :percent="0.53" :time="1.4" />
    </div>
    <Chart :value="historyTangent[historyTangent.length - 1]" :precision="2" :default-max="5" :history="historyTangent"
      class="chart" />
    <TimeLabel :time="1.4" class="time-label" />
    <PercentLabel :percent="0.53" class="percent-label" />
  </div>
</template>


<script setup lang="ts">
import Old from './skins/old/Index.vue';
import New from './skins/new/Index.vue';
import TimeLabel from './skins/timeLabel/Index.vue';
import PercentLabel from './skins/percentLabel/Index.vue';
import Chart from './skins/chart/Index.vue';

const props = defineProps<{
  historyTangent: number[]
}>()

</script>


<style lang="scss" scoped>
.main-container {
  font-size: 1em;
  position: relative;

  display: flex;
  gap: 0.5em;

  .old {
    font-size: 0.3em;
    width: 21em;
    box-shadow: none !important;
  }

  .new {
    font-size: 0.3em;
    width: 25.0em;
    margin: 0 -3em;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0 3em;
      top: 0;
      border: 1px dashed rgba(255, 255, 255, 0.1);
      border-radius: 2em;
    }

    .preview-card {
      border-radius: 2em;
    }

    .main.preview-card {
      border: none;
      box-shadow: none !important;
    }
  }

  .chart {
    font-size: 0.4em;
    width: 42em;
  }

  .percent-label {
    position: absolute;
    font-size: 0.4em;
    bottom: 10em;
    left: 32.5em;
    width: 30em;
  }

  .time-label {
    position: absolute;
    font-size: 0.4em;
    bottom: 0em;
    width: 30em;
    right: 0;
  }
}
</style>