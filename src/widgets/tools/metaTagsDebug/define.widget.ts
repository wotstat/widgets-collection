import { defineWidget } from "@/utils/defineWidget";


export type Props = {
  selectedLine: number;
  values: {
    autoHeight: boolean;
    hangarOnly: boolean;
    readyToClearData: boolean;
    useSniperMode: boolean;
    preferredTopLayer: boolean;
    unlimitedSize: boolean;
    relativeFont: boolean;
    insetsPadding: boolean;
    oscillateHeight: boolean;
  }
  insets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
}

export default defineWidget({
  name: "Debug мета-тегов",
  description: "Этот виджет позволяет проверить взаимодействие виджета с модом",
  params: [
    'backgroundColorParam',
  ]
})