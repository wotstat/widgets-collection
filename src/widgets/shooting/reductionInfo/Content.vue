<template>
  <Old v-if="skin == 'protanki-old'" :percent="percent" :time="time" />
  <New v-if="skin == 'protanki-new'" :percent="percent" :time="time" />
  <TimeLabel v-if="skin == 'time'" :time="time" />
  <PercentLabel v-if="skin == 'percent'" :percent="percent" />
  <ValueLabel v-if="skin == 'tangent'" :value="tangent" />
  <Chart v-if="skin == 'chart-time'" :value="time" :history="historyTime" :default-max="7"
    :title="displayTitle ? 'Время до полного сведения' : ''" :precision="1" :display-value="displayValue" />
  <Chart v-if="skin == 'chart-tangent'" :value="tangent" :history="historyTangent" :default-max="5"
    :title="displayTitle ? 'Разброс на 100 м.' : ''" :precision="2" :display-value="displayValue" />

</template>


<script setup lang="ts">
import Old from './skins/old/Index.vue';
import New from './skins/new/Index.vue';
import TimeLabel from './skins/timeLabel/Index.vue';
import PercentLabel from './skins/percentLabel/Index.vue';
import ValueLabel from './skins/valueLabel/Index.vue';
import Chart from './skins/chart/Index.vue';
import { skins } from './define.widget';

const props = defineProps<{
  percent: number,
  time: number,
  tangent: number,
  historyTime: number[],
  historyTangent: number[],
  skin: typeof skins[number],
  displayValue?: boolean,
  displayTitle?: boolean,
}>();

</script>


<style lang="scss" scoped></style>