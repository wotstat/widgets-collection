import { useLocalStorage } from "@vueuse/core";
import { useRoute } from "vue-router";


export function useWidgetPreviewStorage<T>(name: string, value: T) {
  const route = useRoute()

  return useLocalStorage(`${route.path}_${name}`, value)
}