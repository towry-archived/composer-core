
/**
 * `danger` object may contains some attribute 
 * that we do not want.
 * @param {object} danger The object that needs filter.
 * @param {object} defaults
 */
export default function (danger, defaults) {
  let rets = {};

  Object.keys(danger).map(function (key) {
    if (key in defaults) {
      rets[key] = danger[key];
    }
  });

  return rets;
}
