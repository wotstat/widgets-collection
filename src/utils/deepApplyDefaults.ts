export function deepApplyDefaults<T>(target: Partial<T> = {}, defaults: T): T {

  if (target === undefined || target === null) {
    return defaults;
  }

  if (Array.isArray(defaults)) {
    if (Array.isArray(target)) return target as T;
    return defaults as T;
  }

  if (defaults instanceof Map) {
    if (target instanceof Map) return target as T;
    return defaults as T;
  }

  if (defaults instanceof Set) {
    if (target instanceof Set) return target as T;
    return defaults as T;
  }

  const result = {} as any;

  for (const key in defaults) {
    const defVal = defaults[key as keyof T];
    const tgtVal = (target as any)[key];

    if (tgtVal === undefined) {
      result[key] = defVal;
      continue;
    }

    const defType = Array.isArray(defVal) ? "array" : typeof defVal;
    const tgtType = Array.isArray(tgtVal) ? "array" : typeof tgtVal;

    if (defType !== tgtType) {
      result[key] = defVal;
      continue;
    }

    if (defType === "object" && defVal !== null) {
      result[key] = deepApplyDefaults(tgtVal, defVal);
      continue;
    }

    result[key] = tgtVal;
  }

  return result as T;
}
