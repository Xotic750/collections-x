/*!
{
  "author": "Graham Fairweather",
  "copywrite": "Copyright (c) 2015-2017",
  "date": "2019-07-31T16:33:55.237Z",
  "describe": "",
  "description": "ES6 collections fallback library: Map and Set.",
  "file": "collections-x.js",
  "hash": "fb791611a064c7615733",
  "license": "MIT",
  "version": "3.0.12"
}
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["collectionsX"] = factory();
	else
		root["collectionsX"] = factory();
})((function () {
  'use strict';

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return Function('return this')();
}()), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isPrimitive(val) {
  if (typeof val === 'object') {
    return val === null;
  }
  return typeof val !== 'function';
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = __webpack_require__(8)();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return  false && false;
	};
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return toStr.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr.call(value) !== '[object Array]' &&
		toStr.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(4);

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(11);

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var boolToStr = Boolean.prototype.toString;

var tryBooleanObject = function tryBooleanObject(value) {
	try {
		boolToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var boolClass = '[object Boolean]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isBoolean(value) {
	if (typeof value === 'boolean') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryBooleanObject(value) : toStr.call(value) === boolClass;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__(10);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 17], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(4); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/is-nil-x/dist/is-nil-x.esm.js
/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param {*} [value] - The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 */
var isNil = function isNil(value) {
  /* eslint-disable-next-line lodash/prefer-is-nil */
  return value === null || typeof value === 'undefined';
};

/* harmony default export */ var is_nil_x_esm = (isNil);


// CONCATENATED MODULE: ./node_modules/require-object-coercible-x/dist/require-object-coercible-x.esm.js

/**
 * The abstract operation RequireObjectCoercible throws an error if argument
 * is a value that cannot be converted to an Object using ToObject.
 *
 * @param {*} [value] - The `value` to check.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {string} The `value`.
 */

var require_object_coercible_x_esm_requireObjectCoercible = function requireObjectCoercible(value) {
  if (is_nil_x_esm(value)) {
    throw new TypeError("Cannot call method on ".concat(value));
  }

  return value;
};

/* harmony default export */ var require_object_coercible_x_esm = (require_object_coercible_x_esm_requireObjectCoercible);


// CONCATENATED MODULE: ./node_modules/to-object-x/dist/to-object-x.esm.js

var castObject = {}.constructor;
/**
 * The abstract operation ToObject converts argument to a value of
 * type Object.
 *
 * @param {*} value - The `value` to convert.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {!object} The `value` converted to an object.
 */

var to_object_x_esm_toObject = function toObject(value) {
  return castObject(require_object_coercible_x_esm(value));
};

/* harmony default export */ var to_object_x_esm = (to_object_x_esm_toObject);


// CONCATENATED MODULE: ./node_modules/attempt-x/dist/attempt-x.esm.js
/**
 * This method attempts to invoke the function, returning either the result or
 * the caught error object. Any additional arguments are provided to the
 * function when it's invoked.
 *
 * @param {Function} [fn] - The function to attempt.
 * @param {...*} [args] - The arguments to invoke the function with.
 * @returns {object} Returns an object of the result.
 */
var attempt = function attempt(fn) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return {
      threw: false,

      /* eslint-disable-next-line babel/no-invalid-this */
      value: fn.apply(this, args)
    };
  } catch (e) {
    return {
      threw: true,
      value: e
    };
  }
};

/* harmony default export */ var attempt_x_esm = (attempt);


// EXTERNAL MODULE: ./node_modules/is-symbol/index.js
var is_symbol = __webpack_require__(2);
var is_symbol_default = /*#__PURE__*/__webpack_require__.n(is_symbol);

// CONCATENATED MODULE: ./node_modules/has-symbol-support-x/dist/has-symbol-support-x.esm.js
var has_symbol_support_x_esm_this = undefined;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }



var hasSymbolSupport = attempt_x_esm(function () {
  _newArrowCheck(this, has_symbol_support_x_esm_this);

  /* eslint-disable-next-line compat/compat */
  return typeof Symbol === 'function' && is_symbol_default()(Symbol(''));
}.bind(undefined));
/**
 * Indicates if `Symbol`exists and creates the correct type.
 * `true`, if it exists and creates the correct type, otherwise `false`.
 *
 * @type boolean
 */

/* harmony default export */ var has_symbol_support_x_esm = (hasSymbolSupport.threw === false && hasSymbolSupport.value === true);


// EXTERNAL MODULE: ./node_modules/is-primitive/index.js
var is_primitive = __webpack_require__(0);
var is_primitive_default = /*#__PURE__*/__webpack_require__.n(is_primitive);

// EXTERNAL MODULE: ./node_modules/is-date-object/index.js
var is_date_object = __webpack_require__(5);
var is_date_object_default = /*#__PURE__*/__webpack_require__.n(is_date_object);

// CONCATENATED MODULE: ./node_modules/to-boolean-x/dist/to-boolean-x.esm.js
/**
 * The abstract operation ToBoolean converts argument to a value of type Boolean.
 *
 * @param {*} [value] - The value to be converted.
 * @returns {boolean} 'true' if value is truthy; otherwise 'false'.
 */
var toBoolean = function toBoolean(value) {
  return !!value;
};

/* harmony default export */ var to_boolean_x_esm = (toBoolean);


// CONCATENATED MODULE: ./node_modules/to-string-tag-x/dist/to-string-tag-x.esm.js
var nativeObjectToString = {}.toString;
/**
 * The `toStringTag` method returns "[object type]", where type is the
 * object type.
 *
 * @param {*} [value] - The object of which to get the object type string.
 * @returns {string} The object type string.
 */

var toStringTag = function toStringTag(value) {
  if (value === null) {
    return '[object Null]';
  }

  if (typeof value === 'undefined') {
    return '[object Undefined]';
  }

  return nativeObjectToString.call(value);
};

/* harmony default export */ var to_string_tag_x_esm = (toStringTag);


// CONCATENATED MODULE: ./node_modules/has-to-string-tag-x/dist/has-to-string-tag-x.esm.js


/**
 * Indicates if `Symbol.toStringTag`exists and is the correct type.
 * `true`, if it exists and is the correct type, otherwise `false`.
 *
 * @type boolean
 */

/* harmony default export */ var has_to_string_tag_x_esm = (has_symbol_support_x_esm &&
/* eslint-disable-next-line compat/compat */
is_symbol_default()(Symbol.toStringTag));


// CONCATENATED MODULE: ./node_modules/to-string-x/dist/to-string-x.esm.js

var ERROR_MESSAGE = 'Cannot convert a Symbol value to a string';
var castString = ERROR_MESSAGE.constructor;
/**
 * The abstract operation ToString converts argument to a value of type String.
 *
 * @param {*} [value] - The value to convert to a string.
 * @throws {TypeError} If `value` is a Symbol.
 * @returns {string} The converted value.
 */

var to_string_x_esm_ToString = function ToString(value) {
  if (is_symbol_default()(value)) {
    throw new TypeError(ERROR_MESSAGE);
  }

  return castString(value);
};

/* harmony default export */ var to_string_x_esm = (to_string_x_esm_ToString);


// CONCATENATED MODULE: ./node_modules/require-coercible-to-string-x/dist/require-coercible-to-string-x.esm.js


/**
 * This method requires an argument is corecible then converts using ToString.
 *
 * @param {*} [value] - The value to converted to a string.
 * @throws {TypeError} If value is null or undefined.
 * @returns {string} The value as a string.
 */

var require_coercible_to_string_x_esm_requireCoercibleToString = function requireCoercibleToString(value) {
  return to_string_x_esm(require_object_coercible_x_esm(value));
};

/* harmony default export */ var require_coercible_to_string_x_esm = (require_coercible_to_string_x_esm_requireCoercibleToString);


// CONCATENATED MODULE: ./node_modules/white-space-x/dist/white-space-x.esm.js
/**
 * A record of a white space character.
 *
 * @typedef {object} CharRecord
 * @property {number} code - The character code.
 * @property {string} description - A description of the character.
 * @property {boolean} es5 - Whether the spec lists this as a white space.
 * @property {boolean} es2015 - Whether the spec lists this as a white space.
 * @property {boolean} es2016 - Whether the spec lists this as a white space.
 * @property {boolean} es2017 - Whether the spec lists this as a white space.
 * @property {boolean} es2018 - Whether the spec lists this as a white space.
 * @property {string} string - The character string.
 */

/**
 * An array of the whitespace char codes, string, descriptions and language
 * presence in the specifications.
 *
 * @type Array.<CharRecord>
 */
var list = [{
  code: 0x0009,
  description: 'Tab',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\t"
}, {
  code: 0x000a,
  description: 'Line Feed',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\n"
}, {
  code: 0x000b,
  description: 'Vertical Tab',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\x0B"
}, {
  code: 0x000c,
  description: 'Form Feed',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\f"
}, {
  code: 0x000d,
  description: 'Carriage Return',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\r"
}, {
  code: 0x0020,
  description: 'Space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: " "
},
/*
{
  code: 0x0085,
  description: 'Next line',
  es5: false,
  es2015: false,
  es2016: false,
  es2017: false,
  es2018: false,
  string: '\u0085'
}
*/
{
  code: 0x00a0,
  description: 'No-break space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\xA0"
}, {
  code: 0x1680,
  description: 'Ogham space mark',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u1680"
}, {
  code: 0x180e,
  description: 'Mongolian vowel separator',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: false,
  es2018: false,
  string: "\u180E"
}, {
  code: 0x2000,
  description: 'En quad',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2000"
}, {
  code: 0x2001,
  description: 'Em quad',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2001"
}, {
  code: 0x2002,
  description: 'En space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2002"
}, {
  code: 0x2003,
  description: 'Em space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2003"
}, {
  code: 0x2004,
  description: 'Three-per-em space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2004"
}, {
  code: 0x2005,
  description: 'Four-per-em space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2005"
}, {
  code: 0x2006,
  description: 'Six-per-em space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2006"
}, {
  code: 0x2007,
  description: 'Figure space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2007"
}, {
  code: 0x2008,
  description: 'Punctuation space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2008"
}, {
  code: 0x2009,
  description: 'Thin space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2009"
}, {
  code: 0x200a,
  description: 'Hair space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u200A"
},
/*
{
  code: 0x200b,
  description: 'Zero width space',
  es5: false,
  es2015: false,
  es2016: false,
  es2017: false,
  es2018: false,
  string: '\u200b'
},
*/
{
  code: 0x2028,
  description: 'Line separator',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2028"
}, {
  code: 0x2029,
  description: 'Paragraph separator',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u2029"
}, {
  code: 0x202f,
  description: 'Narrow no-break space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u202F"
}, {
  code: 0x205f,
  description: 'Medium mathematical space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u205F"
}, {
  code: 0x3000,
  description: 'Ideographic space',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\u3000"
}, {
  code: 0xfeff,
  description: 'Byte Order Mark',
  es5: true,
  es2015: true,
  es2016: true,
  es2017: true,
  es2018: true,
  string: "\uFEFF"
}];
/**
 * A string of the ES5 to ES2016 whitespace characters.
 *
 * @type string
 */

var stringES2016 = '';
/**
 * A string of the ES2017 to ES2018 whitespace characters.
 *
 * @type string
 */

var stringES2018 = '';
var white_space_x_esm_length = list.length;

for (var white_space_x_esm_i = 0; white_space_x_esm_i < white_space_x_esm_length; white_space_x_esm_i += 1) {
  if (list[white_space_x_esm_i].es2016) {
    stringES2016 += list[white_space_x_esm_i].string;
  }

  if (list[white_space_x_esm_i].es2018) {
    stringES2018 += list[white_space_x_esm_i].string;
  }
}

var string2018 = stringES2018;
/* harmony default export */ var white_space_x_esm = (string2018);
var string2016 = stringES2016;


// CONCATENATED MODULE: ./node_modules/trim-left-x/dist/trim-left-x.esm.js


var EMPTY_STRING = '';
var RegExpCtr = /none/.constructor;
var reLeft = new RegExpCtr("^[".concat(white_space_x_esm, "]+"));
var replace = EMPTY_STRING.replace;
/**
 * This method removes whitespace from the start of a string. (ES2019).
 *
 * @param {string} [string] - The string to trim the left end whitespace from.
 * @throws {TypeError} If string is null or undefined or not coercible.
 * @returns {string} The left trimmed string.
 */

var trim_left_x_esm_trimStart = function trimStart(string) {
  return replace.call(require_coercible_to_string_x_esm(string), reLeft, EMPTY_STRING);
};

/* harmony default export */ var trim_left_x_esm = (trim_left_x_esm_trimStart);


// CONCATENATED MODULE: ./node_modules/trim-right-x/dist/trim-right-x.esm.js


var trim_right_x_esm_EMPTY_STRING = '';
var trim_right_x_esm_RegExpCtr = /none/.constructor;
var reRight2018 = new trim_right_x_esm_RegExpCtr("[".concat(white_space_x_esm, "]+$"));
var trim_right_x_esm_replace = trim_right_x_esm_EMPTY_STRING.replace;
/**
 * This method removes whitespace from the end of a string. (ES2019).
 *
 * @param {string} [string] - The string to trim the right end whitespace from.
 * @throws {TypeError} If string is null or undefined or not coercible.
 * @returns {string} The right trimmed string.
 */

var trim_right_x_esm_trimEnd = function trimEnd(string) {
  return trim_right_x_esm_replace.call(require_coercible_to_string_x_esm(string), reRight2018, trim_right_x_esm_EMPTY_STRING);
};

/* harmony default export */ var trim_right_x_esm = (trim_right_x_esm_trimEnd);


// CONCATENATED MODULE: ./node_modules/trim-x/dist/trim-x.esm.js


/**
 * This method removes whitespace from the start and end of a string.
 * (ES2019).
 *
 * @param {string} [string] - The string to trim the whitespace from.
 * @throws {TypeError} If string is null or undefined or not coercible.
 * @returns {string} The trimmed string.
 */

var trim_x_esm_trim = function trim(string) {
  return trim_left_x_esm(trim_right_x_esm(string));
};

/* harmony default export */ var trim_x_esm = (trim_x_esm_trim);


// CONCATENATED MODULE: ./node_modules/normalize-space-x/dist/normalize-space-x.esm.js


var SPACE = ' ';
var normalize_space_x_esm_RegExpCtr = /none/.constructor;
var reNormalize2018 = new normalize_space_x_esm_RegExpCtr("[".concat(white_space_x_esm, "]+"), 'g');
var normalize_space_x_esm_replace = SPACE.replace;
/**
 * This method strips leading and trailing white-space from a string,
 * replaces sequences of whitespace characters by a single space,
 * and returns the resulting string. (ES2019).
 *
 * @param {string} [string] - The string to be normalized.
 * @throws {TypeError} If string is null or undefined or not coercible.
 */

var normalize_space_x_esm_normalizeSpace = function normalizeSpace(string) {
  return normalize_space_x_esm_replace.call(trim_x_esm(string), reNormalize2018, SPACE);
};

/* harmony default export */ var normalize_space_x_esm = (normalize_space_x_esm_normalizeSpace);


// CONCATENATED MODULE: ./node_modules/replace-comments-x/dist/replace-comments-x.esm.js


var replace_comments_x_esm_EMPTY_STRING = '';
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var replace_comments_x_esm_replace = replace_comments_x_esm_EMPTY_STRING.replace;
/**
 * This method replaces comments in a string.
 *
 * @param {string} [string] - The string to be stripped.
 * @param {string} [replacement=''] - The string to be used as a replacement.
 * @throws {TypeError} If string is null or undefined or not coercible.
 * @throws {TypeError} If replacement is not coercible.
 * @returns {string} The new string with the comments replaced.
 */

var replace_comments_x_esm_replaceComments = function replaceComments(string, replacement) {
  return replace_comments_x_esm_replace.call(require_coercible_to_string_x_esm(string), STRIP_COMMENTS, arguments.length > 1 ? to_string_x_esm(replacement) : replace_comments_x_esm_EMPTY_STRING);
};

/* harmony default export */ var replace_comments_x_esm = (replace_comments_x_esm_replaceComments);


// CONCATENATED MODULE: ./node_modules/is-function-x/dist/is-function-x.esm.js
var is_function_x_esm_this = undefined;

function is_function_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }








var FunctionCtr = attempt_x_esm.constructor;
var castBoolean = true.constructor;
var is_function_x_esm_SPACE = ' ';
var fToString = attempt_x_esm.toString;
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var asyncTag = '[object AsyncFunction]';
var ctrRx = /^class /;
var test = ctrRx.test;
var hasNativeClass = attempt_x_esm(function () {
  is_function_x_esm_newArrowCheck(this, is_function_x_esm_this);

  /* eslint-disable-next-line babel/new-cap */
  return FunctionCtr('"use strict"; return class My {};')();
}.bind(undefined)).threw === false;

var testClassstring = function _testClassstring(value) {
  return test.call(ctrRx, normalize_space_x_esm(replace_comments_x_esm(fToString.call(value), is_function_x_esm_SPACE)));
};

var isES6ClassFn = function isES6ClassFunc(value) {
  var result = attempt_x_esm(testClassstring, value);
  return result.threw === false && result.value;
};
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @private
 * @param {*} value - The value to check.
 * @param {boolean} allowClass - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */


var tryFuncToString = function funcToString(value, allowClass) {
  if (hasNativeClass && allowClass === false && isES6ClassFn(value)) {
    return false;
  }

  return attempt_x_esm.call(value, fToString).threw === false;
};
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [allowClass=false] - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */


var is_function_x_esm_isFunction = function isFunction(value, allowClass) {
  if (is_primitive_default()(value)) {
    return false;
  }

  if (has_to_string_tag_x_esm) {
    return tryFuncToString(value, to_boolean_x_esm(allowClass));
  }

  if (hasNativeClass && castBoolean(allowClass) === false && isES6ClassFn(value)) {
    return false;
  }

  var strTag = to_string_tag_x_esm(value);
  return strTag === funcTag || strTag === genTag || strTag === asyncTag;
};

/* harmony default export */ var is_function_x_esm = (is_function_x_esm_isFunction);


// CONCATENATED MODULE: ./node_modules/to-primitive-x/dist/to-primitive-x.esm.js







var ZERO = 0;
var ONE = 1;
/* eslint-disable-next-line no-void */

var UNDEFINED = void ZERO;
var NUMBER = 'number';
var STRING = 'string';
var DEFAULT = 'default';
/** @type {StringConstructor} */

var StringCtr = STRING.constructor;
/** @type {NumberConstructor} */

var NumberCtr = ZERO.constructor;
/* eslint-disable-next-line compat/compat */

var symToPrimitive = has_symbol_support_x_esm && Symbol.toPrimitive;
/* eslint-disable-next-line compat/compat */

var symValueOf = has_symbol_support_x_esm && Symbol.prototype.valueOf;
var toStringOrder = ['toString', 'valueOf'];
var toNumberOrder = ['valueOf', 'toString'];
var orderLength = 2;
/**
 * @param {*} ordinary - The ordinary to convert.
 * @param {*} hint - The hint.
 * @returns {*} - The primitive.
 */

var ordinaryToPrimitive = function _ordinaryToPrimitive(ordinary, hint) {
  require_object_coercible_x_esm(ordinary);

  if (typeof hint !== 'string' || hint !== NUMBER && hint !== STRING) {
    throw new TypeError('hint must be "string" or "number"');
  }

  var methodNames = hint === STRING ? toStringOrder : toNumberOrder;
  var method;
  var result;

  for (var i = ZERO; i < orderLength; i += ONE) {
    method = ordinary[methodNames[i]];

    if (is_function_x_esm(method)) {
      result = method.call(ordinary);

      if (is_primitive_default()(result)) {
        return result;
      }
    }
  }

  throw new TypeError('No default value');
};
/**
 * @param {*} object - The object.
 * @param {*} property - The property.
 * @returns {undefined|Function} - The method.
 */


var getMethod = function _getMethod(object, property) {
  var func = object[property];

  if (is_nil_x_esm(func) === false) {
    if (is_function_x_esm(func) === false) {
      throw new TypeError("".concat(func, " returned for property ").concat(property, " of object ").concat(object, " is not a function"));
    }

    return func;
  }

  return UNDEFINED;
};
/**
 * Get the hint.
 *
 * @param {*} value - The value to compare.
 * @param {boolean} supplied - Was a value supplied.
 * @returns {string} - The hint string.
 */


var getHint = function getHint(value, supplied) {
  if (supplied) {
    if (value === StringCtr) {
      return STRING;
    }

    if (value === NumberCtr) {
      return NUMBER;
    }
  }

  return DEFAULT;
};
/**
 * Get the primitive from the exotic.
 *
 * @param {*} value - The exotic.
 * @returns {*} - The primitive.
 */


var to_primitive_x_esm_getExoticToPrim = function getExoticToPrim(value) {
  if (has_symbol_support_x_esm) {
    if (symToPrimitive) {
      return getMethod(value, symToPrimitive);
    }

    if (is_symbol_default()(value)) {
      return symValueOf;
    }
  }

  return UNDEFINED;
};
/**
 * This method converts a JavaScript object to a primitive value.
 * Note: When toPrimitive is called with no hint, then it generally behaves as
 * if the hint were Number. However, objects may over-ride this behaviour by
 * defining a @@toPrimitive method. Of the objects defined in this specification
 * only Date objects (see 20.3.4.45) and Symbol objects (see 19.4.3.4) over-ride
 * the default ToPrimitive behaviour. Date objects treat no hint as if the hint
 * were String.
 *
 * @param {*} input - The input to convert.
 * @param {NumberConstructor|StringConstructor} [preferredType] - The preferred type (String or Number).
 * @throws {TypeError} If unable to convert input to a primitive.
 * @returns {string|number} The converted input as a primitive.
 * @see {http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive}
 */


var to_primitive_x_esm_toPrimitive = function toPrimitive(input, preferredType) {
  if (is_primitive_default()(input)) {
    return input;
  }

  var hint = getHint(preferredType, arguments.length > ONE);
  var exoticToPrim = to_primitive_x_esm_getExoticToPrim(input);

  if (typeof exoticToPrim !== 'undefined') {
    var result = exoticToPrim.call(input, hint);

    if (is_primitive_default()(result)) {
      return result;
    }

    throw new TypeError('unable to convert exotic object to primitive');
  }

  var newHint = hint === DEFAULT && (is_date_object_default()(input) || is_symbol_default()(input)) ? STRING : hint;
  return ordinaryToPrimitive(input, newHint === DEFAULT ? NUMBER : newHint);
};

/* harmony default export */ var to_primitive_x_esm = (to_primitive_x_esm_toPrimitive);


// CONCATENATED MODULE: ./node_modules/to-property-key-x/dist/to-property-key-x.esm.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




/**
 * This method Converts argument to a value that can be used as a property key.
 *
 * @param {*} argument - The argument to convert to a property key.
 * @throws {TypeError} If argument is not a symbol and is not coercible to a string.
 * @returns {string|Symbol} The converted argument.
 */

var to_property_key_x_esm_toPropertyKey = function toPropertyKey(argument) {
  var key = to_primitive_x_esm(argument, String);
  return has_symbol_support_x_esm && _typeof(key) === 'symbol' ? key : to_string_x_esm(key);
};

/* harmony default export */ var to_property_key_x_esm = (to_property_key_x_esm_toPropertyKey);


// CONCATENATED MODULE: ./node_modules/has-own-property-x/dist/has-own-property-x.esm.js


var hop = {}.hasOwnProperty;
/**
 * The `hasOwnProperty` method returns a boolean indicating whether
 * the `object` has the specified `property`. Does not attempt to fix known
 * issues in older browsers, but does ES6ify the method.
 *
 * @param {!object} object - The object to test.
 * @throws {TypeError} If object is null or undefined.
 * @param {string|number|Symbol} property - The name or Symbol of the property to test.
 * @returns {boolean} `true` if the property is set on `object`, else `false`.
 */

var has_own_property_x_esm_hasOwnProperty = function hasOwnProperty(object, property) {
  return hop.call(to_object_x_esm(object), to_property_key_x_esm(property));
};

/* harmony default export */ var has_own_property_x_esm = (has_own_property_x_esm_hasOwnProperty);


// CONCATENATED MODULE: ./node_modules/to-string-symbols-supported-x/dist/to-string-symbols-supported-x.esm.js


/* eslint-disable-next-line compat/compat */

var pToString = has_symbol_support_x_esm && Symbol.prototype.toString;
var isSymbolFn = typeof pToString === 'function' && is_symbol_default.a;
/** @type {Function} */

var to_string_symbols_supported_x_esm_castString = ''.constructor;
/**
 * The abstract operation ToString converts argument to a value of type String,
 * however the specification states that if the argument is a Symbol then a
 * 'TypeError' is thrown. This version also allows Symbols be converted to
 * a string. Other uncoercible exotics will still throw though.
 *
 * @param {*} [value] - The value to convert to a string.
 * @returns {string} The converted value.
 */

var toStringSymbolsSupported = function toStringSymbolsSupported(value) {
  return isSymbolFn && isSymbolFn(value) ? pToString.call(value) : to_string_symbols_supported_x_esm_castString(value);
};

/* harmony default export */ var to_string_symbols_supported_x_esm = (toStringSymbolsSupported);


// CONCATENATED MODULE: ./node_modules/assert-is-object-x/dist/assert-is-object-x.esm.js


/**
 * Tests `value` to see if it is an object, throws a `TypeError` if it is
 * not. Otherwise returns the `value`.
 *
 * @param {*} value - The argument to be tested.
 * @throws {TypeError} Throws if `value` is not an object.
 * @returns {*} Returns `value` if it is an object.
 */

var assert_is_object_x_esm_assertIsObject = function assertIsObject(value) {
  if (is_primitive_default()(value)) {
    throw new TypeError("".concat(to_string_symbols_supported_x_esm(value), " is not an object"));
  }

  return value;
};

/* harmony default export */ var assert_is_object_x_esm = (assert_is_object_x_esm_assertIsObject);


// CONCATENATED MODULE: ./node_modules/object-define-property-x/dist/object-define-property-x.esm.js






var ObjectCtr = {}.constructor;
var object_define_property_x_esm_castBoolean = true.constructor;
var nd = ObjectCtr.defineProperty;
var nativeDefProp = typeof nd === 'function' && nd;
var definePropertyFallback;

var toPropertyDescriptor = function _toPropertyDescriptor(desc) {
  var object = to_object_x_esm(desc);
  var descriptor = {};

  if (has_own_property_x_esm(object, 'enumerable')) {
    descriptor.enumerable = object_define_property_x_esm_castBoolean(object.enumerable);
  }

  if (has_own_property_x_esm(object, 'configurable')) {
    descriptor.configurable = object_define_property_x_esm_castBoolean(object.configurable);
  }

  if (has_own_property_x_esm(object, 'value')) {
    descriptor.value = object.value;
  }

  if (has_own_property_x_esm(object, 'writable')) {
    descriptor.writable = object_define_property_x_esm_castBoolean(object.writable);
  }

  if (has_own_property_x_esm(object, 'get')) {
    var getter = object.get;

    if (typeof getter !== 'undefined' && is_function_x_esm(getter) === false) {
      throw new TypeError('getter must be a function');
    }

    descriptor.get = getter;
  }

  if (has_own_property_x_esm(object, 'set')) {
    var setter = object.set;

    if (typeof setter !== 'undefined' && is_function_x_esm(setter) === false) {
      throw new TypeError('setter must be a function');
    }

    descriptor.set = setter;
  }

  if ((has_own_property_x_esm(descriptor, 'get') || has_own_property_x_esm(descriptor, 'set')) && (has_own_property_x_esm(descriptor, 'value') || has_own_property_x_esm(descriptor, 'writable'))) {
    throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
  }

  return descriptor;
}; // ES5 15.2.3.6
// http://es5.github.com/#x15.2.3.6
// Patch for WebKit and IE8 standard mode
// Designed by hax <hax.github.com>
// related issue: https://github.com/es-shims/es5-shim/issues#issue/5
// IE8 Reference:
//     http://msdn.microsoft.com/en-us/library/dd282900.aspx
//     http://msdn.microsoft.com/en-us/library/dd229916.aspx
// WebKit Bugs:
//     https://bugs.webkit.org/show_bug.cgi?id=36423

/**
 * This method defines a new property directly on an object, or modifies an
 * existing property on an object, and returns the object.
 *
 * @param {object} object - The object on which to define the property.
 * @param {string} property - The name of the property to be defined or modified.
 * @param {object} descriptor - The descriptor for the property being defined or modified.
 * @returns {object} The object that was passed to the function.
 * });.
 */


var $defineProperty; // check whether defineProperty works if it's given. Otherwise, shim partially.

if (nativeDefProp) {
  var testWorksWith = function _testWorksWith(object) {
    var testResult = attempt_x_esm(nativeDefProp, object, 'sentinel', {});
    return testResult.threw === false && testResult.value === object && 'sentinel' in object;
  };

  var object_define_property_x_esm_doc = typeof document !== 'undefined' && document;

  if (testWorksWith({}) && (object_define_property_x_esm_castBoolean(object_define_property_x_esm_doc) === false || testWorksWith(object_define_property_x_esm_doc.createElement('div')))) {
    $defineProperty = function defineProperty(object, property, descriptor) {
      return nativeDefProp(assert_is_object_x_esm(object), to_property_key_x_esm(property), toPropertyDescriptor(descriptor));
    };
  } else {
    definePropertyFallback = nativeDefProp;
  }
}

if (object_define_property_x_esm_castBoolean(nativeDefProp) === false || definePropertyFallback) {
  var prototypeOfObject = ObjectCtr.prototype; // If JS engine supports accessors creating shortcuts.

  var supportsAccessors = has_own_property_x_esm(prototypeOfObject, '__defineGetter__');
  /* eslint-disable-next-line no-underscore-dangle */

  var defineGetter = supportsAccessors && prototypeOfObject.__defineGetter_;
  /* eslint-disable-next-line no-underscore-dangle,no-restricted-properties */

  var defineSetter = supportsAccessors && prototypeOfObject.__defineSetter__;
  /* eslint-disable-next-line no-underscore-dangle */

  var lookupGetter = supportsAccessors && prototypeOfObject.__lookupGetter__;
  /* eslint-disable-next-line no-underscore-dangle */

  var lookupSetter = supportsAccessors && prototypeOfObject.__lookupSetter__;

  $defineProperty = function defineProperty(object, property, descriptor) {
    assert_is_object_x_esm(object);
    var propKey = to_property_key_x_esm(property);
    var propDesc = toPropertyDescriptor(descriptor); // make a valiant attempt to use the real defineProperty for IE8's DOM elements.

    if (definePropertyFallback) {
      var result = attempt_x_esm.call(ObjectCtr, definePropertyFallback, object, propKey, propDesc);

      if (result.threw === false) {
        return result.value;
      } // try the shim if the real one doesn't work

    } // If it's a data property.


    if (has_own_property_x_esm(propDesc, 'value')) {
      // fail silently if 'writable', 'enumerable', or 'configurable' are requested but not supported
      if (supportsAccessors && (lookupGetter.call(object, propKey) || lookupSetter.call(object, propKey))) {
        // As accessors are supported only on engines implementing
        // `__proto__` we can safely override `__proto__` while defining
        // a property to make sure that we don't hit an inherited accessor.

        /* eslint-disable-next-line no-proto */
        var prototype = object.__proto__;
        /* eslint-disable-next-line no-proto */

        object.__proto__ = prototypeOfObject; // Deleting a property anyway since getter / setter may be defined on object itself.

        delete object[propKey];
        object[propKey] = propDesc.value; // Setting original `__proto__` back now.

        /* eslint-disable-next-line no-proto */

        object.__proto__ = prototype;
      } else {
        object[propKey] = propDesc.value;
      }
    } else {
      if (supportsAccessors === false && (propDesc.get || propDesc.set)) {
        throw new TypeError('getters & setters can not be defined on this javascript engine');
      } // If we got that far then getters and setters can be defined !!


      if (propDesc.get) {
        defineGetter.call(object, propKey, propDesc.get);
      }

      if (propDesc.set) {
        defineSetter.call(object, propKey, propDesc.set);
      }
    }

    return object;
  };
}

var defProp = $defineProperty;
/* harmony default export */ var object_define_property_x_esm = (defProp);


// CONCATENATED MODULE: ./node_modules/has-boxed-string-x/dist/has-boxed-string-x.esm.js
var has_boxed_string_x_esm_string = 'a';
var boxedString = {}.constructor(has_boxed_string_x_esm_string);
/**
 * Check failure of by-index access of string characters (IE < 9)
 * and failure of `0 in boxedString` (Rhino).
 *
 * `true` if no failure; otherwise `false`.
 *
 * @type boolean
 */

var hasBoxed = boxedString[0] === has_boxed_string_x_esm_string && 0 in boxedString;
/* harmony default export */ var has_boxed_string_x_esm = (hasBoxed);


// EXTERNAL MODULE: ./node_modules/is-string/index.js
var is_string = __webpack_require__(1);
var is_string_default = /*#__PURE__*/__webpack_require__.n(is_string);

// CONCATENATED MODULE: ./node_modules/split-if-boxed-bug-x/dist/split-if-boxed-bug-x.esm.js


var split_if_boxed_bug_x_esm_EMPTY_STRING = '';
var strSplit = split_if_boxed_bug_x_esm_EMPTY_STRING.split;
var isStringFn = has_boxed_string_x_esm === false && typeof strSplit === 'function' && is_string_default.a;
/**
 * This method tests if a value is a string with the boxed bug; splits to an
 * array for iteration; otherwise returns the original value.
 *
 * @param {*} [value] - The value to be tested.
 * @returns {*} An array or characters if value was a string with the boxed bug;
 *  otherwise the value.
 */

var splitIfBoxedBug = function splitIfBoxedBug(value) {
  return isStringFn && isStringFn(value) ? strSplit.call(value, split_if_boxed_bug_x_esm_EMPTY_STRING) : value;
};

/* harmony default export */ var split_if_boxed_bug_x_esm = (splitIfBoxedBug);


// CONCATENATED MODULE: ./node_modules/nan-x/dist/nan-x.esm.js
/**
 * The constant NaN derived mathematically by 0 / 0.
 *
 * @type number
 */
/* harmony default export */ var nan_x_esm = (0 / 0);


// CONCATENATED MODULE: ./node_modules/parse-int-x/dist/parse-int-x.esm.js



var nativeParseInt = parseInt;
/**  @type {Function} */

var castNumber = 0 .constructor; // noinspection JSPotentiallyInvalidConstructorUsage

var _ref = '',
    charAt = _ref.charAt;
var hexRegex = /^[-+]?0[xX]/;
var parse_int_x_esm_test = hexRegex.test;
/**
 * This method parses a string argument and returns an integer of the specified
 * radix (the base in mathematical numeral systems). (ES2019).
 *
 * @param {string} [string] - The value to parse. If the string argument is not a
 *  string, then it is converted to a string (using the ToString abstract
 *  operation). Leading whitespace in the string argument is ignored.
 * @param {number} [radix] - An integer between 2 and 36 that represents the radix
 *  (the base in mathematical numeral systems) of the above mentioned string.
 *  Specify 10 for the decimal numeral system commonly used by humans. Always
 *  specify this parameter to eliminate reader confusion and to guarantee
 *  predictable behavior. Different implementations produce different results
 *  when a radix is not specified, usually defaulting the value to 10.
 * @throws {TypeError} If target is a Symbol or is not coercible.
 * @returns {number} An integer number parsed from the given string. If the first
 *  character cannot be converted to a number, NaN is returned.
 */

var parse_int_x_esm_$parseInt = function $parseInt(string, radix) {
  var str = trim_left_x_esm(to_string_x_esm(string));

  if (charAt.call(str, 0) === "\u180E") {
    return nan_x_esm;
  }

  return nativeParseInt(str, castNumber(radix) || (parse_int_x_esm_test.call(hexRegex, str) ? 16 : 10));
};

/* harmony default export */ var parse_int_x_esm = (parse_int_x_esm_$parseInt);


// CONCATENATED MODULE: ./node_modules/to-number-x/dist/to-number-x.esm.js





var binaryRadix = 2;
var octalRadix = 8;
var testCharsCount = 2;
var to_number_x_esm_ERROR_MESSAGE = 'Cannot convert a Symbol value to a number';
var to_number_x_esm_castNumber = testCharsCount.constructor;
var pStrSlice = to_number_x_esm_ERROR_MESSAGE.slice;
var binaryRegex = /^0b[01]+$/i;
var RegExpConstructor = binaryRegex.constructor; // Note that in IE 8, RegExp.prototype.test doesn't seem to exist: ie, "test" is
// an own property of regexes. wtf.

var to_number_x_esm_test = binaryRegex.test;

var isBinary = function _isBinary(value) {
  return to_number_x_esm_test.call(binaryRegex, value);
};

var octalRegex = /^0o[0-7]+$/i;

var isOctal = function _isOctal(value) {
  return to_number_x_esm_test.call(octalRegex, value);
};

var nonWSregex2018 = new RegExpConstructor("[\x85\u180E\u200B\uFFFE]", 'g');

var hasNonWS2018 = function _hasNonWS(value) {
  return to_number_x_esm_test.call(nonWSregex2018, value);
};

var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;

var isInvalidHexLiteral = function _isInvalidHexLiteral(value) {
  return to_number_x_esm_test.call(invalidHexLiteral, value);
};
/**
 * This method converts argument to a value of type Number. (ES2018).
 *
 * @param {*} [argument] - The argument to convert to a number.
 * @throws {TypeError} - If argument is a Symbol or not coercible.
 * @returns {*} The argument converted to a number.
 */


var to_number_x_esm_toNumber = function toNumber(argument) {
  var value = to_primitive_x_esm(argument, to_number_x_esm_castNumber);

  if (is_symbol_default()(value)) {
    throw new TypeError(to_number_x_esm_ERROR_MESSAGE);
  }

  if (typeof value === 'string') {
    if (isBinary(value)) {
      return toNumber(parse_int_x_esm(pStrSlice.call(value, testCharsCount), binaryRadix));
    }

    if (isOctal(value)) {
      return toNumber(parse_int_x_esm(pStrSlice.call(value, testCharsCount), octalRadix));
    }

    if (hasNonWS2018(value) || isInvalidHexLiteral(value)) {
      return nan_x_esm;
    }

    var trimmed = trim_x_esm(value);

    if (trimmed !== value) {
      return toNumber(trimmed);
    }
  }

  return to_number_x_esm_castNumber(value);
};

/* harmony default export */ var to_number_x_esm = (to_number_x_esm_toNumber);


// CONCATENATED MODULE: ./node_modules/is-nan-x/dist/is-nan-x.esm.js
/**
 * This method determines whether the passed value is NaN and its type is
 * `Number`. It is a more robust version of the original, global isNaN().
 *
 * @param {*} [value] - The value to be tested for NaN.
 * @returns {boolean} `true` if the given value is NaN and its type is Number;
 *  otherwise, `false`.
 */
var is_nan_x_esm_isNaN = function isNaN(value) {
  /* eslint-disable-next-line no-self-compare */
  return value !== value;
};

/* harmony default export */ var is_nan_x_esm = (is_nan_x_esm_isNaN);


// CONCATENATED MODULE: ./node_modules/infinity-x/dist/infinity-x.esm.js
/**
 * The constant value Infinity derived mathematically by 1 / 0.
 *
 * @type number
 */
/* harmony default export */ var infinity_x_esm = (1 / 0);


// CONCATENATED MODULE: ./node_modules/is-finite-x/dist/is-finite-x.esm.js


/**
 * This method determines whether the passed value is a finite number.
 *
 * @param {*} [number] - The value to be tested for finiteness.
 * @returns {boolean} A Boolean indicating whether or not the given value is a finite number.
 */

var is_finite_x_esm_isFinite = function isFinite(number) {
  return typeof number === 'number' && is_nan_x_esm(number) === false && number !== infinity_x_esm && number !== -infinity_x_esm;
};

/* harmony default export */ var is_finite_x_esm = (is_finite_x_esm_isFinite);


// CONCATENATED MODULE: ./node_modules/math-sign-x/dist/math-sign-x.esm.js


/**
 * This method returns the sign of a number, indicating whether the number is positive,
 * negative or zero. (ES2019).
 *
 * @param {*} x - A number.
 * @returns {number} A number representing the sign of the given argument. If the argument
 * is a positive number, negative number, positive zero or negative zero, the function will
 * return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.
 */

var math_sign_x_esm_sign = function sign(x) {
  var n = to_number_x_esm(x);

  if (n === 0 || is_nan_x_esm(n)) {
    return n;
  }

  return n > 0 ? 1 : -1;
};

/* harmony default export */ var math_sign_x_esm = (math_sign_x_esm_sign);


// CONCATENATED MODULE: ./node_modules/to-integer-x/dist/to-integer-x.esm.js




var abs = Math.abs,
    floor = Math.floor;
/**
 * Converts `value` to an integer. (ES2019).
 *
 * @param {*} value - The value to convert.
 * @returns {number} Returns the converted integer.
 */

var to_integer_x_esm_toInteger = function toInteger(value) {
  var number = to_number_x_esm(value);

  if (is_nan_x_esm(number)) {
    return 0;
  }

  if (number === 0 || is_finite_x_esm(number) === false) {
    return number;
  }

  return math_sign_x_esm(number) * floor(abs(number));
};

/* harmony default export */ var to_integer_x_esm = (to_integer_x_esm_toInteger);


// CONCATENATED MODULE: ./node_modules/to-length-x/dist/to-length-x.esm.js

var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object. (ES2019).
 *
 * @param {*} value - The value to convert.
 * @returns {number} Returns the converted integer.
 */

var to_length_x_esm_toLength = function toLength(value) {
  var len = to_integer_x_esm(value); // includes converting -0 to +0

  if (len <= 0) {
    return 0;
  }

  if (len > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER;
  }

  return len;
};

/* harmony default export */ var to_length_x_esm = (to_length_x_esm_toLength);


// CONCATENATED MODULE: ./node_modules/assert-is-function-x/dist/assert-is-function-x.esm.js



/**
 * Tests `callback` to see if it is a function, throws a `TypeError` if it is
 * not. Otherwise returns the `callback`.
 *
 * @param {*} callback - The argument to be tested.
 * @throws {TypeError} Throws if `callback` is not a function.
 * @returns {*} Returns `callback` if it is function.
 */

var assert_is_function_x_esm_assertIsFunction = function assertIsFunction(callback) {
  if (is_function_x_esm(callback) === false) {
    var msg = is_primitive_default()(callback) ? to_string_symbols_supported_x_esm(callback) : '#<Object>';
    throw new TypeError("".concat(msg, " is not a function"));
  }

  return callback;
};

/* harmony default export */ var assert_is_function_x_esm = (assert_is_function_x_esm_assertIsFunction);


// CONCATENATED MODULE: ./node_modules/array-for-each-x/dist/array-for-each-x.esm.js
function array_for_each_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }







var nfe = [].forEach;
var nativeForEach = typeof nfe === 'function' && nfe;

var array_for_each_x_esm_test1 = function test1() {
  var _this = this;

  var spy = 0;
  var res = attempt_x_esm.call([1, 2], nativeForEach, function (item) {
    array_for_each_x_esm_newArrowCheck(this, _this);

    spy += item;
  }.bind(this));
  return res.threw === false && typeof res.value === 'undefined' && spy === 3;
};

var array_for_each_x_esm_test2 = function test2() {
  var _this2 = this;

  var spy = '';
  var res = attempt_x_esm.call({}.constructor('abc'), nativeForEach, function (item) {
    array_for_each_x_esm_newArrowCheck(this, _this2);

    spy += item;
  }.bind(this));
  return res.threw === false && typeof res.value === 'undefined' && spy === 'abc';
};

var array_for_each_x_esm_test3 = function test3() {
  var spy = 0;
  var res = attempt_x_esm.call(function getArgs() {
    /* eslint-disable-next-line prefer-rest-params */
    return arguments;
  }(1, 2, 3), nativeForEach, function spyAdd1(item) {
    spy += item;
  });
  return res.threw === false && typeof res.value === 'undefined' && spy === 6;
};

var array_for_each_x_esm_test4 = function test4() {
  var spy = 0;
  var res = attempt_x_esm.call({
    0: 1,
    1: 2,
    3: 3,
    4: 4,
    length: 4
  }, nativeForEach, function spyAdd2(item) {
    spy += item;
  });
  return res.threw === false && typeof res.value === 'undefined' && spy === 6;
};

var array_for_each_x_esm_test5 = function test5() {
  var doc = typeof document !== 'undefined' && document;

  if (doc) {
    var spy = null;
    var fragment = doc.createDocumentFragment();
    var div = doc.createElement('div');
    fragment.appendChild(div);
    var res = attempt_x_esm.call(fragment.childNodes, nativeForEach, function spyAssign(item) {
      spy = item;
    });
    return res.threw === false && typeof res.value === 'undefined' && spy === div;
  }

  return true;
};

var array_for_each_x_esm_test6 = function test6() {
  var isStrict = function returnIsStrict() {
    /* eslint-disable-next-line babel/no-invalid-this */
    return true.constructor(this) === false;
  }();

  if (isStrict) {
    var spy = null;
    var res = attempt_x_esm.call([1], nativeForEach, function thisTest() {
      /* eslint-disable-next-line babel/no-invalid-this */
      spy = typeof this === 'string';
    }, 'x');
    return res.threw === false && typeof res.value === 'undefined' && spy === true;
  }

  return true;
};

var array_for_each_x_esm_test7 = function test7() {
  var spy = {};
  var fn = 'return nativeForEach.call("foo", function (_, __, context) {' + 'if (castBoolean(context) === false || typeof context !== "object") {' + 'spy.value = true;}});';
  /* eslint-disable-next-line no-new-func */

  var res = attempt_x_esm(Function('nativeForEach', 'spy', 'castBoolean', fn), nativeForEach, spy, true.constructor);
  return res.threw === false && typeof res.value === 'undefined' && spy.value !== true;
};

var isWorking = true.constructor(nativeForEach) && array_for_each_x_esm_test1() && array_for_each_x_esm_test2() && array_for_each_x_esm_test3() && array_for_each_x_esm_test4() && array_for_each_x_esm_test5() && array_for_each_x_esm_test6() && array_for_each_x_esm_test7();

var array_for_each_x_esm_patchedNative = function patchedNative() {
  return function forEach(array, callBack
  /* , thisArg */
  ) {
    require_object_coercible_x_esm(array);
    var args = [assert_is_function_x_esm(callBack)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeForEach.apply(array, args);
  };
};

var array_for_each_x_esm_implementation = function implementation() {
  return function forEach(array, callBack
  /* , thisArg */
  ) {
    var object = to_object_x_esm(array); // If no callback function or if callback is not a callable function

    assert_is_function_x_esm(callBack);
    var iterable = split_if_boxed_bug_x_esm(object);
    var length = to_length_x_esm(iterable.length);
    /* eslint-disable-next-line no-void,prefer-rest-params */

    var thisArg = arguments.length > 2 ? arguments[2] : void 0;
    var noThis = typeof thisArg === 'undefined';

    for (var i = 0; i < length; i += 1) {
      if (i in iterable) {
        if (noThis) {
          callBack(iterable[i], i, object);
        } else {
          callBack.call(thisArg, iterable[i], i, object);
        }
      }
    }
  };
};
/**
 * This method executes a provided function once for each array element.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callBack - Function to execute for each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @throws {TypeError} If array is null or undefined.
 * @throws {TypeError} If callBack is not a function.
 */


var $forEach = isWorking ? array_for_each_x_esm_patchedNative() : array_for_each_x_esm_implementation();
/* harmony default export */ var array_for_each_x_esm = ($forEach);


// CONCATENATED MODULE: ./node_modules/is-array-x/dist/is-array-x.esm.js
var is_array_x_esm_this = undefined;

function is_array_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }



var nativeIsArray = [].isArray;
var isArrayNative = typeof nativeIsArray === 'function' && nativeIsArray;
var testRes = isArrayNative && attempt_x_esm(function () {
  is_array_x_esm_newArrowCheck(this, is_array_x_esm_this);

  return isArrayNative([]) === true && isArrayNative({
    length: 0
  }) === false;
}.bind(undefined));

var isArrayFn = function iife() {
  if (testRes && testRes.threw === false && testRes.value === true) {
    return isArrayNative;
  }
  /**
   * The isArray() function determines whether the passed value is an Array.
   *
   * @function isArray
   * @param {*} [value] - The object to be checked..
   * @returns {boolean} `true` if the object is an Array; otherwise, `false`.
   */


  return function isArray(value) {
    return to_string_tag_x_esm(value) === '[object Array]';
  };
}();

/* harmony default export */ var is_array_x_esm = (isArrayFn);


// EXTERNAL MODULE: ./node_modules/is-arguments/index.js
var is_arguments = __webpack_require__(3);
var is_arguments_default = /*#__PURE__*/__webpack_require__.n(is_arguments);

// CONCATENATED MODULE: ./node_modules/array-like-slice-x/dist/array-like-slice-x.esm.js





var getMax = function _getMax(a, b) {
  return a >= b ? a : b;
};

var getMin = function _getMin(a, b) {
  return a <= b ? a : b;
};

var setRelative = function _setRelative(value, length) {
  return value < 0 ? getMax(length + value, 0) : getMin(value, length);
};
/**
 * The slice() method returns a shallow copy of a portion of an array into a new
 * array object selected from begin to end (end not included). The original
 * array will not be modified.
 *
 * @param {!object} arrayLike - The array like object to slice.
 * @param {number} [start] - Zero-based index at which to begin extraction.
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. Running slice(-2) extracts the last two elements in the sequence.
 *  If begin is undefined, slice begins from index 0.
 * @param {number} [end] - Zero-based index before which to end extraction.
 *  Slice extracts up to but not including end. For example, slice([0,1,2,3,4],1,4)
 *  extracts the second element through the fourth element (elements indexed
 *  1, 2, and 3).
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. Running slice(2,-1) extracts the third element through the second-to-last
 *  element in the sequence.
 *  If end is omitted, slice extracts through the end of the sequence (arr.length).
 *  If end is greater than the length of the sequence, slice extracts through
 *  the end of the sequence (arr.length).
 * @returns {Array} A new array containing the extracted elements.
 */


var array_like_slice_x_esm_slice = function slice(arrayLike, start, end) {
  var iterable = split_if_boxed_bug_x_esm(to_object_x_esm(arrayLike));
  var length = to_length_x_esm(iterable.length);
  var k = setRelative(to_integer_x_esm(start), length);
  var relativeEnd = typeof end === 'undefined' ? length : to_integer_x_esm(end);
  var finalEnd = setRelative(relativeEnd, length);
  var val = [];
  val.length = getMax(finalEnd - k, 0);
  var next = 0;

  while (k < finalEnd) {
    if (k in iterable) {
      val[next] = iterable[k];
    }

    next += 1;
    k += 1;
  }

  return val;
};

/* harmony default export */ var array_like_slice_x_esm = (array_like_slice_x_esm_slice);


// CONCATENATED MODULE: ./node_modules/is-object-like-x/dist/is-object-like-x.esm.js


/**
 * Checks if `value` is object-like. A value is object-like if it's not a
 * primitive and not a function.
 *
 * @param {*} [value] - The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */

var is_object_like_x_esm_isObjectLike = function isObjectLike(value) {
  return is_primitive_default()(value) === false && is_function_x_esm(value, true) === false;
};

/* harmony default export */ var is_object_like_x_esm = (is_object_like_x_esm_isObjectLike);


// CONCATENATED MODULE: ./node_modules/math-clamp-x/dist/math-clamp-x.esm.js
 // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * This method clamp a number to min and max limits inclusive.
 *
 * @param {number} value - The number to be clamped.
 * @param {number} [min=0] - The minimum number.
 * @param {number} max - The maximum number.
 * @throws {RangeError} If min > max.
 * @returns {number} The clamped number.
 */
// eslint-enable jsdoc/check-param-names

var math_clamp_x_esm_clamp = function clamp(value) {
  var number = to_number_x_esm(value);
  var argsLength = arguments.length;

  if (argsLength < 2) {
    return number;
  }
  /* eslint-disable-next-line prefer-rest-params */


  var min = to_number_x_esm(arguments[1]);
  var max;

  if (argsLength < 3) {
    max = min;
    min = 0;
  } else {
    /* eslint-disable-next-line prefer-rest-params */
    max = to_number_x_esm(arguments[2]);
  }

  if (min > max) {
    throw new RangeError('"min" must be less than "max"');
  }

  if (number < min) {
    return min;
  }

  if (number > max) {
    return max;
  }

  return number;
};

/* harmony default export */ var math_clamp_x_esm = (math_clamp_x_esm_clamp);


// CONCATENATED MODULE: ./node_modules/is-index-x/dist/is-index-x.esm.js




var is_index_x_esm_MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
var rxTest = reIsUint.test;
/**
 * This method determines whether the passed value is a zero based index.
 * JavaScript arrays are zero-indexed: the first element of an array is at
 * index 0, and the last element is at the index equal to the value of the
 * array's length property minus 1.
 *
 * @param {number|string} value - The value to be tested for being a zero based index.
 * @param {number} [length=MAX_SAFE_INTEGER] - The length that sets the upper bound.
 * @returns {boolean} A Boolean indicating whether or not the given value is a
 * zero based index within bounds.
 */

var is_index_x_esm_isIndex = function isIndex(value, length) {
  var string = to_string_symbols_supported_x_esm(value);

  if (rxTest.call(reIsUint, string) === false) {
    return false;
  }

  var number = to_number_x_esm(string);

  if (arguments.length > 1) {
    return number < math_clamp_x_esm(to_integer_x_esm(length), is_index_x_esm_MAX_SAFE_INTEGER);
  }

  return number < is_index_x_esm_MAX_SAFE_INTEGER;
};

/* harmony default export */ var is_index_x_esm = (is_index_x_esm_isIndex);


// CONCATENATED MODULE: ./node_modules/property-is-enumerable-x/dist/property-is-enumerable-x.esm.js


var propIsEnumerable = {}.propertyIsEnumerable;
/**
 * This method returns a Boolean indicating whether the specified property is
 * enumerable. Does not attempt to fix bugs in IE<9 or old Opera, otherwise it
 * does ES6ify the method.
 *
 * @param {!object} object - The object on which to test the property.
 * @param {string|Symbol} property - The name of the property to test.
 * @throws {TypeError} If target is null or undefined.
 * @returns {boolean} A Boolean indicating whether the specified property is
 *  enumerable.
 */

var property_is_enumerable_x_esm_propertyIsEnumerable = function propertyIsEnumerable(object, property) {
  return propIsEnumerable.call(to_object_x_esm(object), to_property_key_x_esm(property));
};

/* harmony default export */ var property_is_enumerable_x_esm = (property_is_enumerable_x_esm_propertyIsEnumerable);


// CONCATENATED MODULE: ./node_modules/object-get-own-property-descriptor-x/dist/object-get-own-property-descriptor-x.esm.js









/** @type {ObjectConstructor} */

var object_get_own_property_descriptor_x_esm_castObject = {}.constructor;
/** @type {BooleanConstructor} */

var object_get_own_property_descriptor_x_esm_castBoolean = true.constructor;
var nativeGOPD = typeof object_get_own_property_descriptor_x_esm_castObject.getOwnPropertyDescriptor === 'function' && object_get_own_property_descriptor_x_esm_castObject.getOwnPropertyDescriptor;
var getOPDFallback1;
var getOPDFallback2; // ES5 15.2.3.3
// http://es5.github.com/#x15.2.3.3

var object_get_own_property_descriptor_x_esm_doesGOPDWork = function doesGOPDWork(object, prop) {
  object[to_property_key_x_esm(prop)] = 0;
  var testResult = attempt_x_esm(nativeGOPD, object, prop);
  return testResult.threw === false && testResult.value.value === 0;
}; // check whether getOwnPropertyDescriptor works if it's given. Otherwise, shim partially.

/**
 * This method returns a property descriptor for an own property (that is,
 * one directly present on an object and not in the object's prototype chain)
 * of a given object.
 *
 * @param {*} object - The object in which to look for the property.
 * @param {*} property - The name of the property whose description is to be retrieved.
 * @returns {object} A property descriptor of the given property if it exists on the object, undefined otherwise.
 */


var $getOwnPropertyDescriptor;

if (nativeGOPD) {
  var object_get_own_property_descriptor_x_esm_doc = typeof document !== 'undefined' && document;
  var getOPDWorksOnDom = object_get_own_property_descriptor_x_esm_doc ? object_get_own_property_descriptor_x_esm_doesGOPDWork(object_get_own_property_descriptor_x_esm_doc.createElement('div'), 'sentinel') : true;

  if (getOPDWorksOnDom) {
    var object_get_own_property_descriptor_x_esm_res = attempt_x_esm(nativeGOPD, object_get_own_property_descriptor_x_esm_castObject('abc'), 1);
    var worksWithStr = object_get_own_property_descriptor_x_esm_res.threw === false && object_get_own_property_descriptor_x_esm_res.value && object_get_own_property_descriptor_x_esm_res.value.value === 'b';

    if (worksWithStr) {
      var getOPDWorksOnObject = object_get_own_property_descriptor_x_esm_doesGOPDWork({}, 'sentinel');

      if (getOPDWorksOnObject) {
        var worksWithPrim = attempt_x_esm(nativeGOPD, 42, 'name').threw === false;
        /* eslint-disable-next-line compat/compat */

        var worksWithObjSym = has_symbol_support_x_esm && object_get_own_property_descriptor_x_esm_doesGOPDWork({}, object_get_own_property_descriptor_x_esm_castObject(Symbol('')));

        if (worksWithObjSym) {
          if (worksWithPrim) {
            $getOwnPropertyDescriptor = nativeGOPD;
          } else {
            $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
              return nativeGOPD(to_object_x_esm(object), property);
            };
          }
        } else if (worksWithPrim) {
          $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
            return nativeGOPD(object, to_property_key_x_esm(property));
          };
        } else {
          $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
            return nativeGOPD(to_object_x_esm(object), to_property_key_x_esm(property));
          };
        }
      } else {
        getOPDFallback1 = nativeGOPD;
      }
    } else {
      getOPDFallback2 = nativeGOPD;
    }
  }
}

if (object_get_own_property_descriptor_x_esm_castBoolean($getOwnPropertyDescriptor) === false || getOPDFallback1 || getOPDFallback2) {
  var object_get_own_property_descriptor_x_esm_prototypeOfObject = object_get_own_property_descriptor_x_esm_castObject.prototype; // If JS engine supports accessors creating shortcuts.

  var object_get_own_property_descriptor_x_esm_lookupGetter;
  var object_get_own_property_descriptor_x_esm_lookupSetter;
  var object_get_own_property_descriptor_x_esm_supportsAccessors = has_own_property_x_esm(object_get_own_property_descriptor_x_esm_prototypeOfObject, '__defineGetter__');

  if (object_get_own_property_descriptor_x_esm_supportsAccessors) {
    /* eslint-disable-next-line no-underscore-dangle */
    var lg = object_get_own_property_descriptor_x_esm_prototypeOfObject.__lookupGetter__;
    /* eslint-disable-next-line no-underscore-dangle */

    var ls = object_get_own_property_descriptor_x_esm_prototypeOfObject.__lookupSetter__;

    object_get_own_property_descriptor_x_esm_lookupGetter = function $lookupGetter(object, property) {
      return lg.call(object, property);
    };

    object_get_own_property_descriptor_x_esm_lookupSetter = function $lookupSetter(object, property) {
      return ls.call(object, property);
    };
  }

  $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
    var obj = to_object_x_esm(object);
    var propKey = to_property_key_x_esm(property);
    var result; // make a valiant attempt to use the real getOwnPropertyDescriptor for I8's DOM elements.

    if (getOPDFallback1) {
      result = attempt_x_esm.call(object_get_own_property_descriptor_x_esm_castObject, getOPDFallback1, obj, propKey);

      if (result.threw === false) {
        return result.value;
      } // try the shim if the real one doesn't work

    }

    var isStringIndex = is_string_default()(obj) && is_index_x_esm(propKey, obj.length);

    if (getOPDFallback2 && isStringIndex === false) {
      result = attempt_x_esm.call(object_get_own_property_descriptor_x_esm_castObject, getOPDFallback2, obj, propKey);

      if (result.threw === false) {
        return result.value;
      } // try the shim if the real one doesn't work

    }
    /* eslint-disable-next-line no-void */


    var descriptor = void 0; // If object does not owns property return undefined immediately.

    if (isStringIndex === false && has_own_property_x_esm(obj, propKey) === false) {
      return descriptor;
    } // If object has a property then it's for sure `configurable`, and
    // probably `enumerable`. Detect enumerability though.


    descriptor = {
      configurable: is_primitive_default()(object) === false && isStringIndex === false,
      enumerable: property_is_enumerable_x_esm(obj, propKey)
    }; // If JS engine supports accessor properties then property may be a
    // getter or setter.

    if (object_get_own_property_descriptor_x_esm_supportsAccessors) {
      // Unfortunately `__lookupGetter__` will return a getter even
      // if object has own non getter property along with a same named
      // inherited getter. To avoid misbehavior we temporary remove
      // `__proto__` so that `__lookupGetter__` will return getter only
      // if it's owned by an object.

      /* eslint-disable-next-line no-proto */
      var prototype = obj.__proto__;
      var notPrototypeOfObject = obj !== object_get_own_property_descriptor_x_esm_prototypeOfObject; // avoid recursion problem, breaking in Opera Mini when
      // Object.getOwnPropertyDescriptor(Object.prototype, 'toString')
      // or any other Object.prototype accessor

      if (notPrototypeOfObject) {
        /* eslint-disable-next-line no-proto */
        obj.__proto__ = object_get_own_property_descriptor_x_esm_prototypeOfObject;
      }

      var getter = object_get_own_property_descriptor_x_esm_lookupGetter(obj, propKey);
      var setter = object_get_own_property_descriptor_x_esm_lookupSetter(obj, propKey);

      if (notPrototypeOfObject) {
        // Once we have getter and setter we can put values back.

        /* eslint-disable-next-line no-proto */
        obj.__proto__ = prototype;
      }

      if (getter || setter) {
        if (getter) {
          descriptor.get = getter;
        }

        if (setter) {
          descriptor.set = setter;
        } // If it was accessor property we're done and return here
        // in order to avoid adding `value` to the descriptor.


        return descriptor;
      }
    } // If we got this far we know that object has an own property that is
    // not an accessor so we set it as a value and return descriptor.


    if (isStringIndex) {
      descriptor.value = obj.charAt(propKey);
      descriptor.writable = false;
    } else {
      descriptor.value = obj[propKey];
      descriptor.writable = true;
    }

    return descriptor;
  };
}

var gOPS = $getOwnPropertyDescriptor;
/* harmony default export */ var object_get_own_property_descriptor_x_esm = (gOPS);


// CONCATENATED MODULE: ./node_modules/is-regexp-x/dist/is-regexp-x.esm.js






var regexExec = /none/.exec;
var regexClass = '[object RegExp]';

var tryRegexExecCall = function tryRegexExec(value, descriptor) {
  try {
    value.lastIndex = 0;
    regexExec.call(value);
    return true;
  } catch (e) {
    return false;
  } finally {
    object_define_property_x_esm(value, 'lastIndex', descriptor);
  }
};
/**
 * This method tests if a value is a regex.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} `true` if value is a regex; otherwise `false`.
 */


var is_regexp_x_esm_isRegex = function isRegex(value) {
  if (is_object_like_x_esm(value) === false) {
    return false;
  }

  if (has_to_string_tag_x_esm === false) {
    return to_string_tag_x_esm(value) === regexClass;
  }

  var descriptor = object_get_own_property_descriptor_x_esm(value, 'lastIndex');
  var hasLastIndexDataProperty = descriptor && has_own_property_x_esm(descriptor, 'value');

  if (hasLastIndexDataProperty !== true) {
    return false;
  }

  return tryRegexExecCall(value, descriptor);
};

/* harmony default export */ var is_regexp_x_esm = (is_regexp_x_esm_isRegex);


// EXTERNAL MODULE: ./node_modules/object-keys/index.js
var object_keys = __webpack_require__(6);
var object_keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// CONCATENATED MODULE: ./node_modules/object-keys-x/dist/object-keys-x.esm.js










var object_keys_x_esm_ObjectCtr = {}.constructor;
var nativeKeys = typeof object_keys_x_esm_ObjectCtr.keys === 'function' && object_keys_x_esm_ObjectCtr.keys;
var object_keys_x_esm_isWorking;
var throwsWithNull;
var object_keys_x_esm_worksWithPrim;
var worksWithRegex;
var worksWithArgs;
var object_keys_x_esm_worksWithStr;

if (nativeKeys) {
  var isCorrectRes = function _isCorrectRes(r, length) {
    return r.threw === false && is_array_x_esm(r.value) && r.value.length === length;
  };

  var either = function _either(r, a, b) {
    var x = r.value[0];
    var y = r.value[1];
    return x === a && y === b || x === b && y === a;
  };

  var testObj = {
    a: 1,
    b: 2
  };
  var object_keys_x_esm_res = attempt_x_esm(nativeKeys, testObj);
  object_keys_x_esm_isWorking = isCorrectRes(object_keys_x_esm_res, 2) && either(object_keys_x_esm_res, 'a', 'b');

  if (object_keys_x_esm_isWorking) {
    testObj = Object('a');
    testObj.y = 1;
    object_keys_x_esm_res = attempt_x_esm(nativeKeys, testObj);
    object_keys_x_esm_isWorking = isCorrectRes(object_keys_x_esm_res, 2) && either(object_keys_x_esm_res, '0', 'y');
  }

  if (object_keys_x_esm_isWorking) {
    throwsWithNull = attempt_x_esm(nativeKeys, null).threw;
    object_keys_x_esm_worksWithPrim = isCorrectRes(attempt_x_esm(nativeKeys, 42), 0);
    worksWithRegex = attempt_x_esm(nativeKeys, /a/g).threw === false;
    object_keys_x_esm_res = attempt_x_esm(nativeKeys, function getArgs() {
      /* eslint-disable-next-line prefer-rest-params */
      return arguments;
    }(1, 2));
    worksWithArgs = isCorrectRes(object_keys_x_esm_res, 2) && either(object_keys_x_esm_res, '0', '1');
    object_keys_x_esm_res = attempt_x_esm(nativeKeys, Object('ab'));
    object_keys_x_esm_worksWithStr = isCorrectRes(object_keys_x_esm_res, 2) && either(object_keys_x_esm_res, '0', '1');
  }
}
/**
 * This method returns an array of a given object's own enumerable properties,
 * in the same order as that provided by a for...in loop (the difference being
 * that a for-in loop enumerates properties in the prototype chain as well).
 *
 * @param {*} obj - The object of which the enumerable own properties are to be returned.
 * @returns {Array} An array of strings that represent all the enumerable properties of the given object.
 */


var objectKeys;

if (object_keys_x_esm_isWorking) {
  if (throwsWithNull && object_keys_x_esm_worksWithPrim && worksWithRegex && worksWithArgs && object_keys_x_esm_worksWithStr) {
    objectKeys = nativeKeys;
  } else {
    objectKeys = function keys(object) {
      var obj = to_object_x_esm ? to_object_x_esm(object) : object;

      if (worksWithArgs !== true && is_arguments_default()(obj)) {
        obj = array_like_slice_x_esm(obj);
      } else if (object_keys_x_esm_worksWithStr !== true && is_string_default()(obj)) {
        obj = split_if_boxed_bug_x_esm(obj);
      } else if (worksWithRegex !== true && is_regexp_x_esm(obj)) {
        var regexKeys = [];
        /* eslint-disable-next-line no-restricted-syntax */

        for (var key in obj) {
          // noinspection JSUnfilteredForInLoop
          if (has_own_property_x_esm(obj, key)) {
            regexKeys[regexKeys.length] = key;
          }
        }

        return regexKeys;
      }

      return nativeKeys(obj);
    };
  }
} else {
  objectKeys = function keys(object) {
    return object_keys_default()(to_object_x_esm(object));
  };
}

var ok = objectKeys;
/* harmony default export */ var object_keys_x_esm = (ok);


// CONCATENATED MODULE: ./node_modules/array-filter-x/dist/array-filter-x.esm.js






var nf = [].filter;
var nativeFilter = typeof nf === 'function' && nf;

var array_filter_x_esm_test1 = function test1() {
  var spy = 0;
  var res = attempt_x_esm.call([1, 2], nativeFilter, function spyAdd1(item) {
    spy += item;
    return false;
  });
  return res.threw === false && res.value && res.value.length === 0 && spy === 3;
};

var array_filter_x_esm_test2 = function test2() {
  var spy = '';
  var res = attempt_x_esm.call({}.constructor('abc'), nativeFilter, function spyAdd2(item, index) {
    spy += item;
    return index === 1;
  });
  return res.threw === false && res.value && res.value.length === 1 && res.value[0] === 'b' && spy === 'abc';
};

var array_filter_x_esm_test3 = function test3() {
  var spy = 0;
  var res = attempt_x_esm.call(function getArgs() {
    /* eslint-disable-next-line prefer-rest-params */
    return arguments;
  }(1, 2, 3), nativeFilter, function spyAdd3(item, index) {
    spy += item;
    return index === 2;
  });
  return res.threw === false && res.value && res.value.length === 1 && res.value[0] === 3 && spy === 6;
};

var array_filter_x_esm_test4 = function test4() {
  var spy = 0;
  var res = attempt_x_esm.call({
    0: 1,
    1: 2,
    3: 3,
    4: 4,
    length: 4
  }, nativeFilter, function spyAdd4(item) {
    spy += item;
    return false;
  });
  return res.threw === false && res.value && res.value.length === 0 && spy === 6;
};

var array_filter_x_esm_test5 = function test5() {
  var doc = typeof document !== 'undefined' && document;

  if (doc) {
    var spy = null;
    var fragment = doc.createDocumentFragment();
    var div = doc.createElement('div');
    fragment.appendChild(div);
    var res = attempt_x_esm.call(fragment.childNodes, nativeFilter, function spyAssign(item) {
      spy = item;
      return item;
    });
    return res.threw === false && res.value && res.value.length === 1 && res.value[0] === div && spy === div;
  }

  return true;
};

var array_filter_x_esm_test6 = function test6() {
  var isStrict = function returnIsStrict() {
    /* eslint-disable-next-line babel/no-invalid-this */
    return true.constructor(this) === false;
  }();

  if (isStrict) {
    var spy = null;
    var res = attempt_x_esm.call([1], nativeFilter, function testThis() {
      /* eslint-disable-next-line babel/no-invalid-this */
      spy = typeof this === 'string';
    }, 'x');
    return res.threw === false && res.value && res.value.length === 0 && spy === true;
  }

  return true;
};

var array_filter_x_esm_test7 = function test7() {
  var spy = {};
  var fn = 'return nativeFilter.call("foo", function (_, __, context) {' + 'if (castBoolean(context) === false || typeof context !== "object") {' + 'spy.value = true;}});';
  /* eslint-disable-next-line no-new-func */

  var res = attempt_x_esm(Function('nativeFilter', 'spy', 'castBoolean', fn), nativeFilter, spy, true.constructor);
  return res.threw === false && res.value && res.value.length === 0 && spy.value !== true;
};

var array_filter_x_esm_isWorking = true.constructor(nativeFilter) && array_filter_x_esm_test1() && array_filter_x_esm_test2() && array_filter_x_esm_test3() && array_filter_x_esm_test4() && array_filter_x_esm_test5() && array_filter_x_esm_test6() && array_filter_x_esm_test7();

var array_filter_x_esm_patchedFilter = function patchedFilter() {
  return function filter(array, callBack
  /* , thisArg */
  ) {
    require_object_coercible_x_esm(array);
    var args = [assert_is_function_x_esm(callBack)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeFilter.apply(array, args);
  };
};

var array_filter_x_esm_implementation = function implementation() {
  return function filter(array, callBack
  /* , thisArg */
  ) {
    var object = to_object_x_esm(array); // If no callback function or if callback is not a callable function

    assert_is_function_x_esm(callBack);
    var iterable = split_if_boxed_bug_x_esm(object);
    var length = to_length_x_esm(iterable.length);
    /* eslint-disable-next-line prefer-rest-params,no-void */

    var thisArg = arguments.length > 2 ? arguments[2] : void 0;
    var noThis = typeof thisArg === 'undefined';
    var result = [];

    for (var i = 0; i < length; i += 1) {
      if (i in iterable) {
        var item = iterable[i];

        if (noThis ? callBack(item, i, object) : callBack.call(thisArg, item, i, object)) {
          result[result.length] = item;
        }
      }
    }

    return result;
  };
};
/**
 * This method creates a new array with all elements that pass the test
 * implemented by the provided function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callBack - Function is a predicate, to test each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @throws {TypeError} If array is null or undefined.
 * @throws {TypeError} If callBack is not a function.
 * @returns {Array} A new array with the elements that pass the test.
 */


var $filter = array_filter_x_esm_isWorking ? array_filter_x_esm_patchedFilter() : array_filter_x_esm_implementation();
/* harmony default export */ var array_filter_x_esm = ($filter);


// CONCATENATED MODULE: ./node_modules/get-own-property-symbols-x/dist/get-own-property-symbols-x.esm.js



var nativeGOPS = {}.constructor.getOwnPropertySymbols;
var get_own_property_symbols_x_esm_isWorking;

if (has_symbol_support_x_esm && nativeGOPS && typeof nativeGOPS === 'function') {
  /* eslint-disable-next-line compat/compat */
  var get_own_property_symbols_x_esm_symbol = Symbol('');
  var get_own_property_symbols_x_esm_testObj = {
    a: 1
  };
  get_own_property_symbols_x_esm_testObj[get_own_property_symbols_x_esm_symbol] = 2;
  var get_own_property_symbols_x_esm_r = attempt_x_esm(nativeGOPS, get_own_property_symbols_x_esm_testObj);
  get_own_property_symbols_x_esm_isWorking = get_own_property_symbols_x_esm_r.threw === false && get_own_property_symbols_x_esm_r.value && get_own_property_symbols_x_esm_r.value.length === 1 && get_own_property_symbols_x_esm_r.value[0] === get_own_property_symbols_x_esm_symbol;
}
/**
 * This method creates an array of all symbol properties found directly upon a
 * given object.
 *
 * @param {object} obj - The object whose symbol properties are to be returned.
 * @throws {TypeError} If target is null or undefined.
 * @returns {Array} An array of all symbol properties found directly upon the
 *  given object.
 */


var get_own_property_symbols_x_esm_getOwnPropertySymbols = function getOwnPropertySymbols(obj) {
  var object = to_object_x_esm(obj);
  return get_own_property_symbols_x_esm_isWorking ? nativeGOPS(object) : [];
};

/* harmony default export */ var get_own_property_symbols_x_esm = (get_own_property_symbols_x_esm_getOwnPropertySymbols);


// CONCATENATED MODULE: ./node_modules/get-own-enumerable-property-symbols-x/dist/get-own-enumerable-property-symbols-x.esm.js
function get_own_enumerable_property_symbols_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }





/**
 * This method returns only the enumerable own property symbols of an object.
 *
 * @param {object} target - The target.
 * @throws {TypeError} - If target is null or undefined.
 * @returns {Array} The enumerable own property symbols.
 */

var get_own_enumerable_property_symbols_x_esm_getOwnEnumerablePropertySymbols = function getOwnEnumerablePropertySymbols(target) {
  var _this = this;

  var object = to_object_x_esm(target);
  return array_filter_x_esm(get_own_property_symbols_x_esm(object), function (symbol) {
    get_own_enumerable_property_symbols_x_esm_newArrowCheck(this, _this);

    return property_is_enumerable_x_esm(object, symbol);
  }.bind(this));
};

/* harmony default export */ var get_own_enumerable_property_symbols_x_esm = (get_own_enumerable_property_symbols_x_esm_getOwnEnumerablePropertySymbols);


// CONCATENATED MODULE: ./node_modules/get-own-enumerable-keys-x/dist/get-own-enumerable-keys-x.esm.js



var concat = [].concat;
/**
 * This method returns only the enumerable own keys of an object.
 *
 * @param {object} target - The target.
 * @throws {TypeError} - If target is null or undefined.
 * @returns {Array} The enumerable own keys.
 */

var get_own_enumerable_keys_x_esm_getOwnNonEnumerableKeys = function getOwnNonEnumerableKeys(target) {
  var object = to_object_x_esm(target);
  return concat.call(object_keys_x_esm(object), get_own_enumerable_property_symbols_x_esm(object));
};

/* harmony default export */ var get_own_enumerable_keys_x_esm = (get_own_enumerable_keys_x_esm_getOwnNonEnumerableKeys);


// CONCATENATED MODULE: ./node_modules/object-define-properties-x/dist/object-define-properties-x.esm.js





var object_define_properties_x_esm_defineProperty = object_define_property_x_esm;
/**
 * This method defines new or modifies existing properties directly on an
 * object, returning the object.
 *
 * @param {object} object - The object on which to define or modify properties.
 * @param {object} properties - An object whose own enumerable properties
 *  constitute descriptors for the
 * properties to be defined or modified.
 * @returns {object} The object that was passed to the function.
 */

var object_define_properties_x_esm_defineProperties = function defineProperties(object, properties) {
  assert_is_object_x_esm(object);
  var props = to_object_x_esm(properties);
  array_for_each_x_esm(get_own_enumerable_keys_x_esm(props), function defineProp(property) {
    if (property !== '__proto__') {
      object_define_property_x_esm(object, property, props[property]);
    }
  });
  return object;
};

/* harmony default export */ var object_define_properties_x_esm = (object_define_properties_x_esm_defineProperties);


// CONCATENATED MODULE: ./node_modules/is-integer-x/dist/is-integer-x.esm.js


/**
 * This method determines whether the passed value is an integer.
 *
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean} A Boolean indicating whether or not the given value is an integer.
 */

var is_integer_x_esm_isInteger = function isInteger(value) {
  return is_finite_x_esm(value) && to_integer_x_esm(value) === value;
};

/* harmony default export */ var is_integer_x_esm = (is_integer_x_esm_isInteger);


// CONCATENATED MODULE: ./node_modules/is-safe-integer-x/dist/is-safe-integer-x.esm.js

var is_safe_integer_x_esm_MAX_SAFE_INTEGER = 9007199254740991;
var MIN_SAFE_INTEGER = -is_safe_integer_x_esm_MAX_SAFE_INTEGER;
/**
 * This method determines whether the passed value is a safe integer.
 *
 * Can be exactly represented as an IEEE-754 double precision number, and
 * whose IEEE-754 representation cannot be the result of rounding any other
 * integer to fit the IEEE-754 representation.
 *
 * @param {*} value - The value to be tested for being a safe integer.
 * @returns {boolean} A Boolean indicating whether or not the given value is a
 *  safe integer.
 */

var is_safe_integer_x_esm_isSafeInteger = function isSafeInteger(value) {
  return is_integer_x_esm(value) && value >= MIN_SAFE_INTEGER && value <= is_safe_integer_x_esm_MAX_SAFE_INTEGER;
};

/* harmony default export */ var is_safe_integer_x_esm = (is_safe_integer_x_esm_isSafeInteger);


// CONCATENATED MODULE: ./node_modules/is-length-x/dist/is-length-x.esm.js

/**
 * This method checks if `value` is a valid array-like length.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */

var is_length_x_esm_isLength = function isLength(value) {
  return is_safe_integer_x_esm(value) && value >= 0;
};

/* harmony default export */ var is_length_x_esm = (is_length_x_esm_isLength);


// CONCATENATED MODULE: ./node_modules/is-array-like-x/dist/is-array-like-x.esm.js



/**
 * Checks if value is array-like. A value is considered array-like if it's
 * not a function and has a `length` that's an integer greater than or
 * equal to 0 and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @param {*} value - The object to be tested.
 */

var is_array_like_x_esm_isArrayLike = function isArrayLike(value) {
  return is_nil_x_esm(value) === false && is_function_x_esm(value, true) === false && is_length_x_esm(value.length);
};

/* harmony default export */ var is_array_like_x_esm = (is_array_like_x_esm_isArrayLike);


// CONCATENATED MODULE: ./node_modules/is-surrogate-pair-x/dist/is-surrogate-pair-x.esm.js

var is_surrogate_pair_x_esm_ref = '',
    charCodeAt = is_surrogate_pair_x_esm_ref.charCodeAt;
/**
 * Tests if the two character arguments combined are a valid UTF-16
 * surrogate pair.
 *
 * @param {*} char1 - The character combination, or if `char2` is supplied then
 *  the first character of a suspected surrogate pair.
 * @param {*} [char2] - The second character of a suspected surrogate pair.
 * @returns {boolean} Returns true if the two characters create a valid
 *  'UTF-16' surrogate pair; otherwise false.
 */

var is_surrogate_pair_x_esm_isSurrogatePair = function isSurrogatePair(char1, char2) {
  var argsLength = arguments.length;

  if (argsLength < 1) {
    return false;
  }

  var first;
  var second;

  if (argsLength === 1) {
    if (is_string_default()(char1) && char1.length === 2) {
      first = charCodeAt.call(char1, 0);
      second = charCodeAt.call(char1, 1);
    } else {
      return false;
    }
  } else if (argsLength > 1) {
    if (is_string_default()(char1) === false || char1.length !== 1 || is_string_default()(char2) === false || char2.length !== 1) {
      return false;
    }

    first = charCodeAt.call(char1, 0);
    second = charCodeAt.call(char2, 0);
  }

  return first >= 0xd800 && first <= 0xdbff && second >= 0xdc00 && second <= 0xdfff;
};

/* harmony default export */ var is_surrogate_pair_x_esm = (is_surrogate_pair_x_esm_isSurrogatePair);


// CONCATENATED MODULE: ./node_modules/same-value-x/dist/same-value-x.esm.js

/**
 * This method is the comparison abstract operation SameValue(x, y), where x
 * and y are ECMAScript language values, produces true or false.
 *
 * @param {*} [value1] - The first value to compare.
 * @param {*} [value2] - The second value to compare.
 * @returns {boolean} A Boolean indicating whether or not the two arguments are
 *  the same value.
 */

var same_value_x_esm_sameValue = function sameValue(value1, value2) {
  if (value1 === 0 && value2 === 0) {
    return 1 / value1 === 1 / value2;
  }

  if (value1 === value2) {
    return true;
  }

  return is_nan_x_esm(value1) && is_nan_x_esm(value2);
};

/* harmony default export */ var same_value_x_esm = (same_value_x_esm_sameValue);


// CONCATENATED MODULE: ./node_modules/same-value-zero-x/dist/same-value-zero-x.esm.js

/**
 * This method determines whether two values are the same value.
 * SameValueZero differs from SameValue (`Object.is`) only in its treatment
 * of +0 and -0.
 *
 * @param {*} [x] - The first value to compare.
 * @param {*} [y] - The second value to compare.
 * @returns {boolean} A Boolean indicating whether or not the two arguments
 * are the same value.
 */

var same_value_zero_x_esm_sameValueZero = function sameValueZero(x, y) {
  return x === y || same_value_x_esm(x, y);
};

/* harmony default export */ var same_value_zero_x_esm = (same_value_zero_x_esm_sameValueZero);


// CONCATENATED MODULE: ./node_modules/find-index-x/dist/find-index-x.esm.js
var find_index_x_esm_this = undefined;

function find_index_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }






var pFindIndex = typeof Array.prototype.findIndex === 'function' && Array.prototype.findIndex;
var find_index_x_esm_isWorking;

if (pFindIndex) {
  var testArr = [];
  testArr.length = 2;
  testArr[1] = 1;
  var find_index_x_esm_res = attempt_x_esm.call(testArr, pFindIndex, function (item, idx) {
    find_index_x_esm_newArrowCheck(this, find_index_x_esm_this);

    return idx === 0;
  }.bind(undefined));
  find_index_x_esm_isWorking = find_index_x_esm_res.threw === false && find_index_x_esm_res.value === 0;

  if (find_index_x_esm_isWorking) {
    find_index_x_esm_res = attempt_x_esm.call(1, pFindIndex, function (item, idx) {
      find_index_x_esm_newArrowCheck(this, find_index_x_esm_this);

      return idx === 0;
    }.bind(undefined));
    find_index_x_esm_isWorking = find_index_x_esm_res.threw === false && find_index_x_esm_res.value === -1;
  }

  if (find_index_x_esm_isWorking) {
    find_index_x_esm_isWorking = attempt_x_esm.call([], pFindIndex).threw;
  }

  if (find_index_x_esm_isWorking) {
    find_index_x_esm_res = attempt_x_esm.call('abc', pFindIndex, function (item) {
      find_index_x_esm_newArrowCheck(this, find_index_x_esm_this);

      return item === 'c';
    }.bind(undefined));
    find_index_x_esm_isWorking = find_index_x_esm_res.threw === false && find_index_x_esm_res.value === 2;
  }

  if (find_index_x_esm_isWorking) {
    find_index_x_esm_res = attempt_x_esm.call(function getArgs() {
      /* eslint-disable-next-line prefer-rest-params */
      return arguments;
    }('a', 'b', 'c'), pFindIndex, function (item) {
      find_index_x_esm_newArrowCheck(this, find_index_x_esm_this);

      return item === 'c';
    }.bind(undefined));
    find_index_x_esm_isWorking = find_index_x_esm_res.threw === false && find_index_x_esm_res.value === 2;
  }
}
/**
 * Like `findIndex`, this method returns an index in the array, if an element
 * in the array satisfies the provided testing function. Otherwise -1 is returned.
 *
 * @param {Array} array - The array to search.
 * @throws {TypeError} If array is `null` or `undefined`-.
 * @param {Function} callback - Function to execute on each value in the array,
 *  taking three arguments: `element`, `index` and `array`.
 * @throws {TypeError} If `callback` is not a function.
 * @param {*} [thisArg] - Object to use as `this` when executing `callback`.
 * @returns {number} Returns index of positively tested element, otherwise -1.
 */


var findIdx;

if (find_index_x_esm_isWorking) {
  findIdx = function findIndex(array, callback) {
    var args = [callback];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return pFindIndex.apply(array, args);
  };
} else {
  findIdx = function findIndex(array, callback) {
    var object = to_object_x_esm(array);
    assert_is_function_x_esm(callback);
    var iterable = split_if_boxed_bug_x_esm(object);
    var length = to_length_x_esm(iterable.length);

    if (length < 1) {
      return -1;
    }

    var thisArg;

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      thisArg = arguments[2];
    }

    var index = 0;

    while (index < length) {
      if (callback.call(thisArg, iterable[index], index, object)) {
        return index;
      }

      index += 1;
    }

    return -1;
  };
}

var fi = findIdx;
/* harmony default export */ var find_index_x_esm = (fi);


// CONCATENATED MODULE: ./node_modules/calculate-from-index-x/dist/calculate-from-index-x.esm.js





var calculate_from_index_x_esm_getMax = function getMax(a, b) {
  return a >= b ? a : b;
};
/**
 * This method calculates a fromIndex of a given value for an array.
 *
 * @param {Array} array - * The array on which to calculate the starting index.
 * @throws {TypeError} If array is null or undefined.
 * @param {number} fromIndex - * The position in this array at which to begin. A
 *  negative value gives the index of array.length + fromIndex by asc.
 * @returns {number} The calculated fromIndex. Default is 0.
 */


var calculate_from_index_x_esm_calcFromIndex = function calcFromIndex(array, fromIndex) {
  var object = to_object_x_esm(array);

  if (is_array_like_x_esm(object) === false) {
    return 0;
  }

  var index = to_integer_x_esm(fromIndex);
  return index >= 0 ? index : calculate_from_index_x_esm_getMax(0, to_length_x_esm(object.length) + index);
};

/* harmony default export */ var calculate_from_index_x_esm = (calculate_from_index_x_esm_calcFromIndex);


// CONCATENATED MODULE: ./node_modules/index-of-x/dist/index-of-x.esm.js
function index_of_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }











/** @type {BooleanConstructor} */

var index_of_x_esm_castBoolean = true.constructor;
var pIndexOf = typeof Array.prototype.indexOf === 'function' && Array.prototype.indexOf;
var index_of_x_esm_isWorking;

if (pIndexOf) {
  var index_of_x_esm_res = attempt_x_esm.call([0, 1], pIndexOf, 1, 2);
  index_of_x_esm_isWorking = index_of_x_esm_res.threw === false && index_of_x_esm_res.value === -1;

  if (index_of_x_esm_isWorking) {
    index_of_x_esm_res = attempt_x_esm.call([0, 1], pIndexOf, 1);
    index_of_x_esm_isWorking = index_of_x_esm_res.threw === false && index_of_x_esm_res.value === 1;
  }

  if (index_of_x_esm_isWorking) {
    index_of_x_esm_res = attempt_x_esm.call([0, -0], pIndexOf, -0);
    index_of_x_esm_isWorking = index_of_x_esm_res.threw === false && index_of_x_esm_res.value === 0;
  }

  if (index_of_x_esm_isWorking) {
    var index_of_x_esm_testArr = [];
    index_of_x_esm_testArr.length = 2;
    /* eslint-disable-next-line no-void */

    index_of_x_esm_testArr[1] = void 0;
    /* eslint-disable-next-line no-void */

    index_of_x_esm_res = attempt_x_esm.call(index_of_x_esm_testArr, pIndexOf, void 0);
    index_of_x_esm_isWorking = index_of_x_esm_res.threw === false && index_of_x_esm_res.value === 1;
  }

  if (index_of_x_esm_isWorking) {
    index_of_x_esm_res = attempt_x_esm.call('abc', pIndexOf, 'c');
    index_of_x_esm_isWorking = index_of_x_esm_res.threw === false && index_of_x_esm_res.value === 2;
  }

  if (index_of_x_esm_isWorking) {
    index_of_x_esm_res = attempt_x_esm.call(function getArgs() {
      /* eslint-disable-next-line prefer-rest-params */
      return arguments;
    }('a', 'b', 'c'), pIndexOf, 'c');
    index_of_x_esm_isWorking = index_of_x_esm_res.threw === false && index_of_x_esm_res.value === 2;
  }
}

if (index_of_x_esm_isWorking !== true) {
  pIndexOf = function $pIndexOf(searchElement) {
    /* eslint-disable-next-line babel/no-invalid-this */
    var length = to_length_x_esm(this.length);

    if (length < 1) {
      return -1;
    }
    /* eslint-disable-next-line prefer-rest-params */


    var i = arguments[1];

    while (i < length) {
      /* eslint-disable-next-line babel/no-invalid-this */
      if (i in this && this[i] === searchElement) {
        return i;
      }

      i += 1;
    }

    return -1;
  };
}
/**
 * This method returns an index in the array, if an element in the array
 * satisfies the provided testing function. Otherwise -1 is returned.
 *
 * @private
 * @param {Array} array - The array to search.
 * @param {*} searchElement - Element to locate in the array.
 * @param {number} fromIndex - The index to start the search at.
 * @param {Function} extendFn - The comparison function to use.
 * @returns {number} Returns index of found element, otherwise -1.
 */


var findIdxFrom = function findIndexFrom(array, searchElement, fromIndex, extendFn) {
  var fIdx = fromIndex;
  var length = to_length_x_esm(array.length);

  while (fIdx < length) {
    if (fIdx in array && extendFn(array[fIdx], searchElement)) {
      return fIdx;
    }

    fIdx += 1;
  }

  return -1;
}; // eslint-disable jsdoc/check-param-names
// noinspection JSCommentMatchesSignature

/**
 * This method returns the first index at which a given element can be found
 * in the array, or -1 if it is not present.
 *
 * @param {Array} array - The array to search.
 * @throws {TypeError} If `array` is `null` or `undefined`.
 * @param {*} searchElement - Element to locate in the `array`.
 * @param {number} [fromIndex] - The index to start the search at. If the
 *  index is greater than or equal to the array's length, -1 is returned,
 *  which means the array will not be searched. If the provided index value is
 *  a negative number, it is taken as the offset from the end of the array.
 *  Note: if the provided index is negative, the array is still searched from
 *  front to back. If the calculated index is less than 0, then the whole
 *  array will be searched. Default: 0 (entire array is searched).
 * @param {string} [extend] - Extension type: `SameValue` or `SameValueZero`.
 * @returns {number} Returns index of found element, otherwise -1.
 */
// eslint-enable jsdoc/check-param-names


var index_of_x_esm_indexOf = function indexOf(array, searchElement) {
  var _this = this;

  var object = to_object_x_esm(array);
  var iterable = split_if_boxed_bug_x_esm(object);
  var length = to_length_x_esm(iterable.length);

  if (length < 1) {
    return -1;
  }

  var argLength = arguments.length;
  /* eslint-disable-next-line prefer-rest-params */

  var extend = argLength > 2 && argLength > 3 ? arguments[3] : arguments[2];
  var extendFn;

  if (is_string_default()(extend)) {
    extend = extend.toLowerCase();

    if (extend === 'samevalue') {
      extendFn = same_value_x_esm;
    } else if (extend === 'samevaluezero') {
      extendFn = same_value_zero_x_esm;
    }
  }

  var fromIndex = 0;

  if (extendFn && (searchElement === 0 || is_nan_x_esm(searchElement))) {
    if (argLength > 3) {
      /* eslint-disable-next-line prefer-rest-params */
      fromIndex = calculate_from_index_x_esm(iterable, arguments[2]);

      if (fromIndex >= length) {
        return -1;
      }

      if (fromIndex < 0) {
        fromIndex = 0;
      }
    }

    if (fromIndex > 0) {
      return findIdxFrom(iterable, searchElement, fromIndex, extendFn);
    }

    return find_index_x_esm(iterable, function (element, index) {
      index_of_x_esm_newArrowCheck(this, _this);

      return index in iterable && extendFn(searchElement, element);
    }.bind(this));
  }

  if (argLength > 3 || argLength > 2 && index_of_x_esm_castBoolean(extendFn) === false) {
    /* eslint-disable-next-line prefer-rest-params */
    fromIndex = calculate_from_index_x_esm(iterable, arguments[2]);

    if (fromIndex >= length) {
      return -1;
    }

    if (fromIndex < 0) {
      fromIndex = 0;
    }
  }

  return pIndexOf.call(iterable, searchElement, fromIndex);
};

/* harmony default export */ var index_of_x_esm = (index_of_x_esm_indexOf);


// CONCATENATED MODULE: ./node_modules/array-slice-x/dist/array-slice-x.esm.js






var nativeSlice = [].slice;
var resultArray = nativeSlice ? attempt_x_esm.call([1, 2, 3], nativeSlice, 1, 2) : null;
var failArray = resultArray ? resultArray.threw || is_array_x_esm(resultArray.value) === false || resultArray.value.length !== 1 || resultArray.value[0] !== 2 : false;
var resultString = nativeSlice ? attempt_x_esm.call('abc', nativeSlice, 1, 2) : null;
var failString = resultString ? resultString.threw || is_array_x_esm(resultString.value) === false || resultString.value.length !== 1 || resultString.value[0] !== 'b' : false;
var array_slice_x_esm_doc = typeof document !== 'undefined' && document;
var resultDocElement = nativeSlice && array_slice_x_esm_doc ? attempt_x_esm.call(array_slice_x_esm_doc.documentElement, nativeSlice).threw : null;
var failDOM = resultDocElement ? resultDocElement.threw : false;
/**
 * The slice() method returns a shallow copy of a portion of an array into a new
 * array object selected from begin to end (end not included). The original
 * array will not be modified.
 *
 * @param {Array|object} array - The array to slice.
 * @param {number} [start] - Zero-based index at which to begin extraction.
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. Running slice(-2) extracts the last two elements in the sequence.
 *  If begin is undefined, slice begins from index 0.
 * @param {number} [end] - Zero-based index before which to end extraction.
 *  Slice extracts up to but not including end. For example, slice(1,4)
 *  extracts the second element through the fourth element (elements indexed
 *  1, 2, and 3).
 *  A negative index can be used, indicating an offset from the end of the
 *  sequence. Running slice(2,-1) extracts the third element through the second-to-last
 *  element in the sequence.
 *  If end is omitted, slice extracts through the end of the
 *  sequence (arr.length).
 *  If end is greater than the length of the sequence, slice extracts through
 *  the end of the sequence (arr.length).
 * @returns {Array} A new array containing the extracted elements.
 */

var array_slice_x_esm_slice = function slice(array, start, end) {
  var object = to_object_x_esm(array);

  if (failArray || failDOM && is_array_x_esm(object) === false || failString && is_string_default()(object) || is_arguments_default()(object)) {
    return array_like_slice_x_esm(object, start, end);
  }
  /* eslint-disable-next-line prefer-rest-params */


  return nativeSlice.apply(object, array_like_slice_x_esm(arguments, 1));
};

/* harmony default export */ var array_slice_x_esm = (array_slice_x_esm_slice);


// CONCATENATED MODULE: ./node_modules/array-reduce-right-x/dist/array-reduce-right-x.esm.js
var array_reduce_right_x_esm_this = undefined;

function array_reduce_right_x_esm_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { array_reduce_right_x_esm_typeof = function _typeof(obj) { return typeof obj; }; } else { array_reduce_right_x_esm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return array_reduce_right_x_esm_typeof(obj); }

function array_reduce_right_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }






var ArrayCtr = [].constructor;
var array_reduce_right_x_esm_castObject = {}.constructor;
var nativeReduceR = typeof ArrayCtr.prototype.reduceRight === 'function' && ArrayCtr.prototype.reduceRight; // ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight

var array_reduce_right_x_esm_isWorking;

if (nativeReduceR) {
  array_reduce_right_x_esm_isWorking = attempt_x_esm.call([], nativeReduceR, function (acc) {
    array_reduce_right_x_esm_newArrowCheck(this, array_reduce_right_x_esm_this);

    return acc;
  }.bind(undefined)).threw;
  var array_reduce_right_x_esm_res;

  if (array_reduce_right_x_esm_isWorking) {
    array_reduce_right_x_esm_res = attempt_x_esm.call(array_reduce_right_x_esm_castObject('abc'), nativeReduceR, function (acc, c) {
      array_reduce_right_x_esm_newArrowCheck(this, array_reduce_right_x_esm_this);

      return acc + c;
    }.bind(undefined), 'x');
    array_reduce_right_x_esm_isWorking = array_reduce_right_x_esm_res.threw === false && array_reduce_right_x_esm_res.value === 'xcba';
  }

  if (array_reduce_right_x_esm_isWorking) {
    array_reduce_right_x_esm_res = attempt_x_esm.call(function getArgs() {
      /* eslint-disable-next-line prefer-rest-params */
      return arguments;
    }(1, 2, 3), nativeReduceR, function (acc, arg) {
      array_reduce_right_x_esm_newArrowCheck(this, array_reduce_right_x_esm_this);

      return acc + arg;
    }.bind(undefined), 1);
    array_reduce_right_x_esm_isWorking = array_reduce_right_x_esm_res.threw === false && array_reduce_right_x_esm_res.value === 7;
  }

  if (array_reduce_right_x_esm_isWorking) {
    array_reduce_right_x_esm_res = attempt_x_esm.call({
      0: 1,
      1: 2,
      3: 3,
      4: 4,
      length: 4
    }, nativeReduceR, function (acc, arg) {
      array_reduce_right_x_esm_newArrowCheck(this, array_reduce_right_x_esm_this);

      return acc + arg;
    }.bind(undefined), 2);
    array_reduce_right_x_esm_isWorking = array_reduce_right_x_esm_res.threw === false && array_reduce_right_x_esm_res.value === 8;
  }

  if (array_reduce_right_x_esm_isWorking) {
    var array_reduce_right_x_esm_doc = typeof document !== 'undefined' && document;

    if (array_reduce_right_x_esm_doc) {
      var array_reduce_right_x_esm_fragment = array_reduce_right_x_esm_doc.createDocumentFragment();
      var array_reduce_right_x_esm_div = array_reduce_right_x_esm_doc.createElement('div');
      array_reduce_right_x_esm_fragment.appendChild(array_reduce_right_x_esm_div);
      array_reduce_right_x_esm_res = attempt_x_esm.call(array_reduce_right_x_esm_fragment.childNodes, nativeReduceR, function (acc, node) {
        array_reduce_right_x_esm_newArrowCheck(this, array_reduce_right_x_esm_this);

        acc[acc.length] = node;
        return acc;
      }.bind(undefined), []);
      array_reduce_right_x_esm_isWorking = array_reduce_right_x_esm_res.threw === false && array_reduce_right_x_esm_res.value.length === 1 && array_reduce_right_x_esm_res.value[0] === array_reduce_right_x_esm_div;
    }
  }

  if (array_reduce_right_x_esm_isWorking) {
    array_reduce_right_x_esm_res = attempt_x_esm.call('ab', nativeReduceR, function (_, __, ___, list) {
      array_reduce_right_x_esm_newArrowCheck(this, array_reduce_right_x_esm_this);

      return list;
    }.bind(undefined));
    array_reduce_right_x_esm_isWorking = array_reduce_right_x_esm_res.threw === false && array_reduce_right_x_esm_typeof(array_reduce_right_x_esm_res.value) === 'object';
  }
}
/**
 * This method applies a function against an accumulator and each value of the
 * array (from right-to-left) to reduce it to a single value..
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callBack - Function to execute for each element.
 * @param {*} [initialValue] - Value to use as the first argument to the first
 *  call of the callback. If no initial value is supplied, the first element in
 *  the array will be used. Calling reduceRight on an empty array without an initial
 *  value is an error.
 * @throws {TypeError} If array is null or undefined.
 * @throws {TypeError} If callBack is not a function.
 * @throws {TypeError} If called on an empty array without an initial value.
 * @returns {*} The value that results from the reduction.
 */


var $reduceRight;

if (nativeReduceR && array_reduce_right_x_esm_isWorking) {
  $reduceRight = function reduceRight(array, callBack
  /* , initialValue */
  ) {
    var args = [callBack];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeReduceR.apply(array, args);
  };
} else {
  $reduceRight = function reduceRight(array, callBack
  /* , initialValue */
  ) {
    var object = to_object_x_esm(array); // If no callback function or if callback is not a callable function

    assert_is_function_x_esm(callBack);
    var iterable = split_if_boxed_bug_x_esm(object);
    var length = to_length_x_esm(iterable.length);
    var argsLength = arguments.length; // no value to return if no initial value, empty array

    if (length === 0 && argsLength < 3) {
      throw new TypeError('reduceRight of empty array with no initial value');
    }

    var result;
    var i = length - 1;

    if (argsLength > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      result = arguments[2];
    } else {
      do {
        if (i in iterable) {
          result = iterable[i];
          i -= 1;
          break;
        } // if array contains no values, no initial value to return


        i -= 1;

        if (i < 0) {
          throw new TypeError('reduceRight of empty array with no initial value');
        }
      } while (true);
      /* eslint-disable-line no-constant-condition */

    }

    while (i >= 0) {
      if (i in iterable) {
        result = callBack(result, iterable[i], i, object);
      }

      i -= 1;
    }

    return result;
  };
}

var rr = $reduceRight;
/* harmony default export */ var array_reduce_right_x_esm = (rr);


// CONCATENATED MODULE: ./node_modules/big-counter-x/dist/big-counter-x.esm.js



/** @type {BooleanConstructor} */

var big_counter_x_esm_castBoolean = true.constructor;

var reducer = function _reducer(acc, digit) {
  return acc + digit;
};
/**
 * Serialise the counter´s current value.
 *
 * @private
 * @this BigCounter
 * @returns {string} A string representation of an integer.
 */


var counterToString = function ToString() {
  return array_reduce_right_x_esm(this.count, reducer, '');
};
/**
 * Incremental integer counter. Counts from `0` to very big integers.
 * Javascript´s number type allows you to count in integer steps
 * from `0` to `9007199254740991`. As of ES5, Strings can contain
 * approximately 65000 characters and ES6 is supposed to handle
 * the `MAX_SAFE_INTEGER` (though I don´t believe any environments supports
 * this). This counter represents integer values as strings and can therefore
 * count in integer steps from `0` to the maximum string length (that´s some
 * 65000 digits). In the lower range, upto `9007199254740991`, the strings can
 * be converted to safe Javascript integers `Number(value)` or `+value`. This
 * counter is great for any applications that need a really big count
 * represented as a string, (an ID string).
 *
 * @class
 * @property {Array<number>} count - A representation of a big number.
 */


var big_counter_x_esm_BigCounter = function BigCounter() {
  if (big_counter_x_esm_castBoolean(this) === false || this instanceof BigCounter === false) {
    throw new TypeError('Constructor BigCounter requires "new"');
  }

  object_define_properties_x_esm(this, {
    count: {
      value: [0]
    }
  });
};

object_define_properties_x_esm(big_counter_x_esm_BigCounter.prototype, {
  /**
   * Gets the counter´s current value.
   *
   * @function
   * @returns {string} A string representation of an integer.
   */
  get: {
    value: counterToString
  },

  /**
   * Increments the counter´s value by `1`.
   *
   * @function
   * @returns {object} The counter object.
   */
  next: {
    value: function next() {
      var clone = array_slice_x_esm(this.count);
      this.count.length = 0;
      var length = clone.length;
      var howMany = length > 0 ? length : 1;
      var carry = 0;
      var index = 0;

      while (index < howMany || carry) {
        var zi = carry + (clone[index] || 0) + (index === 0);
        this.count[this.count.length] = zi % 10;
        /* eslint-disable-next-line no-bitwise */

        carry = zi / 10 >> 0; // floor

        index += 1;
      }

      return this;
    }
  },

  /**
   * Resets the counter back to `0`.
   *
   * @function
   * @returns {object} The counter object.
   */
  reset: {
    value: function reset() {
      this.count.length = 1;
      this.count[0] = 0;
      return this;
    }
  },

  /**
   * Gets the counter´s current value.
   *
   * @function
   * @returns {string} A string representation of an integer.
   */
  toJSON: {
    value: counterToString
  },

  /**
   * Gets the counter´s current value.
   *
   * @function
   * @returns {string} A string representation of an integer.
   */
  toString: {
    value: counterToString
  },

  /**
   * Gets the counter´s current value.
   *
   * @function
   * @returns {string} A string representation of an integer.
   */
  valueOf: {
    value: counterToString
  }
});
/* harmony default export */ var big_counter_x_esm = (big_counter_x_esm_BigCounter);


// CONCATENATED MODULE: ./node_modules/is-map-x/dist/is-map-x.esm.js





var is_map_x_esm_test1 = function test1() {
  return attempt_x_esm(function createMap() {
    /* eslint-disable-next-line compat/compat */
    return new Map();
  });
};

var is_map_x_esm_getGetter = function getGetter() {
  if (typeof Map === 'function') {
    /* eslint-disable-next-line compat/compat */
    var descriptor = object_get_own_property_descriptor_x_esm(Map.prototype, 'size');

    if (descriptor && typeof descriptor.get === 'function') {
      var resTest1 = is_map_x_esm_test1();

      if (resTest1.threw === false && is_object_like_x_esm(resTest1.value)) {
        var res = attempt_x_esm.call(resTest1.value, descriptor.get);

        if (res.threw === false && is_length_x_esm(res.value)) {
          return descriptor.get;
        }
      }
    }
  }
  /* eslint-disable-next-line no-void */


  return void 0;
};

var getSize = is_map_x_esm_getGetter();
/**
 * Determine if an `object` is a `Map`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Map`,
 *  else `false`.
 */

var is_map_x_esm_isMap = function isMap(object) {
  if (!getSize || is_object_like_x_esm(object) === false) {
    return false;
  }

  var result = attempt_x_esm.call(object, getSize);
  return result.threw === false && is_length_x_esm(result.value);
};

/* harmony default export */ var is_map_x_esm = (is_map_x_esm_isMap);


// CONCATENATED MODULE: ./node_modules/is-set-x/dist/is-set-x.esm.js





var is_set_x_esm_test1 = function test1() {
  return attempt_x_esm(function createSet() {
    /* eslint-disable-next-line compat/compat */
    return new Set();
  });
};

var is_set_x_esm_getGetter = function getGetter() {
  if (typeof Set === 'function') {
    /* eslint-disable-next-line compat/compat */
    var descriptor = object_get_own_property_descriptor_x_esm(Set.prototype, 'size');

    if (descriptor && typeof descriptor.get === 'function') {
      var resTest1 = is_set_x_esm_test1();

      if (resTest1.threw === false && is_object_like_x_esm(resTest1.value)) {
        var res = attempt_x_esm.call(resTest1.value, descriptor.get);

        if (res.threw === false && is_length_x_esm(res.value)) {
          return descriptor.get;
        }
      }
    }
  }
  /* eslint-disable-next-line no-void */


  return void 0;
};

var is_set_x_esm_getSize = is_set_x_esm_getGetter();
/**
 * Determine if an `object` is a `Set`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Set`,
 *  else `false`.
 */

var is_set_x_esm_isSet = function isSet(object) {
  if (!is_set_x_esm_getSize || is_object_like_x_esm(object) === false) {
    return false;
  }

  var result = attempt_x_esm.call(object, is_set_x_esm_getSize);
  return result.threw === false && is_length_x_esm(result.value);
};

/* harmony default export */ var is_set_x_esm = (is_set_x_esm_isSet);


// EXTERNAL MODULE: ./node_modules/is-boolean-object/index.js
var is_boolean_object = __webpack_require__(7);
var is_boolean_object_default = /*#__PURE__*/__webpack_require__.n(is_boolean_object);

// CONCATENATED MODULE: ./node_modules/array-some-x/dist/array-some-x.esm.js






var ns = [].some;
var nativeSome = typeof ns === 'function' && ns;

var array_some_x_esm_test1 = function test1() {
  var spy = 0;
  var res = attempt_x_esm.call([1, 2], nativeSome, function spyAdd1(item) {
    spy += item;
    return false;
  });
  return res.threw === false && res.value === false && spy === 3;
};

var array_some_x_esm_test2 = function test2() {
  var spy = '';
  var res = attempt_x_esm.call({}.constructor('abc'), nativeSome, function spyAdd2(item, index) {
    spy += item;
    return index === 1;
  });
  return res.threw === false && res.value === true && spy === 'ab';
};

var array_some_x_esm_test3 = function test3() {
  var spy = 0;
  var res = attempt_x_esm.call(function getArgs() {
    /* eslint-disable-next-line prefer-rest-params */
    return arguments;
  }(1, 2, 3), nativeSome, function spyAdd3(item, index) {
    spy += item;
    return index === 2;
  });
  return res.threw === false && res.value === true && spy === 6;
};

var array_some_x_esm_test4 = function test4() {
  var spy = 0;
  var res = attempt_x_esm.call({
    0: 1,
    1: 2,
    3: 3,
    4: 4,
    length: 4
  }, nativeSome, function spyAdd4(item) {
    spy += item;
    return false;
  });
  return res.threw === false && res.value === false && spy === 6;
};

var array_some_x_esm_test5 = function test5() {
  var doc = typeof document !== 'undefined' && document;

  if (doc) {
    var spy = null;
    var fragment = doc.createDocumentFragment();
    var div = doc.createElement('div');
    fragment.appendChild(div);
    var res = attempt_x_esm.call(fragment.childNodes, nativeSome, function spyAssign(item) {
      spy = item;
      return item;
    });
    return res.threw === false && res.value === true && spy === div;
  }

  return true;
};

var array_some_x_esm_test6 = function test6() {
  var isStrict = function getIsStrict() {
    /* eslint-disable-next-line babel/no-invalid-this */
    return true.constructor(this) === false;
  }();

  if (isStrict) {
    var spy = null;
    var res = attempt_x_esm.call([1], nativeSome, function thisTest() {
      /* eslint-disable-next-line babel/no-invalid-this */
      spy = typeof this === 'string';
    }, 'x');
    return res.threw === false && res.value === false && spy === true;
  }

  return true;
};

var array_some_x_esm_test7 = function test7() {
  var spy = {};
  var fn = 'return nativeSome.call("foo", function (_, __, context) {' + 'if (castBoolean(context) === false || typeof context !== "object") {' + 'spy.value = true;}});';
  /* eslint-disable-next-line no-new-func */

  var res = attempt_x_esm(Function('nativeSome', 'spy', 'castBoolean', fn), nativeSome, spy, true.constructor);
  return res.threw === false && res.value === false && spy.value !== true;
};

var array_some_x_esm_isWorking = true.constructor(nativeSome) && array_some_x_esm_test1() && array_some_x_esm_test2() && array_some_x_esm_test3() && array_some_x_esm_test4() && array_some_x_esm_test5() && array_some_x_esm_test6() && array_some_x_esm_test7();

var array_some_x_esm_patchedSome = function patchedSome() {
  return function some(array, callBack
  /* , thisArg */
  ) {
    require_object_coercible_x_esm(array);
    var args = [assert_is_function_x_esm(callBack)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeSome.apply(array, args);
  };
}; // ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some


var array_some_x_esm_implementation = function implementation() {
  return function some(array, callBack
  /* , thisArg */
  ) {
    var object = to_object_x_esm(array); // If no callback function or if callback is not a callable function

    assert_is_function_x_esm(callBack);
    var iterable = split_if_boxed_bug_x_esm(object);
    var length = to_length_x_esm(iterable.length);
    /* eslint-disable-next-line prefer-rest-params,no-void */

    var thisArg = arguments.length > 2 ? arguments[2] : void 0;
    var noThis = typeof thisArg === 'undefined';

    for (var i = 0; i < length; i += 1) {
      if (i in iterable) {
        var item = iterable[i];

        if (noThis ? callBack(item, i, object) : callBack.call(thisArg, item, i, object)) {
          return true;
        }
      }
    }

    return false;
  };
};
/**
 * This method tests whether some element in the array passes the test
 * implemented by the provided function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callBack - Function to test for each element.
 * @param {*} [thisArg] - Value to use as this when executing callback.
 * @throws {TypeError} If array is null or undefined.
 * @throws {TypeError} If callBack is not a function.
 * @returns {boolean} `true` if the callback function returns a truthy value for
 *  any array element; otherwise, `false`.
 */


var $some = array_some_x_esm_isWorking ? array_some_x_esm_patchedSome() : array_some_x_esm_implementation();
/* harmony default export */ var array_some_x_esm = ($some);


// CONCATENATED MODULE: ./node_modules/get-prototype-of-x/dist/get-prototype-of-x.esm.js


/**
 * This method returns the prototype (i.e. The value of the internal [[Prototype]] property)
 * of the specified object.
 *
 * @function getPrototypeOf
 * @param {*} obj - The object whose prototype is to be returned.
 * @returns {object} The prototype of the given object. If there are no inherited properties, null is returned.
 */

var gpo;
gpo = {}.getPrototypeOf;

if (gpo) {
  try {
    gpo = gpo(Object) === {}.prototype && gpo;
  } catch (ignore) {
    gpo = null;
  }
}

if (gpo) {
  try {
    gpo(1);
  } catch (ignore) {
    /** @type {Function} */
    var $getPrototypeOf = gpo;

    gpo = function getPrototypeOf(obj) {
      return $getPrototypeOf(to_object_x_esm(obj));
    };
  }
} else {
  gpo = function getPrototypeOf(obj) {
    var object = to_object_x_esm(obj);
    /* eslint-disable-next-line no-proto */

    var proto = object.__proto__;

    if (proto || proto === null) {
      return proto;
    }

    if (is_function_x_esm(object.constructor)) {
      return object.constructor.prototype;
    }

    if (object instanceof Object) {
      return Object.prototype;
    }

    return null;
  };
}

var getPO = gpo;
/* harmony default export */ var get_prototype_of_x_esm = (getPO);


// CONCATENATED MODULE: ./node_modules/object-create-x/dist/object-create-x.esm.js
function object_create_x_esm_newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function object_create_x_esm_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { object_create_x_esm_typeof = function _typeof(obj) { return typeof obj; }; } else { object_create_x_esm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return object_create_x_esm_typeof(obj); }




/** @type {BooleanConstructor} */

var object_create_x_esm_castBoolean = true.constructor;
var nativeCreate = typeof Object.create === 'function' && Object.create;
var object_create_x_esm_isWorking;

if (nativeCreate) {
  var object_create_x_esm_res = attempt_x_esm(nativeCreate, null);
  object_create_x_esm_isWorking = object_create_x_esm_res.threw === false && object_create_x_esm_res.value && object_create_x_esm_typeof(object_create_x_esm_res.value) === 'object';

  if (object_create_x_esm_isWorking) {
    /* eslint-disable-next-line guard-for-in,no-restricted-syntax,no-unused-vars */
    // noinspection LoopStatementThatDoesntLoopJS
    for (var _ in object_create_x_esm_res.value) {
      object_create_x_esm_isWorking = false;
      break;
    }
  }

  if (object_create_x_esm_isWorking) {
    object_create_x_esm_res = attempt_x_esm(nativeCreate, null, {
      test: {
        value: true
      }
    });
    object_create_x_esm_isWorking = object_create_x_esm_res.threw === false && object_create_x_esm_res.value && object_create_x_esm_typeof(object_create_x_esm_res.value) === 'object' && object_create_x_esm_res.value.test === true;
  }

  if (object_create_x_esm_isWorking) {
    // Shape - superclass
    var Shape = function Shape() {
      // noinspection JSUnusedGlobalSymbols
      this.x = 0; // noinspection JSUnusedGlobalSymbols

      this.y = 0;
    }; // superclass method


    Shape.prototype.move = function move(x, y) {
      // noinspection JSUnusedGlobalSymbols
      this.x += x; // noinspection JSUnusedGlobalSymbols

      this.y += y;
      return 'Shape moved.';
    }; // Rectangle - subclass


    var Rectangle = function Rectangle() {
      Shape.call(this); // call super constructor.
    };

    object_create_x_esm_res = attempt_x_esm(nativeCreate, Shape.prototype);
    object_create_x_esm_isWorking = object_create_x_esm_res.threw === false && object_create_x_esm_res.value && object_create_x_esm_typeof(object_create_x_esm_res.value) === 'object';

    if (object_create_x_esm_isWorking) {
      // subclass extends superclass
      Rectangle.prototype = object_create_x_esm_res.value;
      Rectangle.prototype.constructor = Rectangle;
      var rect = new Rectangle();
      object_create_x_esm_isWorking = rect instanceof Rectangle;

      if (object_create_x_esm_isWorking) {
        object_create_x_esm_isWorking = rect instanceof Shape;
      }

      if (object_create_x_esm_isWorking) {
        object_create_x_esm_isWorking = rect.move(1, 1) === 'Shape moved.';
      }
    }
  }
}
/**
 * This method method creates a new object with the specified prototype object and properties.
 *
 * @param {*} prototype - The object which should be the prototype of the newly-created object.
 * @param {*} [properties] - If specified and not undefined, an object whose enumerable own properties
 * (that is, those properties defined upon itself and not enumerable properties along its prototype chain)
 * specify property descriptors to be added to the newly-created object, with the corresponding property names.
 * @throws {TypeError} If the properties parameter isn't null or an object.
 * @returns {boolean} A new object with the specified prototype object and properties.
 */


var $create;

if (object_create_x_esm_isWorking) {
  $create = nativeCreate;
} else {
  var object_create_x_esm_doc = typeof document !== 'undefined' && document; // Contributed by Brandon Benvie, October, 2012

  var createEmpty;
  var supportsProto = {
    __proto__: null
  } instanceof Object === false; // the following produces false positives
  // in Opera Mini => not a reliable check
  // Object.prototype.__proto__ === null

  if (supportsProto || object_create_x_esm_castBoolean(object_create_x_esm_doc) === false) {
    createEmpty = function $createEmpty() {
      return {
        __proto__: null
      };
    };
  } else {
    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    var shouldUseActiveX = function _shouldUseActiveX() {
      var _this = this;

      // return early if document.domain not set
      if (object_create_x_esm_castBoolean(object_create_x_esm_doc.domain) === false) {
        return false;
      }

      var result = attempt_x_esm(function () {
        object_create_x_esm_newArrowCheck(this, _this);

        /* eslint-disable-next-line no-undef */
        return new ActiveXObject('htmlfile');
      }.bind(this));
      return result.threw === false && Boolean(result.value);
    }; // This supports IE8 when document.domain is used
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346


    var getEmptyViaActiveX = function _getEmptyViaActiveX() {
      /* eslint-disable-next-line no-undef */
      var xDoc = new ActiveXObject('htmlfile');
      /* eslint-disable-next-line no-useless-escape,prettier/prettier */

      xDoc.write('<script><\/script>');
      xDoc.close(); // noinspection JSUnresolvedVariable

      var empty = xDoc.parentWindow.Object.prototype;
      xDoc = null;
      return empty;
    }; // The original implementation using an iframe
    // before the activex approach was added
    // see https://github.com/es-shims/es5-shim/issues/150


    var getEmptyViaIFrame = function _getEmptyViaIFrame() {
      var iframe = object_create_x_esm_doc.createElement('iframe');
      iframe.style.display = 'none';
      /* eslint-disable-next-line no-script-url */

      iframe.src = 'javascript:';
      var parent = object_create_x_esm_doc.body || object_create_x_esm_doc.documentElement;
      parent.appendChild(iframe);
      var empty = iframe.contentWindow.Object.prototype;
      parent.removeChild(iframe);
      iframe = null;
      return empty;
    }; // In old IE __proto__ can't be used to manually set `null`, nor does
    // any other method exist to make an object that inherits from nothing,
    // aside from Object.prototype itself. Instead, create a new global
    // object and *steal* its Object.prototype and strip it bare. This is
    // used as the prototype to create nullary objects.


    createEmpty = function $createEmpty() {
      // Determine which approach to use
      // see https://github.com/es-shims/es5-shim/issues/150
      var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();
      delete empty.constructor;
      delete empty.hasOwnProperty;
      delete empty.propertyIsEnumerable;
      delete empty.isPrototypeOf;
      delete empty.toLocaleString;
      delete empty.toString;
      delete empty.valueOf;
      /* eslint-disable-next-line lodash/prefer-noop */

      var E = function Empty() {};

      E.prototype = empty; // short-circuit future calls

      createEmpty = function $$createEmpty() {
        return new E();
      };

      return new E();
    };
  }

  $create = function create(prototype, properties) {
    var object;
    /* eslint-disable-next-line lodash/prefer-noop */

    var T = function Type() {}; // An empty constructor.


    if (prototype === null) {
      object = createEmpty();
    } else {
      if (is_primitive_default()(prototype)) {
        // In the native implementation `parent` can be `null`
        // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
        // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
        // like they are in modern browsers. Using `Object.create` on DOM elements
        // is...err...probably inappropriate, but the native version allows for it.
        throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
      }

      T.prototype = prototype;
      object = new T(); // IE has no built-in implementation of `Object.getPrototypeOf`
      // neither `__proto__`, but this manually setting `__proto__` will
      // guarantee that `Object.getPrototypeOf` will work as expected with
      // objects created using `Object.create`

      /* eslint-disable-next-line no-proto */

      object.__proto__ = prototype;
    }

    if (typeof properties !== 'undefined') {
      object_define_properties_x_esm(object, properties);
    }

    return object;
  };
}

var object_create_x_esm_create = $create;
/* harmony default export */ var object_create_x_esm = (object_create_x_esm_create);


// CONCATENATED MODULE: ./dist/collections-x.esm.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symIt", function() { return symIt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetImplementation", function() { return SetImplementation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapImplementation", function() { return MapImplementation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapConstructor", function() { return MapConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetConstructor", function() { return SetConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMapImplementation", function() { return collections_x_esm_isMapImplementation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMap", function() { return collections_x_esm_isMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSetImplementation", function() { return collections_x_esm_isSetImplementation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSet", function() { return collections_x_esm_isSet; });
var _sizeDescriptor;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function collections_x_esm_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { collections_x_esm_typeof = function _typeof(obj) { return typeof obj; }; } else { collections_x_esm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return collections_x_esm_typeof(obj); }


























/* eslint-disable-next-line no-void */

var collections_x_esm_UNDEFINED = void 0;
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
var collections_x_esm_ref = [],
    push = collections_x_esm_ref.push,
    splice = collections_x_esm_ref.splice;
var collections_x_esm_charAt = KEY.charAt;
var setPrototypeOf = {}.constructor.setPrototypeOf;
/* eslint-disable-next-line compat/compat */

var hasRealSymbolIterator = has_symbol_support_x_esm && collections_x_esm_typeof(Symbol.iterator) === 'symbol';
/* eslint-disable-next-line compat/compat */

var hasFakeSymbolIterator = (typeof Symbol === "undefined" ? "undefined" : collections_x_esm_typeof(Symbol)) === 'object' && typeof Symbol.iterator === 'string';
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

var collections_x_esm_getSymIt = function getSymIt() {
  if (hasSymbolIterator) {
    /* eslint-disable-next-line compat/compat */
    return Symbol.iterator;
  }

  var result = getOtherSymbolIterator([]);

  if (typeof result === 'string' && is_function_x_esm([][result])) {
    return result;
  }

  return AT_AT_ITERATOR;
};
/**
 * The iterator identifier that is in use.
 *
 * Type {Symbol|string}.
 */


var symIt = collections_x_esm_getSymIt();
/**
 * Detect an iterator function.
 *
 * @private
 * @param {*} iterable - Value to detect iterator function.
 * @returns {symbol|string|undefined} The iterator property identifier.
 */

var collections_x_esm_getSymbolIterator = function getSymbolIterator(iterable) {
  if (is_nil_x_esm(iterable) === false) {
    if (hasSymbolIterator && iterable[symIt]) {
      return symIt;
    }

    var result = getOtherSymbolIterator(iterable);

    if (typeof result === 'string') {
      return result;
    }
  }

  return collections_x_esm_UNDEFINED;
};

var collections_x_esm_assertIterableEntryObject = function assertIterableEntryObject(kind, next) {
  if (kind === MAP) {
    if (is_array_like_x_esm(next[VALUE]) === false || next[VALUE].length < 2) {
      throw new TypeError("Iterator value ".concat(is_array_like_x_esm(next[VALUE]), " is not an entry object"));
    }
  }
};

var collections_x_esm_setPropsIterable = function setPropsIterable(args) {
  var _args = _slicedToArray(args, 3),
      kind = _args[0],
      context = _args[1],
      next = _args[2];

  var key = kind === MAP ? next[VALUE][0] : next[VALUE];
  var indexof = index_of_x_esm(assert_is_object_x_esm(context)[PROP_KEY], key, SAMEVALUEZERO);

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
  collections_x_esm_assertIterableEntryObject(kind, next);

  while (next[DONE] === false) {
    collections_x_esm_setPropsIterable([kind, context, next]);
    next = iterator[NEXT]();
  }
};

var assertStringEntryObject = function assertStringEntryObject(kind, iterable) {
  if (kind === MAP) {
    throw new TypeError("Iterator value ".concat(collections_x_esm_charAt.call(iterable, 0), " is not an entry object"));
  }
};

var getCharsString = function getCharsString(iterable, next) {
  return {
    char1: collections_x_esm_charAt.call(iterable, next),
    char2: collections_x_esm_charAt.call(iterable, next + 1)
  };
};

var collections_x_esm_setContextString = function setContextString(context, key) {
  var indexof = index_of_x_esm(assert_is_object_x_esm(context)[PROP_KEY], key, SAMEVALUEZERO);

  if (indexof < 0) {
    push.call(context[PROP_KEY], key);
    push.call(context[PROP_ORDER], context[PROP_ID].get());
    context[PROP_ID][NEXT]();
  }
};

var collections_x_esm_getNextKey = function getNextKey(iterable, next) {
  var _getCharsString = getCharsString(iterable, next),
      char1 = _getCharsString.char1,
      char2 = _getCharsString.char2;

  if (is_surrogate_pair_x_esm(char1, char2)) {
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
    var nextKey = collections_x_esm_getNextKey(iterable, next);
    next = nextKey.nxt;
    collections_x_esm_setContextString(context, nextKey.key);
    next += 1;
  }
};

var collections_x_esm_assertArrayLikeIterable = function assertArrayLikeIterable(iterable, next) {
  if (is_primitive_default()(iterable[next])) {
    throw new TypeError("Iterator value ".concat(is_array_like_x_esm(next[VALUE]), " is not an entry object"));
  }
};

var collections_x_esm_setContextArrayLike = function setContextArrayLike(args) {
  var _args4 = _slicedToArray(args, 5),
      kind = _args4[0],
      context = _args4[1],
      key = _args4[2],
      iterable = _args4[3],
      next = _args4[4];

  var indexof = index_of_x_esm(assert_is_object_x_esm(context)[PROP_KEY], key, SAMEVALUEZERO);

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
      collections_x_esm_assertArrayLikeIterable(iterable, next);
      /* eslint-disable-next-line prefer-destructuring */

      key = iterable[next][0];
    } else {
      key = iterable[next];
    }

    collections_x_esm_setContextArrayLike([kind, context, key, iterable, next]);
    next += 1;
  }
};

var collections_x_esm_defineDefaultProps = function defineDefaultProps(context) {
  var _defineProperties;

  object_define_properties_x_esm(context, (_defineProperties = {}, _defineProperty(_defineProperties, PROP_CHANGED, _defineProperty({}, VALUE, false)), _defineProperty(_defineProperties, PROP_ID, _defineProperty({}, VALUE, new big_counter_x_esm())), _defineProperty(_defineProperties, PROP_KEY, _defineProperty({}, VALUE, [])), _defineProperty(_defineProperties, PROP_ORDER, _defineProperty({}, VALUE, [])), _defineProperties));
};

var collections_x_esm_performParsing = function performParsing(args) {
  var _args6 = _slicedToArray(args, 4),
      iterable = _args6[1],
      symbolIterator = _args6[3];

  if (iterable && is_function_x_esm(iterable[symbolIterator])) {
    parseIterable(args);
  } else if (is_string_default()(iterable)) {
    parseString(args);
  } else if (is_array_like_x_esm(iterable)) {
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


var collections_x_esm_parse = function parse(args) {
  var _defineProperty3;

  var _args7 = _slicedToArray(args, 3),
      kind = _args7[0],
      context = _args7[1],
      iterable = _args7[2];

  var symbolIterator = collections_x_esm_getSymbolIterator(iterable);

  if (kind === MAP) {
    object_define_property_x_esm(context, PROP_VALUE, _defineProperty({}, VALUE, []));
  }

  collections_x_esm_defineDefaultProps(context);
  collections_x_esm_performParsing([kind, iterable, context, symbolIterator]);
  object_define_property_x_esm(context, SIZE, (_defineProperty3 = {}, _defineProperty(_defineProperty3, VALUE, context[PROP_KEY].length), _defineProperty(_defineProperty3, WRITABLE, true), _defineProperty3));
};

var collections_x_esm_updatePointerIndexes = function updatePointerIndexes(context, pointers) {
  array_some_x_esm(context[PROP_ORDER], function predicate(id, count) {
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
    collections_x_esm_updatePointerIndexes(context, pointers);
    context[PROP_CHANGE] = false;
    len = context[PROP_KEY].length;
  } else {
    pointers.index += 1;
  }

  pointers.order = context[PROP_ORDER][pointers.index];
  return len;
};

var collections_x_esm_doCallback = function doCallback(args) {
  var _args9 = _slicedToArray(args, 5),
      kind = _args9[0],
      context = _args9[1],
      pointers = _args9[2],
      callback = _args9[3],
      thisArg = _args9[4];

  if (has_own_property_x_esm(context[PROP_KEY], pointers.index)) {
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


var collections_x_esm_baseForEach = function baseForEach(args) {
  var _args10 = _slicedToArray(args, 4),
      kind = _args10[0],
      context = _args10[1],
      callback = _args10[2],
      thisArg = _args10[3];

  assert_is_object_x_esm(context);
  assert_is_function_x_esm(callback);
  context[PROP_CHANGE] = false;
  var pointers = {
    index: 0,
    order: context[PROP_ORDER][0]
  };
  var length = context[PROP_KEY].length;

  while (pointers.index < length) {
    collections_x_esm_doCallback([kind, context, pointers, callback, thisArg]);
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
  return index_of_x_esm(assert_is_object_x_esm(this)[PROP_KEY], key, SAMEVALUEZERO) > -1;
};
/**
 * The base clear method removes all elements from a Map/Set object.
 *
 * @private
 * @param {string} kind - Either MAP or SET.
 * @param {object} context - The Map/Set object.
 * @returns {object} The Map/Set object.
 */


var collections_x_esm_baseClear = function baseClear(kind, context) {
  assert_is_object_x_esm(context);
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


var collections_x_esm_baseDelete = function baseDelete(args) {
  var _args12 = _slicedToArray(args, 3),
      kind = _args12[0],
      context = _args12[1],
      key = _args12[2];

  var indexof = index_of_x_esm(assert_is_object_x_esm(context)[PROP_KEY], key, SAMEVALUEZERO);
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


var collections_x_esm_baseAddSet = function baseAddSet(args) {
  var _args14 = _slicedToArray(args, 4),
      kind = _args14[0],
      context = _args14[1],
      key = _args14[2],
      value = _args14[3];

  var index = index_of_x_esm(assert_is_object_x_esm(context)[PROP_KEY], key, SAMEVALUEZERO);

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

  object_define_properties_x_esm(this, (_defineProperties2 = {}, _defineProperty(_defineProperties2, PROP_ITERATORHASMORE, (_PROP_ITERATORHASMORE = {}, _defineProperty(_PROP_ITERATORHASMORE, VALUE, true), _defineProperty(_PROP_ITERATORHASMORE, WRITABLE, true), _PROP_ITERATORHASMORE)), _defineProperty(_defineProperties2, PROP_SET, _defineProperty({}, VALUE, assert_is_object_x_esm(context))), _defineProperty(_defineProperties2, PROP_SETITERATIONKIND, _defineProperty({}, VALUE, iteratorKind || KIND_VALUE)), _defineProperty(_defineProperties2, PROP_SETNEXTINDEX, (_PROP_SETNEXTINDEX = {}, _defineProperty(_PROP_SETNEXTINDEX, VALUE, 0), _defineProperty(_PROP_SETNEXTINDEX, WRITABLE, true), _PROP_SETNEXTINDEX)), _defineProperties2));
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


object_define_property_x_esm(SetIt.prototype, NEXT, _defineProperty({}, VALUE, function next() {
  var _ref3;

  var context = assert_is_object_x_esm(this[PROP_SET]);
  var index = this[PROP_SETNEXTINDEX];
  var iteratorKind = this[PROP_SETITERATIONKIND];
  var more = this[PROP_ITERATORHASMORE];

  if (index < context[PROP_KEY].length && more) {
    this[PROP_SETNEXTINDEX] += 1;
    return getSetNextObject([iteratorKind, context, index]);
  }

  this[PROP_ITERATORHASMORE] = false;
  return _ref3 = {}, _defineProperty(_ref3, DONE, true), _defineProperty(_ref3, VALUE, collections_x_esm_UNDEFINED), _ref3;
}));
/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof SetIterator.prototype
 * @returns {object} This Iterator object.
 */

object_define_property_x_esm(SetIt.prototype, symIt, thisIteratorDescriptor);

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


var SetImplementation = function Set() {
  if (to_boolean_x_esm(this) === false || !(this instanceof SetImplementation)) {
    throw new TypeError("Constructor Set requires 'new'");
  }
  /* eslint-disable-next-line prefer-rest-params */


  collections_x_esm_parse([SET, this, arguments.length ? arguments[0] : collections_x_esm_UNDEFINED]);
}; // noinspection JSValidateTypes

object_define_properties_x_esm(SetImplementation.prototype,
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
    return collections_x_esm_baseAddSet([SET, this, value]);
  }),

  /**
   * The clear() method removes all elements from a Set object.
   *
   * @returns {object} The Set object.
   */
  clear: _defineProperty({}, VALUE, function clear() {
    return collections_x_esm_baseClear(SET, this);
  }),

  /**
   * The delete() method removes the specified element from a Set object.
   *
   * @param {*} value - The value of the element to remove from the Set object.
   * @returns {boolean} Returns true if an element in the Set object has been
   *  removed successfully; otherwise false.
   */
  delete: _defineProperty({}, VALUE, function de1ete(value) {
    return collections_x_esm_baseDelete([SET, this, value]);
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
    return collections_x_esm_baseForEach([SET, this, callback, thisArg]);
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

object_define_property_x_esm(SetImplementation.prototype, symIt, _defineProperty({}, VALUE, setValuesIterator));
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

  object_define_properties_x_esm(this, (_defineProperties3 = {}, _defineProperty(_defineProperties3, PROP_ITERATORHASMORE, (_PROP_ITERATORHASMORE2 = {}, _defineProperty(_PROP_ITERATORHASMORE2, VALUE, true), _defineProperty(_PROP_ITERATORHASMORE2, WRITABLE, true), _PROP_ITERATORHASMORE2)), _defineProperty(_defineProperties3, PROP_MAP, _defineProperty({}, VALUE, assert_is_object_x_esm(context))), _defineProperty(_defineProperties3, PROP_MAPITERATIONKIND, _defineProperty({}, VALUE, iteratorKind)), _defineProperty(_defineProperties3, PROP_MAPNEXTINDEX, (_PROP_MAPNEXTINDEX = {}, _defineProperty(_PROP_MAPNEXTINDEX, VALUE, 0), _defineProperty(_PROP_MAPNEXTINDEX, WRITABLE, true), _PROP_MAPNEXTINDEX)), _defineProperties3));
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


object_define_property_x_esm(MapIt.prototype, NEXT, _defineProperty({}, VALUE, function next() {
  var _ref5;

  var context = assert_is_object_x_esm(this[PROP_MAP]);
  var index = this[PROP_MAPNEXTINDEX];
  var iteratorKind = this[PROP_MAPITERATIONKIND];
  var more = this[PROP_ITERATORHASMORE];

  if (index < context[PROP_KEY].length && more) {
    this[PROP_MAPNEXTINDEX] += 1;
    return getMapNextObject([iteratorKind, context, index]);
  }

  this[PROP_ITERATORHASMORE] = false;
  return _ref5 = {}, _defineProperty(_ref5, DONE, true), _defineProperty(_ref5, VALUE, collections_x_esm_UNDEFINED), _ref5;
}));
/**
 * The @@iterator property is the same Iterator object.
 *
 * @private
 * @function symIt
 * @memberof MapIterator.prototype
 * @returns {object} This Iterator object.
 */

object_define_property_x_esm(MapIt.prototype, symIt, thisIteratorDescriptor); // eslint-disable jsdoc/check-param-names
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

var MapImplementation = function Map() {
  if (to_boolean_x_esm(this) === false || !(this instanceof MapImplementation)) {
    throw new TypeError("Constructor Map requires 'new'");
  }
  /* eslint-disable-next-line prefer-rest-params */


  collections_x_esm_parse([MAP, this, arguments.length ? arguments[0] : collections_x_esm_UNDEFINED]);
}; // noinspection JSValidateTypes

object_define_properties_x_esm(MapImplementation.prototype,
/** @lends MapImplementation.prototype */
{
  /**
   * The clear() method removes all elements from a Map object.
   *
   * @returns {object} The Map object.
   */
  clear: _defineProperty({}, VALUE, function clear() {
    return collections_x_esm_baseClear(MAP, this);
  }),

  /**
   * The delete() method removes the specified element from a Map object.
   *
   * @param {*} key - The key of the element to remove from the Map object.
   * @returns {boolean} Returns true if an element in the Map object has been
   *  removed successfully.
   */
  delete: _defineProperty({}, VALUE, function de1ete(key) {
    return collections_x_esm_baseDelete([MAP, this, key]);
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
    return collections_x_esm_baseForEach([MAP, this, callback, thisArg]);
  }),

  /**
   * The get() method returns a specified element from a Map object.
   *
   * @param {*} key - The key of the element to return from the Map object.
   * @returns {*} Returns the element associated with the specified key or
   *  undefined if the key can't be found in the Map object.
   */
  get: _defineProperty({}, VALUE, function get(key) {
    var index = index_of_x_esm(assert_is_object_x_esm(this)[PROP_KEY], key, SAMEVALUEZERO);
    return index > -1 ? this[PROP_VALUE][index] : collections_x_esm_UNDEFINED;
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
    return collections_x_esm_baseAddSet([MAP, this, key, value]);
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

object_define_property_x_esm(MapImplementation.prototype, symIt, _defineProperty({}, VALUE, MapImplementation.prototype.entries));
/*
 * Determine whether to use shim or native.
 */

/* istanbul ignore next */

var collections_x_esm_getMyClass = function getMyClass(Subject) {
  var MyClass = function MyClass(arg) {
    var testObject = new Subject(arg);
    setPrototypeOf(testObject, MyClass.prototype);
    return testObject;
  };

  setPrototypeOf(MyClass, Subject);
  MyClass.prototype = object_create_x_esm(Subject.prototype, {
    constructor: _defineProperty({}, VALUE, MyClass)
  });
  return MyClass;
};

var collections_x_esm_noNewfixee = function noNewfixee(Subject) {
  var res = attempt_x_esm(function attemptee() {
    /* eslint-disable-next-line babel/new-cap */
    return Subject();
  });
  return res.threw === false;
};

var collections_x_esm_badDoneFixee = function badDoneFixee(Subject) {
  var res = attempt_x_esm(function attemptee() {
    return new Subject().keys()[NEXT]()[DONE] === false;
  });
  return res.threw || res.value;
};

var collections_x_esm_badNextFunction = function badNextFunction(Subject) {
  // Safari 8
  return is_function_x_esm(new Subject().keys()[NEXT]) === false;
};
/* Map fixes */

/* istanbul ignore next */


var collections_x_esm_performMapFixes = function performMapFixes() {
  var result = attempt_x_esm(function attemptee() {
    /* eslint-disable-next-line compat/compat */
    return to_boolean_x_esm(new Map() instanceof Map) === false;
  });
  var Export = result.threw || result.value ? MapImplementation : Map;

  var peformMapFix = function peformMapFix(fixee) {
    if (Export !== MapImplementation && fixee(Export)) {
      Export = MapImplementation;
    }
  };

  var fixees = [collections_x_esm_noNewfixee, function fixee(Subject) {
    var testMap = new Subject();

    if (typeof testMap[SIZE] !== 'number' || testMap[SIZE] !== 0) {
      return true;
    }

    var propsMap = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];
    return array_some_x_esm(propsMap, function predicate(method) {
      return is_function_x_esm(testMap[method]) === false;
    });
  }, function fixee(Subject) {
    // Safari 8, for example, doesn't accept an iterable.
    var res = attempt_x_esm(function attemptee() {
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

    var MyMap = collections_x_esm_getMyClass(Subject);
    var res = attempt_x_esm(function attemptee() {
      return to_boolean_x_esm(new MyMap([]).set(42, 42) instanceof MyMap) === false;
    });
    return res.threw || res.value;
  }, collections_x_esm_badDoneFixee, collections_x_esm_badNextFunction, function fixee(Subject) {
    var testMapProto = hasRealSymbolIterator && get_prototype_of_x_esm(new Subject().keys());
    return to_boolean_x_esm(testMapProto) && is_function_x_esm(testMapProto[symIt]) === false;
  }];
  array_for_each_x_esm(fixees, function iteratee(fixee) {
    peformMapFix(fixee);
  });
  return Export;
};
/* Set fixes */

/* istanbul ignore next */


var collections_x_esm_performSetFixes = function performSetFixes() {
  var result = attempt_x_esm(function attemptee() {
    /* eslint-disable-next-line compat/compat */
    return to_boolean_x_esm(new Set() instanceof Set) === false;
  });
  var Export = result.threw || result.value ? SetImplementation : Set;

  var peformSetFix = function peformSetFix(fixee) {
    if (Export !== SetImplementation && fixee(Export)) {
      Export = SetImplementation;
    }
  };

  var fixees = [collections_x_esm_noNewfixee, function fixee(Subject) {
    var testSet = new Subject();

    if (typeof testSet[SIZE] !== 'number' || testSet[SIZE] !== 0) {
      /* istanbul ignore next */
      return true;
    }

    var propsSet = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', symIt];
    return array_some_x_esm(propsSet, function predicate(method) {
      return is_function_x_esm(testSet[method]) === false;
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

    var MySet = collections_x_esm_getMyClass(Subject);
    var res = attempt_x_esm(function attemptee() {
      return to_boolean_x_esm(new MySet([]).add(42) instanceof MySet) === false;
    });
    return res.threw || res.value;
  }, collections_x_esm_badDoneFixee, collections_x_esm_badNextFunction, function fixee(Subject) {
    var testSetProto = hasRealSymbolIterator && get_prototype_of_x_esm(new Subject().keys());
    return to_boolean_x_esm(testSetProto) && is_function_x_esm(testSetProto[symIt]) === false;
  }];
  array_for_each_x_esm(fixees, function iteratee(fixee) {
    peformSetFix(fixee);
  });
  return Export;
};

var MapConstructor = collections_x_esm_performMapFixes();
var SetConstructor = collections_x_esm_performSetFixes();

var collections_x_esm_hasImplementationProps = function hasImplementationProps(object) {
  return is_boolean_object_default()(object[PROP_CHANGED]) && is_object_like_x_esm(object[PROP_ID]) && is_array_x_esm(object[PROP_KEY]) && is_array_x_esm(object[PROP_ORDER]) && typeof object[SIZE] === 'number';
};

var collections_x_esm_hasCommon = function hasCommon(object) {
  return is_object_like_x_esm(object) && is_function_x_esm(object[symIt]) && collections_x_esm_hasImplementationProps(object);
};

var collections_x_esm_isMapImplementation = function isMapImplementation(object) {
  return is_map_x_esm(object) || collections_x_esm_hasCommon(object) && is_array_x_esm(object[PROP_VALUE]);
};
/**
 * Determine if an `object` is a `Map`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Map`,
 *  else `false`.
 */

var collections_x_esm_isMap = MapConstructor === MapImplementation ? collections_x_esm_isMapImplementation : is_map_x_esm;
var collections_x_esm_isSetImplementation = function isSetImplementation(object) {
  return is_set_x_esm(object) || collections_x_esm_hasCommon(object) && typeof object[PROP_VALUE] === 'undefined';
};
/**
 * Determine if an `object` is a `Set`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `Set`,
 *  else `false`.
 */

var collections_x_esm_isSet = SetConstructor === SetImplementation ? collections_x_esm_isSetImplementation : is_set_x_esm;



/***/ })
/******/ ]);
});
//# sourceMappingURL=collections-x.js.map