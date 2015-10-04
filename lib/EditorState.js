import { Record as record } from 'immutable';
import blockMapBuilder from './blockMapBuilder';
import treeMapBuilder from './treeMapBuilder';

const persistent = {
  treeMap: null,
  blockMap: null
};

const StateRecord = record(persistent);

export default class EditorState {
  constructor (immutable) {
    if (!immutable || !(immutable instanceof StateRecord)) {
      throw new Error('EditorState requires an `StateRecord` instance');
    }
    this._immutable = immutable;
  }

  getImmutable () {
    return this._immutable;
  }

  toJS () {
    return this._immutable.toJS();
  }

  toJSON () {
    return this._immutable.toJSON();
  }

  getBlockMap () {
    return this.getImmutable().get('blockMap');
  }

  getTreeMap () {
    return this.getImmutable().get('treeMap');
  }

  static create (blocks) {
    let blockMap = blockMapBuilder.createFromArray(blocks);
    let treeMap = treeMapBuilder.createFromBlockMap(blockMap);

    return new EditorState(new StateRecord({blockMap, treeMap}));
  }

  static createEmpty () {
  }
}
