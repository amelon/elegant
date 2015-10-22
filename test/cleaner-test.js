/* globals describe, it */
var cleaner = require('../lib/cleaner.js');
var assert = require('chai').assert;


describe.only('cleaner', () => {
  describe('#clean', () => {
    it('should reject when data is not an object', (done) => {
      var cln = cleaner();
      cln.clean()
        .then(() => done('no way to be here'))
        .catch(err => assert(err) )
        .then(done);
    });

    it('should be ok if rules set is empty', (done) => {
      var cln = cleaner();
      cln.clean({})
        .then( emptyObj => { assert(emptyObj); })
        .finally(done);
    });

    it('should clean simple object with simple rule', (done) => {
      var cln = cleaner();
      cln.clean({name: ' my name is  jone '}, { name: 'clean' })
        .then(obj => assert.deepEqual(obj, {name: 'my name is jone'}))
        .finally(done);
    });

    it('should clean simple object with multiple rules', (done) => {
      var cln = cleaner();
      cln.clean({name: ' my name is  jone '}, { name: 'clean|capitalize' })
        .then(obj => assert.deepEqual(obj, {name: 'My name is jone'}))
        .finally(done);
    });

    it('should clean multifield object with multiple rules', (done) => {
      var cln      = cleaner(),
          data     = { first_name: ' jon ', last_name: ' doe ' },
          expected = { first_name: 'Jon', last_name: 'Doe' },
          rules    = { first_name: 'clean|capitalize', last_name: 'clean|capitalize' };

      cln.clean(data, rules)
        .then(obj => {
          assert.deepEqual(expected, obj);
        })
        .finally(done);
    });


    it('should clean nested object with multiple rules', (done) => {
      var cln      = cleaner(),
          data     = { name: { first: ' jon ', last: ' doe ' } },
          expected = { name: { first: 'Jon', last: 'Doe' } },
          rules    = { name: { first: 'clean|capitalize', last: 'clean|capitalize' } };

      cln.clean(data, rules)
        .then(obj => {
          assert.deepEqual(expected, obj);
        })
        .finally(done);
    });

    it('should not touch field with undefined rules', (done) => {
      var cln      = cleaner(),
          data     = { name: { first: ' jon ', last: ' doe ' } },
          expected = { name: { first: 'Jon', last: ' doe ' } },
          rules    = { name: { first: 'clean|capitalize' } };

      cln.clean(data, rules)
        .then(obj => {
          assert.deepEqual(expected, obj);
        })
        .finally(done);
    });

    it('should not touch object with field that do not match', (done) => {
      var cln      = cleaner(),
          data     = { name: { first: ' jon ', last: ' doe ' } },
          expected = { name: { first: ' jon ', last: ' doe ' } },
          rules    = { first_name: 'clean|capitalize', last_name: 'clean|capitalize' };

      cln.clean(data, rules)
        .then(obj => {
          assert.deepEqual(expected, obj);
        })
        .finally(done);
    });

    it('should reject unknown rules`with explicit error', (done) => {
      var cln      = cleaner(),
          data     = { first_name: ' jon ' },
          rules    = { first_name: 'unknown|clean' },
          expectedErr = 'error on field `first_name`: unknown rule `unknown`: field cleaning error';

      cln.clean(data, rules)
        .then(() => done('why are you here ?'))
        .catch( err => { assert.equal(err.message, expectedErr); } )
        .then(done);
    });

  });

});
