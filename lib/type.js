var toString = Object.prototype.toString;

/**
 * @param {*} any
 * @returns {Boolean}
 */
function isObject(any) {
  return any !== null && typeof any === 'object';
}

/**
 * @param {*} any
 * @returns {String}
 */
function getType(any) {
  return toString.call(any).slice(8, -1);
}

/**
 * @param {*} any
 * @returns {*}
 */
function shallowCopy(any) {
  var type = getType(any);
  switch (type) {
  case 'Object':
    return {};
  case 'Array':
    return [];
  case 'Date':
    return new Date(any);
  case 'RegExp':
    return new RegExp(any);
  case 'Number':
  case 'String':
  case 'Boolean':
  case 'Undefined':
  case 'Null':
    return any;
  default:
    return String(any);
  }
}

module.exports = {
  shallowCopy: shallowCopy,
  isObject: isObject
};
