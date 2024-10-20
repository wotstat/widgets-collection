<template>
  <WidgetRoot :autoScale :autoHeight>
    <WidgetStatusWrapper :requiredExtensions>
      <slot></slot>
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean,
  requiredExtensions?: string[]
}>()
</script>


<style lang="scss" scoped></style>