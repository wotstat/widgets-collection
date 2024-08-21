import { useLocalStorage } from "@vueuse/core";
import { useRoute } from "vue-router";


export function useWidgetStorage<T>(postfix: string, defaultValue: T) {
  const route = useRoute();
  return useLocalStorage(route.path + (postfix ?? ""), defaultValue);
}