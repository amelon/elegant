"use strict";
var Cleaner = require('./lib/cleaner.js');

class Schema {
  constructor(schema, ruler) {
    this.schema = schema;
    this.cleaner = new Cleaner(ruler);
  }

  get() { return this.schema; }

  /**
   *
   * @param  {Object} data
   * @return {Promise}
   */
  clean(data) {
    return this.cleaner.clean(data, this.schema);
  }
}




module.exports = Schema;
