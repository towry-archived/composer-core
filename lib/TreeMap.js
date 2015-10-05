
import { OrderedMap as orderedMap } from 'immutable';
import BlockMap from './BlockMap';
import BlockTree from './BlockTree';

export default class TreeMap {
  constructor () {
    throw new Error('Please use the static methods');
  }

  /**
   * Create `treeMap` from array.
   * @param {array} blocks 
   */
  static createFromArray (blocks) {
    let blockMap = BlockMap.createFromArray(blocks);

    return TreeMap.createFromBlockMap(blockMap);
  }

  /**
   * create `treeMap` from `blockMap`
   * @param {object} blockmap
   */
  static createFromBlockMap (blockMap) {
    return orderedMap(blockMap.map(function (block) {
      return BlockTree.create(block);
    }));
  }
} 
