
export default function empty () {}

empty.withReturn = function (v) {
  return function () {
    return v;
  };
};
