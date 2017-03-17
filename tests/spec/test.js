/* jslint maxlen:80, es6:true, white:true */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
   freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
   nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
   es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
   maxstatements:12, maxcomplexity:4 */

/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1, id-length: 1, new-cap: 1, no-prototype-builtins: 1, no-new: 1 */

/* global JSON:true, expect, module, require, describe, it, xit, jasmine,
   returnExports */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var hasOwn = Object.prototype.hasOwnProperty;
  var functionsHaveNames = function foo() {}.name === 'foo';
  var ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;
  var MapObject;
  var SetObject;
  var symIt;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    MapObject = require('../../index.js').Map;
    SetObject = require('../../index.js').Set;
    symIt = require('../../index.js').symIt;
  } else {
    MapObject = returnExports.Map;
    SetObject = returnExports.Set;
    symIt = returnExports.symIt;
  }

  describe('Map', function () {
    var proto = '__proto__';

    it('existence', function () {
      expect(typeof MapObject).toBe('function');
    });

    it('should have the correct arity', function () {
      expect(hasOwn.call(MapObject, 'length')).toBe(true);
      expect(MapObject.length).toBe(0);
    });

    it('should have valid getter and setter calls', function () {
      var map = new MapObject();
      var props = [
        'has',
        'set',
        'clear',
        'delete',
        'forEach',
        'values',
        'entries',
        'keys',
        'size',
        symIt
      ];
      props.forEach(function (method) {
        if (method === 'size') {
          expect(typeof map[method] === 'number').toBe(true, method);
        } else {
          expect(typeof map[method] === 'function').toBe(true, method);
        }
      });
    });

    ifFunctionsHaveNamesIt('should have correct names', function () {
      var map = new MapObject();
      var props = [
        'has',
        'set',
        'clear',
        'forEach',
        'values',
        'entries',
        'keys'
      ];
      props.forEach(function (method) {
        expect(map[method].name).toBe(method);
      });
    });

    it('should not be callable without "new"', function () {
      var threw = false;
      /* jshint newcap:false */
      try {
        SetObject();
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('constructor behavior', function () {
      var a = 1;
      var b = {};
      var c = new MapObject();
      var m = new MapObject([
        [a, 1],
        [b, 2],
        [c, 3]
      ]);
      expect(new MapObject()).toEqual(jasmine.any(MapObject));
      expect(m.has(a)).toBe(true);
      expect(m.has(b)).toBe(true);
      expect(m.has(c)).toBe(true);
      expect(m.size).toBe(3);
      if (proto in {}) {
        expect(new MapObject()[proto].isPrototypeOf(new MapObject()))
          .toBe(true);
        expect(new MapObject()[proto]).toBe(MapObject.prototype);
      }
    });

    it('constructor behavior using another Map', function () {
      var a = 1;
      var b = {};
      var c = new MapObject();
      var m = new MapObject([
        [a, 1],
        [b, 2],
        [c, 3]
      ]);
      var d = new MapObject(m);
      expect(d.has(a)).toBe(true);
      expect(d.has(b)).toBe(true);
      expect(d.has(c)).toBe(true);
      expect(d.size).toBe(3);
    });

    it('constructor behavior, string should throw', function () {
      var threw = false;
      try {
        new MapObject('123');
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('constructor behavior, not entry object should throw', function () {
      var threw = false;
      try {
        new MapObject([1, 2, 3]);
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('constructor behavior using a Set should throw', function () {
      var a = 1;
      var b = {};
      var c = new MapObject();
      var s = new SetObject([a, b, c]);
      var threw = false;
      try {
        new MapObject(s);
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('size - Mozilla only', function () {
      var o = new MapObject();
      if ('size' in o) {
        expect(o.size).toBe(0);
        o.set('a', 'a');
        expect(o.size).toBe(1);
        o.delete('a');
        expect(o.size).toBe(0);
      }
    });

    it('has', function () {
      var o = new MapObject();
      var generic = {};
      var callback = function () {};
      expect(o.has(callback)).toBe(false);
      o.set(callback, generic);
      expect(o.has(callback)).toBe(true);
    });

    it('get', function () {
      var o = new MapObject();
      var generic = {};
      var callback = function () {};
      o.set(callback, generic);
      expect(o.get(callback, 123)).toBe(generic);
      expect(o.get(callback)).toBe(generic);
    });

    it('set', function () {
      var o = new MapObject();
      var generic = {};
      var callback = function () {};
      o.set(callback, generic);
      expect(o.get(callback)).toBe(generic);
      o.set(callback, callback);
      expect(o.get(callback)).toBe(callback);
      o.set(callback, o);
      expect(o.get(callback)).toBe(o);
      o.set(o, callback);
      expect(o.get(o)).toBe(callback);
      o.set(NaN, generic);
      expect(o.has(NaN)).toBe(true);
      expect(o.get(NaN)).toBe(generic);
      o.set('key', undefined);
      expect(o.has('key')).toBe(true);
      expect(o.get('key')).toBe(undefined);
      expect(!o.has(-0)).toBe(true);
      expect(!o.has(0)).toBe(true);
      o.set(-0, callback);
      expect(o.has(-0)).toBe(true);
      expect(o.has(0)).toBe(true);
      expect(o.get(-0)).toBe(callback);
      expect(o.get(0)).toBe(callback);
      o.set(0, generic);
      expect(o.has(-0)).toBe(true);
      expect(o.has(0)).toBe(true);
      expect(o.get(-0)).toBe(generic);
      expect(o.get(0)).toBe(generic);
    });

    it('delete', function () {
      var o = new MapObject();
      var generic = {};
      var callback = function () {};
      o.set(callback, generic);
      o.set(generic, callback);
      o.set(o, callback);
      expect(o.has(callback) && o.has(generic) && o.has(o)).toBe(true);
      o.delete(callback);
      o.delete(generic);
      o.delete(o);
      expect(!o.has(callback) && !o.has(generic) && !o.has(o)).toBe(true);
      expect(o.delete(o)).toBe(false);
      o.set(o, callback);
      expect(o.delete(o)).toBe(true);
    });

    it('non object key does not throw an error', function () {
      var o = new MapObject();
      try {
        o.set('key', o);
      } catch (emAll) {
        expect(false).toBe(true);
      }
    });

    it('keys, values, entries behavior', function () {
      // test that things get returned in insertion order as per the specs
      var o = new MapObject([
        ['1', 1],
        ['2', 2],
        ['3', 3]
      ]);
      var keys = o.keys();
      var values = o.values();
      var k = keys.next();
      var v = values.next();
      expect(k.value === '1' && v.value === 1).toBe(true);
      o.delete('2');
      k = keys.next();
      v = values.next();
      expect(k.value === '3' && v.value === 3).toBe(true);
      // insertion of previously-removed item goes to the end
      o.set('2', 2);
      k = keys.next();
      v = values.next();
      expect(k.value === '2' && v.value === 2).toBe(true);
      // when called again, new iterator starts from beginning
      var entriesagain = o.entries();
      expect(entriesagain.next().value[0]).toBe('1');
      expect(entriesagain.next().value[0]).toBe('3');
      expect(entriesagain.next().value[0]).toBe('2');
      // after a iterator is finished, don't return any more elements
      k = keys.next();
      v = values.next();
      expect(k.done && v.done).toBe(true);
      k = keys.next();
      v = values.next();
      expect(k.done && v.done).toBe(true);
      o.set('4', 4);
      k = keys.next();
      v = values.next();
      expect(k.done && v.done).toBe(true);
      // new element shows up in iterators that didn't yet
      var e = entriesagain.next();
      expect(e.done).toBe(false);
      expect(e.value[0]).toBe('4');
      expect(entriesagain.next().done).toBe(true);
    });

    it('forEach', function () {
      var o = new MapObject();
      o.set('key 0', 0);
      o.set('key 1', 1);
      o.forEach(function (value, key, obj) {
        expect('key ' + value).toBe(key);
        expect(obj).toBe(o);
        // even if dropped, keeps looping
        o.delete(key);
      });
      expect(!o.size).toBe(true);
    });

    it('forEach with mutations', function () {
      var o = new MapObject([
        ['0', 0],
        ['1', 1],
        ['2', 2]
      ]);
      var seen = [];
      o.forEach(function (value, key, obj) {
        seen.push(value);
        expect(obj).toBe(o);
        expect(String(value)).toBe(key);
        // mutations work as expected
        if (value === 1) {
          o.delete('0'); // remove from before current index
          o.delete('2'); // remove from after current index
          o.set('3', 3); // insertion
        } else if (value === 3) {
          o.set('0', 0); // insertion at the end
        }
      });
      expect(seen).toEqual([0, 1, 3, 0]);
    });

    it('clear', function () {
      var o = new MapObject();
      o.set(1, '1');
      o.set(2, '2');
      o.set(3, '3');
      o.clear();
      expect(!o.size).toBe(true);
    });

    it('treats positive and negative zero the same', function () {
      var value1 = {};
      var value2 = {};
      var map = new MapObject();
      map.set(0, value1);
      expect(map.size).toBe(1);
      expect(map.has(-0)).toBe(true);
      expect(map.get(-0)).toBe(value1);
      expect(map.set(-0, value2)).toBe(map);
      expect(map.size).toBe(1);
      expect(map.get(-0)).toBe(value2);
      expect(map.get(0)).toBe(value2);
    });

    it('should be subclassable', function () {
      // skip test if on IE < 11
      if (!Object.setPrototypeOf) {
        return;
      }
      var supportsDescriptors = Object.defineProperty && (function () {
        try {
          var obj = {};
          Object.defineProperty(obj, 'x', {
            enumerable: false,
            value: obj
          });
          return !Object.keys(obj).length && obj.x === obj;
        } catch (ignore) {}
        return false;
      }());
      var defineByDescriptor = function (object, property, descriptor) {
        if (supportsDescriptors) {
          Object.defineProperty(object, property, descriptor);
        } else if ('value' in descriptor) {
          object[property] = descriptor.value;
        }
      };
      // Simple shim for Object.create on ES3 browsers
      // (unlike real shim, no attempt to support `prototype === null`)
      var create = Object.create || function (prototype, properties) {
        var Prototype = function () {};
        Prototype.prototype = prototype;
        var object = new Prototype();
        if (typeof properties !== 'undefined') {
          Object.keys(properties).forEach(function (key) {
            defineByDescriptor(object, key, properties[key]);
          });
        }
        return object;
      };
      var MyMap = function () {
        var testMap = new MapObject([['a', 'b']]);
        Object.setPrototypeOf(testMap, MyMap.prototype);
        return testMap;
      };
      Object.setPrototypeOf(MyMap, MapObject);
      MyMap.prototype = create(MapObject.prototype, { constructor: { value: MyMap } });

      var myMap = new MyMap();
      expect(myMap.has('c')).toBe(false);
      expect(myMap.get('c')).toBe(undefined);
      expect(myMap.set('c', 'd')).toBe(myMap);
      expect(myMap.get('c')).toBe('d');
      expect(myMap.has('c')).toBe(true);
      expect(myMap.size).toBe(2);
      var arr = [];
      myMap.forEach(function (value, key) {
        arr.push([key, value]);
      });
      expect(arr).toEqual([['a', 'b'], ['c', 'd']]);
    });

    it('uses SameValueZero even on a Map of size > 4', function () {
      // Chrome 38-42, node 0.11/0.12, iojs 1/2 have a bug when the Map
      // has a size > 4
      var firstFour = [[1, 0], [2, 0], [3, 0], [4, 0]];
      var fourMap = new MapObject(firstFour);
      expect(fourMap.size).toBe(4);
      expect(fourMap.has(-0)).toBe(false);
      expect(fourMap.has(0)).toBe(false);

      fourMap.set(-0, fourMap);

      expect(fourMap.has(0)).toBe(true);
      expect(fourMap.has(-0)).toBe(true);
    });

    it('should allow common ecmascript idioms', function () {
      expect(new MapObject()).toEqual(jasmine.any(MapObject));
      expect(typeof MapObject.prototype.get).toBe('function');
      expect(typeof MapObject.prototype.set).toBe('function');
      expect(typeof MapObject.prototype.has).toBe('function');
      expect(typeof MapObject.prototype.delete).toBe('function');
    });
  });

  describe('Set', function () {
    var proto = '__proto__';
    it('existence', function () {
      expect(typeof SetObject).toBe('function');
    });

    it('should have the correct arity', function () {
      expect(hasOwn.call(SetObject, 'length')).toBe(true);
      expect(SetObject.length).toBe(0);
    });

    it('should have valid getter and setter calls', function () {
      var set = new SetObject();
      var props = [
        'has',
        'add',
        'clear',
        'delete',
        'forEach',
        'values',
        'entries',
        'keys',
        'size',
        symIt
      ];
      props.forEach(function (method) {
        if (method === 'size') {
          expect(typeof set[method] === 'number').toBe(true, method);
        } else {
          expect(typeof set[method] === 'function').toBe(true, method);
        }
      });
    });

    ifFunctionsHaveNamesIt('should have correct names', function () {
      var set = new SetObject();
      var props = [
        'has',
        'add',
        'clear',
        'forEach',
        'values',
        'entries'
      ];
      props.forEach(function (method) {
        expect(set[method].name).toBe(method);
      });
    });

    it('should not be callable without "new"', function () {
      var threw = false;
      /* jshint newcap:false */
      try {
        SetObject();
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('constructor behavior', function () {
      var s = new SetObject([1, 2]);
      expect(new SetObject()).toEqual(jasmine.any(SetObject));
      expect(s.has(1)).toBe(true);
      expect(s.has(2)).toBe(true);
      expect(s.size).toBe(2);
      if (proto in {}) {
        expect(new SetObject()[proto].isPrototypeOf(new SetObject()))
          .toBe(true);
        expect(new SetObject()[proto]).toBe(SetObject.prototype);
      }
    });

    it('constructor behavior, string should iterate', function () {
      var s = new SetObject('123');
      expect(s.has('1')).toBe(true);
      expect(s.has('2')).toBe(true);
      expect(s.has('3')).toBe(true);
      expect(s.size).toBe(3);
    });

    it('size - Mozilla only', function () {
      var o = new SetObject();
      if ('size' in o) {
        expect(o.size).toBe(0);
        o.add('a');
        expect(o.size).toBe(1);
        o.delete('a');
        expect(o.size).toBe(0);
      }
    });

    it('add', function () {
      var o = new SetObject();
      expect(o.add(NaN)).toBe(o);
      expect(o.has(NaN)).toBe(true);
    });

    it('delete', function () {
      var o = new SetObject();
      var generic = {};
      var callback = function () {};
      o.add(callback);
      o.add(generic);
      o.add(o);
      expect(o.has(callback) && o.has(generic) && o.has(o)).toBe(true);
      o.delete(callback);
      o.delete(generic);
      o.delete(o);
      expect(!o.has(callback) && !o.has(generic) && !o.has(o)).toBe(true);
      expect(o.delete(o)).toBe(false);
      o.add(o);
      expect(o.delete(o)).toBe(true);
    });

    it('values behavior', function () {
      // test that things get returned in insertion order as per the specs
      var o = new SetObject([1, 2, 3]);
      var values = o.values();
      var v = values.next();
      expect(o.keys).toBe(o.values); // same function, as per the specs
      expect(v.value).toBe(1);
      o.delete(2);
      v = values.next();
      expect(v.value).toBe(3);
      // insertion of previously-removed item goes to the end
      o.add(2);
      v = values.next();
      expect(v.value).toBe(2);
      // when called again, new iterator starts from beginning
      var entriesagain = o.entries();
      expect(entriesagain.next().value[1]).toBe(1);
      expect(entriesagain.next().value[1]).toBe(3);
      expect(entriesagain.next().value[1]).toBe(2);
      // after a iterator is finished, don't return any more elements
      v = values.next();
      expect(v.done).toBe(true);
      v = values.next();
      expect(v.done).toBe(true);
      o.add(4);
      v = values.next();
      expect(v.done).toBe(true);
      // new element shows up in iterators that didn't yet finish
      expect(entriesagain.next().value[1]).toBe(4);
      expect(entriesagain.next().done).toBe(true);
    });

    it('has', function () {
      var o = new SetObject();
      var callback = function () {};
      expect(o.has(callback)).toBe(false);
      o.add(callback);
      expect(o.has(callback)).toBe(true);
    });

    it('forEach', function () {
      var o = new SetObject();
      var i = 0;
      o.add('value 0');
      o.add('value 1');
      o.forEach(function (value, sameValue, obj) {
        expect('value ' + i).toBe(value);
        i += 1;
        expect(obj).toBe(o);
        expect(sameValue).toBe(value);
        // even if dropped, keeps looping
        o.delete(value);
      });
      expect(!o.size).toBe(true);
    });

    it('forEach with mutations', function () {
      var o = new SetObject([0, 1, 2]);
      var seen = [];
      o.forEach(function (value, sameValue, obj) {
        seen.push(value);
        expect(obj).toBe(o);
        expect(sameValue).toBe(value);
        // mutations work as expected
        if (value === 1) {
          o.delete(0); // remove from before current index
          o.delete(2); // remove from after current index
          o.add(3); // insertion
        } else if (value === 3) {
          o.add(0); // insertion at the end
        }
      });
      expect(seen).toEqual([0, 1, 3, 0]);
    });

    it('clear', function () {
      var o = new SetObject();
      o.add(1);
      o.add(2);
      o.clear();
      expect(!o.size).toBe(true);
    });

    it('treats positive and negative zero the same', function () {
      var set = new SetObject();
      set.add(0);
      expect(set.has(-0)).toBe(true);
      expect(set.size).toBe(1);
      expect(set.add(-0)).toBe(set);
      expect(set.has(0)).toBe(true);
      expect(set.size).toBe(1);
    });

    it('Recognize any iterable as the constructor input', function () {
      var a = new SetObject(new SetObject([1, 2]));
      expect(a.has(1)).toBe(true);
    });
  });

  describe('Map and Set', function () {
    it('add, set are chainable now', function () {
      var s = new SetObject();
      var m = new MapObject();
      var a = {};
      s.add(1).add(2);
      expect(s.has(1) && s.has(2) && s.size).toBe(2);
      m.set(1, 1).set(a, 2);
      expect(m.has(1) && m.has(a) && m.size).toBe(2);
    });
  });
}());
