# mocha-combine

Easily test multiple variations of something using [mocha].

```js
var mdescribe = require('mocha-combine');

var libs = {
  'jquery-1.9': require('../vendor/jquery-1.9.js'),
  'jquery-2.0': require('../vendor/jquery-2.0.js'),
  'jquery-2.1': require('../vendor/jquery-2.1.js'),
};

mdescribe("Tests", libs, function (jQuery) {

  /* ..tests.. */

});
```

This will be expanded to:

```js
describe("Tests (jquery-1.9)", function () {
  var jQuery = require('../vendor/jquery-1.9.js');
  /* ..tests.. */
});

describe("Tests (jquery-2.0)", function () {
  var jQuery = require('../vendor/jquery-2.0.js');
  /* ..tests.. */
});

describe("Tests (jquery-2.1)", function () {
  var jQuery = require('../vendor/jquery-2.0.js');
  /* ..tests.. */
});
```

<br>

### Why?

This effect is easily achievable in plain JavaScript, though the resulting code 
will be more verbose.

```js
libs = { ... };
for (var version in libs) {
  if (libs.hasOwnProperty(version)) {
    var jQuery = libs[version];

    (function (jQuery, version) {
      describe("Test (" + version + ")", function () {
        /* ..tests.. */
      });
    })(jQuery, version);
  }
}
```

It's easier to write it this way:

```js
libs = { ... };
mdescribe("Test", libs, function (jQuery, version) {
  /* ..tests.. */
});
```

<br>

## Splatting

If the values are arrays, they will be spread across the function's arguments.
In this example, the function's 2 arguments (`jQuery, options`) will be 
populated by the array items.

```
var libs = {
  'jquery-1.9': [ require('../vendor/jquery-1.9.js'), { legacy: true } ],
  'jquery-2.0': [ require('../vendor/jquery-2.0.js'), { } ],
  'jquery-2.1': [ require('../vendor/jquery-2.1.js'), { future: true } ],
};

mdescribe("Tests", stubs, function (jQuery, options) {

  if (options.legacy) {
  }

});
```

<br>

## Permutations

You can nest calls to mocha-combine. This is great for testing combinations of 
multiple library versions. In this example, it tests against every possble 
combination of underscore [1.0..1.2] with backbone [1.0..1.2].

```js
var libs = {
  underscore: {
    '1.0': '../vendor/underscore/1.0.0.js',
    '1.1': '../vendor/underscore/1.1.0.js',
    '1.2': '../vendor/underscore/1.2.0.js',
  },
  backbone: {
    '1.0': '../vendor/backbone/1.0.0.js',
    '1.1': '../vendor/backbone/1.1.0.js',
    '1.2': '../vendor/backbone/1.2.0.js',
  },
};

var _, Backbone;

mdescribe("Underscore", libs.underscore, function (upath) {
  mdescribe("Backbone", libs.backbone, function (bpath) {

    // load the libraries
    // ...tip: https://www.npmjs.org/package/proxyquire
    before(function () {
      _ = require(upath);
      Backbone = proxyquire(bpath, { underscore: _ });
    });

    it ('loads without errors', function () {
      expect(_).is.a('function');
      expect(Backbone).is.a('object');
    });
  });
})

```

Output:

```sh
$ mocha -R list

  . Underscore (1.0) Backbone (1.0) loads without errors
  . Underscore (1.0) Backbone (1.1) loads without errors
  . Underscore (1.0) Backbone (1.2) loads without errors
  . Underscore (1.1) Backbone (1.0) loads without errors
  . Underscore (1.1) Backbone (1.1) loads without errors
  . Underscore (1.1) Backbone (1.2) loads without errors
  . Underscore (1.2) Backbone (1.0) loads without errors
  . Underscore (1.2) Backbone (1.1) loads without errors
  . Underscore (1.2) Backbone (1.2) loads without errors

  9 passing (120ms)
```


<br>

### Thanks

**mocha-combine** © 2014+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/mocha-combine/contributors

[mocha]: http://visionmedia.github.io/mocha
