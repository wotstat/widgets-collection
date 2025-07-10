import { defineWidget } from "@/utils/defineWidget";

export type Props = {
  header: {
    title: string;
    subtitle: TaskType | string;
    levels: [number, number]
  }
  tasks: {
    type: string
    description: {
      iconID?: string
      isInOrGroup: boolean
      title: string | null
      description: string
      containerType: 'body' | 'header'
    }
    config: {
      isMain: boolean
      groupID?: number
    }
  }[][]
}

export const enum TaskType {
  HIT,
  KILLS,
  ASSIST,
  BATTLE,
  MASTER,
  UNKNOWN
}

export default defineWidget({
  name: "Текущая ЛБЗ (удалённое управление)",
  description: "Позволяет вывести на экран текущую выполняемую ЛБЗ",
  params: [

  ]
})