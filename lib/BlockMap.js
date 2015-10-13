
import BlockState from './BlockState';
import { OrderedMap as orderedMap } from 'immutable';
import generateKey from './generateKey';

/**
 * BlockMap class
 */
export default class BlockMap {

  constructor (immutable) {
    if (!immutable || !(immutable instanceof orderedMap)) {
      throw new Error('Please use `BlockMap.createFromArray` method');
    }

    this._immutable = immutable;
  }

  /** 
   * Get immutable for this blockMap
   */
  getImmutable () {
    return this._immutable;
  }

  toJS () {
    return this.getImmutable().toJS();
  }

  toJSON () {
    return this.getImmutable().toJSON();
  }

  toArray () {
    return this.getImmutable().toArray();
  }

  get () {
    return this.getImmutable().get(...arguments);
  }

  getIn () {
    return this.getImmutable().getIn(...arguments);
  }

  set () {
    let newImmutable = this.getImmutable().set(...arguments);
    this._immutable = newImmutable;
  }

  remove () {
    return this.getImmutable().delete(...arguments);
  }

  /**
   * Create from adapter
   * @param {DataAdapter} adapter
   */
  static create (adapter) {
    const entities = adapter.getEntities();
    return new BlockMap(orderedMap(adapter.getBlocks().map(function (blockText, i) {
      let blockObject = createBlockObject(adapter, i);
      blockObject.key = blockObject.key || generateKey();
      blockObject.text = blockText;
      // entity is an array
      // in one block, there may be more than one link or other
      blockObject.entity = entities.length > i ? entities[i] : null;
      return [blockObject.key, BlockState.create(blockObject)];
    })));
  }
}

function createBlockObject (adapter, index) {
  let inlineStyles = adapter.getInlineStyles();
  let blockTypes = adapter.getBlockTypes();
  let blockDepths = adapter.getBlockDepths();

  let style = inlineStyles[index];
  let type = blockTypes[index];
  let depth = blockDepths[index];

  return {
    style,
    type,
    depth
  };
}
