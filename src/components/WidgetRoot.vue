<template>
  <div class="widgets-sdk-styles">
    <div class="autoscale" v-if="autoScale">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { WidgetMetaTags } from '@/composition/widgetSdk';
import { onMounted } from 'vue';

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean
  hangarOnly?: boolean
}>()

onMounted(() => {
  WidgetMetaTags.setAutoHeight(props.autoHeight)
  WidgetMetaTags.setHangarOnly(props.hangarOnly)
})

</script>

<style lang="scss" scoped>
.widgets-sdk-styles {
  position: relative;
  color: var(--wotstat-primary)
}
</style>