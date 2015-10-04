import { Record as record, List as list } from 'immutable';
import blockType from './blockType';
import inlineType from './inlineType';
import objectFilter from './util/objectFilter';

const persistent = {
  key: '',
  type: blockType.UNSTYLED,
  characterList: list(),
  depth: 0,
  text: ''
};

const CharacterListRecord = record({
  style: inlineType.NONE
});

const Base = record(persistent);

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

  static create (obj) {
    const text = obj.text;
    const inlineStyleRanges = obj.inlineStyleRanges || [];

    const charList = list(text.split('').map(function () {
      return new CharacterListRecord();
    }));

    obj.characterList = applyInlineStyleRangeToList(charList, inlineStyleRanges);
    return new BlockState(objectFilter(obj, persistent));
  }
}

/**
 * @param {array} list
 * @param {array} ranges
 * ranges is an array of object, like
 * [{offset: 2, length: 4, style: 0}]
 */
function applyInlineStyleRangeToList (charList, ranges) {
  if (!ranges.length) return charList;

  return charList.withMutations(function (mutableList) {
    ranges.forEach(function (range) {
      for (let i = range.offset; i < (range.offset + range.length); i++) {
        const style = mutableList.get(i).get('style') + range.style;
        mutableList.set(i, new CharacterListRecord({style: style}));
      }
    });
  });
}
