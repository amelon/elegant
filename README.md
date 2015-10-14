## Elegant

Elegant is schema/raw cleaner for NodeJs.
Project is inspired by [indicative](https://github.com/Adonis-Js/indicative)  but for object cleaning.



### Installation
	npm install elegant --save



### Usage

	var Cleaner = require('elegant');

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

	var cleaner = new Cleaner(schema);

	var myObject = {
		a: '  my string ',
		b: '  my other   string ',
		c: { d: 'true' },
		f: { g: '19' }
	};

	cleaner.clean(myObject)
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


#### `constructor(schema)`

Returns a cleaner instance

##### Params
<dl>
    <dt>schema</dt>
    <dd>Object</dd>
</dl>

`schema` is required

schema is an object that will apply rules on leaf node.

	var Cleaner = require('elegant');

	var schema = {
		username: 'clean|toLowerCase',
		name: {
		    // trim and
			first: 'clean|capitalize',
			last: 'clean|capitalize'
		}
	};

	var userCleaning = new Cleaner(schema);



#### `clean(object)`

Return a promise of a cleaned object


##### Params
<dl>
    <dt>object</dt>
    <dd>Object</dd>
</dl>

`object` is required

	var Cleaner = require('elegant');

	var schema = {
		username: 'clean|toLowerCase',
		name: {
		    // trim and
			first: 'clean|capitalize',
			last: 'clean|capitalize'
		}
	};

	var userCleaning = new Cleaner(schema);

	var obj = {
		username: ' ABcDe ',
		name: {
			first: ' roger  ',
			last: 'arthur'
		}
	};

	userCleaning.clean(obj)
	.then(function(cleanedObj) {
	  // save to db :)
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
	
