
import { List as list, Record as record } from 'immutable';

/**
 * @private
 * @constant
 */
const persistentOfBlockTree = {
  leafs: null
};

/**
 * @private
 * @constant
 */
const persistentOfLeaf = {
  start: 0,
  end: 0
};

/**
 * @private
 */
const BlockTreeRecord = record(persistentOfBlockTree);
const LeafRecord = record(persistentOfLeaf);

/**
 * @public
 * @property {function} create - create a blockTree object.
 */
export default class BlockTree {

  constructor () {
    throw new Error('Please use the static methods');
  }

  /**
   * Block is a BlockState
   * @return {object} `Immutable.List` object.
   */
  static create (block) {
    if (!block.size) {
      // return empty
      return emptyBlockTree();
    }

    let leafs = [];
    let leaf = {start: 0, end: -1};
    let start = 0;
    let previousStyle = block.getCharacterList().first().get('style');

    block.getCharacterList().forEach(function (ch) {
      if (start === block.getCharacterList().size - 1) {
        leaf.end = start + 1;
        leafs.push(new LeafRecord(leaf));
      }

      if (ch.get('style') !== previousStyle) {
        leaf.end = start;
        leafs.push(new LeafRecord(leaf));
        leaf = {start: start, end: -1};
        previousStyle = ch.get('style');
      }
      start += 1;
    });

    return list.of(new BlockTreeRecord({
      leafs: list(leafs)
    }));
  }
}

/**
 * create a empty block tree
 */
function emptyBlockTree () {
  return list.of(new BlockTreeRecord({
    leafs: list.of(new LeafRecord())
  }));
}
