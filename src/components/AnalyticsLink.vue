<template>
  <a :href="`${ANALYTICS_URL}${path ?? ''}`"><slot>{{ host }}</slot></a>
</template>

<script setup lang="ts">
import { ANALYTICS_URL } from '@/utils/externalUrl'

defineProps<{ path?: string }>()
const host = new URL(ANALYTICS_URL).host
</script>
