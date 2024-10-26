import { IconType } from "@/components/efficiencyIcon/utils";
import { deepMerge } from ".";
import { i18n } from "./i18nShared";


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

export type MultiSlotParamSlot = {
  value: string,
  icon: IconType,
  label: string,
  modifications?: Omit<MultiSlotParamSlot, 'modifications'>[]
}
export interface MultiSlotParam extends BaseParam {
  type: 'multi-slot'
  target: string
  label: string
  min: number
  max: number
  slots: MultiSlotParamSlot[]
  default: string[]
}

export type AccentColorParam = 'accentColorParam'
export type BackgroundColorParam = 'backgroundColorParam'
export type SeparatorParam = 'separator'

export type WidgetParam = CheckboxParam | SelectParam | ColorParam | IntParam | AccentColorParam | BackgroundColorParam | StringParam | RandomStringParam | MultiSlotParam | SeparatorParam

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
  i18n: i18n,
  params: [],
  beta: false
}

const optionsSymbol = Symbol('options');

export function defineWidget(options: Partial<Options>) {

  const target = { ...structuredClone(defaultOptions), ...options }
  if (options.i18n) target.i18n = deepMerge(structuredClone(i18n), options.i18n)

  return {
    optionsSymbol,
    options: target
  }
}

export function isWidgetDefine(obj: unknown): obj is { optionsSymbol: symbol, options: Options } {
  if (typeof obj !== 'object' || obj === null) return false;
  if (!('optionsSymbol' in obj)) return false;
  return obj.optionsSymbol === optionsSymbol;
}