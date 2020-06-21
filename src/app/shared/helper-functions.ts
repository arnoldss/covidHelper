export function isNullOrUndefined(val) {
  return val == null;
}

export function isNullOrEmpty(iterable) {
  return iterable == null || iterable.length <= 0;
}
