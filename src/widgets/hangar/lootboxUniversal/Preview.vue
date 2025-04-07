<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <!-- <Content v-bind="targetProps" /> -->
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  hideL1?: boolean
  hideL2?: boolean
  hideL3?: boolean
}>();


// const targetProps = computed<Props>(() => ({
//   opened: [],
//   currencies: {
//     gold: 886528,
//     credits: 4874188,
//     freeXP: 8899237,
//     premium: 1873,
//     mandarins: 89525,
//     crystals: 123,
//   },
//   // tanks: [
//   //   'ussr:R159_SU_130PM',
//   //   'ussr:R173_K_91_2_122',
//   //   'ussr:R115_IS-3_auto_S',
//   //   'france:F126_Char_Lourd_AP58',
//   // ],
//   // hideL1: props.hideL1,
//   // hideL2: props.hideL2,
//   // hideL3: props.isMiniPreview || props.hideL3,
// }))

const aspect = computed(() => {
  if (props.hideL1) return props.hideL2 ? 3.5 : 0.78;
  if (props.hideL2) return props.isMiniPreview || props.hideL3 ? 3.9 : 2.2;
  if (props.isMiniPreview || props.hideL3) return 1;

  return 0.87;
})

</script>


<style lang="scss" scoped></style>