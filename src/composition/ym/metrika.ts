import { ref } from "vue"

function loadScript(callback: () => void, err?: OnErrorEventHandler) {
  const head = document.head || document.getElementsByTagName('head')[0]
  const script = document.createElement('script')

  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'

  head.appendChild(script)

  script.onload = callback
  if (err) script.onerror = err
}

export const isInit = ref(false)
export const metrikaId = Number.parseInt(import.meta.env.VITE_YM_ID)

export function setup(params: ym.InitParameters) {
  if (isInit.value) return console.warn('Metrika already initialized')
  loadScript(async () => {
    // @ts-ignore
    window['ym'] = () => (window.ym.a || []).push(arguments)

    ym(metrikaId, 'init', params)
    isInit.value = true
  })
}
