import BlockState from './BlockState';
import { OrderedMap } from 'immutable';
import generateKey from './generateKey';

/**
 * Input:
 * Array of blocks, each block is an object.
 */

function createFromArray (blocks) {
  return OrderedMap(blocks.map(function (block) {
    block.key = block.key || generateKey();
    return [block.key, BlockState.create(block)];
  }))
}

export default {
  createFromArray
}
