
export default function (danger, defaults) {
  let rets = {};

  Object.keys(danger).map(function (key) {
    if (key in defaults) {
      rets[key] = danger[key];
    }
  });

  return rets;
}
