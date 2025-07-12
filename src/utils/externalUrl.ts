

const prefix = (() => {
  const match = location.host.match(/^(.*)\.widgets\.wotstat\.info$/i)
  return match ? `${match[1]}.` : ''
})()

export const CLICKHOUSE_URL = import.meta.env.VITE_CLICKHOUSE_URL || `https://${prefix}db.wotstat.info`;
export const ANALYTICS_REALTIME_URL = import.meta.env.VITE_ANALYTICS_REALTIME_URL || `https://${prefix}realtime.wotstat.info`;
export const STATIC_URL = import.meta.env.VITE_STATIC_URL || `https://${prefix}static.wotstat.info`;
export const WIDGETS_URL = import.meta.env.VITE_WIDGETS_URL || `https://${prefix}widgets.wotstat.info`;
export const POSITIONS_URL = import.meta.env.VITE_POSITIONS_URL || `https://${prefix}positions.wotstat.info`;
export const RELAY_URL = import.meta.env.VITE_RELAY_URL || `wss://${prefix}widgets-relay.wotstat.info`;
export const RELAY_HTTP_URL = import.meta.env.VITE_RELAY_HTTP_URL || `https://${prefix}widgets-relay.wotstat.info`;
export const REMOTE_URL_WS = import.meta.env.VITE_REMOTE_URL || `wss://${prefix}widgets-remote.wotstat.info`;
export const REMOTE_URL = import.meta.env.VITE_REMOTE_URL || `https://${prefix}widgets-remote.wotstat.info`;