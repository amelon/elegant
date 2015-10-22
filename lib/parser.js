var RecursiveIterator = require('recursive-iterator'),
    R                 = require('ramda'),
    stampit           = require('stampit');

var compact = R.filter(R.complement(R.isEmpty));
/**
 *
 * @param  {Object} rules
 * @return {Map}
 */
function parseRules(rules) {
  var iterator    = new RecursiveIterator(rules),
      mappedRules = new Map(),
      item;

  for (item of iterator ) {
    if (iterator.isLeaf(item.node)) {
      mappedRules.set(item.path.join('.'), compact(item.node.split('|')) );
    }
  }
  return mappedRules;
}



function parseRule(rule) {
  var matchedRule = /(\w+):/.exec(rule),
      definition  = rule,
      args        = null,
      extracter;

  if (matchedRule) {
    extracter  = matchedRule[0];
    definition = matchedRule[1];
    args       = rule.replace(extracter, '');
  }

  // replace _ with Uppercase
  definition = definition.replace(/_([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });

  return {
    rule: definition,
    args: args && args.split(',')
  };
}

var parser = stampit()
  .static({
    parseRule : parseRule,
    parseRules: parseRules
  })

module.exports = parser;
