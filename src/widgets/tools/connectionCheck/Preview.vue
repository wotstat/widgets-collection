<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.3">
    <Content v-bind="data" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { Props } from './define.widget';

const data = {
  web: 'connected',
  dataProvider: 'connected',
  dataProviderVersion: 12,
  database: 'connected',
  relay: 'connecting',
  remote: 'disconnected'
} satisfies Props

</script>


<style lang="scss" scoped></style>