
const SEP = '-';

/**
 * Generate a offsetkey based on key and offsets
 * @param {string} key
 */
function generate (key, ...offsets) {
  return key + SEP + offsets.join(SEP);
}

/**
 * @param {string} offsetKey
 * @return {object}
 */
function decode (offsetKey) {
  const decoded = offsetKey.split(SEP);
  return {
    blockKey: decoded[0],
    branchKey: parseInt(decoded[1], 10) || 0,
    leafKey: parseInt(decoded[2], 10) || 0
  };
}

/**
 * @property {function} generate
 * @property {function} decode
 */
let offsetKey = {
  generate,
  decode
};

export default offsetKey;
