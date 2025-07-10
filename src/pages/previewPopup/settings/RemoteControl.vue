<template>
  <div class="line">
    <p>{{ label }}</p>
    <div class="flex">
      <input v-model="privateKey" id="random-string">
      <ReloadIcon class="icon" @click.stop.prevent="generateNewValue" />
    </div>
  </div>
  <div class="line">
    <button @click="emits('open-remote', privateKey)">{{ buttonLabel }}</button>
  </div>
</template>


<script setup lang="ts">
import ReloadIcon from '@/assets/icons/reload.svg';
import { channelKey as generatePublicKey } from '@/pages/remoteControl/channelKey';
import { computedAsync } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  label: string;
  buttonLabel: string;
}>()

const emits = defineEmits<{
  (e: 'open-remote', privateKey: string): void
}>()

const privateKey = ref<string>('')
const publicKey = computedAsync(async () => await generatePublicKey(privateKey.value))

const value = defineModel<string>({ required: true })

onMounted(() => {
  if (!privateKey.value) generateNewValue()
})

watch(publicKey, (newValue) => {
  if (!newValue) return
  value.value = newValue
}, { immediate: true })

function generateNewValue() {
  privateKey.value = Math.random().toString(36).substring(2, 18)
}
</script>


<style lang="scss" scoped>
#random-string {
  max-width: 115.5px;
}

.icon {
  cursor: pointer;
  width: 21.5px;
  height: 21.5px;
  border-radius: 5px;
  padding: 3px;
  margin-left: 3px;
  transition: background-color 0.2s;
  border: 1px solid #858585;
  user-select: none;

  &:hover {
    background-color: #686868;
  }
}

button {
  flex: 1;
}
</style>