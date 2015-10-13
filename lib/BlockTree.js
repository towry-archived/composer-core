
import { List as list, Record as record } from 'immutable';

/**
 * @private
 * @constant
 */
const persistentOfBlockTree = {
  leafs: null,
  start: 0,
  end: 0
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
    let branchs = [];
    let leaf = {start: 0, end: -1};
    let previousStyle = block.getCharacterList().first().get('style');
    let previousEntity = block.getCharacterList().first().get('entity');
    let start = 0;

    // <p>hello world hel<em>lo <b>wor</b></em><b>ld</b> hello world hello world</p>
    block.getCharacterList().forEach(function (ch, i) {
      if (ch.get('entity') !== previousEntity) {
        leaf.end = i;
        leafs.push(new LeafRecord(leaf));
        branchs.push(new BlockTreeRecord({
          leafs: list(leafs.slice()),
          start: start,
          end: i
        }));
        previousEntity = ch.get('entity');
        previousStyle = ch.get('style');
        leafs = [];
        leaf.start = i;
        leaf.end = -1;
        start = i;
      }

      if (leaf.start !== i && ch.get('style') !== previousStyle) {
        leaf.end = i;
        leafs.push(new LeafRecord(leaf));
        leaf.start = i;
        leaf.end = -1;
        previousStyle = ch.get('style');
      }
    });
    
    if (leaf.start <= block.getCharacterList().size - 1) {
      leaf.end = block.getCharacterList().size;
      leafs.push(new LeafRecord(leaf));
    }


    if (leafs.length) {
      branchs.push(new BlockTreeRecord({
        leafs: list(leafs),
        start: leaf.start,
        end: block.getCharacterList().size
      }));
    }

    return list(branchs);
  }
}

/**
 * create a empty block tree
 * TODO: fix this
 */
function emptyBlockTree () {
  return list.of(new BlockTreeRecord({
    leafs: list.of(new LeafRecord())
  }));
}
