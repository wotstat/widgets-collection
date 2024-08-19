<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.21">
    <WidgetCard>
      <Content v-bind="target" :hide-l1="hideL1" :hide-l2="hideL2" :hide-l3="hideL3" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  isMiniPreview: boolean,
  hideL1?: boolean,
  hideL2?: boolean,
  hideL3?: boolean,
}>();

const data = ref({
  place: 98,
  battleCount: 347,
  bestSession: 245,
  currentSession: 126,
  scores: [
    { key: '0', tank: 'Bái Láng', score: 25, top: false },
    { key: '1', tank: 'Варяг', score: 24, top: false },
    { key: '2', tank: 'Beowulf', score: 20, top: false },
    { key: '3', tank: 'Huragan', score: 20, top: true },
    { key: '4', tank: 'Arlequin', score: 19, top: false },
    { key: '5', tank: 'Arlequin', score: 18, top: true },
    { key: '6', tank: 'Huragan', score: 5, top: false },
    { key: '7', tank: 'Arlequin', score: 15, top: false },
    { key: '8', tank: 'Варяг', score: 20, top: true },
    { key: '9', tank: 'Варяг', score: 24, top: true },
  ]
})

const target = computed(() => {
  return data.value
})

// setTimeout(() => {
//   data.value.scores.shift()
//   data.value.scores.push({ key: '7', tank: 'Huragan', score: 50, top: true })
// }, 800)


</script>


<style lang="scss" scoped></style>