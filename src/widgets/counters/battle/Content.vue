<template>
  <DefineTemplate>
    <TweenValue :value="props.value" />
  </DefineTemplate>

  <div class="main center">
    <p class="primary" v-if="title">Боёв:
      <span class="accent number bold">
        <ReuseTemplate />
      </span>
    </p>
    <p class="accent number bold big" v-else>
      <ReuseTemplate />
    </p>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { createReusableTemplate } from '@vueuse/core'

const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const props = defineProps<{
  value: number
  title: boolean
}>()

</script>


<style lang="scss" scoped>
.main {
  font-size: 3.2em;
  line-height: 1.2;

  .accent {
    font-size: 1.5em;
  }

  .big {
    font-size: 2.5em;
  }
}
</style>