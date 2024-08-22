<template>
  <WidgetCardWrapper auto-height auto-scale>
    <Content :value="startFrom + battleCount" :title="title" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const query = useQueryParams<{
  startFrom: string
  title: string
  saveKey: string
}>()

const startFrom = computed(() => query.startFrom && Number.parseInt(query.startFrom) ? Number.parseInt(query.startFrom) : 0)
const title = computed(() => query.title !== 'false');

const { sdk } = useWidgetSdk();
const battleCount = useWidgetStorage(query.saveKey ?? '_empty', 0)
const lastArenaId = useWidgetStorage(`${query.saveKey}_arenaId` ?? '_empty', 0)

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