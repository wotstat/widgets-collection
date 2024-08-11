<template>

  <h3 class="secondary bold">FEEDBACK <span class="float-right">{{ localizedKeys }}</span></h3>
  <div class="flex" v-if="visible">
    <div class="flex flex-1 ver team-colors">
      <p v-for="item in feedbacks" class="secondary">
        {{ item.eventType }}: <span class="primary">{{ item.text }}</span>
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  feedbacks: { eventType: string, text: string }[]
  collapseKeys: KeyBindingSetting
}>()

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>