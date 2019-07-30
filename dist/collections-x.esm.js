var _size,
    _size2,
    _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import $isMap from 'is-map-x';
import $isSet from 'is-set-x';
import isObjectLike from 'is-object-like-x';
import isArray from 'is-array-x';
import isBoolean from 'is-boolean-object';
import some from 'array-some-x';
import getPrototypeOf from 'get-prototype-of-x';
import hasSymbolSupport from 'has-symbol-support-x';
import create from 'object-create-x';
import toBoolean from 'to-boolean-x';
import slice from 'array-slice-x';
/* eslint-disable-next-line no-void */

var UNDEFINED = void 0;
var SIZE = 'size';
var NEXT = 'next';
var KEY = 'key';
var VALUE = 'value';
var DONE = 'done';
var WRITABLE = 'writable';
var MAP = 'map';
var SET = 'set';
var PROP_CHANGED = '[[changed]]';
var PROP_CHANGE = '[[change]]';
var PROP_ID = '[[id]]';
var PROP_KEY = "[[".concat(KEY, "]]");
var PROP_ORDER = '[[order]]';
var PROP_VALUE = "[[".concat(VALUE, "]]");
var PROP_ITERATORHASMORE = '[[IteratorHasMore]]';
var PROP_MAP = '[[Map]]';
var PROP_MAPITERATIONKIND = '[[MapIterationKind]]';
var PROP_MAPNEXTINDEX = '[[MapNextIndex]]';
var PROP_SET = '[[Set]]';
var PROP_SETITERATIONKIND = '[[SetIterationKind]]';
var PROP_SETNEXTINDEX = '[[SetNextIndex]]';
var KIND_VALUE = VALUE;
var KIND_KEY = KEY;
var KIND_KEY_VALUE = "".concat(KIND_KEY, "+").concat(KIND_VALUE);
var SAMEVALUEZERO = 'SameValueZero';
var ES6_SHIM_ITERATOR = '_es6-shim iterator_';
var AT_AT_ITERATOR = '@@iterator';
var setPrototypeOf = {}.constructor.setPrototypeOf;
/* eslint-disable-next-line compat/compat */

var hasRealSymbolIterator = hasSymbolSupport && _typeof(Symbol.iterator) === 'symbol';
/* eslint-disable-next-line compat/compat */

var hasFakeSymbolIterator = (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) === 'object' && typeof Symbol.iterator === 'string';
var hasSymbolIterator = hasRealSymbolIterator || hasFakeSymbolIterator;

var getSymIt = function getSymIt() {
  if (hasSymbolIterator) {
    /* eslint-disable-next-line compat/compat */
    return Symbol.iterator;
  }

  if (isFunction([][ES6_SHIM_ITERATOR])) {
    return ES6_SHIM_ITERATOR;
  }

  return AT_AT_ITERATOR;
};
/**
 * The iterator identifier that is in use.
 *
 * Type {Symbol|string}.
 */


export var symIt = getSymIt();
/**
 * Detect an iterator function.
 *
 * @private
 * @param {*} iterable - Value to detect iterator function.
 * @returns {Symbol|string|undefined} The iterator property identifier.
 */

var getSymbolIterator = function getSymbolIterator(iterable) {
  if (isNil(iterable) === false) {
    if (hasSymbolIterator && iterable[symIt]) {
      return symIt;
    }

    if (iterable[ES6_SHIM_ITERATOR]) {
      return ES6_SHIM_ITERATOR;
    }

    if (iterable[AT_AT_ITERATOR]) {
      return AT_AT_ITERATOR;
    }
  }

  return UNDEFINED;
};

var parseIterable = function parseIterable() {
  /* eslint-disable-next-line prefer-rest-params */
  var _slice = slice(arguments),
      _slice2 = _slicedToArray(_slice, 4),
      kind = _slice2[0],
      iterable = _slice2[1],
      context = _slice2[2],
      symbolIterator = _slice2[3];

  var iterator = iterable[symbolIterator]();
  var next = iterator[NEXT]();

  if (kind === MAP) {
    if (isArrayLike(next[VALUE]) === false || next[VALUE].length < 2) {
      throw new TypeError("Iterator value ".concat(isArrayLike(next[VALUE]), " is not an entry object"));
    }
  }

  while (next[DONE] === false) {
    var key = kind === MAP ? next[VALUE][0] : next[VALUE];
    var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

    if (indexof < 0) {
      if (kind === MAP) {
        context[PROP_VALUE].push(next[VALUE][1]);
      }

      context[PROP_KEY].push(key);
      context[PROP_ORDER].push(context[PROP_ID].get());
      context[PROP_ID][NEXT]();
    } else if (kind === MAP) {
      /* eslint-disable-next-line prefer-destructuring */
      context[PROP_VALUE][indexof] = next[VALUE][1];
    }

    next = iterator[NEXT]();
  }
};

var parseString = function parseString() {
  /* eslint-disable-next-line prefer-rest-params */
  var _slice3 = slice(arguments),
      _slice4 = _slicedToArray(_slice3, 3),
      kind = _slice4[0],
      iterable = _slice4[1],
      context = _slice4[2];

  if (kind === MAP) {
    throw new TypeError("Iterator value ".concat(iterable.charAt(0), " is not an entry object"));
  }

  var next = 0;

  while (next < iterable.length) {
    var char1 = iterable.charAt(next);
    var char2 = iterable.charAt(next + 1);
    var key = void 0;

    if (isSurrogatePair(char1, char2)) {
      key = char1 + char2;
      next += 1;
    } else {
      key = char1;
    }

    var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

    if (indexof < 0) {
      context[PROP_KEY].push(key);
      context[PROP_ORDER].push(context[PROP_ID].get());
      context[PROP_ID][NEXT]();
    }

    next += 1;
  }
};

var parseArrayLike = function parseArrayLike() {
  /* eslint-disable-next-line prefer-rest-params */
  var _slice5 = slice(arguments),
      _slice6 = _slicedToArray(_slice5, 3),
      kind = _slice6[0],
      iterable = _slice6[1],
      context = _slice6[2];

  var next = 0;

  while (next < iterable.length) {
    var key = void 0;

    if (kind === MAP) {
      if (isPrimitive(iterable[next])) {
        throw new TypeError("Iterator value ".concat(isArrayLike(next[VALUE]), " is not an entry object"));
      }
      /* eslint-disable-next-line prefer-destructuring */


      key = iterable[next][0];
    } else {
      key = iterable[next];
    }

    var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

    if (indexof < 0) {
      if (kind === MAP) {
        context[PROP_VALUE].push(iterable[next][1]);
      }

      context[PROP_KEY].push(key);
      context[PROP_ORDER].push(context[PROP_ID].get());
      context[PROP_ID][NEXT]();
    } else if (kind === MAP) {
      /* eslint-disable-next-line prefer-destructuring */
      context[PROP_VALUE][indexof] = iterable[next][1];
    }

    next += 1;
  }
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * If an iterable object is passed, all of its elements will be added to the
 * new Map/Set, null is treated as undefined.
 *
 * @private
 * @param {string} kind - Either MAP or SET.
 * @param {object} context - The Map/Set object.
 * @param {*} iterable - Value to parsed.
 */
// eslint-enable jsdoc/check-param-names


var parse = function parse() {
  var _defineProperties, _defineProperty3;

  /* eslint-disable-next-line prefer-rest-params */
  var _slice7 = slice(arguments),
      _slice8 = _slicedToArray(_slice7, 3),
      kind = _slice8[0],
      context = _slice8[1],
      iterable = _slice8[2];

  var symbolIterator = getSymbolIterator(iterable);

  if (kind === MAP) {
    defineProperty(context, PROP_VALUE, _defineProperty2({}, VALUE, []));
  }

  defineProperties(context, (_defineProperties = {}, _defineProperty2(_defineProperties, PROP_CHANGED, _defineProperty2({}, VALUE, false)), _defineProperty2(_defineProperties, PROP_ID, _defineProperty2({}, VALUE, new IdGenerator())), _defineProperty2(_defineProperties, PROP_KEY, _defineProperty2({}, VALUE, [])), _defineProperty2(_defineProperties, PROP_ORDER, _defineProperty2({}, VALUE, [])), _defineProperties));

  if (iterable && isFunction(iterable[symbolIterator])) {
    parseIterable(kind, iterable, context, symbolIterator);
  } else if (isString(iterable)) {
    parseString(kind, iterable, context);
  } else if (isArrayLike(iterable)) {
    parseArrayLike(kind, iterable, context);
  }

  defineProperty(context, SIZE, (_defineProperty3 = {}, _defineProperty2(_defineProperty3, VALUE, context[PROP_KEY].length), _defineProperty2(_defineProperty3, WRITABLE, true), _defineProperty3));
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * The base forEach method executes a provided function once per each value
 * in the Map/Set object, in insertion order.
 *
 * @private
 * @param {string} kind - Either MAP or SET.
 * @param {object} context - The Map/Set object.
 * @param {Function} callback - Function to execute for each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @returns {object} The Map/Set object.
 */
// eslint-enable jsdoc/check-param-names


var baseForEach = function baseForEach() {
  /* eslint-disable-next-line prefer-rest-params */
  var _slice9 = slice(arguments),
      _slice10 = _slicedToArray(_slice9, 4),
      kind = _slice10[0],
      context = _slice10[1],
      callback = _slice10[2],
      thisArg = _slice10[3];

  assertIsObject(context);
  assertIsFunction(callback);
  var pointers = {
    index: 0,
    order: context[PROP_ORDER][0]
  };
  context[PROP_CHANGE] = false;
  var length = context[PROP_KEY].length;

  while (pointers.index < length) {
    if (hasOwn(context[PROP_KEY], pointers.index)) {
      var key = context[PROP_KEY][pointers.index];
      var value = kind === MAP ? context[PROP_VALUE][pointers.index] : key;
      callback.call(thisArg, value, key, context);
    }

    if (context[PROP_CHANGE]) {
      /* eslint-disable-next-line prefer-destructuring */
      length = context[PROP_KEY].length;
      some(context[PROP_ORDER], function predicate(id, count) {
        pointers.index = count;
        return id > pointers.order;
      });
      context[PROP_CHANGE] = false;
    } else {
      pointers.index += 1;
    }

    pointers.order = context[PROP_ORDER][pointers.index];
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


var baseHas = function has(key) {
  /* eslint-disable-next-line babel/no-invalid-this */
  return indexOf(assertIsObject(this)[PROP_KEY], key, SAMEVALUEZERO) > -1;
};
/**
 * The base clear method removes all elements from a Map/Set object.
 *
 * @private
 * @param {string} kind - Either MAP or SET.
 * @param {object} context - The Map/Set object.
 * @returns {object} The Map/Set object.
 */


var baseClear = function baseClear(kind, context) {
  assertIsObject(context);
  context[PROP_ID].reset();
  context[PROP_CHANGE] = true;
  context[SIZE] = 0;
  context[PROP_ORDER].length = 0;
  context[PROP_KEY].length = 0;

  if (kind === MAP) {
    context[PROP_VALUE].length = 0;
  }

  return context;
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * The base delete method removes the specified element from a Map/Set object.
 *
 * @private
 * @param {string} kind - Either MAP or SET.
 * @param {object} context - The Map/Set object.
 * @param {*} key - The key/value of the element to remove from Map/Set object.
 * @returns {object} The Map/Set object.
 */
// eslint-enable jsdoc/check-param-names


var baseDelete = function baseDelete() {
  /* eslint-disable-next-line prefer-rest-params */
  var _slice11 = slice(arguments),
      _slice12 = _slicedToArray(_slice11, 3),
      kind = _slice12[0],
      context = _slice12[1],
      key = _slice12[2];

  var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);
  var result = false;

  if (indexof > -1) {
    if (kind === MAP) {
      context[PROP_VALUE].splice(indexof, 1);
    }

    context[PROP_KEY].splice(indexof, 1);
    context[PROP_ORDER].splice(indexof, 1);
    context[PROP_CHANGE] = true;
    context[SIZE] = context[PROP_KEY].length;
    result = true;
  }

  return result;
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * The base set and add method.
 *
 * @private
 * @param {string} kind - Either MAP or SET.
 * @param {object} context - The Map/Set object.
 * @param {*} key - The key or value of the element to add/set on the object.
 * @param {*} [value] - The value of the element to add to the Map object.
 * @returns {object} The Map/Set object.
 */
// eslint-enable jsdoc/check-param-names


var baseAddSet = function baseAddSet() {
  /* eslint-disable-next-line prefer-rest-params */
  var _slice13 = slice(arguments),
      _slice14 = _slicedToArray(_slice13, 4),
      kind = _slice14[0],
      context = _slice14[1],
      key = _slice14[2],
      value = _slice14[3];

  var index = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (index > -1) {
    if (kind === MAP) {
      context[PROP_VALUE][index] = value;
    }
  } else {
    if (kind === MAP) {
      context[PROP_VALUE].push(value);
    }

    context[PROP_KEY].push(key);
    context[PROP_ORDER].push(context[PROP_ID].get());
    context[PROP_ID][NEXT]();
    context[PROP_CHANGE] = true;
    context[SIZE] = context[PROP_KEY].length;
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
 * @param {string} [iteratorKind] - Values are `value`, `key` or `key+value`.
 */


var SetIt = function SetIterator(context, iteratorKind) {
  var _PROP_ITERATORHASMORE, _PROP_SETNEXTINDEX, _defineProperties2;

  defineProperties(this, (_defineProperties2 = {}, _defineProperty2(_defineProperties2, PROP_ITERATORHASMORE, (_PROP_ITERATORHASMORE = {}, _defineProperty2(_PROP_ITERATORHASMORE, VALUE, true), _defineProperty2(_PROP_ITERATORHASMORE, WRITABLE, true), _PROP_ITERATORHASMORE)), _defineProperty2(_defineProperties2, PROP_SET, _defineProperty2({}, VALUE, assertIsObject(context))), _defineProperty2(_defineProperties2, PROP_SETITERATIONKIND, _defineProperty2({}, VALUE, iteratorKind || KIND_VALUE)), _defineProperty2(_defineProperties2, PROP_SETNEXTINDEX, (_PROP_SETNEXTINDEX = {}, _defineProperty2(_PROP_SETNEXTINDEX, VALUE, 0), _defineProperty2(_PROP_SETNEXTINDEX, WRITABLE, true), _PROP_SETNEXTINDEX)), _defineProperties2));
};
/**
 * Once initialized, the next() method can be called to access key-value
 * pairs from the object in turn.
 *
 * @private
 * @function next
 * @returns {object} Returns an object with two properties: done and value.
 */


defineProperty(SetIt.prototype, NEXT, _defineProperty2({}, VALUE, function next() {
  var _ref2;

  var context = assertIsObject(this[PROP_SET]);
  var index = this[PROP_SETNEXTINDEX];
  var iteratorKind = this[PROP_SETITERATIONKIND];
  var more = this[PROP_ITERATORHASMORE];

  if (index < context[PROP_KEY].length && more) {
    var _ref;

    this[PROP_SETNEXTINDEX] += 1;
    return _ref = {}, _defineProperty2(_ref, DONE, false), _defineProperty2(_ref, VALUE, iteratorKind === KIND_KEY_VALUE ? [context[PROP_KEY][index], context[PROP_KEY][index]] : context[PROP_KEY][index]), _ref;
  }

  this[PROP_ITERATORHASMORE] = false;
  return _ref2 = {}, _defineProperty2(_ref2, DONE, true), _defineProperty2(_ref2, VALUE, UNDEFINED), _ref2;
}));
/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof SetIterator.prototype
 * @returns {object} This Iterator object.
 */

defineProperty(SetIt.prototype, symIt, _defineProperty2({}, VALUE, function iterator() {
  return this;
}));
/**
 * This method returns a new Iterator object that contains the
 * values for each element in the Set object in insertion order.
 *
 * @private
 * @this Set
 * @returns {object} A new Iterator object.
 */

var setValuesIterator = function values() {
  return new SetIt(this);
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * The Set object lets you store unique values of any type, whether primitive
 * values or object references.
 *
 * @class Set
 * @private
 * @param {*} [iterable] - If an iterable object is passed, all of its elements
 * will be added to the new Set. A null is treated as undefined.
 */
// eslint-enable jsdoc/check-param-names


export var SetImplementation = function Set() {
  if (toBoolean(this) === false || !(this instanceof SetImplementation)) {
    throw new TypeError("Constructor Set requires 'new'");
  }
  /* eslint-disable-next-line prefer-rest-params */


  parse(SET, this, arguments.length ? arguments[0] : UNDEFINED);
}; // noinspection JSValidateTypes

defineProperties(SetImplementation.prototype,
/** @lends SetImplementation.prototype */
{
  /**
   * The add() method appends a new element with a specified value to the end
   * of a Set object.
   *
   * @param {*} value - Required. The value of the element to add to the Set
   *  object.
   * @returns {object} The Set object.
   */
  add: _defineProperty2({}, VALUE, function add(value) {
    return baseAddSet(SET, this, value);
  }),

  /**
   * The clear() method removes all elements from a Set object.
   *
   * @returns {object} The Set object.
   */
  clear: _defineProperty2({}, VALUE, function clear() {
    return baseClear(SET, this);
  }),

  /**
   * The delete() method removes the specified element from a Set object.
   *
   * @param {*} value - The value of the element to remove from the Set object.
   * @returns {boolean} Returns true if an element in the Set object has been
   *  removed successfully; otherwise false.
   */
  delete: _defineProperty2({}, VALUE, function de1ete(value) {
    return baseDelete(SET, this, value);
  }),

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
   */
  entries: _defineProperty2({}, VALUE, function entries() {
    return new SetIt(this, KIND_KEY_VALUE);
  }),

  /**
   * The forEach() method executes a provided function once per each value
   * in the Set object, in insertion order.
   *
   * @param {Function} callback - Function to execute for each element.
   * @param {*} [thisArg] - Value to use as this when executing callback.
   * @returns {object} The Set object.
   */
  forEach: _defineProperty2({}, VALUE, function forEach(callback, thisArg) {
    return baseForEach(SET, this, callback, thisArg);
  }),

  /**
   * The has() method returns a boolean indicating whether an element with the
   * specified value exists in a Set object or not.
   *
   * @function
   * @param {*} value - The value to test for presence in the Set object.
   * @returns {boolean} Returns true if an element with the specified value
   *  exists in the Set object; otherwise false.
   */
  has: _defineProperty2({}, VALUE, baseHas),

  /**
   * The keys() method is an alias for the `values` method (for similarity
   * with Map objects); it behaves exactly the same and returns values of Set elements.
   *
   * @function
   * @returns {object} A new Iterator object.
   */
  keys: _defineProperty2({}, VALUE, setValuesIterator),

  /**
   * The value of size is an integer representing how many entries the Set
   * object has.
   *
   * @name size
   * @memberof $SetObject
   * @instance
   * @type {number}
   */
  size: (_size = {}, _defineProperty2(_size, VALUE, 0), _defineProperty2(_size, WRITABLE, true), _size),

  /**
   * The values() method returns a new Iterator object that contains the
   * values for each element in the Set object in insertion order.
   *
   * @function
   * @returns {object} A new Iterator object.
   */
  values: _defineProperty2({}, VALUE, setValuesIterator)
});
/**
 * The initial value of the @@iterator property is the same function object
 * as the initial value of the values property.
 *
 * @function symIt
 * @memberof $SetObject.prototype
 * @returns {object} A new Iterator object.
 */

defineProperty(SetImplementation.prototype, symIt, _defineProperty2({}, VALUE, setValuesIterator));
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

var MapIt = function MapIterator(context, iteratorKind) {
  var _PROP_ITERATORHASMORE2, _PROP_MAPNEXTINDEX, _defineProperties3;

  defineProperties(this, (_defineProperties3 = {}, _defineProperty2(_defineProperties3, PROP_ITERATORHASMORE, (_PROP_ITERATORHASMORE2 = {}, _defineProperty2(_PROP_ITERATORHASMORE2, VALUE, true), _defineProperty2(_PROP_ITERATORHASMORE2, WRITABLE, true), _PROP_ITERATORHASMORE2)), _defineProperty2(_defineProperties3, PROP_MAP, _defineProperty2({}, VALUE, assertIsObject(context))), _defineProperty2(_defineProperties3, PROP_MAPITERATIONKIND, _defineProperty2({}, VALUE, iteratorKind)), _defineProperty2(_defineProperties3, PROP_MAPNEXTINDEX, (_PROP_MAPNEXTINDEX = {}, _defineProperty2(_PROP_MAPNEXTINDEX, VALUE, 0), _defineProperty2(_PROP_MAPNEXTINDEX, WRITABLE, true), _PROP_MAPNEXTINDEX)), _defineProperties3));
};
/**
 * Once initialized, the next() method can be called to access key-value
 * pairs from the object in turn.
 *
 * @private
 * @function next
 * @returns {object} Returns an object with two properties: done and value.
 */


defineProperty(MapIt.prototype, NEXT, _defineProperty2({}, VALUE, function next() {
  var _ref4;

  var context = assertIsObject(this[PROP_MAP]);
  var index = this[PROP_MAPNEXTINDEX];
  var iteratorKind = this[PROP_MAPITERATIONKIND];
  var more = this[PROP_ITERATORHASMORE];

  if (index < context[PROP_KEY].length && more) {
    var _ref3;

    this[PROP_MAPNEXTINDEX] += 1;
    return _ref3 = {}, _defineProperty2(_ref3, DONE, false), _defineProperty2(_ref3, VALUE, iteratorKind === KIND_KEY_VALUE ? [context[PROP_KEY][index], context[PROP_VALUE][index]] : context["[[".concat(iteratorKind, "]]")][index]), _ref3;
  }

  this[PROP_ITERATORHASMORE] = false;
  return _ref4 = {}, _defineProperty2(_ref4, DONE, true), _defineProperty2(_ref4, VALUE, UNDEFINED), _ref4;
}));
/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof MapIterator.prototype
 * @returns {object} This Iterator object.
 */

defineProperty(MapIt.prototype, symIt, _defineProperty2({}, VALUE, function iterator() {
  return this;
})); // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * The Map object is a simple key/value map. Any value (both objects and
 * primitive values) may be used as either a key or a value.
 *
 * @class Map
 * @private
 * @param {*} [iterable] - Iterable is an Array or other iterable object whose
 *  elements are key-value pairs (2-element Arrays). Each key-value pair is
 *  added to the new Map. A null is treated as undefined.
 */
// eslint-enable jsdoc/check-param-names

export var MapImplementation = function Map() {
  if (toBoolean(this) === false || !(this instanceof MapImplementation)) {
    throw new TypeError("Constructor Map requires 'new'");
  }
  /* eslint-disable-next-line prefer-rest-params */


  parse(MAP, this, arguments.length ? arguments[0] : UNDEFINED);
}; // noinspection JSValidateTypes

defineProperties(MapImplementation.prototype,
/** @lends MapImplementation.prototype */
{
  /**
   * The clear() method removes all elements from a Map object.
   *
   * @returns {object} The Map object.
   */
  clear: _defineProperty2({}, VALUE, function clear() {
    return baseClear(MAP, this);
  }),

  /**
   * The delete() method removes the specified element from a Map object.
   *
   * @param {*} key - The key of the element to remove from the Map object.
   * @returns {boolean} Returns true if an element in the Map object has been
   *  removed successfully.
   */
  delete: _defineProperty2({}, VALUE, function de1ete(key) {
    return baseDelete(MAP, this, key);
  }),

  /**
   * The entries() method returns a new Iterator object that contains the
   * [key, value] pairs for each element in the Map object in insertion order.
   *
   * @returns {object} A new Iterator object.
   */
  entries: _defineProperty2({}, VALUE, function entries() {
    return new MapIt(this, KIND_KEY_VALUE);
  }),

  /**
   * The forEach() method executes a provided function once per each
   * key/value pair in the Map object, in insertion order.
   *
   * @param {Function} callback - Function to execute for each element..
   * @param {*} [thisArg] - Value to use as this when executing callback.
   * @returns {object} The Map object.
   */
  forEach: _defineProperty2({}, VALUE, function forEach(callback, thisArg) {
    return baseForEach(MAP, this, callback, thisArg);
  }),

  /**
   * The get() method returns a specified element from a Map object.
   *
   * @param {*} key - The key of the element to return from the Map object.
   * @returns {*} Returns the element associated with the specified key or
   *  undefined if the key can't be found in the Map object.
   */
  get: _defineProperty2({}, VALUE, function get(key) {
    var index = indexOf(assertIsObject(this)[PROP_KEY], key, SAMEVALUEZERO);
    return index > -1 ? this[PROP_VALUE][index] : UNDEFINED;
  }),

  /**
   * The has() method returns a boolean indicating whether an element with
   * the specified key exists or not.
   *
   * @function
   * @param {*} key - The key of the element to test for presence in the Map object.
   * @returns {boolean} Returns true if an element with the specified key
   *  exists in the Map object; otherwise false.
   */
  has: _defineProperty2({}, VALUE, baseHas),

  /**
   * The keys() method returns a new Iterator object that contains the keys
   * for each element in the Map object in insertion order.
   *
   * @returns {object} A new Iterator object.
   */
  keys: _defineProperty2({}, VALUE, function keys() {
    return new MapIt(this, KIND_KEY);
  }),

  /**
   * The set() method adds a new element with a specified key and value to
   * a Map object.
   *
   * @param {*} key - The key of the element to add to the Map object.
   * @param {*} value - The value of the element to add to the Map object.
   * @returns {object} The Map object.
   */
  set: _defineProperty2({}, VALUE, function set(key, value) {
    return baseAddSet(MAP, this, key, value);
  }),

  /**
   * The value of size is an integer representing how many entries the Map
   * object has.
   *
   * @name size
   * @memberof $MapObject
   * @instance
   * @type {number}
   */
  size: (_size2 = {}, _defineProperty2(_size2, VALUE, 0), _defineProperty2(_size2, WRITABLE, true), _size2),

  /**
   * The values() method returns a new Iterator object that contains the
   * values for each element in the Map object in insertion order.
   *
   * @returns {object} A new Iterator object.
   */
  values: _defineProperty2({}, VALUE, function values() {
    return new MapIt(this, KIND_VALUE);
  })
});
/**
 * The initial value of the @@iterator property is the same function object
 * as the initial value of the entries property.
 *
 * @function symIt
 * @memberof module:collections-x.Map.prototype
 * @returns {object} A new Iterator object.
 */

defineProperty(MapImplementation.prototype, symIt, _defineProperty2({}, VALUE, MapImplementation.prototype.entries));
/*
 * Determine whether to use shim or native.
 */

var ExportMap = MapImplementation;

try {
  /* eslint-disable-next-line compat/compat */
  ExportMap = new Map() ? Map : MapImplementation;
} catch (ignore) {// empty
}

export var MapConstructor = ExportMap;
var ExportSet = SetImplementation;

try {
  /* eslint-disable-next-line compat/compat */
  ExportSet = new Set() ? Set : SetImplementation;
} catch (ignore) {// empty
}

export var SetConstructor = ExportSet;
var testMap;

if (ExportMap !== MapImplementation) {
  testMap = new ExportMap();

  if (typeof testMap[SIZE] !== 'number' || testMap[SIZE] !== 0) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  } else {
    var propsMap = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];
    var failedMap = some(propsMap, function (method) {
      _newArrowCheck(this, _this);

      return isFunction(testMap[method]) === false;
    }.bind(this));

    if (failedMap) {
      /* istanbul ignore next */
      ExportMap = MapImplementation;
    }
  }
}

if (ExportMap !== MapImplementation) {
  // Safari 8, for example, doesn't accept an iterable.
  var mapAcceptsArguments = false;

  try {
    mapAcceptsArguments = new ExportMap([[1, 2]]).get(1) === 2;
  } catch (ignore) {// empty
  }

  if (mapAcceptsArguments === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  testMap = new ExportMap();
  var mapSupportsChaining = testMap.set(1, 2) === testMap;

  if (mapSupportsChaining === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
  testMap = new ExportMap([[1, 0], [2, 0], [3, 0], [4, 0]]);
  testMap.set(-0, testMap);
  var gets = testMap.get(0) === testMap && testMap.get(-0) === testMap;
  var mapUsesSameValueZero = gets && testMap.has(0) && testMap.has(-0);

  if (mapUsesSameValueZero === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  if (setPrototypeOf) {
    var MyMap = function MyMap(arg) {
      testMap = new ExportMap(arg);
      setPrototypeOf(testMap, MyMap.prototype);
      return testMap;
    };

    setPrototypeOf(MyMap, ExportMap);
    MyMap.prototype = create(ExportMap.prototype, {
      constructor: _defineProperty2({}, VALUE, MyMap)
    });
    var mapSupportsSubclassing = false;

    try {
      testMap = new MyMap([]); // Firefox 32 is ok with the instantiating the subclass but will
      // throw when the map is used.

      testMap.set(42, 42);
      mapSupportsSubclassing = testMap instanceof MyMap;
    } catch (ignore) {// empty
    }

    if (mapSupportsSubclassing === false) {
      /* istanbul ignore next */
      ExportMap = MapImplementation;
    }
  }
}

if (ExportMap !== MapImplementation) {
  var mapRequiresNew;

  try {
    /* eslint-disable-next-line babel/new-cap */
    mapRequiresNew = !(ExportMap() instanceof ExportMap);
  } catch (e) {
    mapRequiresNew = e instanceof TypeError;
  }

  if (mapRequiresNew === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  testMap = new ExportMap();
  var mapIterationThrowsStopIterator;

  try {
    mapIterationThrowsStopIterator = testMap.keys()[NEXT]()[DONE] === false;
  } catch (ignore) {
    /* istanbul ignore next */
    mapIterationThrowsStopIterator = true;
  }

  if (mapIterationThrowsStopIterator) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
} // Safari 8


if (ExportMap !== MapImplementation && isFunction(new ExportMap().keys()[NEXT]) === false) {
  /* istanbul ignore next */
  ExportMap = MapImplementation;
}

if (hasRealSymbolIterator && ExportMap !== MapImplementation) {
  var testMapProto = getPrototypeOf(new ExportMap().keys());
  var hasBuggyMapIterator = true;

  if (testMapProto) {
    hasBuggyMapIterator = isFunction(testMapProto[symIt]) === false;
  }

  if (hasBuggyMapIterator) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

var testSet;

if (ExportSet !== SetImplementation) {
  testSet = new ExportSet();

  if (typeof testSet[SIZE] !== 'number' || testSet[SIZE] !== 0) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  } else {
    var propsSet = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];
    var failedSet = some(propsSet, function predicate(method) {
      return isFunction(testSet[method]) === false;
    });

    if (failedSet) {
      /* istanbul ignore next */
      ExportSet = SetImplementation;
    }
  }
}

if (ExportSet !== SetImplementation) {
  testSet = new ExportSet();
  testSet.delete(0);
  testSet.add(-0);
  var setUsesSameValueZero = testSet.has(0) && testSet.has(-0);

  if (setUsesSameValueZero === false) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

if (ExportSet !== SetImplementation) {
  testSet = new ExportSet();
  var setSupportsChaining = testSet.add(1) === testSet;

  if (setSupportsChaining === false) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

if (ExportSet !== SetImplementation) {
  if (setPrototypeOf) {
    var MySet = function MySet(arg) {
      testSet = new ExportSet(arg);
      setPrototypeOf(testSet, MySet.prototype);
      return testSet;
    };

    setPrototypeOf(MySet, ExportSet);
    MySet.prototype = create(ExportSet.prototype, {
      constructor: _defineProperty2({}, VALUE, MySet)
    });
    var setSupportsSubclassing = false;

    try {
      testSet = new MySet([]);
      testSet.add(42, 42);
      setSupportsSubclassing = testSet instanceof MySet;
    } catch (ignore) {// empty
    }

    if (setSupportsSubclassing === false) {
      /* istanbul ignore next */
      ExportSet = SetImplementation;
    }
  }
}

if (ExportSet !== SetImplementation) {
  var setRequiresNew;

  try {
    /* eslint-disable-next-line babel/new-cap */
    setRequiresNew = !(ExportSet() instanceof ExportSet);
  } catch (e) {
    setRequiresNew = e instanceof TypeError;
  }

  if (setRequiresNew === false) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

if (ExportSet !== SetImplementation) {
  testSet = new ExportSet();
  var setIterationThrowsStopIterator;

  try {
    setIterationThrowsStopIterator = testSet.keys()[NEXT]()[DONE] === false;
  } catch (ignore) {
    /* istanbul ignore next */
    setIterationThrowsStopIterator = true;
  }

  if (setIterationThrowsStopIterator) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
} // Safari 8


if (ExportSet !== SetImplementation && isFunction(new ExportSet().keys()[NEXT]) === false) {
  /* istanbul ignore next */
  ExportSet = SetImplementation;
}

if (hasRealSymbolIterator && ExportSet !== SetImplementation) {
  var testSetProto = getPrototypeOf(new ExportSet().keys());
  var hasBuggySetIterator = true;

  if (testSetProto) {
    hasBuggySetIterator = isFunction(testSetProto[symIt]) === false;
  }

  if (hasBuggySetIterator) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

var hasCommon = function hasCommon(object) {
  return isObjectLike(object) && isFunction(object[symIt]) && isBoolean(object[PROP_CHANGED]) && isObjectLike(object[PROP_ID]) && isArray(object[PROP_KEY]) && isArray(object[PROP_ORDER]) && typeof object[SIZE] === 'number';
};

export var isMapImplementation = function isMapImplementation(object) {
  return $isMap(object) || hasCommon(object) && isArray(object[PROP_VALUE]);
};
/**
 * Determine if an `object` is a `Map`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Map`,
 *  else `false`.
 */

export var isMap = ExportMap === MapImplementation ? isMapImplementation : $isMap;
export var isSetImplementation = function isSetImplementation(object) {
  return $isSet(object) || hasCommon(object) && typeof object[PROP_VALUE] === 'undefined';
};
/**
 * Determine if an `object` is a `Set`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Set`,
 *  else `false`.
 */

export var isSet = ExportSet === SetImplementation ? isSetImplementation : $isSet;

//# sourceMappingURL=collections-x.esm.js.map