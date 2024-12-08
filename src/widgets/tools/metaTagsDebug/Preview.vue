<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="0.68">
    <Content v-bind="data" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';

const data = {
  selectedLine: 5,
  insets: {
    top: 2,
    right: 5,
    bottom: 5,
    left: 2,
  },
  values: {
    autoHeight: true,
    hangarOnly: false,
    readyToClearData: false,
    useSniperMode: true,
    preferredTopLayer: true,
    unlimitedSize: false,
    relativeFont: true,
    insetsPadding: false,
    oscillateHeight: false,
  }
} satisfies Props

</script>


<style lang="scss" scoped></style>