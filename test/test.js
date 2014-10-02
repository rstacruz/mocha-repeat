/* jshint expr: true */
var expect = require('chai').expect;
var sinon = require('sinon');
require('chai').use(require('sinon-chai'));

describe('mocha-repeat', function () {
  var mdescribe, fn, versions;

  beforeEach(function () {
    global.sinon = require('sinon').sandbox.create();
  });

  afterEach(function () {
    global.sinon.restore();
  });

  before(function () {
    mdescribe = require('../index');
  });

  beforeEach(function () {
    mdescribe.describe = sinon.spy(function (name, fn) {
      fn();
    });
  });

  describe('with objects', function () {
    beforeEach(function () {
      fn = sinon.spy();
      versions = { one: 1, two: 2 };
      mdescribe("name", versions, fn);
    });

    it("delegates to describe() twice", function () {
      expect(mdescribe.describe).calledTwice;
      expect(mdescribe.describe).calledWithMatch('name (one)');
      expect(mdescribe.describe).calledWithMatch('name (two)');
    });

    it('passes to fn', function () {
      expect(fn).calledTwice;
      expect(fn).calledWithExactly(1, 'one');
      expect(fn).calledWithExactly(2, 'two');
    });
  });

  describe('with arrays', function () {
    beforeEach(function () {
      fn = sinon.spy();
      versions = [ "one", "two" ];
      mdescribe("name", versions, fn);
    });

    it("delegates to describe() twice", function () {
      expect(mdescribe.describe).calledTwice;
      expect(mdescribe.describe).calledWithMatch('name (0)');
      expect(mdescribe.describe).calledWithMatch('name (1)');
    });

    it('passes to fn', function () {
      expect(fn).calledTwice;
      expect(fn).calledWithExactly('one', 0);
      expect(fn).calledWithExactly('two', 1);
    });
  });

  describe('splatting', function () {
    beforeEach(function () {
      fn = sinon.spy();
      versions = { one: [ 1, 10 ], two: [ 2, 20 ] };
      mdescribe("name", versions, fn);
    });

    it('passes to fn as a splat', function () {
      expect(fn).calledTwice;
      expect(fn).calledWithExactly(1, 10, 'one');
      expect(fn).calledWithExactly(2, 20, 'two');
    });
  });
});
