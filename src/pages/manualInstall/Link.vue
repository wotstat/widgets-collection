<template>
  <a :href="`https://${prefix}cef-storage.wotstat.info/${src}`">{{ text ?? 'Скачать' }}</a>
</template>


<script setup lang="ts">
const props = defineProps<{
  text?: string
  src: string
}>()

const prefix = (() => {
  const match = location.host.match(/^(.*)\.widgets\.wotstat\.info$/i)
  return match ? `${match[1]}.` : ''
})()

</script>


<style lang="scss" scoped></style>