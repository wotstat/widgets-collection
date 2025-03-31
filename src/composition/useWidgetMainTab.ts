import { useRoute } from "vue-router";
import { useMainTab } from "./useMainTab";
import { useQueryParams } from "./useQueryParams";

export function useWidgetMainTab() {
  const route = useRoute();
  const { saveKey } = useQueryParams({ saveKey: { type: String, default: '' } })

  return useMainTab(`${route.path}_${saveKey}`)
}