
const prefix = '_RcmVh';

/**
 * Construct a class with a prefix.
 * @return {string}
 */
export default function (a) {
  return prefix + '-' + a;
}

/**
 * @return {string}
 */
export function getPrefix () {
  return prefix;
}
