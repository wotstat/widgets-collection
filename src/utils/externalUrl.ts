const base = (() => {
  if (typeof location === 'undefined') return { prefix: '', domain: 'wotstat.info' }
  if (import.meta.env.MODE === 'development') return { prefix: '', domain: 'mtstat.info' }

  const matchWot = location.hostname.match(/^(.*)\.widgets\.wotstat\.info$/i)
  if (matchWot) return { prefix: `${matchWot[1]}.`, domain: 'wotstat.info' }

  const matchMt = location.hostname.match(/^(.*)\.widgets\.mtstat\.info$/i)
  if (matchMt) return { prefix: `${matchMt[1]}.`, domain: 'mtstat.info' }

  if (location.hostname === 'widgets.mtstat.info') return { prefix: '', domain: 'mtstat.info' }

  return { prefix: '', domain: 'wotstat.info' }
})()

export const ANALYTICS_URL = `https://${base.prefix}${base.domain}`
export const CEF_STORAGE_URL = `https://${base.prefix}cef-storage.${base.domain}`
export const CLICKHOUSE_URL = import.meta.env.VITE_CLICKHOUSE_URL || `https://${base.prefix}db.${base.domain}`
export const ANALYTICS_REALTIME_URL = import.meta.env.VITE_ANALYTICS_REALTIME_URL || `https://${base.prefix}realtime.${base.domain}`
export const STATIC_URL = import.meta.env.VITE_STATIC_URL || `https://${base.prefix}static.${base.domain}`
export const WIDGETS_URL = import.meta.env.VITE_WIDGETS_URL || `https://${base.prefix}widgets.${base.domain}`
export const POSITIONS_URL = import.meta.env.VITE_POSITIONS_URL || `https://${base.prefix}positions.${base.domain}`
export const RELAY_URL = import.meta.env.VITE_RELAY_URL || `wss://${base.prefix}widgets-relay.${base.domain}`
export const RELAY_HTTP_URL = import.meta.env.VITE_RELAY_HTTP_URL || `https://${base.prefix}widgets-relay.${base.domain}`
export const REMOTE_URL_WS = import.meta.env.VITE_REMOTE_URL || `wss://${base.prefix}widgets-remote.${base.domain}`
export const REMOTE_URL = import.meta.env.VITE_REMOTE_URL || `https://${base.prefix}widgets-remote.${base.domain}`
