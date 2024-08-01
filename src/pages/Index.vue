<template>
  <h1>Коллекция виджетов</h1>
  <hr>
  <ul>
    <li v-for="item in paths">
      <RouterLink :to="item">{{ item }}</RouterLink>
    </li>
  </ul>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { getAllWidgets } from '../utils';

const paths = getAllWidgets().map(t => t.path);

</script>


<style lang="scss" scoped></style>