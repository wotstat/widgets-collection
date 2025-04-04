import { readonly, ref } from "vue"


const isInWidgetMod = ref(false)
const readonlyIsInWidgetMod = readonly(isInWidgetMod)

let isChecking = false
async function checkIsInWidget() {
  for (let i = 0; i < 1000 && !isInWidgetMod.value; i += 10) {
    isInWidgetMod.value = (window as any).isFromWotstatWidgetMod
    await new Promise(resolve => setTimeout(resolve, 10))
  }
}

export function useIsInWidgetMod() {

  if (!isChecking) {
    isChecking = true
    checkIsInWidget()
  }

  return readonlyIsInWidgetMod
}