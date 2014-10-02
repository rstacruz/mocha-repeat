# mocha-combine

Easily test multiple variants.

```js
var mdescribe = require('mocha-combine');

var libs = {
  'jquery-1.9': require('../vendor/jquery-1.9.js'),
  'jquery-2.0': require('../vendor/jquery-2.0.js'),
  'jquery-2.1': require('../vendor/jquery-2.1.js'),
};

mdescribe("Tests", libs, function (jQuery) {

  // tests here. `jquery` will be the values of stubs
  it('test one', function () { expect(jQuery).to.be.a('function'); });
  it('test two', function () { expect(jQuery).not.be.undefined; });

});
```

This is the same as:

```js
describe("Tests (jquery-1.9)", function () {
  var jQuery = require('../vendor/jquery-1.9.js');

  it('test one', function () { expect(jQuery).to.be.a('function'); });
  it('test two', function () { expect(jQuery).not.be.undefined; });
});

describe("Tests (jquery-2.0)", function () {
  var jQuery = require('../vendor/jquery-2.0.js');

  it('test one', function () { expect(jQuery).to.be.a('function'); });
  it('test two', function () { expect(jQuery).not.be.undefined; });
});

describe("Tests (jquery-2.1)", function () {
  var jQuery = require('../vendor/jquery-2.0.js');

  it('test one', function () { expect(jQuery).to.be.a('function'); });
  it('test two', function () { expect(jQuery).not.be.undefined; });
});
```

### Splatting

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

### Permutations

```
var underscore = {
```
