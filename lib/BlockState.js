import { Record, List } from 'immutable';
import blockType from './blockType';
import inlineType from './inlineType';
import objectFilter from './util/objectFilter';
import generateKey from './generateKey';

let persistent = {
  key: '',
  type: blockType.UNSTYLED,
  characterList: List(),
  depth: 0,
  text: ''
}

let characterListRecord = Record({
  style: inlineType.NONE
});

let Base = Record(persistent);

export default class BlockState extends Base {
  getKey () {
    return this.get('key');
  }

  getType () {
    return this.get('type');
  }

  getCharacterList () {
    return this.get('characterList');
  }

  getDepth () {
    return this.get('depth');
  }

  getText () {
    return this.get('text');
  }

  static create (o) {
    let text = o.text;
    let inlineStyleRanges = o.inlineStyleRanges || [];

    let list = List(text.split('').map(function () {
      return new characterListRecord();
    }));

    o.characterList = applyInlineStyleRangeToList(list, inlineStyleRanges);
    return new BlockState(objectFilter(o, persistent));
  }
}

/**
 * @param {array} list 
 * @param {array} ranges
 * ranges is an array of object, like 
 * [{offset: 2, length: 4, style: 0}]
 */
function applyInlineStyleRangeToList (list, ranges) {
  if (!ranges.length) return list;

  return list.withMutations(function (mutableList) {
    ranges.forEach(function (range) {
      for (var i = range.offset; i < (range.offset + range.length); i++) {
        let style = mutableList.get(i).get('style') + range.style;
        mutableList.set(i, new characterListRecord({style: style}));
      }
    });
  });
}
