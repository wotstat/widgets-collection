import type { InjectionKey } from 'vue'

export const language = Symbol() as InjectionKey<string>
export const isInPreview = Symbol() as InjectionKey<boolean>
export const isInMiniPreview = Symbol() as InjectionKey<boolean>
export const obsStudioVersion = Symbol() as InjectionKey<string>