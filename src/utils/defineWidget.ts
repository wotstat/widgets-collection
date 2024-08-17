import { deepMerge, DeepPartial } from ".";


export type Options = {
  name: string,
  description: string,
  widget: string,
  postfix: string,
  preview: string | null,
}

const defaultOptions: Options = {
  name: '',
  description: '',
  postfix: '',
  widget: './Widget.vue',
  preview: './Preview.vue',
}

const optionsSymbol = Symbol('options');

export function defineWidget(options: DeepPartial<Options>) {
  return {
    optionsSymbol,
    options: deepMerge(structuredClone(defaultOptions), options)
  }
}

export function isWidgetDefine(obj: unknown): obj is { optionsSymbol: symbol, options: Options } {
  if (typeof obj !== 'object' || obj === null) return false;
  if (!('optionsSymbol' in obj)) return false;
  return obj.optionsSymbol === optionsSymbol;
}