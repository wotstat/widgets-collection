import { inject, InjectionKey, ModelRef, Ref, ref, watch } from "vue";

export const stateMapKey = Symbol() as InjectionKey<Ref<Map<string, any>>>

export function useSetStateMap(key: string | undefined, value: ModelRef<any>, defaultValue?: any) {

  const map = inject(stateMapKey, ref(new Map()));

  watch(map, m => {
    if (!key) return;
    value[0] = m.get(key) ?? defaultValue;
  }, { immediate: true });

  watch(value, v => {
    if (!key) return;
    map.value.set(key, v);
  }, { immediate: true });

}