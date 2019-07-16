/**
 * @file ES6 collections fallback library: Map and Set.
 * @version 2.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module collections-x
 */

import hasOwn from 'has-own-property-x';

import isFunction from 'is-function-x';
import defineProperty from 'object-define-property-x';
import defineProperties from 'object-define-properties-x';
import isString from 'is-string';
import isArrayLike from 'is-array-like-x';
import isPrimitive from 'is-primitive';
import isSurrogatePair from 'is-surrogate-pair-x';
import indexOf from 'index-of-x';
import assertIsFunction from 'assert-is-function-x';
import assertIsObject from 'assert-is-object-x';
import IdGenerator from 'big-counter-x';
import isNil from 'is-nil-x';
import isMap from 'is-map-x';
import isSet from 'is-set-x';
import isObjectLike from 'is-object-like-x';
import isArray from 'is-array-x';
import isBoolean from 'is-boolean-object';
import isUndefined from 'validate.io-undefined';
import some from 'array-some-x';
import getPrototypeOf from 'get-prototype-of-x';
import hasSymbolSupport from 'has-symbol-support-x';

const hasRealSymbolIterator = hasSymbolSupport && typeof Symbol.iterator === 'symbol';
const hasFakeSymbolIterator = typeof Symbol === 'object' && typeof Symbol.iterator === 'string';
let symIt;

if (hasRealSymbolIterator || hasFakeSymbolIterator) {
  symIt = Symbol.iterator;
} else if (isFunction(Array.prototype['_es6-shim iterator_'])) {
  symIt = '_es6-shim iterator_';
} else {
  symIt = '@@iterator';
}

const isNumberType = function _isNumberType(value) {
  return typeof value === 'number';
};

/**
 * Detect an interator function.
 *
 * @private
 * @param {*} iterable - Value to detect iterator function.
 * @returns {Symbol|string|undefined} The iterator property identifier.
 */
const getSymbolIterator = function _getSymbolIterator(iterable) {
  if (isNil(iterable) === false) {
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

  return void 0;
};

/**
 * If an iterable object is passed, all of its elements will be added to the
 * new Map/Set, null is treated as undefined.
 *
 * @private
 * @param {string} kind - Either 'map' or 'set'.
 * @param {object} context - The Map/Set object.
 * @param {*} iterable - Value to parsed.
 */
// eslint-disable-next-line complexity
const parseIterable = function _parseIterable(kind, context, iterable) {
  const symbolIterator = getSymbolIterator(iterable);

  if (kind === 'map') {
    defineProperty(context, '[[value]]', {
      value: [],
    });
  }

  defineProperties(context, {
    '[[changed]]': {
      value: false,
    },
    '[[id]]': {
      value: new IdGenerator(),
    },
    '[[key]]': {
      value: [],
    },
    '[[order]]': {
      value: [],
    },
  });

  let next;
  let key;
  let indexof;

  if (iterable && isFunction(iterable[symbolIterator])) {
    const iterator = iterable[symbolIterator]();
    next = iterator.next();

    if (kind === 'map') {
      if (isArrayLike(next.value) === false || next.value.length < 2) {
        throw new TypeError(`Iterator value ${isArrayLike(next.value)} is not an entry object`);
      }
    }

    while (next.done === false) {
      key = kind === 'map' ? next.value[0] : next.value;
      indexof = indexOf(assertIsObject(context)['[[key]]'], key, 'SameValueZero');

      if (indexof < 0) {
        if (kind === 'map') {
          context['[[value]]'].push(next.value[1]);
        }

        context['[[key]]'].push(key);
        context['[[order]]'].push(context['[[id]]'].get());
        context['[[id]]'].next();
      } else if (kind === 'map') {
        context['[[value]]'][indexof] = next.value[1];
      }

      next = iterator.next();
    }
  }

  if (isString(iterable)) {
    if (kind === 'map') {
      throw new TypeError(`Iterator value ${iterable.charAt(0)} is not an entry object`);
    }

    next = 0;
    while (next < iterable.length) {
      const char1 = iterable.charAt(next);
      const char2 = iterable.charAt(next + 1);

      if (isSurrogatePair(char1, char2)) {
        key = char1 + char2;
        next += 1;
      } else {
        key = char1;
      }

      indexof = indexOf(assertIsObject(context)['[[key]]'], key, 'SameValueZero');

      if (indexof < 0) {
        context['[[key]]'].push(key);
        context['[[order]]'].push(context['[[id]]'].get());
        context['[[id]]'].next();
      }

      next += 1;
    }
  } else if (isArrayLike(iterable)) {
    next = 0;
    while (next < iterable.length) {
      if (kind === 'map') {
        if (isPrimitive(iterable[next])) {
          throw new TypeError(`Iterator value ${isArrayLike(next.value)} is not an entry object`);
        }

        key = iterable[next][0];
      } else {
        key = iterable[next];
      }

      key = kind === 'map' ? iterable[next][0] : iterable[next];
      indexof = indexOf(assertIsObject(context)['[[key]]'], key, 'SameValueZero');

      if (indexof < 0) {
        if (kind === 'map') {
          context['[[value]]'].push(iterable[next][1]);
        }

        context['[[key]]'].push(key);
        context['[[order]]'].push(context['[[id]]'].get());
        context['[[id]]'].next();
      } else if (kind === 'map') {
        context['[[value]]'][indexof] = iterable[next][1];
      }

      next += 1;
    }
  }

  defineProperty(context, 'size', {
    value: context['[[key]]'].length,
    writable: true,
  });
};

/**
 * The base forEach method executes a provided function once per each value
 * in the Map/Set object, in insertion order.
 *
 * @private
 * @param {string} kind - Either 'map' or 'set'.
 * @param {object} context - The Map/Set object.
 * @param {Function} callback - Function to execute for each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @returns {object} The Map/Set object.
 */
// eslint-disable-next-line max-params
const baseForEach = function _baseForEach(kind, context, callback, thisArg) {
  assertIsObject(context);
  assertIsFunction(callback);
  const pointers = {
    index: 0,
    order: context['[[order]]'][0],
  };

  context['[[change]]'] = false;
  let {length} = context['[[key]]'];
  while (pointers.index < length) {
    if (hasOwn(context['[[key]]'], pointers.index)) {
      const key = context['[[key]]'][pointers.index];
      const value = kind === 'map' ? context['[[value]]'][pointers.index] : key;
      callback.call(thisArg, value, key, context);
    }

    if (context['[[change]]']) {
      length = context['[[key]]'].length;
      some(context['[[order]]'], function _some1(id, count) {
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
};

/**
 * The base has method returns a boolean indicating whether an element with
 * the specified key/value exists in a Map/Set object or not.
 *
 * @private
 * @param {*} key - The key/value to test for presence in the Map/Set object.
 * @returns {boolean} Returns true if an element with the specified key/value
 *  exists in the Map/Set object; otherwise false.
 */
const baseHas = function has(key) {
  // eslint-disable-next-line no-invalid-this
  return indexOf(assertIsObject(this)['[[key]]'], key, 'SameValueZero') > -1;
};

/**
 * The base clear method removes all elements from a Map/Set object.
 *
 * @private
 * @param {string} kind - Either 'map' or 'set'.
 * @param {object} context - The Map/Set object.
 * @returns {object} The Map/Set object.
 */
const baseClear = function _baseClear(kind, context) {
  assertIsObject(context);
  context['[[id]]'].reset();
  context['[[change]]'] = true;
  context.size = 0;
  context['[[order]]'].length = 0;
  context['[[key]]'].length = 0;

  if (kind === 'map') {
    context['[[value]]'].length = 0;
  }

  return context;
};

/**
 * The base delete method removes the specified element from a Map/Set object.
 *
 * @private
 * @param {string} kind - Either 'map' or 'set'.
 * @param {object} context - The Map/Set object.
 * @param {*} key - The key/value of the element to remove from Map/Set object.
 * @returns {object} The Map/Set object.
 */
const baseDelete = function _baseDelete(kind, context, key) {
  const indexof = indexOf(assertIsObject(context)['[[key]]'], key, 'SameValueZero');

  let result = false;

  if (indexof > -1) {
    if (kind === 'map') {
      context['[[value]]'].splice(indexof, 1);
    }

    context['[[key]]'].splice(indexof, 1);
    context['[[order]]'].splice(indexof, 1);
    context['[[change]]'] = true;
    context.size = context['[[key]]'].length;
    result = true;
  }

  return result;
};

/**
 * The base set and add method.
 *
 * @private
 * @param {string} kind - Either 'map' or 'set'.
 * @param {object} context - The Map/Set object.
 * @param {*} key - The key or value of the element to add/set on the object.
 * @param {*} value - The value of the element to add to the Map object.
 * @returns {object} The Map/Set object.
 */
// eslint-disable-next-line max-params
const baseAddSet = function _baseAddSet(kind, context, key, value) {
  const index = indexOf(assertIsObject(context)['[[key]]'], key, 'SameValueZero');

  if (index > -1) {
    if (kind === 'map') {
      context['[[value]]'][index] = value;
    }
  } else {
    if (kind === 'map') {
      context['[[value]]'].push(value);
    }

    context['[[key]]'].push(key);
    context['[[order]]'].push(context['[[id]]'].get());
    context['[[id]]'].next();
    context['[[change]]'] = true;
    context.size = context['[[key]]'].length;
  }

  return context;
};

/**
 * An object is an iterator when it knows how to access items from a
 * collection one at a time, while keeping track of its current position
 * within that sequence. In JavaScript an iterator is an object that provides
 * a next() method which returns the next item in the sequence. This method
 * returns an object with two properties: done and value. Once created,
 * an iterator object can be used explicitly by repeatedly calling next().
 *
 * @private
 * @class
 * @param {object} context - The Set object.
 * @param {string} iteratorKind - Values are `value`, `key` or `key+value`.
 */
const SetIt = function SetIterator(context, iteratorKind) {
  defineProperties(this, {
    '[[IteratorHasMore]]': {
      value: true,
      writable: true,
    },
    '[[Set]]': {
      value: assertIsObject(context),
    },
    '[[SetIterationKind]]': {
      value: iteratorKind || 'value',
    },
    '[[SetNextIndex]]': {
      value: 0,
      writable: true,
    },
  });
};

/**
 * Once initialized, the next() method can be called to access key-value
 * pairs from the object in turn.
 *
 * @private
 * @function next
 * @returns {object} Returns an object with two properties: done and value.
 */
defineProperty(SetIt.prototype, 'next', {
  value: function next() {
    const context = assertIsObject(this['[[Set]]']);
    const index = this['[[SetNextIndex]]'];
    const iteratorKind = this['[[SetIterationKind]]'];
    const more = this['[[IteratorHasMore]]'];
    let object;

    if (index < context['[[key]]'].length && more) {
      object = {done: false};

      if (iteratorKind === 'key+value') {
        object.value = [context['[[key]]'][index], context['[[key]]'][index]];
      } else {
        object.value = context['[[key]]'][index];
      }

      this['[[SetNextIndex]]'] += 1;
    } else {
      this['[[IteratorHasMore]]'] = false;
      object = {
        done: true,
        value: void 0,
      };
    }

    return object;
  },
});

/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof SetIterator.prototype
 * @returns {object} This Iterator object.
 */
defineProperty(SetIt.prototype, symIt, {
  value: function iterator() {
    return this;
  },
});

/**
 * This method returns a new Iterator object that contains the
 * values for each element in the Set object in insertion order.
 *
 * @private
 * @this Set
 * @returns {object} A new Iterator object.
 */
const setValuesIterator = function values() {
  return new SetIt(this);
};

/**
 * The Set object lets you store unique values of any type, whether primitive
 * values or object references.
 *
 * @class Set
 * @private
 * @param {*} [iterable] - If an iterable object is passed, all of its elements
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
  if (Boolean(this) === false || this instanceof SetObject === false) {
    throw new TypeError("Constructor Set requires 'new'");
  }

  parseIterable('set', this, arguments.length ? arguments[0] : void 0);
};

defineProperties(
  SetObject.prototype,
  /** @lends module:collections-x.Set.prototype */ {
    /**
     * The add() method appends a new element with a specified value to the end
     * of a Set object.
     *
     * @param {*} value - Required. The value of the element to add to the Set
     *  object.
     * @returns {object} The Set object.
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
    add: {
      value: function add(value) {
        return baseAddSet('set', this, value);
      },
    },
    /**
     * The clear() method removes all elements from a Set object.
     *
     * @returns {object} The Set object.
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
    clear: {
      value: function clear() {
        return baseClear('set', this);
      },
    },
    /**
     * The delete() method removes the specified element from a Set object.
     *
     * @param {*} value - The value of the element to remove from the Set object.
     * @returns {boolean} Returns true if an element in the Set object has been
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
    delete: {
      value: function de1ete(value) {
        return baseDelete('set', this, value);
      },
    },
    /**
     * The entries() method returns a new Iterator object that contains an
     * array of [value, value] for each element in the Set object, in
     * insertion order. For Set objects there is no key like in Map objects.
     * However, to keep the API similar to the Map object, each entry has the
     * same value for its key and value here, so that an array [value, value]
     * is returned.
     *
     * @function
     * @returns {object} A new Iterator object.
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
    entries: {
      value: function entries() {
        return new SetIt(this, 'key+value');
      },
    },
    /**
     * The forEach() method executes a provided function once per each value
     * in the Set object, in insertion order.
     *
     * @param {Function} callback - Function to execute for each element.
     * @param {*} [thisArg] - Value to use as this when executing callback.
     * @returns {object} The Set object.
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
    forEach: {
      value: function forEach(callback, thisArg) {
        return baseForEach('set', this, callback, thisArg);
      },
    },
    /**
     * The has() method returns a boolean indicating whether an element with the
     * specified value exists in a Set object or not.
     *
     * @function
     * @param {*} value - The value to test for presence in the Set object.
     * @returns {boolean} Returns true if an element with the specified value
     *  exists in the Set object; otherwise false.
     * @example
     * var Set = require('collections-x').Set;
     * var mySet = new Set();
     * mySet.add("foo");
     *
     * mySet.has("foo");  // returns true
     * mySet.has("bar");  // returns false
     */
    has: {
      value: baseHas,
    },
    /**
     * The keys() method is an alias for the `values` method (for similarity
     * with Map objects); it behaves exactly the same and returns values of
     * Set elements.
     *
     * @function
     * @returns {object} A new Iterator object.
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
    keys: {
      value: setValuesIterator,
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
    size: {
      value: 0,
      writable: true,
    },
    /**
     * The values() method returns a new Iterator object that contains the
     * values for each element in the Set object in insertion order.
     *
     * @function
     * @returns {object} A new Iterator object.
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
    values: {
      value: setValuesIterator,
    },
  },
);

/**
 * The initial value of the @@iterator property is the same function object
 * as the initial value of the values property.
 *
 * @function symIt
 * @memberof module:collections-x.Set.prototype
 * @returns {object} A new Iterator object.
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
defineProperty(SetObject.prototype, symIt, {
  value: setValuesIterator,
});

/**
 * An object is an iterator when it knows how to access items from a
 * collection one at a time, while keeping track of its current position
 * within that sequence. In JavaScript an iterator is an object that provides
 * a next() method which returns the next item in the sequence. This method
 * returns an object with two properties: done and value. Once created,
 * an iterator object can be used explicitly by repeatedly calling next().
 *
 * @private
 * @class
 * @param {object} context - The Map object.
 * @param {string} iteratorKind - Values are `value`, `key` or `key+value`.
 */
const MapIt = function MapIterator(context, iteratorKind) {
  defineProperties(this, {
    '[[IteratorHasMore]]': {
      value: true,
      writable: true,
    },
    '[[Map]]': {
      value: assertIsObject(context),
    },
    '[[MapIterationKind]]': {
      value: iteratorKind,
    },
    '[[MapNextIndex]]': {
      value: 0,
      writable: true,
    },
  });
};

/**
 * Once initialized, the next() method can be called to access key-value
 * pairs from the object in turn.
 *
 * @private
 * @function next
 * @returns {object} Returns an object with two properties: done and value.
 */
defineProperty(MapIt.prototype, 'next', {
  value: function next() {
    const context = assertIsObject(this['[[Map]]']);
    const index = this['[[MapNextIndex]]'];
    const iteratorKind = this['[[MapIterationKind]]'];
    const more = this['[[IteratorHasMore]]'];
    let object;
    assertIsObject(context);

    if (index < context['[[key]]'].length && more) {
      object = {done: false};

      if (iteratorKind === 'key+value') {
        object.value = [context['[[key]]'][index], context['[[value]]'][index]];
      } else {
        object.value = context[`[[${iteratorKind}]]`][index];
      }

      this['[[MapNextIndex]]'] += 1;
    } else {
      this['[[IteratorHasMore]]'] = false;
      object = {
        done: true,
        value: void 0,
      };
    }

    return object;
  },
});

/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof MapIterator.prototype
 * @returns {object} This Iterator object.
 */
defineProperty(MapIt.prototype, symIt, {
  value: function iterator() {
    return this;
  },
});

/**
 * The Map object is a simple key/value map. Any value (both objects and
 * primitive values) may be used as either a key or a value.
 *
 * @class Map
 * @private
 * @param {*} [iterable] - Iterable is an Array or other iterable object whose
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
  if (Boolean(this) === false || this instanceof MapObject === false) {
    throw new TypeError("Constructor Map requires 'new'");
  }

  parseIterable('map', this, arguments.length ? arguments[0] : void 0);
};

defineProperties(
  MapObject.prototype,
  /** @lends module:collections-x.Map.prototype */ {
    /**
     * The clear() method removes all elements from a Map object.
     *
     * @returns {object} The Map object.
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
    clear: {
      value: function clear() {
        return baseClear('map', this);
      },
    },
    /**
     * The delete() method removes the specified element from a Map object.
     *
     * @param {*} key - The key of the element to remove from the Map object.
     * @returns {boolean} Returns true if an element in the Map object has been
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
    delete: {
      value: function de1ete(key) {
        return baseDelete('map', this, key);
      },
    },
    /**
     * The entries() method returns a new Iterator object that contains the
     * [key, value] pairs for each element in the Map object in insertion order.
     *
     * @returns {object} A new Iterator object.
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
    entries: {
      value: function entries() {
        return new MapIt(this, 'key+value');
      },
    },
    /**
     * The forEach() method executes a provided function once per each
     * key/value pair in the Map object, in insertion order.
     *
     * @param {Function} callback - Function to execute for each element..
     * @param {*} [thisArg] - Value to use as this when executing callback.
     * @returns {object} The Map object.
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
    forEach: {
      value: function forEach(callback, thisArg) {
        return baseForEach('map', this, callback, thisArg);
      },
    },
    /**
     * The get() method returns a specified element from a Map object.
     *
     * @param {*} key - The key of the element to return from the Map object.
     * @returns {*} Returns the element associated with the specified key or
     *  undefined if the key can't be found in the Map object.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("bar", "foo");
     *
     * myMap.get("bar");  // Returns "foo".
     * myMap.get("baz");  // Returns undefined.
     */
    get: {
      value: function get(key) {
        const index = indexOf(assertIsObject(this)['[[key]]'], key, 'SameValueZero');

        return index > -1 ? this['[[value]]'][index] : void 0;
      },
    },
    /**
     * The has() method returns a boolean indicating whether an element with
     * the specified key exists or not.
     *
     * @function
     * @param {*} key - The key of the element to test for presence in the
     *  Map object.
     * @returns {boolean} Returns true if an element with the specified key
     *  exists in the Map object; otherwise false.
     * @example
     * var Map = require('collections-x').Map;
     * var myMap = new Map();
     * myMap.set("bar", "foo");
     *
     * myMap.has("bar");  // returns true
     * myMap.has("baz");  // returns false
     */
    has: {
      value: baseHas,
    },
    /**
     * The keys() method returns a new Iterator object that contains the keys
     * for each element in the Map object in insertion order.
     *
     * @returns {object} A new Iterator object.
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
    keys: {
      value: function keys() {
        return new MapIt(this, 'key');
      },
    },
    /**
     * The set() method adds a new element with a specified key and value to
     * a Map object.
     *
     * @param {*} key - The key of the element to add to the Map object.
     * @param {*} value - The value of the element to add to the Map object.
     * @returns {object} The Map object.
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
    set: {
      value: function set(key, value) {
        return baseAddSet('map', this, key, value);
      },
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
    size: {
      value: 0,
      writable: true,
    },
    /**
     * The values() method returns a new Iterator object that contains the
     * values for each element in the Map object in insertion order.
     *
     * @returns {object} A new Iterator object.
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
    values: {
      value: function values() {
        return new MapIt(this, 'value');
      },
    },
  },
);

/**
 * The initial value of the @@iterator property is the same function object
 * as the initial value of the entries property.
 *
 * @function symIt
 * @memberof module:collections-x.Map.prototype
 * @returns {object} A new Iterator object.
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
defineProperty(MapObject.prototype, symIt, {
  value: MapObject.prototype.entries,
});

/*
 * Determine whether to use shim or native.
 */

let ExportMap = MapObject;
try {
  ExportMap = new Map() ? Map : MapObject;
} catch (ignore) {}

let ExportSet = SetObject;
try {
  ExportSet = new Set() ? Set : SetObject;
} catch (ignore) {}

let testMap;

if (ExportMap !== MapObject) {
  testMap = new ExportMap();

  if (isNumberType(testMap.size) === false || testMap.size !== 0) {
    ExportMap = MapObject;
  } else {
    const propsMap = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];

    const failedMap = some(propsMap, function(method) {
      return isFunction(testMap[method]) === false;
    });

    if (failedMap) {
      ExportMap = MapObject;
    }
  }
}

if (ExportMap !== MapObject) {
  // Safari 8, for example, doesn't accept an iterable.
  let mapAcceptsArguments = false;
  try {
    mapAcceptsArguments = new ExportMap([[1, 2]]).get(1) === 2;
  } catch (ignore) {}

  if (mapAcceptsArguments === false) {
    ExportMap = MapObject;
  }
}

if (ExportMap !== MapObject) {
  testMap = new ExportMap();
  const mapSupportsChaining = testMap.set(1, 2) === testMap;

  if (mapSupportsChaining === false) {
    ExportMap = MapObject;
  }
}

if (ExportMap !== MapObject) {
  // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
  testMap = new ExportMap([[1, 0], [2, 0], [3, 0], [4, 0]]);
  testMap.set(-0, testMap);
  const gets = testMap.get(0) === testMap && testMap.get(-0) === testMap;
  const mapUsesSameValueZero = gets && testMap.has(0) && testMap.has(-0);

  if (mapUsesSameValueZero === false) {
    ExportMap = MapObject;
  }
}

if (ExportMap !== MapObject) {
  if (Object.setPrototypeOf) {
    var MyMap = function(arg) {
      testMap = new ExportMap(arg);
      Object.setPrototypeOf(testMap, MyMap.prototype);

      return testMap;
    };

    Object.setPrototypeOf(MyMap, ExportMap);
    MyMap.prototype = Object.create(ExportMap.prototype, {constructor: {value: MyMap}});

    let mapSupportsSubclassing = false;
    try {
      testMap = new MyMap([]);
      // Firefox 32 is ok with the instantiating the subclass but will
      // throw when the map is used.
      testMap.set(42, 42);
      mapSupportsSubclassing = testMap instanceof MyMap;
    } catch (ignore) {}

    if (mapSupportsSubclassing === false) {
      ExportMap = MapObject;
    }
  }
}

if (ExportMap !== MapObject) {
  let mapRequiresNew;
  try {
    // eslint-disable-next-line new-cap
    mapRequiresNew = ExportMap() instanceof ExportMap === false;
  } catch (e) {
    mapRequiresNew = e instanceof TypeError;
  }

  if (mapRequiresNew === false) {
    ExportMap = MapObject;
  }
}

if (ExportMap !== MapObject) {
  testMap = new ExportMap();
  // eslint-disable-next-line id-length
  let mapIterationThrowsStopIterator;
  try {
    mapIterationThrowsStopIterator = testMap.keys().next().done === false;
  } catch (ignore) {
    mapIterationThrowsStopIterator = true;
  }

  if (mapIterationThrowsStopIterator) {
    ExportMap = MapObject;
  }
}

// Safari 8
if (ExportMap !== MapObject && isFunction(new ExportMap().keys().next) === false) {
  ExportMap = MapObject;
}

if (hasRealSymbolIterator && ExportMap !== MapObject) {
  const testMapProto = getPrototypeOf(new ExportMap().keys());
  let hasBuggyMapIterator = true;

  if (testMapProto) {
    hasBuggyMapIterator = isFunction(testMapProto[symIt]) === false;
  }

  if (hasBuggyMapIterator) {
    ExportMap = MapObject;
  }
}

let testSet;

if (ExportSet !== SetObject) {
  testSet = new ExportSet();

  if (isNumberType(testSet.size) === false || testSet.size !== 0) {
    ExportMap = MapObject;
  } else {
    const propsSet = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];

    const failedSet = some(propsSet, function(method) {
      return isFunction(testSet[method]) === false;
    });

    if (failedSet) {
      ExportSet = SetObject;
    }
  }
}

if (ExportSet !== SetObject) {
  testSet = new ExportSet();
  testSet.delete(0);
  testSet.add(-0);
  const setUsesSameValueZero = testSet.has(0) && testSet.has(-0);

  if (setUsesSameValueZero === false) {
    ExportSet = SetObject;
  }
}

if (ExportSet !== SetObject) {
  testSet = new ExportSet();
  const setSupportsChaining = testSet.add(1) === testSet;

  if (setSupportsChaining === false) {
    ExportSet = SetObject;
  }
}

if (ExportSet !== SetObject) {
  if (Object.setPrototypeOf) {
    var MySet = function(arg) {
      testSet = new ExportSet(arg);
      Object.setPrototypeOf(testSet, MySet.prototype);

      return testSet;
    };

    Object.setPrototypeOf(MySet, ExportSet);
    MySet.prototype = Object.create(ExportSet.prototype, {constructor: {value: MySet}});

    let setSupportsSubclassing = false;
    try {
      testSet = new MySet([]);
      testSet.add(42, 42);
      setSupportsSubclassing = testSet instanceof MySet;
    } catch (ignore) {}

    if (setSupportsSubclassing === false) {
      ExportSet = SetObject;
    }
  }
}

if (ExportSet !== SetObject) {
  let setRequiresNew;
  try {
    // eslint-disable-next-line new-cap
    setRequiresNew = ExportSet() instanceof ExportSet === false;
  } catch (e) {
    setRequiresNew = e instanceof TypeError;
  }

  if (setRequiresNew === false) {
    ExportSet = SetObject;
  }
}

if (ExportSet !== SetObject) {
  testSet = new ExportSet();
  // eslint-disable-next-line id-length
  let setIterationThrowsStopIterator;
  try {
    setIterationThrowsStopIterator = testSet.keys().next().done === false;
  } catch (ignore) {
    setIterationThrowsStopIterator = true;
  }

  if (setIterationThrowsStopIterator) {
    ExportSet = SetObject;
  }
}

// Safari 8
if (ExportSet !== SetObject && isFunction(new ExportSet().keys().next) === false) {
  ExportSet = SetObject;
}

if (hasRealSymbolIterator && ExportSet !== SetObject) {
  const testSetProto = getPrototypeOf(new ExportSet().keys());
  let hasBuggySetIterator = true;

  if (testSetProto) {
    hasBuggySetIterator = isFunction(testSetProto[symIt]) === false;
  }

  if (hasBuggySetIterator) {
    ExportSet = SetObject;
  }
}

const hasCommon = function _hasCommon(object) {
  return (
    isObjectLike(object) &&
    isFunction(object[symIt]) &&
    isBoolean(object['[[changed]]']) &&
    isObjectLike(object['[[id]]']) &&
    isArray(object['[[key]]']) &&
    isArray(object['[[order]]']) &&
    isNumberType(object.size)
  );
};

let $isMap;

if (ExportMap === MapObject) {
  $isMap = function _isMap(object) {
    if (isMap(object)) {
      return true;
    }

    return hasCommon(object) && isArray(object['[[value]]']);
  };
} else {
  $isMap = isMap;
}

let $isSet;

if (ExportSet === SetObject) {
  $isSet = function _isSet(object) {
    if (isSet(object)) {
      return true;
    }

    return hasCommon(object) && isUndefined(object['[[value]]']);
  };
} else {
  $isSet = isSet;
}

/*
 * Exports.
 */

export default {
  /**
   * Determine if an `object` is a `Map`.
   *
   * @param {*} object - The object to test.
   * @returns {boolean} `true` if the `object` is a `Map`,
   *  else `false`.
   * @example
   * var isMap = require('collections-x').isMap;
   * var m = new Map();
   *
   * isMap([]); // false
   * isMap(true); // false
   * isMap(m); // true
   */
  isMap: $isMap,
  /**
   * Determine if an `object` is a `Set`.
   *
   * @param {*} object - The object to test.
   * @returns {boolean} `true` if the `object` is a `Set`,
   *  else `false`.
   * @example
   * var isSet = require('collections-x');
   * var s = new Set();
   *
   * isSet([]); // false
   * isSet(true); // false
   * isSet(s); // true
   */
  isSet: $isSet,
  /** @borrows Map as Map */
  Map: ExportMap,
  /** @borrows Set as Set */
  Set: ExportSet,
  /**
   * The iterator identifier that is in use.
   *
   * Type {Symbol|string}.
   */
  symIt,
};
