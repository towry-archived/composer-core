
import SelectionState from '../lib/SelectionState';

describe('test SelectionState =>', () => {
  it('create should work', () => {
    let ss = SelectionState.create();
    expect(ss.getAnchorKey()).toBe('');
    expect(ss.getHasFocus()).toBe(false);
    expect(ss.getIsBackward()).toBe(false);
  });
});
