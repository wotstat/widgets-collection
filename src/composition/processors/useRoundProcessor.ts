import { computed, toValue, WatchSource } from "vue";


export function useRoundProcessor(value: WatchSource<number>, precision: number = 0) {
  return computed(() => toValue(value).toFixed(precision));
}