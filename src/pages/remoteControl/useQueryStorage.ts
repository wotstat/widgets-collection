import { ref, Ref, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';

interface Options {
  base64?: boolean;
  clearOnUnmount?: boolean;
}

/**
 * Creates a reactive ref synchronized with the URL query parameter.
 * @param name - The query parameter key.
 * @param defaultValue - The default value if the query param is absent.
 * @param options - Options to control base64 encoding and clearing on unmount.
 * @returns A Ref<T> that stays in sync with the URL query.
 */
export function useQueryStorage<T>(
  name: string,
  defaultValue: T,
  options: Options = { base64: false, clearOnUnmount: false }
): Ref<T> {
  const route: RouteLocationNormalizedLoaded = useRoute();
  const router = useRouter();

  // Helper to decode from query string
  function decodeParam(param: unknown): T | null {
    if (param === null || param === undefined) return null;
    let raw: string;
    if (Array.isArray(param)) {
      raw = String(param[0]);
    } else {
      raw = String(param);
    }
    try {
      const decoded = options.base64
        ? atob(raw)
        : decodeURIComponent(raw);
      return JSON.parse(decoded) as T;
    } catch {
      return null;
    }
  }

  // Helper to encode to query string
  function encodeParam(val: T): string {
    const json = JSON.stringify(val);
    return options.base64 ? btoa(json) : encodeURIComponent(json);
  }

  // Initialize ref with either query value or default
  const initial = decodeParam(route.query[name]);
  const state = ref(initial !== null ? initial : defaultValue) as Ref<T>;

  // Sync changes to URL
  watch(
    state,
    (newVal) => {
      const encoded = encodeParam(newVal);
      const newQuery = { ...route.query } as Record<string, string>;
      newQuery[name] = encoded;
      router.replace({ query: newQuery }).catch(() => { });
    },
    { deep: true }
  );

  // Clear query on component unmount if requested
  if (options.clearOnUnmount) {
    onBeforeUnmount(() => {
      const { [name]: _, ...rest } = route.query;
      router.replace({ query: rest }).catch(() => { });
    });
  }

  return state;
}
