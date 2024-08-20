import { computed, toValue, WatchSource } from "vue";


export function useSpaceProcessor(value: WatchSource<number>) {
  return computed(() => toValue(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
}