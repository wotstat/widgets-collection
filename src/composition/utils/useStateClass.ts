import {
  isInPreview as isInPreviewKey,
  isInMiniPreview as isInMiniPreviewKey,
  obsStudioVersion as obsStudioVersionKey,
  isInWidgetMod as isInWidgetModKey
} from "@/utils/provides";
import { computed, inject, ref } from "vue";

export function useStateClass() {

  const isInPreview = inject(isInPreviewKey, false)
  const isInMiniPreview = inject(isInMiniPreviewKey, false)
  const obsStudioVersion = inject(obsStudioVersionKey, undefined)
  const isInWidgetMod = inject(isInWidgetModKey, ref(false))


  return computed(() => ({
    'is-in-obs': obsStudioVersion !== undefined,
    'is-in-preview': isInPreview,
    'is-in-mini-preview': isInMiniPreview,
    'is-in-widget-mod': isInWidgetMod.value
  }))
}