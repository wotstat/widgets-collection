import { deepMerge } from ".";


interface BaseParam {
  visible?: boolean | ((params: Record<string, any>) => boolean)
}

export interface CheckboxParam extends BaseParam {
  type: 'checkbox'
  target: string
  label: string
  default: boolean
}

export interface SelectParam extends BaseParam {
  type: 'select'
  target: string
  label: string
  variants: { value: string, label: string }[]
  default: string
}

export interface ColorParam extends BaseParam {
  type: 'color'
  target: string
  label: string
  default: string
}

export interface IntParam extends BaseParam {
  type: 'int'
  target: string
  label: string
  default: number
}

export interface StringParam extends BaseParam {
  type: 'string'
  target: string
  label: string
  default: string
}

export interface RandomStringParam extends BaseParam {
  type: 'random-string'
  target: string
  label: string
  length?: number
  default?: string
}

export type AccentColorParam = 'accentColorParam'
export type BackgroundColorParam = 'backgroundColorParam'

export type WidgetParam = CheckboxParam | SelectParam | ColorParam | IntParam | AccentColorParam | BackgroundColorParam | StringParam | RandomStringParam

type Language = string

export type Options = {
  name: string,
  description: string,
  widget: string,
  postfix: string,
  preview: string | null,
  readme: string | null,
  i18n: Record<Language, Record<string, string>>,
  params: WidgetParam[],
  beta: boolean
}

const defaultOptions: Options = {
  name: '',
  description: '',
  postfix: '',
  widget: './Index.vue',
  preview: './Preview.vue',
  readme: './README.md',
  i18n: {},
  params: [],
  beta: false
}

const optionsSymbol = Symbol('options');

export function defineWidget(options: Partial<Options>) {
  return {
    optionsSymbol,
    options: { ...structuredClone(defaultOptions), ...options }
  }
}

export function isWidgetDefine(obj: unknown): obj is { optionsSymbol: symbol, options: Options } {
  if (typeof obj !== 'object' || obj === null) return false;
  if (!('optionsSymbol' in obj)) return false;
  return obj.optionsSymbol === optionsSymbol;
}