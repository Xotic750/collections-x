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

/* eslint-disable-next-line no-void */
const UNDEFINED = void 0;
const SIZE = 'size';
const NEXT = 'next';
const KEY = 'key';
const VALUE = 'value';
const DONE = 'done';
const WRITABLE = 'writable';
const MAP = 'map';
const SET = 'set';
const PROP_CHANGED = '[[changed]]';
const PROP_CHANGE = '[[change]]';
const PROP_ID = '[[id]]';
const PROP_KEY = `[[${KEY}]]`;
const PROP_ORDER = '[[order]]';
const PROP_VALUE = `[[${VALUE}]]`;
const PROP_ITERATORHASMORE = '[[IteratorHasMore]]';
const PROP_MAP = '[[Map]]';
const PROP_MAPITERATIONKIND = '[[MapIterationKind]]';
const PROP_MAPNEXTINDEX = '[[MapNextIndex]]';
const PROP_SET = '[[Set]]';
const PROP_SETITERATIONKIND = '[[SetIterationKind]]';
const PROP_SETNEXTINDEX = '[[SetNextIndex]]';
const KIND_VALUE = VALUE;
const KIND_KEY = KEY;
const KIND_KEY_VALUE = `${KIND_KEY}+${KIND_VALUE}`;
const SAMEVALUEZERO = 'SameValueZero';
const ES6_SHIM_ITERATOR = '_es6-shim iterator_';
const AT_AT_ITERATOR = '@@iterator';

const {push} = [];
const {charAt} = KEY;
const {setPrototypeOf} = {}.constructor;
/* eslint-disable-next-line compat/compat */
const hasRealSymbolIterator = hasSymbolSupport && typeof Symbol.iterator === 'symbol';
/* eslint-disable-next-line compat/compat */
const hasFakeSymbolIterator = typeof Symbol === 'object' && typeof Symbol.iterator === 'string';
const hasSymbolIterator = hasRealSymbolIterator || hasFakeSymbolIterator;

const getOtherSymbolIterator = function getOtherSymbolIterator(iterable) {
  if (iterable[ES6_SHIM_ITERATOR]) {
    return ES6_SHIM_ITERATOR;
  }

  if (iterable[AT_AT_ITERATOR]) {
    return AT_AT_ITERATOR;
  }

  return null;
};

const getSymIt = function getSymIt() {
  if (hasSymbolIterator) {
    /* eslint-disable-next-line compat/compat */
    return Symbol.iterator;
  }

  const result = getOtherSymbolIterator([]);

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
export const symIt = getSymIt();

/**
 * Detect an iterator function.
 *
 * @private
 * @param {*} iterable - Value to detect iterator function.
 * @returns {Symbol|string|undefined} The iterator property identifier.
 */
const getSymbolIterator = function getSymbolIterator(iterable) {
  if (isNil(iterable) === false) {
    if (hasSymbolIterator && iterable[symIt]) {
      return symIt;
    }

    const result = getOtherSymbolIterator(iterable);

    if (typeof result === 'string') {
      return result;
    }
  }

  return UNDEFINED;
};

const assertIterableEntryObject = function assertIterableEntryObject(kind, next) {
  if (kind === MAP) {
    if (isArrayLike(next[VALUE]) === false || next[VALUE].length < 2) {
      throw new TypeError(`Iterator value ${isArrayLike(next[VALUE])} is not an entry object`);
    }
  }
};

const setPropsIterable = function setPropsIterable(args) {
  const [kind, context, next] = args;
  const key = kind === MAP ? next[VALUE][0] : next[VALUE];
  const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

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

const parseIterable = function parseIterable(args) {
  const [kind, iterable, context, symbolIterator] = args;
  const iterator = iterable[symbolIterator]();
  let next = iterator[NEXT]();

  assertIterableEntryObject(kind, next);

  while (next[DONE] === false) {
    setPropsIterable([kind, context, next]);
    next = iterator[NEXT]();
  }
};

const assertStringEntryObject = function assertStringEntryObject(kind, iterable) {
  if (kind === MAP) {
    throw new TypeError(`Iterator value ${charAt.call(iterable, 0)} is not an entry object`);
  }
};

const getCharsString = function getCharsString(iterable, next) {
  return {
    char1: charAt.call(iterable, next),
    char2: charAt.call(iterable, next + 1),
  };
};

const setContextString = function setContextString(context, key) {
  const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (indexof < 0) {
    push.call(context[PROP_KEY], key);
    push.call(context[PROP_ORDER], context[PROP_ID].get());
    context[PROP_ID][NEXT]();
  }
};

const getNextKey = function getNextKey(iterable, next) {
  const {char1, char2} = getCharsString(iterable, next);

  if (isSurrogatePair(char1, char2)) {
    return {
      key: char1 + char2,
      nxt: next + 1,
    };
  }

  return {
    key: char1,
    nxt: next,
  };
};

const parseString = function parseString(args) {
  const [kind, iterable, context] = args;

  assertStringEntryObject(kind, iterable);

  let next = 0;
  while (next < iterable.length) {
    const nextKey = getNextKey(iterable, next);
    next = nextKey.nxt;

    setContextString(context, nextKey.key);
    next += 1;
  }
};

const assertArrayLikeIterable = function assertArrayLikeIterable(iterable, next) {
  if (isPrimitive(iterable[next])) {
    throw new TypeError(`Iterator value ${isArrayLike(next[VALUE])} is not an entry object`);
  }
};

const setContextArrayLike = function setContextArrayLike(args) {
  const [kind, context, key, iterable, next] = args;
  const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

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

const parseArrayLike = function parseArrayLike(args) {
  const [kind, iterable, context] = args;
  let next = 0;
  while (next < iterable.length) {
    let key;

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

const defineDefaultProps = function defineDefaultProps(context) {
  defineProperties(context, {
    [PROP_CHANGED]: {[VALUE]: false},
    [PROP_ID]: {[VALUE]: new IdGenerator()},
    [PROP_KEY]: {[VALUE]: []},
    [PROP_ORDER]: {[VALUE]: []},
  });
};

const performParsing = function performParsing(args) {
  const [, iterable, , symbolIterator] = args;

  if (iterable && isFunction(iterable[symbolIterator])) {
    parseIterable(args);
  } else if (isString(iterable)) {
    parseString(args);
  } else if (isArrayLike(iterable)) {
    parseArrayLike(args);
  }
};

// eslint-disable jsdoc/check-param-names
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
const parse = function parse(args) {
  const [kind, context, iterable] = args;
  const symbolIterator = getSymbolIterator(iterable);

  if (kind === MAP) {
    defineProperty(context, PROP_VALUE, {[VALUE]: []});
  }

  defineDefaultProps(context);
  performParsing([kind, iterable, context, symbolIterator]);

  defineProperty(context, SIZE, {[VALUE]: context[PROP_KEY].length, [WRITABLE]: true});
};

// eslint-disable jsdoc/check-param-names
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
const baseForEach = function baseForEach(args) {
  const [kind, context, callback, thisArg] = args;
  assertIsObject(context);
  assertIsFunction(callback);
  const pointers = {index: 0, order: context[PROP_ORDER][0]};

  context[PROP_CHANGE] = false;
  let {length} = context[PROP_KEY];
  while (pointers.index < length) {
    if (hasOwn(context[PROP_KEY], pointers.index)) {
      const key = context[PROP_KEY][pointers.index];
      const value = kind === MAP ? context[PROP_VALUE][pointers.index] : key;
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
const baseHas = function has(key) {
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
const baseClear = function baseClear(kind, context) {
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

// eslint-disable jsdoc/check-param-names
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
const baseDelete = function baseDelete(args) {
  const [kind, context, key] = args;
  const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);
  let result = false;

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
};

// eslint-disable jsdoc/check-param-names
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
const baseAddSet = function baseAddSet(args) {
  const [kind, context, key, value] = args;
  const index = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (index > -1) {
    if (kind === MAP) {
      context[PROP_VALUE][index] = value;
    }
  } else {
    if (kind === MAP) {
      push.call(context[PROP_VALUE], value);
    }

    push.call(context[PROP_KEY], key);
    push.call(context[PROP_ORDER], context[PROP_ID].get());
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
const SetIt = function SetIterator(context, iteratorKind) {
  defineProperties(this, {
    [PROP_ITERATORHASMORE]: {[VALUE]: true, [WRITABLE]: true},
    [PROP_SET]: {[VALUE]: assertIsObject(context)},
    [PROP_SETITERATIONKIND]: {[VALUE]: iteratorKind || KIND_VALUE},
    [PROP_SETNEXTINDEX]: {[VALUE]: 0, [WRITABLE]: true},
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
defineProperty(SetIt.prototype, NEXT, {
  [VALUE]: function next() {
    const context = assertIsObject(this[PROP_SET]);
    const index = this[PROP_SETNEXTINDEX];
    const iteratorKind = this[PROP_SETITERATIONKIND];
    const more = this[PROP_ITERATORHASMORE];

    if (index < context[PROP_KEY].length && more) {
      this[PROP_SETNEXTINDEX] += 1;

      return {
        [DONE]: false,
        [VALUE]:
          iteratorKind === KIND_KEY_VALUE ? [context[PROP_KEY][index], context[PROP_KEY][index]] : context[PROP_KEY][index],
      };
    }

    this[PROP_ITERATORHASMORE] = false;

    return {[DONE]: true, [VALUE]: UNDEFINED};
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
  [VALUE]: function iterator() {
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

// eslint-disable jsdoc/check-param-names
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
export const SetImplementation = function Set() {
  if (toBoolean(this) === false || !(this instanceof SetImplementation)) {
    throw new TypeError("Constructor Set requires 'new'");
  }

  /* eslint-disable-next-line prefer-rest-params */
  parse([SET, this, arguments.length ? arguments[0] : UNDEFINED]);
};

// noinspection JSValidateTypes
defineProperties(
  SetImplementation.prototype,
  /** @lends SetImplementation.prototype */ {
    /**
     * The add() method appends a new element with a specified value to the end
     * of a Set object.
     *
     * @param {*} value - Required. The value of the element to add to the Set
     *  object.
     * @returns {object} The Set object.
     */
    add: {
      [VALUE]: function add(value) {
        return baseAddSet([SET, this, value]);
      },
    },
    /**
     * The clear() method removes all elements from a Set object.
     *
     * @returns {object} The Set object.
     */
    clear: {
      [VALUE]: function clear() {
        return baseClear(SET, this);
      },
    },
    /**
     * The delete() method removes the specified element from a Set object.
     *
     * @param {*} value - The value of the element to remove from the Set object.
     * @returns {boolean} Returns true if an element in the Set object has been
     *  removed successfully; otherwise false.
     */
    delete: {
      [VALUE]: function de1ete(value) {
        return baseDelete([SET, this, value]);
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
     */
    entries: {
      [VALUE]: function entries() {
        return new SetIt(this, KIND_KEY_VALUE);
      },
    },
    /**
     * The forEach() method executes a provided function once per each value
     * in the Set object, in insertion order.
     *
     * @param {Function} callback - Function to execute for each element.
     * @param {*} [thisArg] - Value to use as this when executing callback.
     * @returns {object} The Set object.
     */
    forEach: {
      [VALUE]: function forEach(callback, thisArg) {
        return baseForEach([SET, this, callback, thisArg]);
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
     */
    has: {
      [VALUE]: baseHas,
    },
    /**
     * The keys() method is an alias for the `values` method (for similarity
     * with Map objects); it behaves exactly the same and returns values of Set elements.
     *
     * @function
     * @returns {object} A new Iterator object.
     */
    keys: {
      [VALUE]: setValuesIterator,
    },
    /**
     * The value of size is an integer representing how many entries the Set
     * object has.
     *
     * @name size
     * @memberof $SetObject
     * @instance
     * @type {number}
     */
    size: {
      [VALUE]: 0,
      [WRITABLE]: true,
    },
    /**
     * The values() method returns a new Iterator object that contains the
     * values for each element in the Set object in insertion order.
     *
     * @function
     * @returns {object} A new Iterator object.
     */
    values: {
      [VALUE]: setValuesIterator,
    },
  },
);

/**
 * The initial value of the @@iterator property is the same function object
 * as the initial value of the values property.
 *
 * @function symIt
 * @memberof $SetObject.prototype
 * @returns {object} A new Iterator object.
 */
defineProperty(SetImplementation.prototype, symIt, {
  [VALUE]: setValuesIterator,
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
    [PROP_ITERATORHASMORE]: {[VALUE]: true, [WRITABLE]: true},
    [PROP_MAP]: {[VALUE]: assertIsObject(context)},
    [PROP_MAPITERATIONKIND]: {[VALUE]: iteratorKind},
    [PROP_MAPNEXTINDEX]: {[VALUE]: 0, [WRITABLE]: true},
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
defineProperty(MapIt.prototype, NEXT, {
  [VALUE]: function next() {
    const context = assertIsObject(this[PROP_MAP]);
    const index = this[PROP_MAPNEXTINDEX];
    const iteratorKind = this[PROP_MAPITERATIONKIND];
    const more = this[PROP_ITERATORHASMORE];

    if (index < context[PROP_KEY].length && more) {
      this[PROP_MAPNEXTINDEX] += 1;

      return {
        [DONE]: false,
        [VALUE]:
          iteratorKind === KIND_KEY_VALUE
            ? [context[PROP_KEY][index], context[PROP_VALUE][index]]
            : context[`[[${iteratorKind}]]`][index],
      };
    }

    this[PROP_ITERATORHASMORE] = false;

    return {[DONE]: true, [VALUE]: UNDEFINED};
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
  [VALUE]: function iterator() {
    return this;
  },
});

// eslint-disable jsdoc/check-param-names
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
export const MapImplementation = function Map() {
  if (toBoolean(this) === false || !(this instanceof MapImplementation)) {
    throw new TypeError("Constructor Map requires 'new'");
  }

  /* eslint-disable-next-line prefer-rest-params */
  parse([MAP, this, arguments.length ? arguments[0] : UNDEFINED]);
};

// noinspection JSValidateTypes
defineProperties(
  MapImplementation.prototype,
  /** @lends MapImplementation.prototype */ {
    /**
     * The clear() method removes all elements from a Map object.
     *
     * @returns {object} The Map object.
     */
    clear: {
      [VALUE]: function clear() {
        return baseClear(MAP, this);
      },
    },
    /**
     * The delete() method removes the specified element from a Map object.
     *
     * @param {*} key - The key of the element to remove from the Map object.
     * @returns {boolean} Returns true if an element in the Map object has been
     *  removed successfully.
     */
    delete: {
      [VALUE]: function de1ete(key) {
        return baseDelete([MAP, this, key]);
      },
    },
    /**
     * The entries() method returns a new Iterator object that contains the
     * [key, value] pairs for each element in the Map object in insertion order.
     *
     * @returns {object} A new Iterator object.
     */
    entries: {
      [VALUE]: function entries() {
        return new MapIt(this, KIND_KEY_VALUE);
      },
    },
    /**
     * The forEach() method executes a provided function once per each
     * key/value pair in the Map object, in insertion order.
     *
     * @param {Function} callback - Function to execute for each element..
     * @param {*} [thisArg] - Value to use as this when executing callback.
     * @returns {object} The Map object.
     */
    forEach: {
      [VALUE]: function forEach(callback, thisArg) {
        return baseForEach([MAP, this, callback, thisArg]);
      },
    },
    /**
     * The get() method returns a specified element from a Map object.
     *
     * @param {*} key - The key of the element to return from the Map object.
     * @returns {*} Returns the element associated with the specified key or
     *  undefined if the key can't be found in the Map object.
     */
    get: {
      [VALUE]: function get(key) {
        const index = indexOf(assertIsObject(this)[PROP_KEY], key, SAMEVALUEZERO);

        return index > -1 ? this[PROP_VALUE][index] : UNDEFINED;
      },
    },
    /**
     * The has() method returns a boolean indicating whether an element with
     * the specified key exists or not.
     *
     * @function
     * @param {*} key - The key of the element to test for presence in the Map object.
     * @returns {boolean} Returns true if an element with the specified key
     *  exists in the Map object; otherwise false.
     */
    has: {
      [VALUE]: baseHas,
    },
    /**
     * The keys() method returns a new Iterator object that contains the keys
     * for each element in the Map object in insertion order.
     *
     * @returns {object} A new Iterator object.
     */
    keys: {
      [VALUE]: function keys() {
        return new MapIt(this, KIND_KEY);
      },
    },
    /**
     * The set() method adds a new element with a specified key and value to
     * a Map object.
     *
     * @param {*} key - The key of the element to add to the Map object.
     * @param {*} value - The value of the element to add to the Map object.
     * @returns {object} The Map object.
     */
    set: {
      [VALUE]: function set(key, value) {
        return baseAddSet([MAP, this, key, value]);
      },
    },
    /**
     * The value of size is an integer representing how many entries the Map
     * object has.
     *
     * @name size
     * @memberof $MapObject
     * @instance
     * @type {number}
     */
    size: {
      [VALUE]: 0,
      [WRITABLE]: true,
    },
    /**
     * The values() method returns a new Iterator object that contains the
     * values for each element in the Map object in insertion order.
     *
     * @returns {object} A new Iterator object.
     */
    values: {
      [VALUE]: function values() {
        return new MapIt(this, KIND_VALUE);
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
 */
defineProperty(MapImplementation.prototype, symIt, {
  [VALUE]: MapImplementation.prototype.entries,
});

/*
 * Determine whether to use shim or native.
 */

/* Map fixes */
const performMapFixes = function performMapFixes() {
  let Export = null;

  const peformMapFix = function peformMapFix(fixee) {
    if (Export !== MapImplementation) {
      fixee();
    }
  };

  peformMapFix(function fixee() {
    try {
      /* eslint-disable-next-line compat/compat */
      Export = new Map() ? Map : MapImplementation;
    } catch (ignore) {
      // empty
    }
  });

  peformMapFix(function fixee() {
    const testMap = new Export();

    if (typeof testMap[SIZE] !== 'number' || testMap[SIZE] !== 0) {
      /* istanbul ignore next */
      Export = MapImplementation;
    } else {
      const propsMap = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];

      const failedMap = some(propsMap, function predicate(method) {
        return isFunction(testMap[method]) === false;
      });

      if (failedMap) {
        /* istanbul ignore next */
        Export = MapImplementation;
      }
    }
  });

  peformMapFix(function fixee() {
    // Safari 8, for example, doesn't accept an iterable.
    let mapAcceptsArguments = false;
    try {
      mapAcceptsArguments = new Export([[1, 2]]).get(1) === 2;
    } catch (ignore) {
      // empty
    }

    if (mapAcceptsArguments === false) {
      /* istanbul ignore next */
      Export = MapImplementation;
    }
  });

  peformMapFix(function fixee() {
    const testMap = new Export();
    const mapSupportsChaining = testMap.set(1, 2) === testMap;

    if (mapSupportsChaining === false) {
      /* istanbul ignore next */
      Export = MapImplementation;
    }
  });

  peformMapFix(function fixee() {
    // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
    const testMap = new Export([[1, 0], [2, 0], [3, 0], [4, 0]]);
    testMap.set(-0, testMap);
    const gets = testMap.get(0) === testMap && testMap.get(-0) === testMap;
    const mapUsesSameValueZero = gets && testMap.has(0) && testMap.has(-0);

    if (mapUsesSameValueZero === false) {
      /* istanbul ignore next */
      Export = MapImplementation;
    }
  });

  peformMapFix(function fixee() {
    if (setPrototypeOf) {
      const MyMap = function MyMap(arg) {
        const testMap = new Export(arg);
        setPrototypeOf(testMap, MyMap.prototype);

        return testMap;
      };

      setPrototypeOf(MyMap, Export);
      MyMap.prototype = create(Export.prototype, {constructor: {[VALUE]: MyMap}});

      let mapSupportsSubclassing = false;
      try {
        const testMap = new MyMap([]);
        // Firefox 32 is ok with the instantiating the subclass but will
        // throw when the map is used.
        testMap.set(42, 42);
        mapSupportsSubclassing = testMap instanceof MyMap;
      } catch (ignore) {
        // empty
      }

      if (mapSupportsSubclassing === false) {
        /* istanbul ignore next */
        Export = MapImplementation;
      }
    }
  });

  peformMapFix(function fixee() {
    let mapRequiresNew;
    try {
      /* eslint-disable-next-line babel/new-cap */
      mapRequiresNew = !(Export() instanceof Export);
    } catch (e) {
      mapRequiresNew = e instanceof TypeError;
    }

    if (mapRequiresNew === false) {
      /* istanbul ignore next */
      Export = MapImplementation;
    }
  });

  peformMapFix(function fixee() {
    const testMap = new Export();
    let mapIterationThrowsStopIterator;
    try {
      mapIterationThrowsStopIterator = testMap.keys()[NEXT]()[DONE] === false;
    } catch (ignore) {
      /* istanbul ignore next */
      mapIterationThrowsStopIterator = true;
    }

    if (mapIterationThrowsStopIterator) {
      /* istanbul ignore next */
      Export = MapImplementation;
    }
  });

  peformMapFix(function fixee() {
    // Safari 8
    if (isFunction(new Export().keys()[NEXT]) === false) {
      /* istanbul ignore next */
      Export = MapImplementation;
    }
  });

  peformMapFix(function fixee() {
    if (hasRealSymbolIterator) {
      const testMapProto = getPrototypeOf(new Export().keys());
      let hasBuggyMapIterator = true;

      if (testMapProto) {
        hasBuggyMapIterator = isFunction(testMapProto[symIt]) === false;
      }

      if (hasBuggyMapIterator) {
        /* istanbul ignore next */
        Export = MapImplementation;
      }
    }
  });

  return Export;
};

/* Set fixes */
const performSetFixes = function performSetFixes() {
  let Export = null;

  const peformSetFix = function peformSetFix(fixee) {
    if (Export !== SetImplementation) {
      fixee();
    }
  };

  peformSetFix(function fixee() {
    try {
      /* eslint-disable-next-line compat/compat */
      Export = new Set() ? Set : SetImplementation;
    } catch (ignore) {
      // empty
    }
  });

  peformSetFix(function fixee() {
    const testSet = new Export();

    if (typeof testSet[SIZE] !== 'number' || testSet[SIZE] !== 0) {
      /* istanbul ignore next */
      Export = SetImplementation;
    } else {
      const propsSet = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];

      const failedSet = some(propsSet, function predicate(method) {
        return isFunction(testSet[method]) === false;
      });

      if (failedSet) {
        /* istanbul ignore next */
        Export = SetImplementation;
      }
    }
  });

  peformSetFix(function fixee() {
    const testSet = new Export();
    testSet.delete(0);
    testSet.add(-0);
    const setUsesSameValueZero = testSet.has(0) && testSet.has(-0);

    if (setUsesSameValueZero === false) {
      /* istanbul ignore next */
      Export = SetImplementation;
    }
  });

  peformSetFix(function fixee() {
    const testSet = new Export();
    const setSupportsChaining = testSet.add(1) === testSet;

    if (setSupportsChaining === false) {
      /* istanbul ignore next */
      Export = SetImplementation;
    }
  });

  peformSetFix(function fixee() {
    if (setPrototypeOf) {
      const MySet = function MySet(arg) {
        const testSet = new Export(arg);
        setPrototypeOf(testSet, MySet.prototype);

        return testSet;
      };

      setPrototypeOf(MySet, Export);
      MySet.prototype = create(Export.prototype, {constructor: {[VALUE]: MySet}});

      let setSupportsSubclassing = false;
      try {
        const testSet = new MySet([]);
        testSet.add(42, 42);
        setSupportsSubclassing = testSet instanceof MySet;
      } catch (ignore) {
        // empty
      }

      if (setSupportsSubclassing === false) {
        /* istanbul ignore next */
        Export = SetImplementation;
      }
    }
  });

  peformSetFix(function fixee() {
    let setRequiresNew;
    try {
      /* eslint-disable-next-line babel/new-cap */
      setRequiresNew = !(Export() instanceof Export);
    } catch (e) {
      setRequiresNew = e instanceof TypeError;
    }

    if (setRequiresNew === false) {
      /* istanbul ignore next */
      Export = SetImplementation;
    }
  });

  peformSetFix(function fixee() {
    const testSet = new Export();
    let setIterationThrowsStopIterator;
    try {
      setIterationThrowsStopIterator = testSet.keys()[NEXT]()[DONE] === false;
    } catch (ignore) {
      /* istanbul ignore next */
      setIterationThrowsStopIterator = true;
    }

    if (setIterationThrowsStopIterator) {
      /* istanbul ignore next */
      Export = SetImplementation;
    }
  });

  peformSetFix(function fixee() {
    // Safari 8
    if (isFunction(new Export().keys()[NEXT]) === false) {
      /* istanbul ignore next */
      Export = SetImplementation;
    }
  });

  peformSetFix(function fixee() {
    if (hasRealSymbolIterator) {
      const testSetProto = getPrototypeOf(new Export().keys());
      let hasBuggySetIterator = true;

      if (testSetProto) {
        hasBuggySetIterator = isFunction(testSetProto[symIt]) === false;
      }

      if (hasBuggySetIterator) {
        /* istanbul ignore next */
        Export = SetImplementation;
      }
    }
  });

  return Export;
};

export const MapConstructor = performMapFixes();
export const SetConstructor = performSetFixes();

const hasImplementationProps = function hasImplementationProps(object) {
  return (
    isBoolean(object[PROP_CHANGED]) &&
    isObjectLike(object[PROP_ID]) &&
    isArray(object[PROP_KEY]) &&
    isArray(object[PROP_ORDER]) &&
    typeof object[SIZE] === 'number'
  );
};

const hasCommon = function hasCommon(object) {
  return isObjectLike(object) && isFunction(object[symIt]) && hasImplementationProps(object);
};

export const isMapImplementation = function isMapImplementation(object) {
  return $isMap(object) || (hasCommon(object) && isArray(object[PROP_VALUE]));
};

/**
 * Determine if an `object` is a `Map`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Map`,
 *  else `false`.
 */
export const isMap = MapConstructor === MapImplementation ? isMapImplementation : $isMap;

export const isSetImplementation = function isSetImplementation(object) {
  return $isSet(object) || (hasCommon(object) && typeof object[PROP_VALUE] === 'undefined');
};

/**
 * Determine if an `object` is a `Set`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Set`,
 *  else `false`.
 */
export const isSet = SetConstructor === SetImplementation ? isSetImplementation : $isSet;
