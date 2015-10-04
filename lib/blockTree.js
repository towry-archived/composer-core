/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Towry Wang
 */
import { List as list, Record as record } from 'immutable';

const persistentOfBlockTree = {
  leaves: null
};

const persistentOfLeave = {
  start: 0,
  end: 0
};

const BlockTreeRecord = record(persistentOfBlockTree);
const LeaveRecord = record(persistentOfLeave);

export default {
  /**
   * Block is a BlockState
   */
  create (block) {
    if (!block.size) {
      // return empty
      return emptyBlockTree();
    }

    let leaves = [];
    let leave = {start: 0, end: -1};
    let start = 0;
    let previousStyle = block.getCharacterList().first().get('style');

    block.getCharacterList().forEach(function (ch) {
      if (start === block.getCharacterList().size - 1) {
        leave.end = start;
        leaves.push(new LeaveRecord(leave));
      }

      if (ch.get('style') !== previousStyle) {
        leave.end = start;
        leaves.push(leave);
        leave = {start: start, end: -1};
        previousStyle = ch.get('style');
      }
      start += 1;
    });

    return list.of(new BlockTreeRecord({
      leaves: list(leaves)
    }));
  }
};

function emptyBlockTree () {
  return list.of(new BlockTreeRecord({
    leaves: list.of(new LeaveRecord())
  }));
}
