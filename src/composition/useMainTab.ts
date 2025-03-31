import { ref, onMounted, onUnmounted } from 'vue'

export function useMainTab(
  localStorageKey = 'app-main-tab',
  heartbeatIntervalMs = 100,
  heartbeatExpiryMs = 150
) {
  const isMainTab = ref(false)
  const tabId = Date.now().toString() + Math.random().toString(36)
  let heartbeatInterval: ReturnType<typeof setInterval> | null = null
  let checkInterval: ReturnType<typeof setInterval> | null = null

  const sendHeartbeat = () => {
    localStorage.setItem(localStorageKey, JSON.stringify({
      id: tabId,
      timestamp: Date.now()
    }))
  }

  const tryElectAsMain = () => {
    const currentMain = localStorage.getItem(localStorageKey)
    if (!currentMain) {
      sendHeartbeat()
      isMainTab.value = true
      return
    }

    const { id, timestamp } = JSON.parse(currentMain)

    // If current main tab heartbeat is stale, elect self
    if (Date.now() - timestamp > heartbeatExpiryMs) {
      sendHeartbeat()
      isMainTab.value = true
    } else {
      isMainTab.value = (id === tabId)
    }
  }

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === localStorageKey) {
      tryElectAsMain()
    }
  }

  onMounted(() => {
    window.addEventListener('storage', handleStorageEvent)

    // Attempt to elect immediately
    tryElectAsMain()

    // Main tab sends heartbeat periodically
    heartbeatInterval = setInterval(() => {
      if (isMainTab.value) {
        sendHeartbeat()
      }
    }, heartbeatIntervalMs)

    // All tabs periodically check for main tab validity
    checkInterval = setInterval(() => {
      tryElectAsMain()
    }, heartbeatIntervalMs)
  })

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageEvent)
    heartbeatInterval && clearInterval(heartbeatInterval)
    checkInterval && clearInterval(checkInterval)

    if (isMainTab.value) {
      localStorage.removeItem(localStorageKey)
    }
  })

  return isMainTab
}
