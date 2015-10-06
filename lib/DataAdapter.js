/**
 * Simple base DataAdapter
 */

export default class DataAdapter {
  constructor (data = {}) {
    this._data = data;
  }

  /**
   * @param {object} data The data source
   */
  setData (data) {
    this._data = data;
  }

  /**
   * Must return array
   * @return {array}
   */
  getBlocks () {
    return this._data.blocks || [];
  }

  /**
   * @return {array}
   */
  getBlockTypes () {
    return this._data.block_types || [];
  }

  /**
   * @return {array}
   */
  getBlockDepths () {
    return this._data.block_depths || [];
  }

  /**
   * @return {array}
   */
  getInlineStyles () {
    return this._data.inline_styles || [];
  }

  /**
   * @return {array}
   */
  getEntities () {
    return this._data.entities || [];
  }

  /**
   * @return {object}
   */
  getEntityMap () {
    return this._data.entity_map;
  }
}
