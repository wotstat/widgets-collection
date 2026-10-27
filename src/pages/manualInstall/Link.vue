<template>
  <a :href="`${CEF_STORAGE_URL}/${src}`">{{ text ?? 'Скачать' }}</a>
</template>


<script setup lang="ts">
import { CEF_STORAGE_URL } from '@/utils/externalUrl'

const props = defineProps<{
  text?: string
  src: string
}>()

</script>


<style lang="scss" scoped></style>
