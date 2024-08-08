<template>

  <h3 class="secondary bold">Feedbacks</h3>
  <div class="flex">
    <div class="flex flex-1 ver team-colors">
      <p v-for="item in feedbacks" class="secondary">
        {{ item.eventType }}: <span class="primary">{{ item.text }}</span>
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">

const props = defineProps<{
  feedbacks: { eventType: string, text: string }[];
}>();

</script>


<style lang="scss" scoped></style>