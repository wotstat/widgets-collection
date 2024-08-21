import { useRoute } from "vue-router";

function snakeCaseToCamelCase(str: string) {
  return str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
}

export function useQueryParams<T>() {
  const route = useRoute();
  const query = route.query;
  return Object.fromEntries(Object.entries(query).map(([key, value]) => ([snakeCaseToCamelCase(key), value]))) as Partial<T>;
}