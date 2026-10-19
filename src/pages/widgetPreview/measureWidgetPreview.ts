export function measureWidgetPreview(root: HTMLElement) {
  const content = root.querySelector('[data-widget-preview-content]') ?? root.firstElementChild
  if (!content) throw new Error('Превью виджета пустое')
  const bounds = content.getBoundingClientRect()
  const effects = [...root.querySelectorAll('[data-widget-preview-effects]')].map(element => element.getBoundingClientRect())

  return {
    width: Math.ceil(bounds.width),
    height: Math.ceil(bounds.height),
    insets: {
      top: Math.ceil(Math.max(0, ...effects.map(effect => bounds.top - effect.top))),
      right: Math.ceil(Math.max(0, ...effects.map(effect => effect.right - bounds.right))),
      bottom: Math.ceil(Math.max(0, ...effects.map(effect => effect.bottom - bounds.bottom))),
      left: Math.ceil(Math.max(0, ...effects.map(effect => bounds.left - effect.left))),
    },
  }
}
