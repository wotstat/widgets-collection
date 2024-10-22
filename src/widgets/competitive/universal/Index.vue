<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :slots="query.slots" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { arrayOfOneOf, useQueryParams } from '@/composition/useQueryParams';
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { efficiency, shared } from '@/components/efficiencyIcon/utils';

const query = useQueryParams({
  channelKey: String,
  allowSquad: Boolean,
  slots: arrayOfOneOf([...efficiency, ...shared])
})

</script>


<style lang="scss" scoped></style>