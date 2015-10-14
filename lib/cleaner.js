"use strict";
var util              = require('util'),
    Promise           = require('bluebird'),
    RecursiveIterator = require('recursive-iterator'),
    VError            = require('verror'),
    R                 = require('ramda'),
    RULER             = require('./ruler.js'),
    parser            = require('./parser.js'),
    type              = require('./type.js'),
    promiseFor        = require('./promiseFor.js'),
    isObject          = type.isObject,
    shallowCopy       = type.shallowCopy;


class Cleaner {
  constructor(Ruler) {
    this.setRuler(Ruler || RULER);
  }

  setRuler(Ruler) {
    this.ruler = Ruler;
  }

  clean(data, rulesHash) {
    if (!isObject(data)) {
      return Promise.reject(new VError('data is not an object'));
    }

    var mappedRules = parser.parseRules(rulesHash),
        iterator = new RecursiveIterator(data, 1, true),
        rootNode = shallowCopy(data),
        map      = new Map(),
        self = this,
        currentState;

    map.set(data, rootNode);

    return promiseFor(function(iterator) {
        var state = iterator.next();
        currentState = state.value;
        return !state.done;
      }, function(iterator) {
        var parentNode = map.get(currentState.parent),
            node       = currentState.node;

        return self._getNodeValue(node, currentState.path, mappedRules, iterator)
          .then(function(cleanNode) {
            parentNode[currentState.key] = cleanNode;
            map.set(node, cleanNode);
            return iterator;
          });
      }, iterator)
      .then(function() {
        map.clear();
        mappedRules.clear();
        return rootNode;
      });
  }

  _getNodeValue(node, path, mappedRules, iterator) {
    return iterator.isLeaf(node) ?
           this.cleanField(node, path, mappedRules) :
           Promise.resolve(shallowCopy(node));
  }

  /**
   * [cleanField description]
   * @param  {String|Number|Boolean} value       value to clean
   * @param  {Array} path        path of field
   * @param  {Map} mappedRules
   * @return {Promise<value>}
   */
  cleanField(value, path, mappedRules) {
    /** @var {Array} fieldRules - rules for field at path `path`*/
    var fieldRules = mappedRules.get(path.join('.')),
        ruler = this.ruler;
    if (!fieldRules) return Promise.resolve(value);

    return Promise.try(function() {
      var errors = [];
      // iterate over each rules - eg: 'capitalize|trim' and make new value
      var newValue =  R.reduce(function(accuValue, fieldRule) {
          var metaRule = parser.parseRule(fieldRule),
              rule = R.prop(metaRule.rule, ruler.rules);
          // if rule does not exist in `ruler.rules` prepare an exception
          if (!rule) {
            errors.push(util.format('unknown rule %s', metaRule.rule));
            return value;
          }
          return rule.call(ruler, accuValue, metaRule.args);
        }, value, fieldRules);

        // if error tell user what is the problem an where
        if (errors.length) {
          let err = R.reduce(function(accu, error) { return new VError(accu, error) }, new Error('field cleaning error'), errors);
          throw new VError(err, 'error on field %s', path.join('.'));
        }
        return newValue;
    });
  }

  extend(name, funcBody) {
    this.ruler.rules[name] = funcBody;

  }
}




module.exports = Cleaner;
