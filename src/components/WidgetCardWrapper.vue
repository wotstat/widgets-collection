<template>
  <WidgetRoot :autoScale :autoHeight>
    <WidgetStatusWrapper :ctx>
      <WidgetCard>
        <slot></slot>
      </WidgetCard>
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetCard from "@/components/WidgetCard.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";
import { useWidgetSdk } from "@/composition/widgetSdk";

const ctx = useWidgetSdk();

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean
}>()
</script>


<style lang="scss" scoped></style>