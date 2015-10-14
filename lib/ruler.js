var s = require('underscore.string'),
    R = require('Ramda');

var STRING_FNS = [
  'capitalize',
  'decapitalize',
  'clean',
  'cleanDiacritics',
  'swapCase',
  'escapeHTML',
  'unescapeHTML',
  'dedent',
  'reverse',
  'titleize',
  'camelize',
  'classify',
  'underscored',
  'dasherize',
  'humanize',
  'trim',
  'ltrim',
  'rtrim',
  // length, [truncateString="..."]
  'truncate',
  'toNumber',
  'stripTags',
  'surround',
  'quote',
  'unquote',
  'slugify',
  'toBoolean',
  'toUpperCase',
  'toLowerCase'
];

var isString = R.is(String);

function initRules() {
  return R.reduce(function(accu, fnName) {
    accu[fnName] = function(value, args) {
      var vargs     = Array.isArray(args) ? args :
                      (isString(args) ?  args.split(',') : []);
      return s[fnName].apply(s, [value].concat(vargs));
    };

    return accu;
  }, {}, STRING_FNS);
}

var RULER = {
  rules : initRules()
};

module.exports = RULER;
