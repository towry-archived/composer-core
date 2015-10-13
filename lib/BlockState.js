import { Record as record, List as list } from 'immutable';
import blockType from './blockType';
import inlineType from './inlineType';
import objectFilter from './util/objectFilter';

/**
 * @private
 * @constant
 */
const persistent = {
  key: '',
  type: blockType.UNSTYLED,
  characterList: list(),
  depth: 0,
  text: ''
};

/**
 * @private
 */
const CharacterListRecord = record({
  style: inlineType.NONE,
  entity: null
});

/**
 * @private
 */
const Base = record(persistent);

/**
 * This is a `Immutable.Record` constructor.
 */
export default class BlockState extends Base {
  /**
   * Get the key from the immutable.
   */
  getKey () {
    return this.get('key');
  }

  /**
   * Get the type from the immutable.
   */
  getType () {
    return this.get('type');
  }

  /**
   * Get the character list from immutable.
   */
  getCharacterList () {
    return this.get('characterList');
  }

  /**
   * Get the depth from immutable.
   */
  getDepth () {
    return this.get('depth');
  }

  /**
   * Get the text from immutable.
   * The text is the content of the block.
   */
  getText () {
    return this.get('text');
  }

  /**
   * Create a new `BlockState`.
   * @return {object} `BlockState` object.
   */
  static create (obj) {
    const text = obj.text;
    const inlineStyleRanges = obj.style || [];
    const entityAll = obj.entity || [];
    const entitiesLength = entityAll.length;
    let entityIndex = 0;
    let entity = entityAll.length ? entityAll[entityIndex] : null;

    const charList = list(text.split('').map(function (_, i) {
      if (entity && i === (entity.offset + entity.length) && entityIndex < entitiesLength) {
        entity = entityAll[++entityIndex];  
      }

      if (entity && i >= entity.offset && i < (entity.offset + entity.length)) {
        return new CharacterListRecord({entity: entity.key});
      }

      return new CharacterListRecord();
    }));

    obj.characterList = applyInlineStyleRangeToList(charList, inlineStyleRanges);
    return new BlockState(objectFilter(obj, persistent));
  }
}

/**
 * ranges is an array of object, like
 * [{offset: 2, length: 4, style: 0}]
 * @param {array} list
 * @param {array} ranges
 */
function applyInlineStyleRangeToList (charList, ranges) {
  if (!ranges.length) return charList;

  return charList.withMutations(function (mutableList) {
    ranges.forEach(function (range) {
      for (let i = range.offset; i < (range.offset + range.length); i++) {
        const style = mutableList.get(i).get('style') + range.style;
        const entity = mutableList.get(i).get('entity');
        mutableList.set(i, new CharacterListRecord({entity: entity, style: style}));
      }
    });
  });
}
