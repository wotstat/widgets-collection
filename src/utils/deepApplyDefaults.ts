export function deepApplyDefaults<T>(target: Partial<T> = {}, defaults: T): T {

  if (Array.isArray(defaults)) {
    if (Array.isArray(target)) return target as T;
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
