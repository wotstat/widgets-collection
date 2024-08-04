<template>
  <p class="secondary">{{ name }}: <span class="primary">{{ value }}</span></p>
</template>


<script setup lang="ts">
defineProps<{
  name: string
  value: any
}>()
</script>
