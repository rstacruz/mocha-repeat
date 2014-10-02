/*
 * Makes multiple `describe` blocks that iterates through given `specs`.
 */

module.exports = function (name, specs, fn) {
  var describe = module.exports.describe;

  each(specs, function (item, key) {
    (function (item, key) {
      describe(name + " (" + key + ")", function () {
        var args = Array.isArray(item) ? item : [ item ];
        args.push(key);
        return fn.apply(this, args);
      });
    })(item, key);
  });
};

/*
 * override this to use a different function to delegate to.
 */

module.exports.describe = global.describe;

/*
 * iteration helper: iterates as `(val, key)` for both objects and arrays.
 */

function each (specs, fn) {
  if (Array.isArray(specs)) {
    specs.forEach(fn);
  } else {
    for (var key in specs) {
      if (specs.hasOwnProperty(key)) fn(specs[key], key);
    }
  }
}

