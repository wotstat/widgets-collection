import {
  isInPreview as isInPreviewKey,
  isInMiniPreview as isInMiniPreviewKey,
  obsStudioVersion as obsStudioVersionKey
} from "@/utils/provides";
import { inject } from "vue";

export function useStateClass() {

  const isInPreview = inject(isInPreviewKey, false)
  const isInMiniPreview = inject(isInMiniPreviewKey, false)
  const obsStudioVersion = inject(obsStudioVersionKey, undefined)


  return {
    'is-in-obs': obsStudioVersion !== undefined,
    'is-in-preview': isInPreview,
    'is-in-mini-preview': isInMiniPreview
  }
}