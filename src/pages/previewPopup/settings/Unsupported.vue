<template>
  <div class="line">
    <p>{{ label }}</p>
    <p>UNSUPPORTED</p>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  label: string
}>()

const value = defineModel<boolean>()
</script>


<style lang="scss" scoped></style>