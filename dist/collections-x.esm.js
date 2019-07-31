var _sizeDescriptor;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import attempt from 'attempt-x';
import arrayForEach from 'array-for-each-x';
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
var _ref = [],
    push = _ref.push,
    splice = _ref.splice;
var charAt = KEY.charAt;
var setPrototypeOf = {}.constructor.setPrototypeOf;
/* eslint-disable-next-line compat/compat */

var hasRealSymbolIterator = hasSymbolSupport && _typeof(Symbol.iterator) === 'symbol';
/* eslint-disable-next-line compat/compat */

var hasFakeSymbolIterator = (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) === 'object' && typeof Symbol.iterator === 'string';
var hasSymbolIterator = hasRealSymbolIterator || hasFakeSymbolIterator;

var getOtherSymbolIterator = function getOtherSymbolIterator(iterable) {
  if (iterable[ES6_SHIM_ITERATOR]) {
    return ES6_SHIM_ITERATOR;
  }

  if (iterable[AT_AT_ITERATOR]) {
    return AT_AT_ITERATOR;
  }

  return null;
};

var getSymIt = function getSymIt() {
  if (hasSymbolIterator) {
    /* eslint-disable-next-line compat/compat */
    return Symbol.iterator;
  }

  var result = getOtherSymbolIterator([]);

  if (typeof result === 'string' && isFunction([][result])) {
    return result;
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
 * @returns {symbol|string|undefined} The iterator property identifier.
 */

var getSymbolIterator = function getSymbolIterator(iterable) {
  if (isNil(iterable) === false) {
    if (hasSymbolIterator && iterable[symIt]) {
      return symIt;
    }

    var result = getOtherSymbolIterator(iterable);

    if (typeof result === 'string') {
      return result;
    }
  }

  return UNDEFINED;
};

var assertIterableEntryObject = function assertIterableEntryObject(kind, next) {
  if (kind === MAP) {
    if (isArrayLike(next[VALUE]) === false || next[VALUE].length < 2) {
      throw new TypeError("Iterator value ".concat(isArrayLike(next[VALUE]), " is not an entry object"));
    }
  }
};

var setPropsIterable = function setPropsIterable(args) {
  var _args = _slicedToArray(args, 3),
      kind = _args[0],
      context = _args[1],
      next = _args[2];

  var key = kind === MAP ? next[VALUE][0] : next[VALUE];
  var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (indexof < 0) {
    if (kind === MAP) {
      push.call(context[PROP_VALUE], next[VALUE][1]);
    }

    push.call(context[PROP_KEY], key);
    push.call(context[PROP_ORDER], context[PROP_ID].get());
    context[PROP_ID][NEXT]();
  } else if (kind === MAP) {
    /* eslint-disable-next-line prefer-destructuring */
    context[PROP_VALUE][indexof] = next[VALUE][1];
  }
};

var parseIterable = function parseIterable(args) {
  var _args2 = _slicedToArray(args, 4),
      kind = _args2[0],
      iterable = _args2[1],
      context = _args2[2],
      symbolIterator = _args2[3];

  var iterator = iterable[symbolIterator]();
  var next = iterator[NEXT]();
  assertIterableEntryObject(kind, next);

  while (next[DONE] === false) {
    setPropsIterable([kind, context, next]);
    next = iterator[NEXT]();
  }
};

var assertStringEntryObject = function assertStringEntryObject(kind, iterable) {
  if (kind === MAP) {
    throw new TypeError("Iterator value ".concat(charAt.call(iterable, 0), " is not an entry object"));
  }
};

var getCharsString = function getCharsString(iterable, next) {
  return {
    char1: charAt.call(iterable, next),
    char2: charAt.call(iterable, next + 1)
  };
};

var setContextString = function setContextString(context, key) {
  var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (indexof < 0) {
    push.call(context[PROP_KEY], key);
    push.call(context[PROP_ORDER], context[PROP_ID].get());
    context[PROP_ID][NEXT]();
  }
};

var getNextKey = function getNextKey(iterable, next) {
  var _getCharsString = getCharsString(iterable, next),
      char1 = _getCharsString.char1,
      char2 = _getCharsString.char2;

  if (isSurrogatePair(char1, char2)) {
    return {
      key: char1 + char2,
      nxt: next + 1
    };
  }

  return {
    key: char1,
    nxt: next
  };
};

var parseString = function parseString(args) {
  var _args3 = _slicedToArray(args, 3),
      kind = _args3[0],
      iterable = _args3[1],
      context = _args3[2];

  assertStringEntryObject(kind, iterable);
  var next = 0;

  while (next < iterable.length) {
    var nextKey = getNextKey(iterable, next);
    next = nextKey.nxt;
    setContextString(context, nextKey.key);
    next += 1;
  }
};

var assertArrayLikeIterable = function assertArrayLikeIterable(iterable, next) {
  if (isPrimitive(iterable[next])) {
    throw new TypeError("Iterator value ".concat(isArrayLike(next[VALUE]), " is not an entry object"));
  }
};

var setContextArrayLike = function setContextArrayLike(args) {
  var _args4 = _slicedToArray(args, 5),
      kind = _args4[0],
      context = _args4[1],
      key = _args4[2],
      iterable = _args4[3],
      next = _args4[4];

  var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (indexof < 0) {
    if (kind === MAP) {
      push.call(context[PROP_VALUE], iterable[next][1]);
    }

    push.call(context[PROP_KEY], key);
    push.call(context[PROP_ORDER], context[PROP_ID].get());
    context[PROP_ID][NEXT]();
  } else if (kind === MAP) {
    /* eslint-disable-next-line prefer-destructuring */
    context[PROP_VALUE][indexof] = iterable[next][1];
  }
};

var parseArrayLike = function parseArrayLike(args) {
  var _args5 = _slicedToArray(args, 3),
      kind = _args5[0],
      iterable = _args5[1],
      context = _args5[2];

  var next = 0;

  while (next < iterable.length) {
    var key = void 0;

    if (kind === MAP) {
      assertArrayLikeIterable(iterable, next);
      /* eslint-disable-next-line prefer-destructuring */

      key = iterable[next][0];
    } else {
      key = iterable[next];
    }

    setContextArrayLike([kind, context, key, iterable, next]);
    next += 1;
  }
};

var defineDefaultProps = function defineDefaultProps(context) {
  var _defineProperties;

  defineProperties(context, (_defineProperties = {}, _defineProperty(_defineProperties, PROP_CHANGED, _defineProperty({}, VALUE, false)), _defineProperty(_defineProperties, PROP_ID, _defineProperty({}, VALUE, new IdGenerator())), _defineProperty(_defineProperties, PROP_KEY, _defineProperty({}, VALUE, [])), _defineProperty(_defineProperties, PROP_ORDER, _defineProperty({}, VALUE, [])), _defineProperties));
};

var performParsing = function performParsing(args) {
  var _args6 = _slicedToArray(args, 4),
      iterable = _args6[1],
      symbolIterator = _args6[3];

  if (iterable && isFunction(iterable[symbolIterator])) {
    parseIterable(args);
  } else if (isString(iterable)) {
    parseString(args);
  } else if (isArrayLike(iterable)) {
    parseArrayLike(args);
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


var parse = function parse(args) {
  var _defineProperty3;

  var _args7 = _slicedToArray(args, 3),
      kind = _args7[0],
      context = _args7[1],
      iterable = _args7[2];

  var symbolIterator = getSymbolIterator(iterable);

  if (kind === MAP) {
    defineProperty(context, PROP_VALUE, _defineProperty({}, VALUE, []));
  }

  defineDefaultProps(context);
  performParsing([kind, iterable, context, symbolIterator]);
  defineProperty(context, SIZE, (_defineProperty3 = {}, _defineProperty(_defineProperty3, VALUE, context[PROP_KEY].length), _defineProperty(_defineProperty3, WRITABLE, true), _defineProperty3));
};

var updatePointerIndexes = function updatePointerIndexes(context, pointers) {
  some(context[PROP_ORDER], function predicate(id, count) {
    pointers.index = count;
    return id > pointers.order;
  });
};

var updateBaseForEach = function updateBaseForEach(args) {
  var _args8 = _slicedToArray(args, 3),
      context = _args8[0],
      pointers = _args8[1],
      length = _args8[2];

  var len = length;

  if (context[PROP_CHANGE]) {
    updatePointerIndexes(context, pointers);
    context[PROP_CHANGE] = false;
    len = context[PROP_KEY].length;
  } else {
    pointers.index += 1;
  }

  pointers.order = context[PROP_ORDER][pointers.index];
  return len;
};

var doCallback = function doCallback(args) {
  var _args9 = _slicedToArray(args, 5),
      kind = _args9[0],
      context = _args9[1],
      pointers = _args9[2],
      callback = _args9[3],
      thisArg = _args9[4];

  if (hasOwn(context[PROP_KEY], pointers.index)) {
    var key = context[PROP_KEY][pointers.index];
    var value = kind === MAP ? context[PROP_VALUE][pointers.index] : key;
    callback.call(thisArg, value, key, context);
  }
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


var baseForEach = function baseForEach(args) {
  var _args10 = _slicedToArray(args, 4),
      kind = _args10[0],
      context = _args10[1],
      callback = _args10[2],
      thisArg = _args10[3];

  assertIsObject(context);
  assertIsFunction(callback);
  context[PROP_CHANGE] = false;
  var pointers = {
    index: 0,
    order: context[PROP_ORDER][0]
  };
  var length = context[PROP_KEY].length;

  while (pointers.index < length) {
    doCallback([kind, context, pointers, callback, thisArg]);
    length = updateBaseForEach([context, pointers, length]);
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
};

var setContextFoundBaseDelete = function setContextFoundBaseDelete(args) {
  var _args11 = _slicedToArray(args, 3),
      kind = _args11[0],
      context = _args11[1],
      indexof = _args11[2];

  if (kind === MAP) {
    splice.call(context[PROP_VALUE], indexof, 1);
  }

  splice.call(context[PROP_KEY], indexof, 1);
  splice.call(context[PROP_ORDER], indexof, 1);
  context[PROP_CHANGE] = true;
  context[SIZE] = context[PROP_KEY].length;
  return true;
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


var baseDelete = function baseDelete(args) {
  var _args12 = _slicedToArray(args, 3),
      kind = _args12[0],
      context = _args12[1],
      key = _args12[2];

  var indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);
  return indexof > -1 && setContextFoundBaseDelete([kind, context, indexof]);
};

var setContextFoundBaseAddSet = function setContextFoundBaseAddSet(args) {
  var _args13 = _slicedToArray(args, 4),
      kind = _args13[0],
      context = _args13[1],
      key = _args13[2],
      value = _args13[3];

  if (kind === MAP) {
    push.call(context[PROP_VALUE], value);
  }

  push.call(context[PROP_KEY], key);
  push.call(context[PROP_ORDER], context[PROP_ID].get());
  context[PROP_ID][NEXT]();
  context[PROP_CHANGE] = true;
  context[SIZE] = context[PROP_KEY].length;
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


var baseAddSet = function baseAddSet(args) {
  var _args14 = _slicedToArray(args, 4),
      kind = _args14[0],
      context = _args14[1],
      key = _args14[2],
      value = _args14[3];

  var index = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (index > -1) {
    if (kind === MAP) {
      context[PROP_VALUE][index] = value;
    }
  } else {
    setContextFoundBaseAddSet([kind, context, key, value]);
  }

  return context;
};

var thisIteratorDescriptor = _defineProperty({}, VALUE, function iterator() {
  return this;
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
 * @param {object} context - The Set object.
 * @param {string} [iteratorKind] - Values are `value`, `key` or `key+value`.
 */


var SetIt = function SetIterator(context, iteratorKind) {
  var _PROP_ITERATORHASMORE, _PROP_SETNEXTINDEX, _defineProperties2;

  defineProperties(this, (_defineProperties2 = {}, _defineProperty(_defineProperties2, PROP_ITERATORHASMORE, (_PROP_ITERATORHASMORE = {}, _defineProperty(_PROP_ITERATORHASMORE, VALUE, true), _defineProperty(_PROP_ITERATORHASMORE, WRITABLE, true), _PROP_ITERATORHASMORE)), _defineProperty(_defineProperties2, PROP_SET, _defineProperty({}, VALUE, assertIsObject(context))), _defineProperty(_defineProperties2, PROP_SETITERATIONKIND, _defineProperty({}, VALUE, iteratorKind || KIND_VALUE)), _defineProperty(_defineProperties2, PROP_SETNEXTINDEX, (_PROP_SETNEXTINDEX = {}, _defineProperty(_PROP_SETNEXTINDEX, VALUE, 0), _defineProperty(_PROP_SETNEXTINDEX, WRITABLE, true), _PROP_SETNEXTINDEX)), _defineProperties2));
};

var getSetNextObject = function getSetNextObject(args) {
  var _ref2;

  var _args15 = _slicedToArray(args, 3),
      iteratorKind = _args15[0],
      context = _args15[1],
      index = _args15[2];

  return _ref2 = {}, _defineProperty(_ref2, DONE, false), _defineProperty(_ref2, VALUE, iteratorKind === KIND_KEY_VALUE ? [context[PROP_KEY][index], context[PROP_KEY][index]] : context[PROP_KEY][index]), _ref2;
};
/**
 * Once initialized, the next() method can be called to access key-value
 * pairs from the object in turn.
 *
 * @private
 * @function next
 * @returns {object} Returns an object with two properties: done and value.
 */


defineProperty(SetIt.prototype, NEXT, _defineProperty({}, VALUE, function next() {
  var _ref3;

  var context = assertIsObject(this[PROP_SET]);
  var index = this[PROP_SETNEXTINDEX];
  var iteratorKind = this[PROP_SETITERATIONKIND];
  var more = this[PROP_ITERATORHASMORE];

  if (index < context[PROP_KEY].length && more) {
    this[PROP_SETNEXTINDEX] += 1;
    return getSetNextObject([iteratorKind, context, index]);
  }

  this[PROP_ITERATORHASMORE] = false;
  return _ref3 = {}, _defineProperty(_ref3, DONE, true), _defineProperty(_ref3, VALUE, UNDEFINED), _ref3;
}));
/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof SetIterator.prototype
 * @returns {object} This Iterator object.
 */

defineProperty(SetIt.prototype, symIt, thisIteratorDescriptor);

var hasDescriptor = _defineProperty({}, VALUE, baseHas);

var sizeDescriptor = (_sizeDescriptor = {}, _defineProperty(_sizeDescriptor, VALUE, 0), _defineProperty(_sizeDescriptor, WRITABLE, true), _sizeDescriptor);
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


  parse([SET, this, arguments.length ? arguments[0] : UNDEFINED]);
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
  add: _defineProperty({}, VALUE, function add(value) {
    return baseAddSet([SET, this, value]);
  }),

  /**
   * The clear() method removes all elements from a Set object.
   *
   * @returns {object} The Set object.
   */
  clear: _defineProperty({}, VALUE, function clear() {
    return baseClear(SET, this);
  }),

  /**
   * The delete() method removes the specified element from a Set object.
   *
   * @param {*} value - The value of the element to remove from the Set object.
   * @returns {boolean} Returns true if an element in the Set object has been
   *  removed successfully; otherwise false.
   */
  delete: _defineProperty({}, VALUE, function de1ete(value) {
    return baseDelete([SET, this, value]);
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
  entries: _defineProperty({}, VALUE, function entries() {
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
  forEach: _defineProperty({}, VALUE, function forEach(callback, thisArg) {
    return baseForEach([SET, this, callback, thisArg]);
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
  has: hasDescriptor,

  /**
   * The keys() method is an alias for the `values` method (for similarity
   * with Map objects); it behaves exactly the same and returns values of Set elements.
   *
   * @function
   * @returns {object} A new Iterator object.
   */
  keys: _defineProperty({}, VALUE, setValuesIterator),

  /**
   * The value of size is an integer representing how many entries the Set
   * object has.
   *
   * @name size
   * @memberof $SetObject
   * @instance
   * @type {number}
   */
  size: sizeDescriptor,

  /**
   * The values() method returns a new Iterator object that contains the
   * values for each element in the Set object in insertion order.
   *
   * @function
   * @returns {object} A new Iterator object.
   */
  values: _defineProperty({}, VALUE, setValuesIterator)
});
/**
 * The initial value of the @@iterator property is the same function object
 * as the initial value of the values property.
 *
 * @function symIt
 * @memberof $SetObject.prototype
 * @returns {object} A new Iterator object.
 */

defineProperty(SetImplementation.prototype, symIt, _defineProperty({}, VALUE, setValuesIterator));
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

  defineProperties(this, (_defineProperties3 = {}, _defineProperty(_defineProperties3, PROP_ITERATORHASMORE, (_PROP_ITERATORHASMORE2 = {}, _defineProperty(_PROP_ITERATORHASMORE2, VALUE, true), _defineProperty(_PROP_ITERATORHASMORE2, WRITABLE, true), _PROP_ITERATORHASMORE2)), _defineProperty(_defineProperties3, PROP_MAP, _defineProperty({}, VALUE, assertIsObject(context))), _defineProperty(_defineProperties3, PROP_MAPITERATIONKIND, _defineProperty({}, VALUE, iteratorKind)), _defineProperty(_defineProperties3, PROP_MAPNEXTINDEX, (_PROP_MAPNEXTINDEX = {}, _defineProperty(_PROP_MAPNEXTINDEX, VALUE, 0), _defineProperty(_PROP_MAPNEXTINDEX, WRITABLE, true), _PROP_MAPNEXTINDEX)), _defineProperties3));
};

var getMapNextObject = function getMapNextObject(args) {
  var _ref4;

  var _args16 = _slicedToArray(args, 3),
      iteratorKind = _args16[0],
      context = _args16[1],
      index = _args16[2];

  return _ref4 = {}, _defineProperty(_ref4, DONE, false), _defineProperty(_ref4, VALUE, iteratorKind === KIND_KEY_VALUE ? [context[PROP_KEY][index], context[PROP_VALUE][index]] : context["[[".concat(iteratorKind, "]]")][index]), _ref4;
};
/**
 * Once initialized, the next() method can be called to access key-value
 * pairs from the object in turn.
 *
 * @private
 * @function next
 * @returns {object} Returns an object with two properties: done and value.
 */


defineProperty(MapIt.prototype, NEXT, _defineProperty({}, VALUE, function next() {
  var _ref5;

  var context = assertIsObject(this[PROP_MAP]);
  var index = this[PROP_MAPNEXTINDEX];
  var iteratorKind = this[PROP_MAPITERATIONKIND];
  var more = this[PROP_ITERATORHASMORE];

  if (index < context[PROP_KEY].length && more) {
    this[PROP_MAPNEXTINDEX] += 1;
    return getMapNextObject([iteratorKind, context, index]);
  }

  this[PROP_ITERATORHASMORE] = false;
  return _ref5 = {}, _defineProperty(_ref5, DONE, true), _defineProperty(_ref5, VALUE, UNDEFINED), _ref5;
}));
/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof MapIterator.prototype
 * @returns {object} This Iterator object.
 */

defineProperty(MapIt.prototype, symIt, thisIteratorDescriptor); // eslint-disable jsdoc/check-param-names
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


  parse([MAP, this, arguments.length ? arguments[0] : UNDEFINED]);
}; // noinspection JSValidateTypes

defineProperties(MapImplementation.prototype,
/** @lends MapImplementation.prototype */
{
  /**
   * The clear() method removes all elements from a Map object.
   *
   * @returns {object} The Map object.
   */
  clear: _defineProperty({}, VALUE, function clear() {
    return baseClear(MAP, this);
  }),

  /**
   * The delete() method removes the specified element from a Map object.
   *
   * @param {*} key - The key of the element to remove from the Map object.
   * @returns {boolean} Returns true if an element in the Map object has been
   *  removed successfully.
   */
  delete: _defineProperty({}, VALUE, function de1ete(key) {
    return baseDelete([MAP, this, key]);
  }),

  /**
   * The entries() method returns a new Iterator object that contains the
   * [key, value] pairs for each element in the Map object in insertion order.
   *
   * @returns {object} A new Iterator object.
   */
  entries: _defineProperty({}, VALUE, function entries() {
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
  forEach: _defineProperty({}, VALUE, function forEach(callback, thisArg) {
    return baseForEach([MAP, this, callback, thisArg]);
  }),

  /**
   * The get() method returns a specified element from a Map object.
   *
   * @param {*} key - The key of the element to return from the Map object.
   * @returns {*} Returns the element associated with the specified key or
   *  undefined if the key can't be found in the Map object.
   */
  get: _defineProperty({}, VALUE, function get(key) {
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
  has: hasDescriptor,

  /**
   * The keys() method returns a new Iterator object that contains the keys
   * for each element in the Map object in insertion order.
   *
   * @returns {object} A new Iterator object.
   */
  keys: _defineProperty({}, VALUE, function keys() {
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
  set: _defineProperty({}, VALUE, function set(key, value) {
    return baseAddSet([MAP, this, key, value]);
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
  size: sizeDescriptor,

  /**
   * The values() method returns a new Iterator object that contains the
   * values for each element in the Map object in insertion order.
   *
   * @returns {object} A new Iterator object.
   */
  values: _defineProperty({}, VALUE, function values() {
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

defineProperty(MapImplementation.prototype, symIt, _defineProperty({}, VALUE, MapImplementation.prototype.entries));
/*
 * Determine whether to use shim or native.
 */

/* istanbul ignore next */

var getMyClass = function getMyClass(Subject) {
  var MyClass = function MyClass(arg) {
    var testObject = new Subject(arg);
    setPrototypeOf(testObject, MyClass.prototype);
    return testObject;
  };

  setPrototypeOf(MyClass, Subject);
  MyClass.prototype = create(Subject.prototype, {
    constructor: _defineProperty({}, VALUE, MyClass)
  });
  return MyClass;
};

var noNewfixee = function noNewfixee(Subject) {
  var res = attempt(function attemptee() {
    /* eslint-disable-next-line babel/new-cap */
    return Subject();
  });
  return res.threw === false;
};

var badDoneFixee = function badDoneFixee(Subject) {
  var res = attempt(function attemptee() {
    return new Subject().keys()[NEXT]()[DONE] === false;
  });
  return res.threw || res.value;
};

var badNextFunction = function badNextFunction(Subject) {
  // Safari 8
  return isFunction(new Subject().keys()[NEXT]) === false;
};
/* Map fixes */

/* istanbul ignore next */


var performMapFixes = function performMapFixes() {
  var result = attempt(function attemptee() {
    /* eslint-disable-next-line compat/compat */
    return toBoolean(new Map() instanceof Map) === false;
  });
  var Export = result.threw || result.value ? MapImplementation : Map;

  var peformMapFix = function peformMapFix(fixee) {
    if (Export !== MapImplementation && fixee(Export)) {
      Export = MapImplementation;
    }
  };

  var fixees = [noNewfixee, function fixee(Subject) {
    var testMap = new Subject();

    if (typeof testMap[SIZE] !== 'number' || testMap[SIZE] !== 0) {
      return true;
    }

    var propsMap = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];
    return some(propsMap, function predicate(method) {
      return isFunction(testMap[method]) === false;
    });
  }, function fixee(Subject) {
    // Safari 8, for example, doesn't accept an iterable.
    var res = attempt(function attemptee() {
      return new Subject([[1, 2]]).get(1) !== 2;
    });
    return res.threw || res.result;
  }, function fixee(Subject) {
    var testMap = new Subject();
    return testMap.set(1, 2) !== testMap;
  }, function fixee(Subject) {
    // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
    var testMap = new Subject([[1, 0], [2, 0], [3, 0], [4, 0]]);
    testMap.set(-0, testMap);
    var gets = testMap.get(0) === testMap && testMap.get(-0) === testMap;
    var mapUsesSameValueZero = gets && testMap.has(0) && testMap.has(-0);
    return mapUsesSameValueZero === false;
  }, function fixee(Subject) {
    if (setPrototypeOf) {
      return false;
    }

    var MyMap = getMyClass(Subject);
    var res = attempt(function attemptee() {
      return toBoolean(new MyMap([]).set(42, 42) instanceof MyMap) === false;
    });
    return res.threw || res.value;
  }, badDoneFixee, badNextFunction, function fixee(Subject) {
    var testMapProto = hasRealSymbolIterator && getPrototypeOf(new Subject().keys());
    return toBoolean(testMapProto) && isFunction(testMapProto[symIt]) === false;
  }];
  arrayForEach(fixees, function iteratee(fixee) {
    peformMapFix(fixee);
  });
  return Export;
};
/* Set fixes */

/* istanbul ignore next */


var performSetFixes = function performSetFixes() {
  var result = attempt(function attemptee() {
    /* eslint-disable-next-line compat/compat */
    return toBoolean(new Set() instanceof Set) === false;
  });
  var Export = result.threw || result.value ? SetImplementation : Set;

  var peformSetFix = function peformSetFix(fixee) {
    if (Export !== SetImplementation && fixee(Export)) {
      Export = SetImplementation;
    }
  };

  var fixees = [noNewfixee, function fixee(Subject) {
    var testSet = new Subject();

    if (typeof testSet[SIZE] !== 'number' || testSet[SIZE] !== 0) {
      /* istanbul ignore next */
      return true;
    }

    var propsSet = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];
    return some(propsSet, function predicate(method) {
      return isFunction(testSet[method]) === false;
    });
  }, function fixee(Subject) {
    var testSet = new Subject();
    testSet.delete(0);
    testSet.add(-0);
    return testSet.has(0) === false || testSet.has(-0) === false;
  }, function fixee(Subject) {
    var testSet = new Subject();
    return testSet.add(1) !== testSet;
  }, function fixee(Subject) {
    if (setPrototypeOf) {
      return false;
    }

    var MySet = getMyClass(Subject);
    var res = attempt(function attemptee() {
      return toBoolean(new MySet([]).add(42) instanceof MySet) === false;
    });
    return res.threw || res.value;
  }, badDoneFixee, badNextFunction, function fixee(Subject) {
    var testSetProto = hasRealSymbolIterator && getPrototypeOf(new Subject().keys());
    return toBoolean(testSetProto) && isFunction(testSetProto[symIt]) === false;
  }];
  arrayForEach(fixees, function iteratee(fixee) {
    peformSetFix(fixee);
  });
  return Export;
};

export var MapConstructor = performMapFixes();
export var SetConstructor = performSetFixes();

var hasImplementationProps = function hasImplementationProps(object) {
  return isBoolean(object[PROP_CHANGED]) && isObjectLike(object[PROP_ID]) && isArray(object[PROP_KEY]) && isArray(object[PROP_ORDER]) && typeof object[SIZE] === 'number';
};

var hasCommon = function hasCommon(object) {
  return isObjectLike(object) && isFunction(object[symIt]) && hasImplementationProps(object);
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

export var isMap = MapConstructor === MapImplementation ? isMapImplementation : $isMap;
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

export var isSet = SetConstructor === SetImplementation ? isSetImplementation : $isSet;

//# sourceMappingURL=collections-x.esm.js.map