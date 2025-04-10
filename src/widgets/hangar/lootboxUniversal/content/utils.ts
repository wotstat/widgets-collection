export function logProcessor(value: number) {
  if (value < 1e5) return value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (value < 1e6) return (value / 1e3).toFixed(1) + 'k';
  if (value < 1e9) return (value / 1e6).toFixed(1) + 'M';
  if (value < 1e12) return (value / 1e9).toFixed(1) + 'B';
  return (value / 1e12).toFixed(1) + 'T';
}

export function shortLogProcessor(value: number) {
  if (value < 1e3) return value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (value < 1e4) return (value / 1e3).toFixed(1) + 'k';
  if (value < 1e6) return (value / 1e3).toFixed(0) + 'k';
  if (value < 1e7) return (value / 1e6).toFixed(1) + 'M';
  if (value < 1e10) return (value / 1e6).toFixed(0) + 'M';
  if (value < 1e12) return (value / 1e9).toFixed(1) + 'B';
  return (value / 1e12).toFixed(1) + 'T';
}

export function orderByTable<T, V>(table: T[], values: V[], getter?: (v: V) => T, comparator?: (a: V, b: V) => number): V[] {
  return values.sort((a, b) => {
    const indexA = getter ? table.indexOf(getter(a)) : table.indexOf(a as any);
    const indexB = getter ? table.indexOf(getter(b)) : table.indexOf(b as any);

    if (indexA === -1 && indexB === -1) {
      if (comparator) return comparator(a, b);
      if (getter) {
        const aValue = getter(a);
        const bValue = getter(b);
        if (aValue === bValue) return 0;
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
      }

      return 0;
    };
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
    if (comparator) return comparator(a, b);
    return 0;
  })
}