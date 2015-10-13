
/**
 * How to use this:
 * create a single file that export a single
 * EntityMap instance.
 */
class EntityMap {
  constructor (data) {
    if (data) {
      this._data = data;
    } else {
      this._data = {key: -1};
    }

    this._missingKey = [];
  }

  setData (data) {
    this._data = data;
  }

  /**
   * Get all data by key
   * @param {string} key
   * @return {object}
   */
  get (key) {
    if (this._data.key === -1) {
      return null;
    }

    if (key in this._data) {
      return this._data[key];
    }

    return null;
  }

  /**
   * Get type by key
   * @param {string} key
   * @return {number}
   */
  getType (key) {
    let data = this.get(key);
    if (data !== null && ('type' in data)) {
      return data.type;
    }

    return -1;
  }

  /**
   * Get data by key
   * @param {string} key
   * @return {object}
   */
  getData (key) {
    let data = this.get(key);
    if ('data' in data) {
      return data.data;
    }

    return null;
  }
  
  /**
   * Remove data item by key
   * @param {string} key
   */
  remove (key) {
    if (key in this._data) {
      this._data[key] = null;
      this._missingKey.push(key);
    }
  }

  /**
   * Replace a item by key
   * @param {string} key
   */
  replace (key, item) {
    this._data[key] = item;
  }

  /**
   * Add a data item
   * @param {object} item
   * @return {number}
   */
  add (item) {
    let key = this._missingKey.pop();
    if (key === undefined) {
      key = this._data.key + 1;
      this._data.key = key;
    }
    this._data[key] = item;
    return key;
  }
}

export default EntityMap;
