import blockMapBuilder from './blockMapBuilder';

function createFromArray (blocks) {
  let blockMap = blockMapBuilder.createFromArray(blocks);

  return createFromBlockMap(blockMap);
}

function createFromBlockMap (blockMap) {
  return blockMap.map(function (block) {
    return [];
  });
}

export default {
  createFromArray,
  createFromBlockMap
}
