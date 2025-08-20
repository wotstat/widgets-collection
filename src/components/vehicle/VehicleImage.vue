<template>
  <FallbackImg :src="targetUrl" :fallback="fallbackUrl" :style :loading />
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { vehicleFallbackUrl, vehicleUrl } from './utils'
import FallbackImg from '../shared/FallbackImg.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { isInPreview } from '@/utils/provides';

const props = defineProps<{
  tag: string,
  size?: 'small' | 'preview' | 'shop'
  loading?: 'lazy' | 'eager'
  game?: 'wot' | 'mt'
}>()

const preview = inject(isInPreview, false);
const game = computed(() => {
  if (props.game) return props.game;
  if (preview) return 'mt';

  const { sdk } = useWidgetSdk()
  const region = useReactiveState(sdk.data.game.region)
  return region.value == 'RU' ? 'mt' : 'wot'
})

const targetUrl = ref(vehicleUrl(props.tag, game.value, props.size))

watch(() => [props.tag, props.size], () => {
  targetUrl.value = vehicleUrl(props.tag, game.value, props.size)
})

const fallbackUrl = computed(() => vehicleFallbackUrl(props.size))

const style = computed(() => {
  if (props.size != 'small') return {}


  function getOffset() {
    switch (props.tag) {
      case 'ussr:R46_KV-13_SH':
      case 'usa:A72_T25_2_SH':
      case 'uk:GB107_Cavalier_SH':
      case 'sweden:S14_Ikv_103_SH':
      case 'poland:Pl17_DS_PZlnz_SH':
      case 'germany:G24_VK3002DB_SH':
      case 'france:F43_AMC_35_SH':
      case 'china:Ch24_Type64_SH':
        return -35
      default: return 0
    }
  }

  const offset = getOffset()
  if (offset == 0) return {}
  return {
    transform: `translateX(${offset}%)`,
    zIndex: -1
  }

})
</script>
