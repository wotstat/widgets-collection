if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function (compareFn) {
    return [...this].sort(compareFn);
  };
}

if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function () {
    return Array.from(this).reverse();
  };
}

if (import.meta.env.MODE == 'development' && !window.crypto.randomUUID) {
  console.warn('crypto.randomUUID is not supported in this browser, using fallback implementation')

  // @ts-ignore
  window.crypto.randomUUID = () => {
    // Fallback implementation for browsers that do not support crypto.randomUUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

}