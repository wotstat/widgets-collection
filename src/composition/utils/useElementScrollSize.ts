import { MaybeComputedElementRef, unrefElement, useMutationObserver, useResizeObserver } from "@vueuse/core";
import { onMounted, ref, toValue, watch } from "vue";

export function useElementScrollSize(element: MaybeComputedElementRef) {

  const scrollWidth = ref(0);
  const scrollHeight = ref(0);

  function calc() {
    const el = toValue(element) as HTMLElement;
    if (!el) return;
    scrollWidth.value = el.scrollWidth;
    scrollHeight.value = el.scrollHeight;
  }

  useMutationObserver(element, () => calc(), { childList: true, subtree: true, attributes: true });
  onMounted(() => calc())
  watch(() => unrefElement(element), () => calc());


  return { scrollWidth, scrollHeight };

}