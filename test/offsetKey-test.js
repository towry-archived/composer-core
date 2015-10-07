
import offsetKey from '../lib/util/offsetKey';

describe('Test offsetKey =>', () => {
  it('`generate` should work', () => {
    const blockKey = '2k9s';
    const branchKey = 2;
    const leafKey = 3;

    const expected = blockKey + '-' + branchKey + '-' + leafKey;
    expect(offsetKey.generate(blockKey, branchKey, leafKey)).toEqual(expected);
  })

  it('`decode` should work', () => {
    let decoded = offsetKey.decode('2k9s-2-3');
    expect(decoded).not.toBe(undefined);
    expect(Object.prototype.toString.call(decoded)).toBe('[object Object]');
    expect(decoded.blockKey).toBe('2k9s');
    expect(decoded.leafKey).toBe(3);
  })
})
