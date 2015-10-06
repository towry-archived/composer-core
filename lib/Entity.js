
import { Record as record } from 'immutable';
import entityType from './entityType';

const persistent = {
  // the type of this entity, link or something else.
  type: entityType.NONE,

  // the data for this entity.
  data: null
};

const RecordOfEntity = record(persistent);

export default class Entity extends RecordOfEntity {
  constructor () {
    super(...arguments);
  }

  /**
   * Get the data from this entity
   * @return {EntityData}
   */
  getData () {
    return this.get('data');
  }

  /**
   * Get the type of this entity
   * @return {number} One of entityType
   */
  getType () {
    return this.get('type');
  }
}
