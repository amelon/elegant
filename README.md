## Elegant

Elegant is schema/raw cleaner for NodeJs.
Project is inspired by [indicative](https://github.com/Adonis-Js/indicative)  but for object cleaning.



### Installation
	npm install elegant-object --save



### Usage

	var EO = require('elegant-object');

	var schema = {
		// simple rule
		a: "clean",
		// multiple rules separated by |
		b: "trim|capitalize",
		// nested declaration
		c: {
			d: "toBoolean"
		},
		// alternative declaration
		"f.g": "toNumber"
	};

	var cleaner = EO();

	var myObject = {
		a: '  my string ',
		b: '  my other   string ',
		c: { d: 'true' },
		f: { g: '19' }
	};

	cleaner.clean(myObject, schema)
	.then(function(newObj) {
		console.log(newObj);
	})
	.catch(function(err) {
		// error in rule or in execution
	});

	// newObj = {
	// 	  a: 'my string',
	//	  b: 'My other string',
	//	  c: { d: true },
	//	  f:  { g : 19 }
	//  };



### API


#### `constructor()`

Returns a cleaner instance

##### Params
<dl>

</dl>

`schema` is required

schema is an object that will apply rules on leaf node.

	var EO = require('elegant-object');

	var userCleaning = EO();



#### `clean(object, [schema])`

Return a promise of a cleaned object

Promise is rejected if one rule is unknown

##### Params
<dl>
    <dt>object</dt>
    <dd>Object</dd>
    <dt>schema</dt>
    <dd>Object</dd>
</dl>

`object` is required
`schema` is optional but the key of cleaning

	var EO = require('elegant-object');

	var schema = {
		username: 'clean|toLowerCase',
		name: {
		    // trim and
			first: 'clean|capitalize',
			last: 'clean|capitalize'
		}
	};

	var userCleaning = EO();

	var obj = {
		username: ' ABcDe ',
		name: {
			first: ' roger  ',
			last: 'arthur'
		}
	};

	userCleaning.clean(obj, schema)
	.then(function(cleanedObj) {
	  // save to db :)
	});


#### Rejection exemple

	var EO = require('elegant-object');

	var schema = {
		username: 'clean|unknown',
	};

	var userCleaning = EO();

	var obj = {
		username: ' ABcDe ',
	};

	userCleaning.clean(obj, schema)
	.then(function(cleanedObj) {
	  // save to db :)
	})
	.catch(function(err) {
		// err.message => error on field `username`: unknown rule `unknown`: field cleaning error
	});



### Rules

Rules are taken from [underscore.string](https://github.com/epeli/underscore.string)

#### Available rules

* capitalize
* decapitalize
* clean
* cleanDiacritics
* swapCase
* escapeHTML
* unescapeHTML
* dedent
* reverse
* titleize
* camelize
* classify
* underscored
* dasherize
* humanize
* trim
* ltrim
* rtrim
* truncate
* toNumber
* stripTags
* surround
* quote
* unquote
* slugify
* toBoolean
* toUpperCase
* toLowerCase
