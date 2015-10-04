
import { OrderedMap as orderedMap } from 'immutable';
import blockMapBuilder from './blockMapBuilder';
import blockTree from './blockTree';

function createFromArray (blocks) {
  let blockMap = blockMapBuilder.createFromArray(blocks);

  return createFromBlockMap(blockMap);
}

function createFromBlockMap (blockMap) {
  return orderedMap(blockMap.map(function (block) {
    return blockTree.create(block);
  }));
}

export default {
  createFromArray,
  createFromBlockMap
};
