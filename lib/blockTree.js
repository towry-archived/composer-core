/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Towry Wang
 */
import { List, Record } from 'immutable';

let persistentOfBlockTree = {
  leaves: null
}

let persistentOfLeave = {
  start: 0,
  end: 0
}

let blockTreeRecord = Record(persistentOfBlockTree);
let leaveRecord = Record(persistentOfLeave);

export default {
  /**
   * Block is a BlockState
   */
  create (block) {
    if (!block.size) {
      // return empty
      return emptyBlockTree();
    }

    let leaves = [], leave = {start: 0, end: -1};
    let start = 0;
    let previousStyle = block.getCharacterList().first().get('style');

    block.getCharacterList().forEach(function (c) {
      if (start == block.getCharacterList().size - 1) {
        leave.end = start;
        leaves.push(new leaveRecord(leave));
      }

      if (c.get('style') != previousStyle) {
        leave.end = start;
        leaves.push(leave);
        leave = {start: start, end: -1}
        previousStyle = c.get('style');
      }
      start += 1;
    });

    return List.of(new blockTreeRecord({
      leaves: List(leaves)
    }));
  }
}

function emptyBlockTree () {
  return List.of(new blockTreeRecord({
    leaves: List.of(new leaveRecord())
  }))
}
