


export function gettext<T extends undefined | null | string>(data: Record<string, string>,
  key: string,
  params: Record<string, any> = {},
  defaultValue: T | ((key: string) => string) = k => k): T | string {
  if (data[key]) {
    return data[key]
      .replaceAll(/%\((\w+)\).?/g, (_, p) => params[p] || `{{${p}}}`)
      .replaceAll('%%', '%')
  }

  if (typeof defaultValue === 'function') {
    return defaultValue(key)
  }

  return defaultValue

}