import { defineWidget } from "@/utils/defineWidget";


export type Status = 'connected' | 'connecting' | 'disconnected'
export type Props = {
  web: Status
  dataProvider: Status
  dataProviderVersion: number | null
  database: Status
  relay: Status
  remote: Status
}

export default defineWidget({
  name: "Проверка соединения",
  description: "Этот виджет проверяет все виды соединения с сервером",
  params: [
    { type: 'backgroundColorParam' },
  ]
})