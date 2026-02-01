// ===================================
// Utils
// ===================================

export function debounce(fn, delay) {
  let timeOut = null;
  return function(...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  }
}

