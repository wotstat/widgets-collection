<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :value="startFrom + battleCount" :title :skin="skin" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { watch } from 'vue';
import { oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';


const { title, startFrom, skin } = useQueryParams({
  title: Boolean,
  startFrom: { type: Number, default: 0 },
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const { sdk } = useWidgetSdk();
const battleCount = useWidgetStorage('battleCount', 0)
const lastArenaId = useWidgetStorage('lastArenaId', 0)

const arenaId = useReactiveState(sdk.data.battle.arenaId);
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
watch(isInBattle, value => {
  if (!value) return;
  if (!arenaId.value) return;
  if (lastArenaId.value == arenaId.value) return;

  lastArenaId.value = arenaId.value
  battleCount.value += 1
})

</script>


<style lang="scss" scoped></style>