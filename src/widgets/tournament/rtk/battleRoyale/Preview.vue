<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="predictedAspectRatio">
    <WidgetCard>
      <Content v-bind="target" :hide-l1="hideL1" :hide-l2="hideL2" :hide-l3="hideL3"
        :hide-l4="isMiniPreview || hideL4" />
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
  hideL4?: boolean,
}>();

const data = ref({
  place: 98,
  battleCount: 347,
  bestSessionSum: 245,
  currentSessionSum: 126,
  currentSession: [
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
  ],
  bestSession: [
    { tank: 'Bái Láng', score: 59, top: true },
    { tank: 'Bái Láng', score: 57, top: true },
    { tank: 'Bái Láng', score: 28, top: false },
    { tank: 'Bái Láng', score: 61, top: true },
    { tank: 'Bái Láng', score: 63, top: true },
    { tank: 'Bái Láng', score: 42, top: false },
    { tank: 'Bái Láng', score: 50, top: false },
    { tank: 'Bái Láng', score: 52, top: true },
    { tank: 'Bái Láng', score: 43, top: false },
    { tank: 'Bái Láng', score: 43, top: false },
  ]
})

const target = computed(() => {
  return data.value
})

const predictedAspectRatio = computed(() => {
  return props.isMiniPreview ? 1.21 : 1.07
})

</script>


<style lang="scss" scoped></style>