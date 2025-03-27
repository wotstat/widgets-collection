import { useLocalStorage } from "@vueuse/core";

export const defaultAccent = '36ff50'
export const defaultBackground = '292929'

export const accent = useLocalStorage('accentColor', defaultAccent)
export const background = useLocalStorage('backgroundColor', defaultBackground)