import { useLocalStorage } from "@vueuse/core";

export const accent = useLocalStorage('accentColor', '#4ee100')
export const background = useLocalStorage('backgroundColor', '#292929')