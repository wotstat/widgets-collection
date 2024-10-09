<template>
  <WidgetCardWrapper auto-height auto-scale>
    <Content :value="startFrom + battleCount" :title />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';


const { title, startFrom, saveKey } = useQueryParams({
  title: Boolean,
  saveKey: String,
  startFrom: { type: Number, default: 0 },
})

const { sdk } = useWidgetSdk();
const battleCount = useWidgetStorage(saveKey ?? '_empty', 0)
const lastArenaId = useWidgetStorage(`${saveKey ?? ''}_arenaId`, 0)

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