import { deepMerge } from ".";

export type CheckboxParam = {
  type: 'checkbox'
  target: string
  label: string
  default: boolean
}

export type ColorParam = {
  type: 'color'
  target: string
  label: string
  default: string
}

export type IntParam = {
  type: 'int'
  target: string
  label: string
  default: number
}

export type AccentColorParam = 'accentColorParam'
export type BackgroundColorParam = 'backgroundColorParam'

export type WidgetParam = CheckboxParam | ColorParam | IntParam | AccentColorParam | BackgroundColorParam

export type Options = {
  name: string,
  description: string,
  widget: string,
  postfix: string,
  preview: string | null,
  params: WidgetParam[],
}

const defaultOptions: Options = {
  name: '',
  description: '',
  postfix: '',
  widget: './Index.vue',
  preview: './Preview.vue',
  params: [],
}

const optionsSymbol = Symbol('options');

export function defineWidget(options: Partial<Options>) {
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