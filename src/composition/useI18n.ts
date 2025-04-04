import { computed, inject } from "vue"
import { useRoute } from "vue-router"
import { useReactiveState, useWidgetSdk } from "./widgetSdk"
import { language as languageKey } from "@/utils/provides"


type Locale<K extends string> = Record<K, string>
type I18n<L extends string, K extends string> = Record<L, Locale<K>>

const fallbackMapper = {
  'be': 'ru',
} as const

function getLocale<L extends string, K extends string>(i18n: I18n<L, K>, language: string | undefined) {
  if (language) {
    if (language in i18n) return i18n[language as L]
    if (language in fallbackMapper) {
      const target = fallbackMapper[language as keyof typeof fallbackMapper]
      if (target in i18n) return i18n[target as L]
    }
  }

  if ('en' in i18n) return i18n['en' as L]
  if ('ru' in i18n) return i18n['ru' as L]
  return i18n[Object.keys(i18n)[0] as L]
}

export function useI18n<L extends string, K extends string>(i18n: I18n<L, K>, fallback?: L) {
  return {
    t: (key: K, locale?: L) => getLocale(i18n, locale ?? fallback)[key]
  }
}

export function useI18nRef<L extends string, K extends string>(i18n: I18n<L, K>, fallback?: L) {
  const route = useRoute()
  const previewLang = inject(languageKey, undefined)

  if (previewLang) {
    const currentLocale = computed(() => getLocale(i18n, previewLang ?? fallback))
    return {
      t: (key: K) => computed(() => currentLocale.value[key] ?? key),
    }
  }


  const { sdk } = useWidgetSdk()
  const gameLanguage = useReactiveState(sdk.data.game.language)

  const language = computed(() => route.query.language as string || gameLanguage.value)
  const currentLocale = computed(() => getLocale(i18n, language.value ?? fallback))

  return {
    t: (key: K) => computed(() => currentLocale.value[key] ?? key),
  }
}