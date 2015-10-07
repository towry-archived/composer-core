
import { Record as record } from 'immutable';

/**
 * When user start to select something on page,
 * he must be start on a point, then that point is the
 * anchor, record where the selection start. then user start
 * to drag forward, the anchorOffset will be increased.
 */
const persistent = {
  anchorKey: '',    // The block key where selection start
  anchorOffset: 0,  // The offset on anchor element
  focusKey: '',     // The block key where selection is focus on
  focusOffset: 0,   // The offset on focused element
  isBackward: false,// Is the selection in backward direction?
  hasFocus: false   // Has focus now?
};

const PersistentOfSelection = record(persistent);

class SelectionState extends PersistentOfSelection {
  constructor () {
    super(...arguments);
  }

  getAnchorKey () {
    return this.get('anchorKey');
  }

  getAnchorOffset () {
    return this.get('anchorOffset');
  }

  getFocusKey () {
    return this.get('focusKey');
  }

  getFocusOffset () {
    return this.get('focusOffset');
  }

  getIsBackward () {
    return this.get('isBackward');
  }

  getHasFocus () {
    return this.get('hasFocus');
  }


  /**
   * Create an instance 
   */
  static create () {
    return new SelectionState();
  }
}

export default SelectionState;
