
let used = {};
let hasOwnProp = Object.prototype.hasOwnProperty;

export default function () {
  let key = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  while (hasOwnProp.call(used, key)) {
    key = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  }

  return used[key] = true, key;
}
