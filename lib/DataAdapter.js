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
}
