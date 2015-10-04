
import BlockState from './BlockState';
import { OrderedMap as orderedMap } from 'immutable';
import generateKey from './generateKey';

/**
 * Input:
 * Array of blocks, each block is an object.
 */

function createFromArray (blocks) {
  return orderedMap(blocks.map(function (block) {
    block.key = block.key || generateKey();
    return [block.key, BlockState.create(block)];
  }));
}

export default {
  createFromArray
};
