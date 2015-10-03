
import { OrderedMap } from 'immutable';
import blockMapBuilder from './blockMapBuilder';
import blockTree from './blockTree';

function createFromArray (blocks) {
  let blockMap = blockMapBuilder.createFromArray(blocks);

  return createFromBlockMap(blockMap);
}

function createFromBlockMap (blockMap) {
  return OrderedMap(blockMap.map(function (block) {
    return blockTree.create(block);
  }));
}

export default {
  createFromArray,
  createFromBlockMap
}
