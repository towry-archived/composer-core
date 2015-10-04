
export default function empty () {}

// do not export this explict
empty.withReturn = function (v) {
  return function () {
    return v;
  };
};
