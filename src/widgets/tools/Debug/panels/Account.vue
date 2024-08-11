<template>
  <h3 class="secondary bold">ACCOUNT <span class="float-right">{{ localizedKeys }}</span></h3>
  <template v-if="visible">
    <div class="flex">
      <div class="flex flex-1 ver">
        <Line name="Credits" :value="accountCredits" />
        <Line name="Crystal" :value="accountCrystal" />
      </div>
      <div class="vr"></div>
      <div class="flex flex-1 ver">
        <Line name="Gold" :value="accountGold" />
        <Line name="FreeXp" :value="accountFreeXp" />
      </div>
    </div>
    <div class="flex multi-cards" v-if="accountPremium">
      <div class="card secondary flex-1" v-for="item in Object.entries(accountPremium)">
        <div class="flex space-between">
          <p class="secondary">{{ item[0] }}</p>
          <p class="primary">{{ item[1].active }}</p>
        </div>
        <p class="primary center">{{ new Date(item[1].expiration * 1000).toLocaleDateString('en-US') }}</p>
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import Line from "../Line.vue";
import { KeyBindingSetting, useToggleKeyBinding } from "../useToggleKeyBinding";

const props = defineProps<{
  accountCredits?: number
  accountCrystal?: number
  accountGold?: number
  accountFreeXp?: number
  accountPremium?: Record<string, { active: boolean; expiration: number }>
  collapseKeys: KeyBindingSetting
}>();

const { visible, localizedKeys } = useToggleKeyBinding(props.collapseKeys)
</script>


<style lang="scss" scoped></style>