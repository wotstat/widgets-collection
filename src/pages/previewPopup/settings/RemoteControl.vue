<template>
  <div class="line">
    <p>{{ label }}</p>
    <div class="flex">
      <input :value="displayPrivateKey" @input="event => privateKey = (event as any).target.value" ref="inputLine"
        id="random-string" @mouseout="mouseOverPassword = false" @mouseover="mouseOverPassword = true" />
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
import { computed, onMounted, ref, watch } from 'vue';

const inputLine = ref<HTMLElement | null>(null)
const mouseOverPassword = ref(false)

const props = defineProps<{
  label: string;
  buttonLabel: string;
}>()

const emits = defineEmits<{
  (e: 'open-remote', privateKey: string): void
}>()

const privateKey = ref<string>('')
const publicKey = computedAsync(async () => await generatePublicKey(privateKey.value))
const displayPrivateKey = computed(() => {
  const key = privateKey.value || ''
  if (mouseOverPassword.value) return key

  if (!key) return ''
  if (key.length < 3) return `${key.at(0)}${new Array(key.length - 1).fill('*').join('')}`
  return `${key.slice(0, 3)}${new Array(key.length - 3).fill('*').join('')}`
})

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