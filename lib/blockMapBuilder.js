
import BlockState from './BlockState';
import { OrderedMap as orderedMap } from 'immutable';
import generateKey from './generateKey';

/**
 * Build the mapBlock from array
 * @public
 * @param {object[]} blocks - Array of object.
 * @return {object} `Immutable.OrderedMap` object.
 */
function createFromArray (blocks) {
  return orderedMap(blocks.map(function (block) {
    block.key = block.key || generateKey();
    return [block.key, BlockState.create(block)];
  }));
}

/**
 * module, see source.
 */
const blockMapBuilder = {
  createFromArray
};

export default blockMapBuilder;
