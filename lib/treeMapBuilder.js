
import { OrderedMap as orderedMap } from 'immutable';
import blockMapBuilder from './blockMapBuilder';
import blockTree from './blockTree';

/**
 * Create `treeMap` from array.
 * @param {array} blocks 
 */
function createFromArray (blocks) {
  let blockMap = blockMapBuilder.createFromArray(blocks);

  return createFromBlockMap(blockMap);
}

/**
 * create `treeMap` from `blockMap`
 * @param {object} blockmap
 */
function createFromBlockMap (blockMap) {
  return orderedMap(blockMap.map(function (block) {
    return blockTree.create(block);
  }));
}

/**
 * module, see source.
 */
let treeMapBuilder = {
  createFromArray,
  createFromBlockMap
};

export default treeMapBuilder;
