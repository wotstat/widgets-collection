<template>
  <WidgetWrapper auto-scale auto-height :allow-without-sdk="Boolean(query.nickname && query.region)">
    <Content :position :delta :is-new="isNew" :is-not-found="isNotFound" :hide-icon="query.hideIcon"
      :hide-delta="query.hideDelta" :skin="query.skin" />
  </WidgetWrapper>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WidgetWrapper from '@/components/WidgetWrapper.vue'
import { oneOf, useQueryParams } from '@/composition/useQueryParams'
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk'
import Content from './Content.vue'
import { useLeaderboardPosition } from './useLeaderboardPosition'

const query = useQueryParams({
  nickname: String,
  region: String,
  hideIcon: Boolean,
  hideDelta: Boolean,
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const { sdk } = useWidgetSdk()
const playerName = useReactiveState(sdk.data.player.name)
const gameRegion = useReactiveState(sdk.data.game.region)

const nickname = computed(() => (query.nickname || playerName.value || '').trim())
const region = computed(() => (query.region || gameRegion.value || '').trim().toUpperCase())
const { position, delta, isNew, isNotFound } = useLeaderboardPosition(nickname, region)
</script>
