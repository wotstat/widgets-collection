<template>
  <div class="flex">
    <template v-for="(_, column) in new Array(columns).fill(0)">
      <div class="column">
        <table>
          <tr v-for="(_, row) in new Array(rows).fill(0)">
            <slot :index="rows * column + row"></slot>
          </tr>
        </table>
      </div>
      <div class="vr" v-if="column != columns - 1 && separator !== false"></div>
    </template>
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  columns: number
  rows: number
  separator?: boolean
}>()
</script>


<style lang="scss" scoped>
.flex {
  width: 100%;
}

.column {
  flex: 1;

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    td {
      font-size: 1.2em;
      text-wrap: none;
      white-space: nowrap;
    }
  }
}
</style>