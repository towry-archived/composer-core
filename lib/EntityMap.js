
import { OrderedMap as orderedMap } from 'immutable';

export default class EntityMap {
  constructor (immutable) {
    if (!immutable || !(immutable instanceof orderedMap)) {
      throw new Error('Please use the static methods');
    }

    this._immutable = immutable;
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

  getImmutable () {
    return this.getImmutable();
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

  static create () {

  }
}
