<template>
  <div class="page">
    <div class="page-container">
      <div class="markdown">
        <VueComponent />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { VueComponent } from "./Content.md";

</script>


<style lang="scss" scoped>
.page {
  background-color: #242424;
  padding: 1em;
  min-height: 100vh;
  color: white;

  .page-container {
    max-width: 1200px;
    margin: auto;
  }

  .markdown {
    :deep(h1) {
      font-size: 3em;
      margin-top: 0;
    }
  }
}
</style>