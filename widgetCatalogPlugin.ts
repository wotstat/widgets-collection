import { createServer, type Plugin, type ViteDevServer } from 'vite'
import { resolve } from 'node:path'

const catalogPath = '/widget-catalog.json'

async function loadCatalog(server: ViteDevServer) {
  const { getWidgetCatalog } = await server.ssrLoadModule('/src/utils/widgetCatalog.ts')
  return JSON.stringify(getWidgetCatalog())
}

export function widgetCatalogPlugin(): Plugin {
  let root = ''

  return {
    name: 'widget-catalog',
    configResolved: config => { root = config.root },
    configureServer: server => {
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.split('?')[0] !== catalogPath) return next()
        try {
          const catalog = await loadCatalog(server)
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.setHeader('Access-Control-Allow-Origin', '*')
          response.setHeader('Cache-Control', 'no-cache')
          response.end(catalog)
        } catch (error) {
          next(error)
        }
      })
    },
    generateBundle: async function () {
      const server = await createServer({
        configFile: false,
        root,
        server: { middlewareMode: true },
        appType: 'custom',
        resolve: { alias: { '@': resolve(root, 'src') } },
      })

      try {
        this.emitFile({ type: 'asset', fileName: catalogPath.slice(1), source: await loadCatalog(server) })
      } finally {
        await server.close()
      }
    },
  }
}
