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

// Uncomment for working clickhouse in not secure context (like by ip in local network)
// crypto.randomUUID = function () {
//   return Math.random().toString(36).slice(2);
// }