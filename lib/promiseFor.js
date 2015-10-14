var Promise = require('bluebird');


/**
 * iterate with promises
 *
 * @param  {function} condition
 * @param  {function} action - function that return a promise
 * @return {Promise}
 *
 * @see http://stackoverflow.com/questions/24660096/correct-way-to-write-loops-for-promise
 * usage:
    promiseFor(function(count) {
        return count < 10;
    }, function(count) {
        return db.getUser(email)
                 .then(function(res) {
                     logger.log(res);
                     return ++count;
                 });
    }, 0).then(console.log.bind(console, 'all done'));
 *
 *
 */
var promiseFor = Promise.method(function(condition, action, value) {
  if (!condition(value)) return value;
  return action(value).then(promiseFor.bind(null, condition, action));
});


module.exports = promiseFor;
