import { useRoute } from "vue-router";

function snakeCaseToCamelCase(str: string) {
  return str.replace(/([-_]\w)/g, g => g[1].toUpperCase());
}

type TypeObjectConstructor<T> = { new(...args: any[]): T & {} }
type TypeConstructor<T> = TypeObjectConstructor<T> | { (value: string | undefined): T }
type OptionsProp<T, D = T> = {
  type?: TypeConstructor<T>,
  default?: D
}
type Prop<T, D = T> = TypeConstructor<T> | OptionsProp<T, D>;

type BooleanProp = BooleanConstructor | { type: BooleanConstructor }

type PropsOptions<P = Record<string, unknown>> = {
  [K in keyof P]: Prop<P[K]> | null;
};

type ExtractPropTypes<O> = { [K in keyof O]: InferPropType<O[K]> }
type InferPropType<T> = T extends BooleanProp ? boolean :
  T extends Prop<infer V, infer D> ? T extends { default: D } ? V : T extends TypeObjectConstructor<any> ? (V | undefined) : V : never

export function useQueryParams<T extends PropsOptions>(values: T): ExtractPropTypes<T> {
  const route = useRoute();
  const query = route.query;
  const queryParams = Object.entries(query)
    .map(([key, value]) => ([snakeCaseToCamelCase(key), Array.isArray(value) ? value.join(',') : value?.toString()] as const))
  const queryParamsMap = new Map(queryParams)


  function isConstructor(value: unknown): value is ObjectConstructor {
    try {
      new new Proxy(value as any, { construct: () => ({}) });
      return true;
    } catch (err) {
      return false;
    }
  }

  return Object.fromEntries(Object.entries(values)
    .map(([key, value]) => {
      const val = queryParamsMap.get(key)
      if (typeof value === 'object' && value != null && value.type) {
        const useDefault = val === undefined && value.default != undefined
        if (value.type === Boolean) return [key, useDefault ? value.default : val === 'true']
        if (isConstructor(value.type)) return [key, useDefault ? value.default : new value.type(val)]
        if (typeof value.type === 'function') return [key, useDefault ? value.default : (value.type as any)(val)]
      }

      if (value === Boolean) return [key, val === 'true']
      if (isConstructor(value)) return [key, val === undefined ? undefined : new value(val)]
      if (typeof value === 'function') return [key, (value as any)(val)]

      return [key, undefined]
    })
    .map(([key, value]) => [key, typeof value == 'object' && 'valueOf' in value && typeof value.valueOf === 'function' ? value.valueOf() : value])
  ) as ExtractPropTypes<T>
}

export function oneOf<T extends string, D extends T | undefined>(
  values: readonly T[] | T[],
  defaultValue?: D
): (value: string | undefined) => D extends T ? T : T | undefined {
  return value => {
    if (value === undefined || !values.includes(value as T)) {
      return defaultValue as any;
    }
    return value as T;
  };
}

export function arrayOfOneOf<T extends string>(
  values: readonly T[]
): (value: string | undefined) => T[] {
  return value => {
    if (value === undefined) {
      return [];
    }
    return value.split(',').filter(v => values.includes(v as T)) as T[];
  };
}

export function NumberDefault(defaultValue: number = 0) {
  return {
    type: Number,
    default: defaultValue
  }
}