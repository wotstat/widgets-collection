import { MaybeComputedElementRef, useElementBounding, useElementSize } from "@vueuse/core";
import { useElementScrollSize } from "./useElementScrollSize";
import { computed } from "vue";

export function useHasScroll(element: MaybeComputedElementRef) {
  const scrollSize = useElementScrollSize(element);
  const elementSize = useElementSize(element);

  const hasHorizontalScroll = computed(() => scrollSize.scrollWidth.value > elementSize.width.value);
  const hasVerticalScroll = computed(() => scrollSize.scrollHeight.value > elementSize.height.value);

  return { hasHorizontalScroll, hasVerticalScroll };
}