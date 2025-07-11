<template>
  <WidgetRoot autoScale autoHeight>
    <Content :target-tank="currentTank" :section1 :section2 :section3 :perfect :accent="color" />
  </WidgetRoot>
</template>


<script setup lang="ts">
import { useReactiveRemoteValue, WidgetsRemote } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed } from 'vue';
import { oneOf, Color, useQueryParams } from '@/composition/useQueryParams';

import { styleParams } from './define.widget';
import WidgetRoot from '@/components/WidgetRoot.vue';

const query = useQueryParams({
  accent: Color(),
  colorScheme: oneOf(['red', 'orange', 'green', 'cyan', 'blue', 'purple', 'custom'] as const, 'orange')
})

const color = computed(() => styleParams(query.colorScheme, query.accent))

const remote = new WidgetsRemote()
const currentTank = useReactiveRemoteValue<'ARMT' | 'TF-2 Clark' | 'Project Murat'>(remote, 'Этап', 'ARMT', {
  type: {
    type: 'select',
    variants: ['ARMT', 'TF-2 Clark', 'Project Murat']
  },
  elementHelper: '.header'
})
const section1 = useReactiveRemoteValue(remote, 'Задачи VI - VII', 0, { elementHelper: '.section.vi-vii' })
const section2 = useReactiveRemoteValue(remote, 'Задачи VIII - IX', 0, { elementHelper: '.section.viii-ix' })
const section3 = useReactiveRemoteValue(remote, 'Задачи X - XI', 0, { elementHelper: '.section.x-xi' })
const perfect = useReactiveRemoteValue(remote, 'С отличием', 0, { elementHelper: '.perfect' })


</script>


<style lang="scss" scoped></style>