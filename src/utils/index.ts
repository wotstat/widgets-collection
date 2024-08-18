import { isWidgetDefine } from "./defineWidget";

export function pascalCaseToKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function pathResolve(...path: string[]) {
  const res: string[] = [];

  for (const p of path) {
    if (p.startsWith('/')) {
      res.length = 0;
    }

    for (const part of p.split('/')) {
      if (part === '..') {
        res.pop();
      } else if (part !== '.' && part !== '') {
        res.push(part);
      }
    }
  }

  return res.join('/');
}


export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export function deepMerge<T extends Object>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object') {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key] as any, source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}


export function isModule(glob: unknown): glob is { default: unknown } {
  return typeof glob == 'object' && glob != null && 'default' in glob
}

export function getAllWidgets() {
  return Object.entries(import.meta.glob('../widgets/**/define.widget*.ts', { eager: true }))
    .map(([key, value]) => isModule(value) && isWidgetDefine(value.default) ? [key, value.default.options] as const : null)
    .filter(t => t !== null)
    .map(([key, value]) => [key.replace('../', '').split('/').filter(t => !t.startsWith('define.widget')).join('/'), value] as const)
}

export function getAllWidgetsRoutes() {
  return getAllWidgets().map(([path, options]) => {
    const targetPath = pascalCaseToKebabCase('/' + pathResolve(path.replace('widgets/', '/'), options.postfix))

    return {
      route: targetPath,
      path,
      options
    }
  })
}