<template>
  <div class="section" :style="{ ['--level']: `${level}` }">
    <div class="section-header" @click="collapsed = !collapsed">
      <ArrowDown class="icon" :class="{ 'collapsed': collapsed }" />
      <p> {{ title }}</p>
      <slot name="header"></slot>
    </div>

    <div class="content" v-show="!collapsed">
      <slot />
    </div>
  </div>
</template>


<script setup lang="ts">
import ArrowDown from '@/assets/icons/arrow-down.svg'
import { useLocalStorage } from '@vueuse/core';
import { computed, inject, provide, ref } from 'vue';

const props = defineProps<{
  title: string
}>()

const path = inject<string>('inspector-level', '')
provide<string>('inspector-level', `level/${props.title.toLowerCase()}`)

const level = computed(() => path.split('/').length - 1)

const collapsed = useLocalStorage(() => `inspector-section-${path}/${props.title}`, true)
</script>


<style lang="scss" scoped>
.section-header {
  p {
    flex: 1;
  }
}
</style>