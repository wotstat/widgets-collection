
export function pascalCaseToKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function getAllWidgets() {
  const widgets = import.meta.glob('../widgets/**/Index.md');

  return Object.keys(widgets).map((key) => {
    const path = key.replace('../widgets/', '').replace('/Index.md', '');
    return {
      path: '/' + pascalCaseToKebabCase(path),
      component: () => import('../widgets/' + path + '/Index.vue'),
    };
  });
}