import { MaybeComputedElementRef, unrefElement, useElementBounding, useEventListener, useMutationObserver, useResizeObserver } from "@vueuse/core";
import { onMounted, ref, toValue, watch } from "vue";

export function useElementScrollSize(element: MaybeComputedElementRef) {

  const scrollWidth = ref(0);
  const scrollHeight = ref(0);

  function calc() {
    const el = toValue(element) as HTMLElement;
    if (!el) return;
    if (scrollWidth.value != el.scrollWidth) scrollWidth.value = el.scrollWidth;
    if (scrollHeight.value != el.scrollHeight) scrollHeight.value = el.scrollHeight;
  }


  const { width } = useElementBounding(element)
  watch(width, () => calc());
  useMutationObserver(element, () => calc(), { childList: true, subtree: true, });
  onMounted(() => calc())
  watch(() => unrefElement(element), () => calc());
  useEventListener(window, 'resize', () => calc());

  function update() {
    calc();
  }

  return { scrollWidth, scrollHeight, update };

}