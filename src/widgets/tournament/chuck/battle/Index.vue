<template>
  <WidgetWrapper autoScale autoHeight>
    <Content :colorFrom="colorFrom" :colorTo="colorTo" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { watch } from 'vue';
import { Color, NumberDefault, oneOf, useQueryParams, } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { defaultGradient } from './define.widget';

const { colorFrom, colorTo } = useQueryParams({
  colorFrom: Color(defaultGradient.from),
  colorTo: Color(defaultGradient.to),
  // startFrom: NumberDefault(),
  // skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})



const { sdk } = useWidgetSdk();
wotstatEmulator.connectAndInit()
// const count = useWidgetStorage('count', 0)

// const keyP = useReactiveState(sdk.data.keyboard.KEY_P)
// const keyO = useReactiveState(sdk.data.keyboard.KEY_O)
// const keyLAlt = useReactiveState(sdk.data.keyboard.KEY_LALT)
// const keyRAlt = useReactiveState(sdk.data.keyboard.KEY_RALT)

</script>


<style lang="scss" scoped></style>