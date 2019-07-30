import {
  MapImplementation as MapConstructor,
  isMapImplementation as isMap,
  SetImplementation as SetConstructor,
  isSetImplementation as isSet,
  symIt,
} from '../src/collections-x';

const hasOwn = Object.prototype.hasOwnProperty;
const functionsHaveNames = function foo() {}.name === 'foo';
const ifFunctionsHaveNamesIt = functionsHaveNames ? it : xit;

const itSetPrototypeOf = Object.setPrototypeOf ? it : xit;

describe('collections', function() {
  const proto = '__proto__';

  describe('map', function() {
    it('existence', function() {
      expect.assertions(1);
      expect(typeof MapConstructor).toBe('function');
    });

    it('should have the correct arity', function() {
      expect.assertions(2);
      expect(hasOwn.call(MapConstructor, 'length')).toBe(true);
      expect(MapConstructor).toHaveLength(0);
    });

    it('should have valid getter and setter calls', function() {
      expect.assertions(10);
      const map = new MapConstructor();
      const props = ['has', 'set', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', 'size', symIt];
      props.forEach(function(method) {
        if (method === 'size') {
          expect(typeof map[method] === 'number').toBe(true, method);
        } else {
          expect(typeof map[method] === 'function').toBe(true, method);
        }
      });
    });

    ifFunctionsHaveNamesIt('should have correct names', function() {
      const map = new MapConstructor();
      const props = ['has', 'set', 'clear', 'forEach', 'values', 'entries', 'keys'];
      props.forEach(function(method) {
        expect(map[method].name).toBe(method);
      });
    });

    it('should not be callable without "new"', function() {
      expect.assertions(2);
      let threw = false;
      try {
        /* eslint-disable-next-line babel/new-cap */
        MapConstructor();
      } catch (e) {
        expect(e).toStrictEqual(expect.any(TypeError));
        threw = true;
      }

      expect(threw).toBe(true);
    });

    it('constructor behavior', function() {
      expect.assertions(7);
      const a = 1;
      const b = {};
      const c = new MapConstructor();
      const m = new MapConstructor([[a, 1], [b, 2], [c, 3]]);
      expect(new MapConstructor()).toStrictEqual(expect.any(MapConstructor));
      expect(m.has(a)).toBe(true);
      expect(m.has(b)).toBe(true);
      expect(m.has(c)).toBe(true);
      expect(m.size).toBe(3);

      if (proto in {}) {
        expect(new MapConstructor()[proto].isPrototypeOf(new MapConstructor())).toBe(true);
        expect(new MapConstructor()[proto]).toBe(MapConstructor.prototype);
      }
    });

    it('constructor behavior using another Map', function() {
      expect.assertions(4);
      const a = 1;
      const b = {};
      const c = new MapConstructor();
      const m = new MapConstructor([[a, 1], [b, 2], [c, 3]]);
      const d = new MapConstructor(m);
      expect(d.has(a)).toBe(true);
      expect(d.has(b)).toBe(true);
      expect(d.has(c)).toBe(true);
      expect(d.size).toBe(3);
    });

    it('constructor behavior, string should throw', function() {
      expect.assertions(2);
      let threw = false;
      try {
        /* eslint-disable-next-line no-new */
        new MapConstructor('123');
      } catch (e) {
        expect(e).toStrictEqual(expect.any(TypeError));
        threw = true;
      }

      expect(threw).toBe(true);
    });

    it('constructor behavior, not entry object should throw', function() {
      expect.assertions(2);
      let threw = false;
      try {
        /* eslint-disable-next-line no-new */
        new MapConstructor([1, 2, 3]);
      } catch (e) {
        expect(e).toStrictEqual(expect.any(TypeError));
        threw = true;
      }

      expect(threw).toBe(true);
    });

    it('constructor behavior using a Set should throw', function() {
      expect.assertions(2);
      const a = 1;
      const b = {};
      const c = new MapConstructor();
      const s = new SetConstructor([a, b, c]);
      let threw = false;
      try {
        /* eslint-disable-next-line no-new */
        new MapConstructor(s);
      } catch (e) {
        expect(e).toStrictEqual(expect.any(TypeError));
        threw = true;
      }

      expect(threw).toBe(true);
    });

    it('size - Mozilla only', function() {
      expect.assertions(3);
      const o = new MapConstructor();

      if ('size' in o) {
        expect(o.size).toBe(0);
        o.set('a', 'a');
        expect(o.size).toBe(1);
        o.delete('a');
        expect(o.size).toBe(0);
      }
    });

    it('has', function() {
      expect.assertions(2);
      const o = new MapConstructor();
      const generic = {};
      const callback = function() {};

      expect(o.has(callback)).toBe(false);
      o.set(callback, generic);
      expect(o.has(callback)).toBe(true);
    });

    it('get', function() {
      expect.assertions(2);
      const o = new MapConstructor();
      const generic = {};
      const callback = function() {};

      o.set(callback, generic);
      expect(o.get(callback, 123)).toBe(generic);
      expect(o.get(callback)).toBe(generic);
    });

    it('set', function() {
      expect.assertions(18);
      const o = new MapConstructor();
      const generic = {};
      const callback = function() {};

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
      expect(o.get('key')).toBeUndefined();
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

    it('delete', function() {
      expect.assertions(4);
      const o = new MapConstructor();
      const generic = {};
      const callback = function() {};

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

    it('non object key does not throw an error', function() {
      expect.assertions(1);
      const o = new MapConstructor();
      let threw = false;
      try {
        o.set('key', o);
      } catch (emAll) {
        threw = true;
      }

      expect(threw).toBe(false);
    });

    it('keys, values, entries behavior', function() {
      expect.assertions(12); // test that things get returned in insertion order as per the specs
      const o = new MapConstructor([['1', 1], ['2', 2], ['3', 3]]);
      const keys = o.keys();
      const values = o.values();
      let k = keys.next();
      let v = values.next();
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
      const entriesagain = o.entries();
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
      const e = entriesagain.next();
      expect(e.done).toBe(false);
      expect(e.value[0]).toBe('4');
      expect(entriesagain.next().done).toBe(true);
    });

    it('forEach', function() {
      expect.assertions(5);
      const o = new MapConstructor();
      o.set('key 0', 0);
      o.set('key 1', 1);
      o.forEach(function(value, key, obj) {
        expect(`key ${value}`).toBe(key);
        expect(obj).toBe(o);
        // even if dropped, keeps looping
        o.delete(key);
      });
      expect(!o.size).toBe(true);
    });

    it('forEach with mutations', function() {
      expect.assertions(9);
      const o = new MapConstructor([['0', 0], ['1', 1], ['2', 2]]);
      const seen = [];
      o.forEach(function(value, key, obj) {
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
      expect(seen).toStrictEqual([0, 1, 3, 0]);
    });

    it('clear', function() {
      expect.assertions(1);
      const o = new MapConstructor();
      o.set(1, '1');
      o.set(2, '2');
      o.set(3, '3');
      o.clear();
      expect(!o.size).toBe(true);
    });

    it('treats positive and negative zero the same', function() {
      expect.assertions(7);
      const value1 = {};
      const value2 = {};
      const map = new MapConstructor();
      map.set(0, value1);
      expect(map.size).toBe(1);
      expect(map.has(-0)).toBe(true);
      expect(map.get(-0)).toBe(value1);
      expect(map.set(-0, value2)).toBe(map);
      expect(map.size).toBe(1);
      expect(map.get(-0)).toBe(value2);
      expect(map.get(0)).toBe(value2);
    });

    itSetPrototypeOf('should be subclassable', function() {
      const MyMap = function() {
        const testMap = new MapConstructor([['a', 'b']]);
        Object.setPrototypeOf(testMap, MyMap.prototype);

        return testMap;
      };

      Object.setPrototypeOf(MyMap, MapConstructor);
      MyMap.prototype = Object.create(MapConstructor.prototype, {constructor: {value: MyMap}});

      const myMap = new MyMap();
      expect(myMap.has('c')).toBe(false);
      expect(myMap.get('c')).toBeUndefined();
      expect(myMap.set('c', 'd')).toBe(myMap);
      expect(myMap.get('c')).toBe('d');
      expect(myMap.has('c')).toBe(true);
      expect(myMap.size).toBe(2);
      const arr = [];
      myMap.forEach(function(value, key) {
        arr.push([key, value]);
      });
      expect(arr).toStrictEqual([['a', 'b'], ['c', 'd']]);
    });

    it('uses SameValueZero even on a Map of size > 4', function() {
      expect.assertions(5); // Chrome 38-42, node 0.11/0.12, iojs 1/2 have a bug when the Map
      // has a size > 4
      const firstFour = [[1, 0], [2, 0], [3, 0], [4, 0]];
      const fourMap = new MapConstructor(firstFour);
      expect(fourMap.size).toBe(4);
      expect(fourMap.has(-0)).toBe(false);
      expect(fourMap.has(0)).toBe(false);

      fourMap.set(-0, fourMap);

      expect(fourMap.has(0)).toBe(true);
      expect(fourMap.has(-0)).toBe(true);
    });

    it('should allow common ECMAScript idioms', function() {
      expect.assertions(5);
      expect(new MapConstructor()).toStrictEqual(expect.any(MapConstructor));
      expect(typeof MapConstructor.prototype.get).toBe('function');
      expect(typeof MapConstructor.prototype.set).toBe('function');
      expect(typeof MapConstructor.prototype.has).toBe('function');
      expect(typeof MapConstructor.prototype.delete).toBe('function');
    });

    it('add, set are chainable', function() {
      expect.assertions(1);
      const m = new MapConstructor();
      const a = {};
      m.set(1, 1).set(a, 2);
      expect(m.has(1) && m.has(a) && m.size).toBe(2);
    });
  });

  describe('set', function() {
    it('existence', function() {
      expect.assertions(1);
      expect(typeof SetConstructor).toBe('function');
    });

    it('should have the correct arity', function() {
      expect.assertions(2);
      expect(hasOwn.call(SetConstructor, 'length')).toBe(true);
      expect(SetConstructor).toHaveLength(0);
    });

    it('should have valid getter and setter calls', function() {
      expect.assertions(10);
      const set = new SetConstructor();
      const props = ['has', 'add', 'clear', 'delete', 'forEach', 'values', 'entries', 'keys', 'size', symIt];
      props.forEach(function(method) {
        if (method === 'size') {
          expect(typeof set[method] === 'number').toBe(true, method);
        } else {
          expect(typeof set[method] === 'function').toBe(true, method);
        }
      });
    });

    ifFunctionsHaveNamesIt('should have correct names', function() {
      const set = new SetConstructor();
      const props = ['has', 'add', 'clear', 'forEach', 'values', 'entries'];
      props.forEach(function(method) {
        expect(set[method].name).toBe(method);
      });
    });

    it('should not be callable without "new"', function() {
      expect.assertions(2);
      let threw = false;
      try {
        /* eslint-disable-next-line babel/new-cap */
        SetConstructor();
      } catch (e) {
        expect(e).toStrictEqual(expect.any(TypeError));
        threw = true;
      }

      expect(threw).toBe(true);
    });

    it('constructor behavior', function() {
      expect.assertions(6);
      const s = new SetConstructor([1, 2]);
      expect(new SetConstructor()).toStrictEqual(expect.any(SetConstructor));
      expect(s.has(1)).toBe(true);
      expect(s.has(2)).toBe(true);
      expect(s.size).toBe(2);

      if (proto in {}) {
        expect(new SetConstructor()[proto].isPrototypeOf(new SetConstructor())).toBe(true);
        expect(new SetConstructor()[proto]).toBe(SetConstructor.prototype);
      }
    });

    it('constructor behavior, string should iterate', function() {
      expect.assertions(4);
      const s = new SetConstructor('123');
      expect(s.has('1')).toBe(true);
      expect(s.has('2')).toBe(true);
      expect(s.has('3')).toBe(true);
      expect(s.size).toBe(3);
    });

    it('size - Mozilla only', function() {
      expect.assertions(3);
      const o = new SetConstructor();

      if ('size' in o) {
        expect(o.size).toBe(0);
        o.add('a');
        expect(o.size).toBe(1);
        o.delete('a');
        expect(o.size).toBe(0);
      }
    });

    it('add', function() {
      expect.assertions(2);
      const o = new SetConstructor();
      expect(o.add(NaN)).toBe(o);
      expect(o.has(NaN)).toBe(true);
    });

    it('delete', function() {
      expect.assertions(4);
      const o = new SetConstructor();
      const generic = {};
      const callback = function() {};

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

    it('values behavior', function() {
      expect.assertions(12); // test that things get returned in insertion order as per the specs
      const o = new SetConstructor([1, 2, 3]);
      const values = o.values();
      let v = values.next();
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
      const entriesagain = o.entries();
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

    it('has', function() {
      expect.assertions(2);
      const o = new SetConstructor();
      const callback = function() {};

      expect(o.has(callback)).toBe(false);
      o.add(callback);
      expect(o.has(callback)).toBe(true);
    });

    it('forEach', function() {
      expect.assertions(7);
      const o = new SetConstructor();
      let i = 0;
      o.add('value 0');
      o.add('value 1');
      o.forEach(function(value, sameValue, obj) {
        expect(`value ${i}`).toBe(value);
        i += 1;
        expect(obj).toBe(o);
        expect(sameValue).toBe(value);
        // even if dropped, keeps looping
        o.delete(value);
      });
      expect(!o.size).toBe(true);
    });

    it('forEach with mutations', function() {
      expect.assertions(9);
      const o = new SetConstructor([0, 1, 2]);
      const seen = [];
      o.forEach(function(value, sameValue, obj) {
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
      expect(seen).toStrictEqual([0, 1, 3, 0]);
    });

    it('clear', function() {
      expect.assertions(1);
      const o = new SetConstructor();
      o.add(1);
      o.add(2);
      o.clear();
      expect(!o.size).toBe(true);
    });

    itSetPrototypeOf('should be subclassable', function() {
      const MySet = function() {
        const testSet = new SetConstructor(['a', 'b']);
        Object.setPrototypeOf(testSet, MySet.prototype);

        return testSet;
      };

      Object.setPrototypeOf(MySet, SetConstructor);
      MySet.prototype = Object.create(SetConstructor.prototype, {constructor: {value: MySet}});

      const mySet = new MySet();
      expect(mySet.has('c')).toBe(false);
      expect(mySet.add('c')).toBe(mySet);
      expect(mySet.has('c')).toBe(true);
      expect(mySet.size).toBe(3);
      const arr = [];
      mySet.forEach(function(value, key) {
        arr.push([key, value]);
      });
      expect(arr).toStrictEqual([['a', 'a'], ['b', 'b'], ['c', 'c']]);
    });

    it('treats positive and negative zero the same', function() {
      expect.assertions(5);
      const set = new SetConstructor();
      set.add(0);
      expect(set.has(-0)).toBe(true);
      expect(set.size).toBe(1);
      expect(set.add(-0)).toBe(set);
      expect(set.has(0)).toBe(true);
      expect(set.size).toBe(1);
    });

    it('recognize any iterable as the constructor input', function() {
      expect.assertions(1);
      const a = new SetConstructor(new SetConstructor([1, 2]));
      expect(a.has(1)).toBe(true);
    });

    it('add, set are chainable', function() {
      expect.assertions(1);
      const s = new SetConstructor();
      s.add(1).add(2);
      expect(s.has(1) && s.has(2) && s.size).toBe(2);
    });
  });

  describe('isMap', function() {
    it('should be false', function() {
      expect.assertions(9);
      expect(isMap()).toBe(false);
      expect(isMap(undefined)).toBe(false);
      expect(isMap(null)).toBe(false);
      expect(isMap(1)).toBe(false);
      expect(isMap(true)).toBe(false);
      expect(isMap('abc')).toBe(false);
      expect(isMap([])).toBe(false);
      expect(isMap({})).toBe(false);
      expect(isMap(new SetConstructor())).toBe(false);
    });

    it('should be true', function() {
      expect.assertions(1);
      expect(isMap(new MapConstructor())).toBe(true);
    });
  });

  describe('isSet', function() {
    it('should be false', function() {
      expect.assertions(9);
      expect(isSet()).toBe(false);
      expect(isSet(undefined)).toBe(false);
      expect(isSet(null)).toBe(false);
      expect(isSet(1)).toBe(false);
      expect(isSet(true)).toBe(false);
      expect(isSet('abc')).toBe(false);
      expect(isSet([])).toBe(false);
      expect(isSet({})).toBe(false);
      expect(isSet(new MapConstructor())).toBe(false);
    });

    it('should be true', function() {
      expect.assertions(1);
      expect(isSet(new SetConstructor())).toBe(true);
    });
  });
});
