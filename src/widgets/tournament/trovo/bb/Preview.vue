<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="isMiniPreview ? 0.9 : 0.76">
    <WidgetCard>
      <Content v-bind="target" :hide-l1="hideL1" :hide-l2="hideL2" :hide-l3="isMiniPreview || hideL3" />
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
  battleCount: 35,
  currentSession: [4050, 3245, 3645, 4842, 2374, 4578, 5574, 5458, 3545, 2354, 3582, 2254, 6578, 2463, 5422, 2124, 2223, 5750, 123, 1545, 5766, 2241, 5456, 2455, 8582, 3564, 2257, 7523, 3355, 2422,],
})

const target = computed(() => {
  return data.value
})



</script>


<style lang="scss" scoped></style>