import { inject, InjectionKey, ModelRef, Ref, ref, ShallowRef, watch } from "vue";

export const clipWrapper = Symbol() as InjectionKey<{
  register: (id: string, info: { top: ShallowRef<number>, svg: string }) => void;
  unregister: (id: string) => void;
}>