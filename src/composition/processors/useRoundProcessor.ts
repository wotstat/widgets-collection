import { computed, toValue, WatchSource } from "vue";

export function roundProcessor(value: number, precision: number = 0) {
  return value.toFixed(precision);
}

export function useRoundProcessor(value: WatchSource<number> | WatchSource<number>[], precision: number = 0) {
  if (Array.isArray(value)) return computed(() => value.map(v => roundProcessor(toValue(v), precision)));
  return computed(() => roundProcessor(toValue(value), precision));

}