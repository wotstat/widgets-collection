import { useLocalStorage } from "@vueuse/core";

export const accent = useLocalStorage('accentColor', '#ff0000')
export const background = useLocalStorage('backgroundColor', '#ff000000')