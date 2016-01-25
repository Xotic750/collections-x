/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/collections-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/collections-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/collections-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/collections-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/collections-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/collections-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/collections-x" title="npm version">
 * <img src="https://badge.fury.io/js/collections-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6 collections fallback library: Map and Set.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.9
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module collections-x
 */

/*jslint maxlen:80, es6:true, this:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:4, maxdepth:4,
  maxstatements:57, maxcomplexity:24 */

/*global require, module */

;(function () {
  'use strict';

  var hasOwnProperty = require('has-own-property-x');
  var pCharAt = String.prototype.charAt;
  var pPush = Array.prototype.push;
  var pSome = Array.prototype.some;
  var pSplice = Array.prototype.splice;
  var isCallable = require('is-callable');
  var define = require('define-properties-x');
  var isString = require('is-string');
  var isArrayLike = require('is-array-like-x');
  var isPrimitive = require('is-primitive');
  var isSurrogatePair = require('is-surrogate-pair-x');
  var indexOf = require('index-of-x');
  var assertIsCallable = require('assert-is-callable-x');
  var assertIsObject = require('assert-is-object-x');
  var IdGenerator = require('big-counter-x');
  var isNil = require('is-nil-x');
  var hasRealSymbolIterator = require('has-symbol-support-x') &&
    typeof Symbol.iterator === 'symbol';
  var hasFakeSymbolIterator = typeof Symbol === 'object' &&
    typeof Symbol.iterator === 'string';
  var symIt;

  if (hasRealSymbolIterator || hasFakeSymbolIterator) {
    symIt = Symbol.iterator;
  } else if (isCallable(Array.prototype['_es6-shim iterator_'])) {
    symIt = '_es6-shim iterator_';
  } else {
    symIt = '@@iterator';
  }

  /**
   * The iterator identifier that is in use.
   *
   * type {Symbol|string}
   */
  module.exports.symIt = symIt;

  /**
   * Detect an interator function.
   *
   * @private
   * @param {*} iterable Value to detect iterator function.
   * @return {Symbol|string|undefined} The iterator property identifier.
   */
  function getSymbolIterator(iterable) {
    if (!isNil(iterable)) {
      if ((hasRealSymbolIterator || hasFakeSymbolIterator) && iterable[symIt]) {
        return symIt;
      }
      if (iterable['_es6-shim iterator_']) {
        return '_es6-shim iterator_';
      }
      if (iterable['@@iterator']) {
        return '@@iterator';
      }
    }
  }

  /**
   * If an iterable object is passed, all of its elements will be added to the
   * new Map/Set, null is treated as undefined.
   *
   * @private
   * @param {string} kind Either 'map' or 'set'.
   * @param {Object} context The Map/Set object.
   * @param {*} iterable Value to parsed.
   */
  function parseIterable(kind, context, iterable) {
    var symbolIterator = getSymbolIterator(iterable);
    if (kind === 'map') {
      define.defineProperty(context, '[[value]]', []);
    }
    define.defineProperties(context, {
      '[[key]]': [],
      '[[order]]': [],
      '[[id]]': new IdGenerator(),
      '[[changed]]': false
    });
    var next, key, indexof;
    if (iterable && isCallable(iterable[symbolIterator])) {
      var iterator = iterable[symbolIterator]();
      next = iterator.next();
      if (kind === 'map') {
        if (!isArrayLike(next.value) || next.value.length < 2) {
          throw new TypeError(
            'Iterator value ' +
            isArrayLike(next.value) +
            ' is not an entry object'
          );
        }
      }
      while (!next.done) {
        key = kind === 'map' ? next.value[0] : next.value;
        indexof = indexOf(
          assertIsObject(context)['[[key]]'],
          key,
          'SameValueZero'
        );
        if (indexof < 0) {
          if (kind === 'map') {
            pPush.call(context['[[value]]'], next.value[1]);
          }
          pPush.call(context['[[key]]'], key);
          pPush.call(context['[[order]]'], context['[[id]]'].get());
          context['[[id]]'].next();
        } else if (kind === 'map') {
          context['[[value]]'][indexof] = next.value[1];
        }
        next = iterator.next();
      }
    }
    if (isString(iterable)) {
      if (kind === 'map') {
        throw new TypeError(
          'Iterator value ' + pCharAt.call(iterable, 0) + ' is not an entry object'
        );
      }
      next = 0;
      while (next < iterable.length) {
        var char1 = pCharAt.call(iterable, next);
        var char2 = pCharAt.call(iterable, next + 1);
        if (isSurrogatePair(char1, char2)) {
          key = char1 + char2;
          next += 1;
        } else {
          key = char1;
        }
        indexof = indexOf(
          assertIsObject(context)['[[key]]'],
          key,
          'SameValueZero'
        );
        if (indexof < 0) {
          pPush.call(context['[[key]]'], key);
          pPush.call(context['[[order]]'], context['[[id]]'].get());
          context['[[id]]'].next();
        }
        next += 1;
      }
    } else if (isArrayLike(iterable)) {
      next = 0;
      while (next < iterable.length) {
        if (kind === 'map') {
          if (isPrimitive(iterable[next])) {
            throw new TypeError(
              'Iterator value ' +
              isArrayLike(next.value) +
              ' is not an entry object'
            );
          }
          key = iterable[next][0];
        } else {
          key = iterable[next];
        }
        key = kind === 'map' ? iterable[next][0] : iterable[next];
        indexof = indexOf(
          assertIsObject(context)['[[key]]'],
          key,
          'SameValueZero'
        );
        if (indexof < 0) {
          if (kind === 'map') {
            pPush.call(context['[[value]]'], iterable[next][1]);
          }
          pPush.call(context['[[key]]'], key);
          pPush.call(context['[[order]]'], context['[[id]]'].get());
          context['[[id]]'].next();
        } else if (kind === 'map') {
          context['[[value]]'][indexof] = iterable[next][1];
        }
        next += 1;
      }
    }
    define.defineProperty(context, 'size', context['[[key]]'].length, true);
  }

  /**
   * The base forEach method executes a provided function once per each value
   * in the Map/Set object, in insertion order.
   *
   * @private
   * @param {string} kind Either 'map' or 'set'.
   * @param {Object} context The Map/Set object.
   * @param {Function} callback Function to execute for each element.
   * @param {*} [thisArg] Value to use as this when executing callback.
   * @return {Object} The Map/Set object.
   */
  function baseForEach(kind, context, callback, thisArg) {
    assertIsObject(context);
    assertIsCallable(callback);
    var pointers = {
      index: 0,
      order: context['[[order]]'][0]
    };
    context['[[change]]'] = false;
    var length = context['[[key]]'].length;
    while (pointers.index < length) {
      if (hasOwnProperty(context['[[key]]'], pointers.index)) {
        var key = context['[[key]]'][pointers.index];
        var value = kind === 'map' ? context['[[value]]'][pointers.index] : key;
        callback.call(thisArg, value, key, context);
      }
      if (context['[[change]]']) {
        length = context['[[key]]'].length;
        pSome.call(context['[[order]]'], function (id, count) {
          pointers.index = count;
          return id > pointers.order;
        });
        context['[[change]]'] = false;
      } else {
        pointers.index += 1;
      }
      pointers.order = context['[[order]]'][pointers.index];
    }
    return context;
  }

  /**
   * The base has method returns a boolean indicating whether an element with
   * the specified key/value exists in a Map/Set object or not.
   *
   * @private
   * @param {*} key The key/value to test for presence in the Map/Set object.
   * @return {boolean} Returns true if an element with the specified key/value
   *  exists in the Map/Set object; otherwise false.
   */
  var baseHas = function has(key) {
    /*jshint validthis:true */
    return indexOf(assertIsObject(this)['[[key]]'], key, 'SameValueZero') > -1;
  };

  /**
   * The base clear method removes all elements from a Map/Set object.
   *
   * @private
   * @param {string} kind Either 'map' or 'set'.
   * @param {Object} context The Map/Set object.
   * @return {Object} The Map/Set object.
   */
  function baseClear(kind, context) {
    assertIsObject(context);
    context['[[id]]'].reset();
    context['[[change]]'] = true;
    context['[[key]]'].length = context['[[order]]'].length = context.size = 0;
    if (kind === 'map') {
      context['[[value]]'].length = 0;
    }
    return context;
  }

  /**
   * The base delete method removes the specified element from a Map/Set object.
   *
   * @private
   * @param {string} kind Either 'map' or 'set'.
   * @param {Object} context The Map/Set object.
   * @param {*} key The key/value of the element to remove from Map/Set object.
   * @return {Object} The Map/Set object.
   */
  function baseDelete(kind, context, key) {
    var indexof = indexOf(
      assertIsObject(context)['[[key]]'],
      key,
      'SameValueZero'
    );
    var result = false;
    if (indexof > -1) {
      if (kind === 'map') {
        pSplice.call(context['[[value]]'], indexof, 1);
      }
      pSplice.call(context['[[key]]'], indexof, 1);
      pSplice.call(context['[[order]]'], indexof, 1);
      context['[[change]]'] = true;
      context.size = context['[[key]]'].length;
      result = true;
    }
    return result;
  }

  /**
   * The base set and add method.
   *
   * @private
   * @param {string} kind Either 'map' or 'set'.
   * @param {Object} context The Map/Set object.
   * @param {*} key The key or value of the element to add/set on the object.
   * @param {*} value The value of the element to add to the Map object.
   * @return {Object} The Map/Set object.
   */
  function baseAddSet(kind, context, key, value) {
    var index = indexOf(
      assertIsObject(context)['[[key]]'],
      key,
      'SameValueZero'
    );
    if (index > -1) {
      if (kind === 'map') {
        context['[[value]]'][index] = value;
      }
    } else {
      if (kind === 'map') {
        pPush.call(context['[[value]]'], value);
      }
      pPush.call(context['[[key]]'], key);
      pPush.call(context['[[order]]'], context['[[id]]'].get());
      context['[[id]]'].next();
      context['[[change]]'] = true;
      context.size = context['[[key]]'].length;
    }
    return context;
  }

  /**
   * An object is an iterator when it knows how to access items from a
   * collection one at a time, while keeping track of its current position
   * within that sequence. In JavaScript an iterator is an object that provides
   * a next() method which returns the next item in the sequence. This method
   * returns an object with two properties: done and value. Once created,
   * an iterator object can be used explicitly by repeatedly calling next().
   *
   * @private
   * @constructor
   * @param {Object} context The Set object.
   * @param {string} iteratorKind Values are `value`, `key` or `key+value`.
   */
  function SetIterator(context, iteratorKind) {
    define.defineProperties(this, {
      '[[Set]]': assertIsObject(context),
      '[[SetNextIndex]]': 0,
      '[[SetIterationKind]]': iteratorKind || 'value',
      '[[IteratorHasMore]]': true
    });
  }
  /**
   * Once initialized, the next() method can be called to access key-value
   * pairs from the object in turn.
   *
   * @private
   * @function next
   * @return {Object} Returns an object with two properties: done and value.
   */
  define.defineProperty(SetIterator.prototype, 'next', function next() {
    var context = assertIsObject(this['[[Set]]']);
    var index = this['[[SetNextIndex]]'];
    var iteratorKind = this['[[SetIterationKind]]'];
    var more = this['[[IteratorHasMore]]'];
    var object;
    if (index < context['[[key]]'].length && more) {
      object = {
        done: false
      };
      if (iteratorKind === 'key+value') {
        object.value = [
          context['[[key]]'][index],
          context['[[key]]'][index]
        ];
      } else {
        object.value = context['[[key]]'][index];
      }
      this['[[SetNextIndex]]'] += 1;
    } else {
      this['[[IteratorHasMore]]'] = false;
      object = {
        done: true,
        value: void 0
      };
    }
    return object;
  });
  /**
   * The @@iterator property is the same Iterator object.
   *
   * @private
   * @function symIt
   * @memberof SetIterator.prototype
   * @return {Object} This Iterator object.
   */
  define.defineProperty(SetIterator.prototype, symIt, function iterator() {
    return this;
  });

  /**
   * This method returns a new Iterator object that contains the
   * values for each element in the Set object in insertion order.
   *
   * @private
   * @this Set
   * @return {Object} A new Iterator object.
   */
  var setValuesIterator = function values() {
    /*jshint validthis:true */
    return new SetIterator(this);
  };

  /**
   * The Set object lets you store unique values of any type, whether primitive
   * values or object references.
   *
   * @constructor Set
   * @private
   * @param {*} [iterable] If an iterable object is passed, all of its elements
   * will be added to the new Set. null is treated as undefined.
   * @example
   * var mySet = new Set();
   *
   * mySet.add(1);
   * mySet.add(5);
   * mySet.add("some text");
   * var o = {a: 1, b: 2};
   * mySet.add(o);
   *
   * mySet.has(1); // true
   * mySet.has(3); // false, 3 has not been added to the set
   * mySet.has(5);              // true
   * mySet.has(Math.sqrt(25));  // true
   * mySet.has("Some Text".toLowerCase()); // true
   * mySet.has(o); // true
   *
   * mySet.size; // 4
   *
   * mySet.delete(5); // removes 5 from the set
   * mySet.has(5);    // false, 5 has been removed
   *
   * mySet.size; // 3, we just removed one value
   *
   * // Relation with Array objects
   *
   * var myArray = ["value1", "value2", "value3"];
   *
   * // Use the regular Set constructor to transform an Array into a Set
   * var mySet = new Set(myArray);
   *
   * mySet.has("value1"); // returns true
   *
   * // Use the spread operator to transform a set into an Array.
   * console.log(uneval([...mySet])); // Will show you exactly the same Array
   *                                  // as myArray
   */
  var SetObject = function Set() {
    if (!this || !(this instanceof SetObject)) {
      throw new TypeError('Constructor Set requires \'new\'');
    }
    parseIterable('set', this, arguments.length ? arguments[0] : void 0);
  };
  /** @borrows Set as Set */
  module.exports.Set = SetObject;
  define.defineProperties(SetObject.prototype, /** @lends module:collections-x.Set.prototype */ {
    /**
     * The has() method returns a boolean indicating whether an element with the
     * specified value exists in a Set object or not.
     *
     * @function
     * @param {*} value The value to test for presence in the Set object.
     * @return {boolean} Returns true if an element with the specified value
     *  exists in the Set object; otherwise false.
     * @example
     * var Set = require('collections-x').Set;
     * var mySet = new Set();
     * mySet.add("foo");
     *
     * mySet.has("foo");  // returns true
     * mySet.has("bar");  // returns false
     */
    has: baseHas,
    /**
     * The add() method appends a new element with a specified value to the end
     * of a Set object.
     *
     * @param {*} value Required. The value of the element to add to the Set
     *  object.
     * @return {Object} The Set object.
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     *
     * mySet.add(1);
     * mySet.add(5).add("some text"); // chainable
     *
     * console.log(mySet);
     * // Set [1, 5, "some text"]
     */
    add: function add(value) {
      return baseAddSet('set', this, value);
    },
    /**
     * The clear() method removes all elements from a Set object.
     *
     * @return {Object} The Set object.
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     * mySet.add(1);
     * mySet.add("foo");
     *
     * mySet.size;       // 2
     * mySet.has("foo"); // true
     *
     * mySet.clear();
     *
     * mySet.size;       // 0
     * mySet.has("bar")  // false
     */
    clear: function clear() {
      return baseClear('set', this);
    },
    /**
     * The delete() method removes the specified element from a Set object.
     *
     * @param {*} value The value of the element to remove from the Set object.
     * @return {boolean} Returns true if an element in the Set object has been
     *  removed successfully; otherwise false.
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     * mySet.add("foo");
     *
     * mySet.delete("bar"); // Returns false. No "bar" element found
     *                      //to be deleted.
     * mySet.delete("foo"); // Returns true.  Successfully removed.
     *
     * mySet.has("foo");    // Returns false. The "foo" element is no
     *                      //longer present.
     */
    'delete': function de1ete(value) {
      return baseDelete('set', this, value);
    },
    /**
     * The forEach() method executes a provided function once per each value
     * in the Set object, in insertion order.
     *
     * @param {Function} callback Function to execute for each element.
     * @param {*} [thisArg] Value to use as this when executing callback.
     * @return {Object} The Set object.
     * @example
     * function logSetElements(value1, value2, set) {
     *     console.log("s[" + value1 + "] = " + value2);
     * }
     *
     * new Set(["foo", "bar", undefined]).forEach(logSetElements);
     *
     * // logs:
     * // "s[foo] = foo"
     * // "s[bar] = bar"
     * // "s[undefined] = undefined"
     */
    forEach: function forEach(callback, thisArg) {
      return baseForEach('set', this, callback, thisArg);
    },
    /**
     * The values() method returns a new Iterator object that contains the
     * values for each element in the Set object in insertion order.
     *
     * @function
     * @return {Object} A new Iterator object.
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     * mySet.add("foo");
     * mySet.add("bar");
     * mySet.add("baz");
     *
     * var setIter = mySet.values();
     *
     * console.log(setIter.next().value); // "foo"
     * console.log(setIter.next().value); // "bar"
     * console.log(setIter.next().value); // "baz"
     */
    values: setValuesIterator,
    /**
     * The keys() method is an alias for the `values` method (for similarity
     * with Map objects); it behaves exactly the same and returns values of
     * Set elements.
     *
     * @function
     * @return {Object} A new Iterator object.
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     * mySet.add("foo");
     * mySet.add("bar");
     * mySet.add("baz");
     *
     * var setIter = mySet.keys();
     *
     * console.log(setIter.next().value); // "foo"
     * console.log(setIter.next().value); // "bar"
     * console.log(setIter.next().value); // "baz"
     */
    keys: setValuesIterator,
    /**
     * The entries() method returns a new Iterator object that contains an
     * array of [value, value] for each element in the Set object, in
     * insertion order. For Set objects there is no key like in Map objects.
     * However, to keep the API similar to the Map object, each entry has the
     * same value for its key and value here, so that an array [value, value]
     * is returned.
     *
     * @function
     * @return {Object} A new Iterator object.
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     * mySet.add("foobar");
     * mySet.add(1);
     * mySet.add("baz");
     *
     * var setIter = mySet.entries();
     *
     * console.log(setIter.next().value); // ["foobar", "foobar"]
     * console.log(setIter.next().value); // [1, 1]
     * console.log(setIter.next().value); // ["baz", "baz"]
     */
    entries: function entries() {
      return new SetIterator(this, 'key+value');
    },
    /**
     * The value of size is an integer representing how many entries the Set
     * object has.
     *
     * @name size
     * @memberof module:collections-x.Set
     * @instance
     * @type {number}
     * @example
     * var Set = require('collections-x').Set
     * var mySet = new Set();
     * mySet.add(1);
     * mySet.add(5);
     * mySet.add("some text");
     *
     * mySet.size; // 3
     */
    size: 0
  });
  /**
   * The initial value of the @@iterator property is the same function object
   * as the initial value of the values property.
   *
   * @function symIt
   * @memberof module:collections-x.Set.prototype
   * @return {Object} A new Iterator object.
   * @example
   * var Set = require('collections-x').Set,
   * var symIt = var Set = require('collections-x').symIt;
   * var mySet = new Set();
   * mySet.add("0");
   * mySet.add(1);
   * mySet.add({});
   *
   * var setIter = mySet[symIt]();
   *
   * console.log(setIter.next().value); // "0"
   * console.log(setIter.next().value); // 1
   * console.log(setIter.next().value); // Object
   */
  define.defineProperty(SetObject.prototype, symIt, setValuesIterator);

  /**
   * An object is an iterator when it knows how to access items from a
   * collection one at a time, while keeping track of its current position
   * within that sequence. In JavaScript an iterator is an object that provides
   * a next() method which returns the next item in the sequence. This method
   * returns an object with two properties: done and value. Once created,
   * an iterator object can be used explicitly by repeatedly calling next().
   *
   * @private
   * @constructor
   * @param {Object} context The Map object.
   * @param {string} iteratorKind Values are `value`, `key` or `key+value`.
   */
  function MapIterator(context, iteratorKind) {
    define.defineProperties(this, {
      '[[Map]]': assertIsObject(context),
      '[[MapNextIndex]]': 0,
      '[[MapIterationKind]]': iteratorKind,
      '[[IteratorHasMore]]': true
    });
  }
  /**
   * Once initialized, the next() method can be called to access key-value
   * pairs from the object in turn.
   *
   * @private
   * @function next
   * @return {Object} Returns an object with two properties: done and value.
   */
  define.defineProperty(MapIterator.prototype, 'next', function next() {
    var context = assertIsObject(this['[[Map]]']);
    var index = this['[[MapNextIndex]]'];
    var iteratorKind = this['[[MapIterationKind]]'];
    var more = this['[[IteratorHasMore]]'];
    var object;
    assertIsObject(context);
    if (index < context['[[key]]'].length && more) {
      object = {
        done: false
      };
      if (iteratorKind === 'key+value') {
        object.value = [
          context['[[key]]'][index],
          context['[[value]]'][index]
        ];
      } else {
        object.value = context['[[' + iteratorKind + ']]'][index];
      }
      this['[[MapNextIndex]]'] += 1;
    } else {
      this['[[IteratorHasMore]]'] = false;
      object = {
        done: true,
        value: void 0
      };
    }
    return object;
  });
  /**
   * The @@iterator property is the same Iterator object.
   *
   * @private
   * @function symIt
   * @memberof MapIterator.prototype
   * @return {Object} This Iterator object.
   */
  define.defineProperty(MapIterator.prototype, symIt, function iterator() {
    return this;
  });

  /**
   * The Map object is a simple key/value map. Any value (both objects and
   * primitive values) may be used as either a key or a value.
   *
   * @constructor Map
   * @private
   * @param {*} [iterable] Iterable is an Array or other iterable object whose
   *  elements are key-value pairs (2-element Arrays). Each key-value pair is
   *  added to the new Map. null is treated as undefined.
   * @example
   * var Map = require('collections-x').Map;
   * var myMap = new Map();
   *
   * var keyString = "a string",
   *     keyObj = {},
   *     keyFunc = function () {};
   *
   * // setting the values
   * myMap.set(keyString, "value associated with 'a string'");
   * myMap.set(keyObj, "value associated with keyObj");
   * myMap.set(keyFunc, "value associated with keyFunc");
   *
   * myMap.size; // 3
   *
   * // getting the values
   * myMap.get(keyString);    // "value associated with 'a string'"
   * myMap.get(keyObj);       // "value associated with keyObj"
   * myMap.get(keyFunc);      // "value associated with keyFunc"
   *
   * myMap.get("a string");   // "value associated with 'a string'"
   *                          // because keyString === 'a string'
   * myMap.get({});           // undefined, because keyObj !== {}
   * myMap.get(function() {}) // undefined, because keyFunc !== function () {}
   *
   * // Using NaN as Map keys
   * var myMap = new Map();
   * myMap.set(NaN, "not a number");
   *
   * myMap.get(NaN); // "not a number"
   *
   * var otherNaN = Number("foo");
   * myMap.get(otherNaN); // "not a number"
   *
   * // Relation with Array objects
   * var kvArray = [["key1", "value1"], ["key2", "value2"]];
   *
   * // Use the regular Map constructor to transform a
   * // 2D key-value Array into a map
   * var myMap = new Map(kvArray);
   *
   * myMap.get("key1"); // returns "value1"
   */
  var MapObject = function Map() {
    if (!this || !(this instanceof MapObject)) {
      throw new TypeError('Constructor Map requires \'new\'');
    }
    parseIterable('map', this, arguments.length ? arguments[0] : void 0);
  };
  /** @borrows Map as Map */
  module.exports.Map = MapObject;
  define.defineProperties(MapObject.prototype, /** @lends module:collections-x.Map.prototype */ {
    /**
     * The has() method returns a boolean indicating whether an element with
     * the specified key exists or not.
     *
     * @function
     * @param {*} key The key of the element to test for presence in the
     *  Map object.
     * @return {boolean} Returns true if an element with the specified key
     *  exists in the Map object; otherwise false.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("bar", "foo");
     *
     * myMap.has("bar");  // returns true
     * myMap.has("baz");  // returns false
     */
    has: baseHas,
    /**
     * The set() method adds a new element with a specified key and value to
     * a Map object.
     *
     * @param {*} key The key of the element to add to the Map object.
     * @param {*} value The value of the element to add to the Map object.
     * @return {Object} The Map object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     *
     * // Add new elements to the map
     * myMap.set("bar", "foo");
     * myMap.set(1, "foobar");
     *
     * // Update an element in the map
     * myMap.set("bar", "fuuu");
     */
    set: function set(key, value) {
      return baseAddSet('map', this, key, value);
    },
    /**
     * The clear() method removes all elements from a Map object.
     *
     * @return {Object} The Map object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("bar", "baz");
     * myMap.set(1, "foo");
     *
     * myMap.size;       // 2
     * myMap.has("bar"); // true
     *
     * myMap.clear();
     *
     * myMap.size;       // 0
     * myMap.has("bar")  // false
     */
    clear: function clear() {
      return baseClear('map', this);
    },
    /**
     * The get() method returns a specified element from a Map object.
     *
     * @param {*} key The key of the element to return from the Map object.
     * @return {*} Returns the element associated with the specified key or
     *  undefined if the key can't be found in the Map object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("bar", "foo");
     *
     * myMap.get("bar");  // Returns "foo".
     * myMap.get("baz");  // Returns undefined.
     */
    get: function get(key) {
      var index = indexOf(
        assertIsObject(this)['[[key]]'],
        key,
        'SameValueZero'
      );
      return index > -1 ? this['[[value]]'][index] : void 0;
    },
    /**
     * The delete() method removes the specified element from a Map object.
     *
     * @param {*} key The key of the element to remove from the Map object.
     * @return {boolean} Returns true if an element in the Map object has been
     *  removed successfully.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("bar", "foo");
     *
     * myMap.delete("bar"); // Returns true. Successfully removed.
     * myMap.has("bar");    // Returns false.
     *                      // The "bar" element is no longer present.
     */
    'delete': function de1ete(key) {
      return baseDelete('map', this, key);
    },
    /**
     * The forEach() method executes a provided function once per each
     * key/value pair in the Map object, in insertion order.
     *
     * @param {Function} callback Function to execute for each element..
     * @param {*} [thisArg] Value to use as this when executing callback.
     * @return {Object} The Map object.
     * @example
     * var Map = require('collections-x').Map;
     * function logElements(value, key, map) {
     *      console.log("m[" + key + "] = " + value);
     * }
     * var myMap = new Map([["foo", 3], ["bar", {}], ["baz", undefined]]);
     * myMap.forEach(logElements);
     * // logs:
     * // "m[foo] = 3"
     * // "m[bar] = [object Object]"
     * // "m[baz] = undefined"
     */
    forEach: function forEach(callback, thisArg) {
      return baseForEach('map', this, callback, thisArg);
    },
    /**
     * The values() method returns a new Iterator object that contains the
     * values for each element in the Map object in insertion order.
     *
     * @return {Object} A new Iterator object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("0", "foo");
     * myMap.set(1, "bar");
     * myMap.set({}, "baz");
     *
     * var mapIter = myMap.values();
     *
     * console.log(mapIter.next().value); // "foo"
     * console.log(mapIter.next().value); // "bar"
     * console.log(mapIter.next().value); // "baz"
     */
    values: function values() {
      return new MapIterator(this, 'value');
    },
    /**
     * The keys() method returns a new Iterator object that contains the keys
     * for each element in the Map object in insertion order.
     *
     * @return {Object} A new Iterator object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("0", "foo");
     * myMap.set(1, "bar");
     * myMap.set({}, "baz");
     *
     * var mapIter = myMap.keys();
     *
     * console.log(mapIter.next().value); // "0"
     * console.log(mapIter.next().value); // 1
     * console.log(mapIter.next().value); // Object
     */
    keys: function keys() {
      return new MapIterator(this, 'key');
    },
    /**
     * The entries() method returns a new Iterator object that contains the
     * [key, value] pairs for each element in the Map object in insertion order.
     *
     * @return {Object} A new Iterator object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("0", "foo");
     * myMap.set(1, "bar");
     * myMap.set({}, "baz");
     *
     * var mapIter = myMap.entries();
     *
     * console.log(mapIter.next().value); // ["0", "foo"]
     * console.log(mapIter.next().value); // [1, "bar"]
     * console.log(mapIter.next().value); // [Object, "baz"]
     */
    entries: function entries() {
      return new MapIterator(this, 'key+value');
    },
    /**
     * The value of size is an integer representing how many entries the Map
     * object has.
     *
     * @name size
     * @memberof module:collections-x.Map
     * @instance
     * @type {number}
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set(1, true);
     * myMap.set(5, false);
     * myMap.set("some text", 1);
     *
     * myMap.size; // 3
     */
    size: 0
  });
  /**
   * The initial value of the @@iterator property is the same function object
   * as the initial value of the entries property.
   *
   * @function symIt
   * @memberof module:collections-x.Map.prototype
   * @return {Object} A new Iterator object.
   * @example
   * var Map = require('collections-x').Map;
   * var symIt = require('collections-x').symIt;
   * var myMap = new Map();
   * myMap.set("0", "foo");
   * myMap.set(1, "bar");
   * myMap.set({}, "baz");
   *
   * var mapIter = myMap[symIt]();
   *
   * console.log(mapIter.next().value); // ["0", "foo"]
   * console.log(mapIter.next().value); // [1, "bar"]
   * console.log(mapIter.next().value); // [Object, "baz"]
   */
  define.defineProperty(MapObject.prototype, symIt, MapObject.prototype.entries);
}());
