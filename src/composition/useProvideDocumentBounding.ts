import { useElementBounding } from "@vueuse/core";
import { toRef, watch, watchEffect } from "vue";

export function useProvideDocumentBounding() {
  const size = useElementBounding(document.body);

  watchEffect(() => {
    parent.postMessage({
      type: 'documentBounding', value: {
        width: size.width.value,
        height: size.height.value,
      }
    }, '*');
  })
}