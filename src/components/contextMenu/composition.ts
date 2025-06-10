import { readonly, shallowRef, type Ref, type ShallowRef } from "vue"


export function useCheckbox(value: boolean = false) {
  const checkbox = shallowRef(value)

  const toggle = () => {
    checkbox.value = !checkbox.value
  }

  const set = (value: boolean) => {
    checkbox.value = value
  }

  return { toggle, set, value: readonly(checkbox) }
}
