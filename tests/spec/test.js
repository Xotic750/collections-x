/*jslint maxlen:80, es6:true, this:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:true, plusplus:true, maxparams:3, maxdepth:1,
  maxstatements:28, maxcomplexity:3 */

/*global expect, module, require, describe, it,jasmine, returnExports */

(function () {
  'use strict';

  var MapObject, SetObject;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    MapObject = require('../../index.js').Map;
    SetObject = require('../../index.js').Set;
  } else {
    MapObject = returnExports.Map;
    SetObject = returnExports.Set;
  }

  describe('Basic tests', function () {
    var proto = '__proto__';

    it('MapObject existence', function () {
      expect(typeof MapObject).toBe('function');
    });

    it('MapObject constructor behavior', function () {
      var a = 1,
        b = {},
        c = new MapObject(),
        m = new MapObject([
          [1, 1],
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

    it('MapObject constructor behavior, string should throw', function () {
      var threw = false;
      try {
        new MapObject('123');
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('MapObject constructor behavior, not entry object should throw', function () {
      var threw = false;
      try {
        new MapObject([1, 2, 3]);
      } catch (e) {
        expect(e).toEqual(jasmine.any(TypeError));
        threw = true;
      }
      expect(threw).toBe(true);
    });

    it('MapObject#size - Mozilla only', function () {
      var o = new MapObject();
      if ('size' in o) {
        expect(o.size).toBe(0);
        o.set('a', 'a');
        expect(o.size).toBe(1);
        o['delete']('a');
        expect(o.size).toBe(0);
      }
    });

    it('MapObject#has', function () {
      var o = new MapObject(),
        generic = {},
        callback = function () {};
      expect(o.has(callback)).toBe(false);
      o.set(callback, generic);
      expect(o.has(callback)).toBe(true);
    });

    it('MapObject#get', function () {
      var o = new MapObject(),
        generic = {},
        callback = function () {};
      o.set(callback, generic);
      expect(o.get(callback, 123)).toBe(generic);
      expect(o.get(callback)).toBe(generic);
    });

    it('MapObject#set', function () {
      var o = new MapObject(),
        generic = {},
        callback = function () {};
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

    it('MapObject#[\'delete\']', function () {
      var o = new MapObject(),
        generic = {},
        callback = function () {};
      o.set(callback, generic);
      o.set(generic, callback);
      o.set(o, callback);
      expect(o.has(callback) && o.has(generic) && o.has(o)).toBe(true);
      o['delete'](callback);
      o['delete'](generic);
      o['delete'](o);
      expect(!o.has(callback) && !o.has(generic) && !o.has(o)).toBe(true);
      expect(o['delete'](o)).toBe(false);
      o.set(o, callback);
      expect(o['delete'](o)).toBe(true);
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
        ]),
        keys = o.keys(),
        values = o.values(),
        k = keys.next(),
        v = values.next(),
        e, entriesagain;
      expect(k.value === '1' && v.value === 1).toBe(true);
      o['delete']('2');
      k = keys.next();
      v = values.next();
      expect(k.value === '3' && v.value === 3).toBe(true);
      // insertion of previously-removed item goes to the end
      o.set('2', 2);
      k = keys.next();
      v = values.next();
      expect(k.value === '2' && v.value === 2).toBe(true);
      // when called again, new iterator starts from beginning
      entriesagain = o.entries();
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
      e = entriesagain.next();
      expect(e.done).toBe(false);
      expect(e.value[0]).toBe('4');
      expect(entriesagain.next().done).toBe(true);
    });

    it('MapObject#forEach', function () {
      var o = new MapObject();
      o.set('key 0', 0);
      o.set('key 1', 1);
      o.forEach(function (value, key, obj) {
        expect('key ' + value).toBe(key);
        expect(obj).toBe(o);
        // even if dropped, keeps looping
        o['delete'](key);
      });
      expect(!o.size).toBe(true);
    });

    it('MapObject#forEach with mutations', function () {
      var o = new MapObject([
          ['0', 0],
          ['1', 1],
          ['2', 2]
        ]),
        seen = [];
      o.forEach(function (value, key, obj) {
        seen.push(value);
        expect(obj).toBe(o);
        expect(String(value)).toBe(key);
        // mutations work as expected
        if (value === 1) {
          o['delete']('0'); // remove from before current index
          o['delete']('2'); // remove from after current index
          o.set('3', 3); // insertion
        } else if (value === 3) {
          o.set('0', 0); // insertion at the end
        }
      });
      expect(seen).toEqual([0, 1, 3, 0]);
    });

    it('MapObject#clear', function () {
      var o = new MapObject();
      o.set(1, '1');
      o.set(2, '2');
      o.set(3, '3');
      o.clear();
      expect(!o.size).toBe(true);
    });

    it('SetObject existence', function () {
      expect(typeof SetObject).toBe('function');
    });

    it('SetObject constructor behavior', function () {
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

    it('SetObject constructor behavior, string should iterate', function () {
      var s = new SetObject('123');
      expect(s.has('1')).toBe(true);
      expect(s.has('2')).toBe(true);
      expect(s.has('3')).toBe(true);
      expect(s.size).toBe(3);
    });

    it('SetObject#size - Mozilla only', function () {
      var o = new SetObject();
      if ('size' in o) {
        expect(o.size).toBe(0);
        o.add('a');
        expect(o.size).toBe(1);
        o['delete']('a');
        expect(o.size).toBe(0);
      }
    });

    it('SetObject#add', function () {
      var o = new SetObject();
      expect(o.add(NaN)).toBe(o);
      expect(o.has(NaN)).toBe(true);
    });

    it('SetObject#["delete"]', function () {
      var o = new SetObject(),
        generic = {},
        callback = function () {};
      o.add(callback);
      o.add(generic);
      o.add(o);
      expect(o.has(callback) && o.has(generic) && o.has(o)).toBe(true);
      o['delete'](callback);
      o['delete'](generic);
      o['delete'](o);
      expect(!o.has(callback) && !o.has(generic) && !o.has(o)).toBe(true);
      expect(o['delete'](o)).toBe(false);
      o.add(o);
      expect(o['delete'](o)).toBe(true);
    });

    it('values behavior', function () {
      // test that things get returned in insertion order as per the specs
      var o = new SetObject([1, 2, 3]),
        values = o.values(),
        v = values.next(),
        entriesagain;
      expect(o.keys).toBe(o.values); // same function, as per the specs
      expect(v.value).toBe(1);
      o['delete'](2);
      v = values.next();
      expect(v.value).toBe(3);
      // insertion of previously-removed item goes to the end
      o.add(2);
      v = values.next();
      expect(v.value).toBe(2);
      // when called again, new iterator starts from beginning
      entriesagain = o.entries();
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

    it('SetObject#has', function () {
      var o = new SetObject(),
        callback = function () {};
      expect(o.has(callback)).toBe(false);
      o.add(callback);
      expect(o.has(callback)).toBe(true);
    });

    it('SetObject#forEach', function () {
      var o = new SetObject(),
        i = 0;
      o.add('value 0');
      o.add('value 1');
      o.forEach(function (value, sameValue, obj) {
        expect('value ' + i).toBe(value);
        i += 1;
        expect(obj).toBe(o);
        expect(sameValue).toBe(value);
        // even if dropped, keeps looping
        o['delete'](value);
      });
      expect(!o.size).toBe(true);
    });

    it('SetObject#forEach with mutations', function () {
      var o = new SetObject([0, 1, 2]),
        seen = [];
      o.forEach(function (value, sameValue, obj) {
        seen.push(value);
        expect(obj).toBe(o);
        expect(sameValue).toBe(value);
        // mutations work as expected
        if (value === 1) {
          o['delete'](0); // remove from before current index
          o['delete'](2); // remove from after current index
          o.add(3); // insertion
        } else if (value === 3) {
          o.add(0); // insertion at the end
        }
      });
      expect(seen).toEqual([0, 1, 3, 0]);
    });

    it('SetObject#clear', function () {
      var o = new SetObject();
      o.add(1);
      o.add(2);
      o.clear();
      expect(!o.size).toBe(true);
    });

    it('Set#add, Map#set are chainable now', function () {
      var s = new SetObject(),
        m = new MapObject(),
        a = {};
      s.add(1).add(2);
      expect(s.has(1) && s.has(2) && s.size).toBe(2);
      m.set(1, 1).set(a, 2);
      expect(m.has(1) && m.has(a) && m.size).toBe(2);
    });

    it('Recognize any iterable as the constructor input', function () {
      var a = new SetObject(new SetObject([1, 2]));
      expect(a.has(1)).toBe(true);
    });
  });
}());
