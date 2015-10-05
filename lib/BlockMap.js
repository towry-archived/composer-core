
import BlockState from './BlockState';
import { OrderedMap as orderedMap } from 'immutable';
import generateKey from './generateKey';

/**
 * BlockMap class
 */
export default class BlockMap {

  constructor () {
    throw new Error('Please use `BlockMap.createFromArray` method');
  }

  /**
   * Build the mapBlock from array
   * @public
   * @param {object[]} blocks - Array of object.
   * @return {object} `Immutable.OrderedMap` object.
   */
  static createFromArray (blocks) {
    return orderedMap(blocks.map(function (block) {
      block.key = block.key || generateKey();
      return [block.key, BlockState.create(block)];
    }));
  }
}
