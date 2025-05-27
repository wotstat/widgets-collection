<template>
  <Inspector :data="data" @change="onChange" />
</template>


<script setup lang="ts">
import Inspector from './inspector/Inspector.vue';

const props = defineProps<{
  patch: (path: string, value: unknown) => void;
  data: Record<string, any>;
}>()



function onChange({ path, value }: { path: string[]; value: unknown }) {
  props.patch(path.join('/'), value);
}

</script>


<style lang="scss" scoped></style>