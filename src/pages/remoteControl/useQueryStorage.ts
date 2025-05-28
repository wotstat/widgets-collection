import { ref, Ref, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';

interface Options {
  base64?: boolean;
  clearOnUnmount?: boolean;
  /**
   * Debounce delay in milliseconds (default: 0 = no debounce)
   */
  debounceMs?: number;
  /**
   * History update method: 'push' to add a new entry, 'replace' to replace current (default: 'replace')
   */
  history?: 'push' | 'replace';
}

/**
 * Creates a reactive ref synchronized with the URL query parameter.
 * Supports optional Base64 encoding, automatic clearing on unmount,
 * debouncing, choice of history method (push vs replace),
 * and reacts to browser navigation (popstate).
 *
 * @param name - The query parameter key.
 * @param defaultValue - The default value if the query param is absent.
 * @param options - Configuration options.
 * @returns A Ref<T> that stays in sync with the URL query.
 */
export function useQueryStorage<T>(
  name: string,
  defaultValue: T,
  options: Options = { base64: false, clearOnUnmount: false, debounceMs: 0, history: 'replace' }
): Ref<T> {
  const route: RouteLocationNormalizedLoaded = useRoute();
  const router = useRouter();

  // Decode stored query parameter to value
  function decodeParam(param: unknown): T | null {
    if (param == null) return null;
    const raw = Array.isArray(param) ? String(param[0]) : String(param);
    try {
      const decoded = options.base64
        ? atob(raw)
        : decodeURIComponent(raw);
      return (typeof defaultValue === 'string'
        ? (decoded as any)
        : JSON.parse(decoded)) as T;
    } catch {
      return null;
    }
  }

  // Encode a value to store in query
  function encodeParam(val: T): string {
    const json = typeof defaultValue === 'string' ? (val as any) : JSON.stringify(val);
    return options.base64 ? btoa(json) : encodeURIComponent(json);
  }

  // Initialize state from query or default
  const initial = decodeParam(route.query[name]);
  const state = ref(initial != null ? initial : defaultValue) as Ref<T>;

  // Update query helper
  function updateQuery(val: T) {
    const encoded = encodeParam(val);
    const newQuery = { ...route.query, [name]: encoded } as Record<string, string>;
    const navMethod = options.history === 'push' ? router.push : router.replace;
    navMethod({ query: newQuery }).catch(() => { });
  }

  // Watch state changes (with optional debounce) to sync to URL
  if (options.debounceMs && options.debounceMs > 0) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    watch(
      state,
      (newVal) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => updateQuery(newVal), options.debounceMs);
      },
      { deep: true }
    );
  } else {
    watch(
      state,
      (newVal) => updateQuery(newVal),
      { deep: true }
    );
  }

  // React to route.query changes (e.g., back/forward navigation)
  watch(
    () => route.query[name],
    (newParam) => {
      const decoded = decodeParam(newParam);
      if (decoded != null && decoded !== state.value) {
        state.value = decoded;
      }
    }
  );

  // Optionally clear query on unmount
  if (options.clearOnUnmount) {
    onBeforeUnmount(() => {
      const { [name]: _, ...rest } = route.query;
      const nav = options.history === 'push' ? router.push : router.replace;
      nav({ query: rest }).catch(() => { });
    });
  }

  return state;
}
