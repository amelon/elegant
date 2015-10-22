var parser = require('../lib/parser.js');
var assert = require('chai').assert;

describe('parser', _ => {
  describe('parseRules', () => {
    it('should return Map', () => {
      assert.instanceOf(parser.parseRules(), Map);
    });

    it('accept everything without throwing', () => {
      assert(parser.parseRules('abc'))
      assert(parser.parseRules(false))
      assert(parser.parseRules(10))
      assert(parser.parseRules({}))
    });

    it('should return pipe separated rules to Map', () => {
      var rules = {
            name: 'clean|qsdf'
          },
          expected = {
            name: ['clean', 'qsdf']
          }
        ;

      assert.deepEqual(parser.parseRules(rules).get('name'), expected.name);
    });

    it('should return pipe separated ruels to Map object where there are multiple pipes', () => {
      var expected = {
            name: ['clean', 'qsdf']
          };

      assert.deepEqual(parser.parseRules({name: '|clean||qsdf|'}).get('name'), expected.name);
    });
  });

  describe('#parseRule', () => {
    it("should parse a single rule", () => {
      var rule = 'clean';
      assert.deepEqual(parser.parseRule(rule), { rule: 'clean', args: null });
    });

    context('rule with arguments', () => {
      it('should be parsed with arguments as array', () => {
        var rule = 'truncate:10';
        var parsed = parser.parseRule(rule);
        assert.equal(parsed.rule, 'truncate');
        assert.isArray(parsed.args);
        assert.lengthOf(parsed.args, 1);
      });

      it('should handle multiple arguments as array', () => {
        var rule = 'truncate:10,4';
        var parsed = parser.parseRule(rule);
        assert.equal(parsed.rule, 'truncate');
        assert.isArray(parsed.args);
        assert.lengthOf(parsed.args, 2);
        assert.deepEqual(parsed.args, ['10', '4']);
      });

    });


  });

});
