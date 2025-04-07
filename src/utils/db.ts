
import { ResponseJSON, createClient, type ClickHouseSettings } from "@clickhouse/client-web";
import { computed, ref, shallowRef, watch } from "vue";

export const clickhouse = createClient({
  url: import.meta.env.VITE_CLICKHOUSE_URL,
  username: import.meta.env.VITE_CLICKHOUSE_USER,
  database: import.meta.env.VITE_CLICKHOUSE_DATABASE,
  password: import.meta.env.VITE_CLICKHOUSE_PASSWORD,
  clickhouse_settings: {
    max_temporary_columns: '1000'
  }
});

if (!crypto.randomUUID) {
  crypto.randomUUID = () => {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Set version to 0100
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Set variant to 10
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export const CACHE_SETTINGS = { use_query_cache: 1, query_cache_ttl: 600 } as ClickHouseSettings
export const SHORT_CACHE_SETTINGS = { use_query_cache: 1, query_cache_ttl: 10 } as ClickHouseSettings
export const LONG_CACHE_SETTINGS = { use_query_cache: 1, query_cache_ttl: 600 } as ClickHouseSettings

export const loading = Symbol('loading');
export const success = Symbol('success');
export const error = Symbol('error');
export type Status = typeof loading | typeof success | {
  status: typeof error,
  reason: string
};

export function mergeStatuses(...statuses: Status[]): Status {
  if (statuses.some(s => isErrorStatus(s))) return statuses.find(s => isErrorStatus(s)) as { status: typeof error, reason: string };
  if (statuses.some(s => s === loading)) return loading;
  return success;
}

export function isErrorStatus(status: Status): status is { status: typeof error, reason: string } {
  return typeof status !== 'symbol' && status.status === error;
}

const activeQueries = new Map<string, Promise<unknown>>();
const cachedResults = new Map<string, unknown>();
export async function query<T>(query: string, { allowCache = true, settings = {} as ClickHouseSettings } = {}) {

  if (activeQueries.has(query)) return activeQueries.get(query) as Promise<ResponseJSON<T>>;

  const current = new Promise<ResponseJSON<T>>(async (resolve, reject) => {
    try {
      // await new Promise(resolve => setTimeout(resolve, 100000));
      // await new Promise(resolve => setTimeout(resolve, 1000));

      const result = await clickhouse.query({ query, format: 'JSON', clickhouse_settings: settings });
      const response = await result.json<T>()

      if (allowCache) cachedResults.set(query, response);
      resolve(response);
    } catch (error) {
      return reject(error);
    }
  })

  if (allowCache) activeQueries.set(query, current);

  return current;
}

export function queryComputed<T>(queryString: () => string | null, { settings = {} as ClickHouseSettings, enabled = ref(true), allowCache = true } = {}) {
  const result = shallowRef<{ status: Status, data: T[] }>({ status: loading, data: [] });

  watch(() => [queryString(), enabled.value] as const, async ([q, enabled]) => {
    if (!q) return;
    if (!enabled) return;

    try {
      if (cachedResults.has(q) && allowCache) {
        result.value = { data: (cachedResults.get(q) as ResponseJSON<T>).data, status: success };
        return;
      }
      result.value = { data: [], status: loading };
      const { data } = await query<T>(q, { settings, allowCache });
      result.value = { data, status: success };
    } catch (reason) {
      console.error(reason);
      result.value = { data: [], status: { status: error, reason: (reason as any).message as string } };
    }
  }, { immediate: true })

  return result
}

export function queryComputedFirst<T>(queryString: () => string | null, defaultValue: T) {
  const result = queryComputed<T>(queryString);

  return computed(() => ({
    status: result.value.status as Status,
    data: result.value.data[0] ?? defaultValue
  }))

}

export function queryAsync<T>(queryString: string, { enabled = ref(true), settings = {} as ClickHouseSettings } = {}) {
  const result = shallowRef<{ status: Status, data: T[] }>({ status: loading, data: [] });

  const stop = watch(enabled, async (value) => {
    if (!value) return;

    setTimeout(() => stop(), 0);

    try {
      const { data } = await query<T>(queryString, { settings });
      result.value = { data, status: success };
    } catch (reason) {
      console.error(reason);
      result.value = { data: [], status: { status: error, reason: (reason as any).message as string } };
    }
  }, { immediate: true })

  return result
}

export function queryAsyncFirst<T>(queryString: string, defaultValue: T, { enabled = ref(true), settings = {} as ClickHouseSettings } = {}) {
  const result = queryAsync<T>(queryString, { enabled, settings });

  return computed(() => ({
    status: result.value.status as Status,
    data: result.value.data[0] ?? defaultValue
  }))
}

export function dateToDbIndex(date: Date) {
  return (date.getTime() * 1e10).toLocaleString('fullwide', { useGrouping: false })
}

export function dbIndexToDate(index: string) {
  const time = parseInt(index.slice(0, index.length - 10))
  return Math.floor(time / 1000)
}

export function dateToDbDate(date: Date) {
  return date.toISOString().slice(0, 10)
}