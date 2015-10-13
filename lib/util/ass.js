
const prefix = '_RcmVh';

/**
 * Construct a class with a prefix.
 * @return {string}
 */
export default function (a, prefixOfPrefix) {
  let _ = prefixOfPrefix;
  if (!_) {
    _ = '';
  }

  return _ + prefix + '-' + a;
}

/**
 * @return {string}
 */
export function getPrefix () {
  return prefix;
}
