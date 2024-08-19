import { useLocalStorage } from "@vueuse/core";

export const accent = useLocalStorage('accentColor', '36ff50')
export const background = useLocalStorage('backgroundColor', '292929')