<template>
  <WidgetRoot autoScale autoHeight>
    <Transition>
      <div v-if="shouldDisplay">
        <Content :target-tank="currentTank" :section1 :section2 :section3 :perfect :accent="color"
          :backgroundScheme="query.backgroundScheme" :back-color-from="query.backColorFrom"
          :back-color-to="query.backColorTo" />
      </div>
    </Transition>
  </WidgetRoot>
</template>


<script setup lang="ts">
import { useReactiveRemoteValue, useReactiveState, useWidgetSdk, WidgetsRemote } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed } from 'vue';
import { oneOf, Color, useQueryParams } from '@/composition/useQueryParams';

import { styleParams } from './define.widget';
import WidgetRoot from '@/components/WidgetRoot.vue';

const query = useQueryParams({
  accent: Color(),
  colorScheme: oneOf(['red', 'orange', 'green', 'cyan', 'blue', 'purple', 'custom'] as const, 'orange'),
  backgroundScheme: oneOf(['default', 'color', 'gradient'] as const, 'default'),
  backColorFrom: Color('1c1c1c'),
  backColorTo: Color('1a1a1a69'),
  displayMode: oneOf(['battle', 'hangar', 'both'] as const, 'both')
})

const { sdk, status } = useWidgetSdk()
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const shouldDisplay = computed(() => {
  if (status.value != 'connected') return true
  if (query.displayMode === 'both') return true
  if (query.displayMode === 'battle' && isInBattle.value) return true
  if (query.displayMode === 'hangar' && !isInBattle.value) return true
  return false
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


<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>