import { Record as record } from 'immutable';
import blockMapBuilder from './blockMapBuilder';
import treeMapBuilder from './treeMapBuilder';

const persistent = {
  treeMap: null,
  blockMap: null
};

const StateRecord = record(persistent);

/**
 * The state for the whole editor.
 */
export default class EditorState {
  constructor (immutable) {
    if (!immutable || !(immutable instanceof StateRecord)) {
      throw new Error('EditorState requires an `StateRecord` instance');
    }
    this._immutable = immutable;
  }

  /**
   * Get the immutable object
   */
  getImmutable () {
    return this._immutable;
  }

  /**
   * @see {@link http://facebook.github.io/immutable-js}
   */
  toJS () {
    return this._immutable.toJS();
  }

  /**
   * @see {@link http://facebook.github.io/immutable-js}
   */
  toJSON () {
    return this._immutable.toJSON();
  }

  /**
   * Get blockMap from immutable
   */
  getBlockMap () {
    return this.getImmutable().get('blockMap');
  }

  /**
   * Get treeMap from immutable
   */
  getTreeMap () {
    return this.getImmutable().get('treeMap');
  }

  /**
   * from the treeMap, get a tree by a key
   * @param {string} key
   */
  getBlockTreeForKey (key) {
    return this.getTreeMap().get(key);
  }

  /**
   * Create an `EditorState` object.
   * @param {array} blocks
   */
  static create (blocks) {
    let blockMap = blockMapBuilder.createFromArray(blocks);
    let treeMap = treeMapBuilder.createFromBlockMap(blockMap);

    return new EditorState(new StateRecord({blockMap, treeMap}));
  }

  /**
   * Create an empty `EditorState` object
   */
  static createEmpty () {
  }
}
