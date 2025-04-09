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