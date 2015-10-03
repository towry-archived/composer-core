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
  create (block) {
    if (!block.size) {
      // return empty
      return emptyBlockTree();
    }
  }
}

function emptyBlockTree () {
  return List.of(new blockTreeRecord({
    leaves: List.of(new leaveRecord())
  }))
}
