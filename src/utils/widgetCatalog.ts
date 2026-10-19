import { getAllWidgetsRoutes, pathResolve } from '.'

export function getWidgetCatalog() {
  const previews = import.meta.glob('/src/widgets/**/*.vue')

  return getAllWidgetsRoutes().map(({ route, path, options }) => ({
    route,
    name: options.name,
    description: options.description,
    hasPreview: options.preview !== null && '/' + pathResolve('src', path, options.preview) in previews,
  })).sort((a, b) => a.route.localeCompare(b.route))
}
