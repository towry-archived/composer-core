
export default function () {};
export {
  withReturn (v) {
    return function () {
      return v;
    }
  }
}
