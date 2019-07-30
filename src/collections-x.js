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

const {setPrototypeOf} = {}.constructor;
/* eslint-disable-next-line compat/compat */
const hasRealSymbolIterator = hasSymbolSupport && typeof Symbol.iterator === 'symbol';
/* eslint-disable-next-line compat/compat */
const hasFakeSymbolIterator = typeof Symbol === 'object' && typeof Symbol.iterator === 'string';
const hasSymbolIterator = hasRealSymbolIterator || hasFakeSymbolIterator;

const getSymIt = function getSymIt() {
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

    if (iterable[ES6_SHIM_ITERATOR]) {
      return ES6_SHIM_ITERATOR;
    }

    if (iterable[AT_AT_ITERATOR]) {
      return AT_AT_ITERATOR;
    }
  }

  return UNDEFINED;
};

const parseIterable = function parseIterable() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, iterable, context, symbolIterator] = slice(arguments);
  const iterator = iterable[symbolIterator]();
  let next = iterator[NEXT]();

  if (kind === MAP) {
    if (isArrayLike(next[VALUE]) === false || next[VALUE].length < 2) {
      throw new TypeError(`Iterator value ${isArrayLike(next[VALUE])} is not an entry object`);
    }
  }

  while (next[DONE] === false) {
    const key = kind === MAP ? next[VALUE][0] : next[VALUE];
    const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

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

const parseString = function parseString() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, iterable, context] = slice(arguments);

  if (kind === MAP) {
    throw new TypeError(`Iterator value ${iterable.charAt(0)} is not an entry object`);
  }

  let next = 0;
  while (next < iterable.length) {
    const char1 = iterable.charAt(next);
    const char2 = iterable.charAt(next + 1);
    let key;

    if (isSurrogatePair(char1, char2)) {
      key = char1 + char2;
      next += 1;
    } else {
      key = char1;
    }

    const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

    if (indexof < 0) {
      context[PROP_KEY].push(key);
      context[PROP_ORDER].push(context[PROP_ID].get());
      context[PROP_ID][NEXT]();
    }

    next += 1;
  }
};

const parseArrayLike = function parseArrayLike() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, iterable, context] = slice(arguments);
  let next = 0;
  while (next < iterable.length) {
    let key;

    if (kind === MAP) {
      if (isPrimitive(iterable[next])) {
        throw new TypeError(`Iterator value ${isArrayLike(next[VALUE])} is not an entry object`);
      }

      /* eslint-disable-next-line prefer-destructuring */
      key = iterable[next][0];
    } else {
      key = iterable[next];
    }

    const indexof = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

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
const parse = function parse() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, context, iterable] = slice(arguments);
  const symbolIterator = getSymbolIterator(iterable);

  if (kind === MAP) {
    defineProperty(context, PROP_VALUE, {[VALUE]: []});
  }

  defineProperties(context, {
    [PROP_CHANGED]: {[VALUE]: false},
    [PROP_ID]: {[VALUE]: new IdGenerator()},
    [PROP_KEY]: {[VALUE]: []},
    [PROP_ORDER]: {[VALUE]: []},
  });

  if (iterable && isFunction(iterable[symbolIterator])) {
    parseIterable(kind, iterable, context, symbolIterator);
  } else if (isString(iterable)) {
    parseString(kind, iterable, context);
  } else if (isArrayLike(iterable)) {
    parseArrayLike(kind, iterable, context);
  }

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
const baseForEach = function baseForEach() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, context, callback, thisArg] = slice(arguments);
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
const baseDelete = function baseDelete() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, context, key] = slice(arguments);
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
const baseAddSet = function baseAddSet() {
  /* eslint-disable-next-line prefer-rest-params */
  const [kind, context, key, value] = slice(arguments);
  const index = indexOf(assertIsObject(context)[PROP_KEY], key, SAMEVALUEZERO);

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
  parse(SET, this, arguments.length ? arguments[0] : UNDEFINED);
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
        return baseAddSet(SET, this, value);
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
        return baseDelete(SET, this, value);
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
        return baseForEach(SET, this, callback, thisArg);
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
  parse(MAP, this, arguments.length ? arguments[0] : UNDEFINED);
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
        return baseDelete(MAP, this, key);
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
        return baseForEach(MAP, this, callback, thisArg);
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
        return baseAddSet(MAP, this, key, value);
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

let ExportMap = MapImplementation;
try {
  /* eslint-disable-next-line compat/compat */
  ExportMap = new Map() ? Map : MapImplementation;
} catch (ignore) {
  // empty
}

export const MapConstructor = ExportMap;

let ExportSet = SetImplementation;
try {
  /* eslint-disable-next-line compat/compat */
  ExportSet = new Set() ? Set : SetImplementation;
} catch (ignore) {
  // empty
}

export const SetConstructor = ExportSet;

let testMap;

if (ExportMap !== MapImplementation) {
  testMap = new ExportMap();

  if (typeof testMap[SIZE] !== 'number' || testMap[SIZE] !== 0) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  } else {
    const propsMap = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];

    const failedMap = some(propsMap, (method) => {
      return isFunction(testMap[method]) === false;
    });

    if (failedMap) {
      /* istanbul ignore next */
      ExportMap = MapImplementation;
    }
  }
}

if (ExportMap !== MapImplementation) {
  // Safari 8, for example, doesn't accept an iterable.
  let mapAcceptsArguments = false;
  try {
    mapAcceptsArguments = new ExportMap([[1, 2]]).get(1) === 2;
  } catch (ignore) {
    // empty
  }

  if (mapAcceptsArguments === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  testMap = new ExportMap();
  const mapSupportsChaining = testMap.set(1, 2) === testMap;

  if (mapSupportsChaining === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
  testMap = new ExportMap([[1, 0], [2, 0], [3, 0], [4, 0]]);
  testMap.set(-0, testMap);
  const gets = testMap.get(0) === testMap && testMap.get(-0) === testMap;
  const mapUsesSameValueZero = gets && testMap.has(0) && testMap.has(-0);

  if (mapUsesSameValueZero === false) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

if (ExportMap !== MapImplementation) {
  if (setPrototypeOf) {
    const MyMap = function MyMap(arg) {
      testMap = new ExportMap(arg);
      setPrototypeOf(testMap, MyMap.prototype);

      return testMap;
    };

    setPrototypeOf(MyMap, ExportMap);
    MyMap.prototype = create(ExportMap.prototype, {constructor: {[VALUE]: MyMap}});

    let mapSupportsSubclassing = false;
    try {
      testMap = new MyMap([]);
      // Firefox 32 is ok with the instantiating the subclass but will
      // throw when the map is used.
      testMap.set(42, 42);
      mapSupportsSubclassing = testMap instanceof MyMap;
    } catch (ignore) {
      // empty
    }

    if (mapSupportsSubclassing === false) {
      /* istanbul ignore next */
      ExportMap = MapImplementation;
    }
  }
}

if (ExportMap !== MapImplementation) {
  let mapRequiresNew;
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
  let mapIterationThrowsStopIterator;
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
}

// Safari 8
if (ExportMap !== MapImplementation && isFunction(new ExportMap().keys()[NEXT]) === false) {
  /* istanbul ignore next */
  ExportMap = MapImplementation;
}

if (hasRealSymbolIterator && ExportMap !== MapImplementation) {
  const testMapProto = getPrototypeOf(new ExportMap().keys());
  let hasBuggyMapIterator = true;

  if (testMapProto) {
    hasBuggyMapIterator = isFunction(testMapProto[symIt]) === false;
  }

  if (hasBuggyMapIterator) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  }
}

let testSet;

if (ExportSet !== SetImplementation) {
  testSet = new ExportSet();

  if (typeof testSet[SIZE] !== 'number' || testSet[SIZE] !== 0) {
    /* istanbul ignore next */
    ExportMap = MapImplementation;
  } else {
    const propsSet = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];

    const failedSet = some(propsSet, function predicate(method) {
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
  const setUsesSameValueZero = testSet.has(0) && testSet.has(-0);

  if (setUsesSameValueZero === false) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

if (ExportSet !== SetImplementation) {
  testSet = new ExportSet();
  const setSupportsChaining = testSet.add(1) === testSet;

  if (setSupportsChaining === false) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

if (ExportSet !== SetImplementation) {
  if (setPrototypeOf) {
    const MySet = function MySet(arg) {
      testSet = new ExportSet(arg);
      setPrototypeOf(testSet, MySet.prototype);

      return testSet;
    };

    setPrototypeOf(MySet, ExportSet);
    MySet.prototype = create(ExportSet.prototype, {constructor: {[VALUE]: MySet}});

    let setSupportsSubclassing = false;
    try {
      testSet = new MySet([]);
      testSet.add(42, 42);
      setSupportsSubclassing = testSet instanceof MySet;
    } catch (ignore) {
      // empty
    }

    if (setSupportsSubclassing === false) {
      /* istanbul ignore next */
      ExportSet = SetImplementation;
    }
  }
}

if (ExportSet !== SetImplementation) {
  let setRequiresNew;
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
  let setIterationThrowsStopIterator;
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
}

// Safari 8
if (ExportSet !== SetImplementation && isFunction(new ExportSet().keys()[NEXT]) === false) {
  /* istanbul ignore next */
  ExportSet = SetImplementation;
}

if (hasRealSymbolIterator && ExportSet !== SetImplementation) {
  const testSetProto = getPrototypeOf(new ExportSet().keys());
  let hasBuggySetIterator = true;

  if (testSetProto) {
    hasBuggySetIterator = isFunction(testSetProto[symIt]) === false;
  }

  if (hasBuggySetIterator) {
    /* istanbul ignore next */
    ExportSet = SetImplementation;
  }
}

const hasCommon = function hasCommon(object) {
  return (
    isObjectLike(object) &&
    isFunction(object[symIt]) &&
    isBoolean(object[PROP_CHANGED]) &&
    isObjectLike(object[PROP_ID]) &&
    isArray(object[PROP_KEY]) &&
    isArray(object[PROP_ORDER]) &&
    typeof object[SIZE] === 'number'
  );
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
export const isMap = ExportMap === MapImplementation ? isMapImplementation : $isMap;

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
export const isSet = ExportSet === SetImplementation ? isSetImplementation : $isSet;
