<a href="https://travis-ci.org/Xotic750/collections-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/collections-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/collections-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/collections-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/collections-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/collections-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/collections-x" title="npm version">
<img src="https://badge.fury.io/js/collections-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_collections-x"></a>

## collections-x

ES6 collections fallback library: Map and Set.

- [collections-x](#module_collections-x)
  - [`.isMap`](#module_collections-x.isMap) ⇒ <code>boolean</code>
  - [`.isSet`](#module_collections-x.isSet) ⇒ <code>boolean</code>
  - [`.MapConstructor`](#module_collections-x.MapConstructor)
    - [`.clear`](#module_collections-x.MapConstructor+clear) ⇒ <code>Object</code>
    - [`.delete`](#module_collections-x.MapConstructor+delete) ⇒ <code>boolean</code>
    - [`.entries`](#module_collections-x.MapConstructor+entries) ⇒ <code>Object</code>
    - [`.forEach`](#module_collections-x.MapConstructor+forEach) ⇒ <code>Object</code>
    - [`.get`](#module_collections-x.MapConstructor+get) ⇒ <code>\*</code>
    - [`.keys`](#module_collections-x.MapConstructor+keys) ⇒ <code>Object</code>
    - [`.set`](#module_collections-x.MapConstructor+set) ⇒ <code>Object</code>
    - [`.size`](#module_collections-x.MapConstructor+size) : <code>number</code>
    - [`.values`](#module_collections-x.MapConstructor+values) ⇒ <code>Object</code>
    - [`.has(key)`](#module_collections-x.MapConstructor+has) ⇒ <code>boolean</code>
    - [`.symIt()`](#module_collections-x.MapConstructor+symIt) ⇒ <code>Object</code>
  - [`.SetConstructor`](#module_collections-x.SetConstructor)
    - [`.add`](#module_collections-x.SetConstructor+add) ⇒ <code>Object</code>
    - [`.clear`](#module_collections-x.SetConstructor+clear) ⇒ <code>Object</code>
    - [`.delete`](#module_collections-x.SetConstructor+delete) ⇒ <code>boolean</code>
    - [`.forEach`](#module_collections-x.SetConstructor+forEach) ⇒ <code>Object</code>
    - [`.size`](#module_collections-x.SetConstructor+size) : <code>number</code>
    - [`.entries()`](#module_collections-x.SetConstructor+entries) ⇒ <code>Object</code>
    - [`.has(value)`](#module_collections-x.SetConstructor+has) ⇒ <code>boolean</code>
    - [`.keys()`](#module_collections-x.SetConstructor+keys) ⇒ <code>Object</code>
    - [`.values()`](#module_collections-x.SetConstructor+values) ⇒ <code>Object</code>
    - [`.symIt()`](#module_collections-x.SetConstructor+symIt) ⇒ <code>Object</code>
  - [`.symIt`](#module_collections-x.symIt)

<a name="module_collections-x.isMap"></a>

### `collections-x.isMap` ⇒ <code>boolean</code>

Determine if an `object` is a `Map`.

**Kind**: static property of [<code>collections-x</code>](#module_collections-x)  
**Returns**: <code>boolean</code> - `true` if the `object` is a `Map`,
else `false`.

| Param  | Type            | Description         |
| ------ | --------------- | ------------------- |
| object | <code>\*</code> | The object to test. |

**Example**

```js
import {isMap} from 'collections-x';

const m = new MapConstructor();

console.log(isMap([])); // false
console.log(isMap(true)); // false
console.log(isMap(m)); // true
```

<a name="module_collections-x.isSet"></a>

### `collections-x.isSet` ⇒ <code>boolean</code>

Determine if an `object` is a `Set`.

**Kind**: static property of [<code>collections-x</code>](#module_collections-x)  
**Returns**: <code>boolean</code> - `true` if the `object` is a `Set`,
else `false`.

| Param  | Type            | Description         |
| ------ | --------------- | ------------------- |
| object | <code>\*</code> | The object to test. |

**Example**

```js
import {isSet} from 'collections-x';

const s = new SetConstructor();

console.log(isSet([])); // false
console.log(isSet(true)); // false
console.log(isSet(s)); // true
```

<a name="module_collections-x.MapConstructor"></a>

### `collections-x.MapConstructor`

**Kind**: static property of [<code>collections-x</code>](#module_collections-x)

- [`.MapConstructor`](#module_collections-x.MapConstructor)
  - [`.clear`](#module_collections-x.MapConstructor+clear) ⇒ <code>Object</code>
  - [`.delete`](#module_collections-x.MapConstructor+delete) ⇒ <code>boolean</code>
  - [`.entries`](#module_collections-x.MapConstructor+entries) ⇒ <code>Object</code>
  - [`.forEach`](#module_collections-x.MapConstructor+forEach) ⇒ <code>Object</code>
  - [`.get`](#module_collections-x.MapConstructor+get) ⇒ <code>\*</code>
  - [`.keys`](#module_collections-x.MapConstructor+keys) ⇒ <code>Object</code>
  - [`.set`](#module_collections-x.MapConstructor+set) ⇒ <code>Object</code>
  - [`.size`](#module_collections-x.MapConstructor+size) : <code>number</code>
  - [`.values`](#module_collections-x.MapConstructor+values) ⇒ <code>Object</code>
  - [`.has(key)`](#module_collections-x.MapConstructor+has) ⇒ <code>boolean</code>
  - [`.symIt()`](#module_collections-x.MapConstructor+symIt) ⇒ <code>Object</code>

<a name="module_collections-x.MapConstructor+clear"></a>

#### `map.clear` ⇒ <code>Object</code>

The clear() method removes all elements from a Map object.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - The Map object.  
**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('bar', 'baz');
myMap.set(1, 'foo');

console.log(myMap.size); // 2
console.log(myMap.has('bar')); // true

myMap.clear();

console.log(myMap.size); // 0
console.log(myMap.has('bar')); // false
```

<a name="module_collections-x.MapConstructor+delete"></a>

#### `map.delete` ⇒ <code>boolean</code>

The delete() method removes the specified element from a Map object.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>boolean</code> - Returns true if an element in the Map object has been
removed successfully.

| Param | Type            | Description                                           |
| ----- | --------------- | ----------------------------------------------------- |
| key   | <code>\*</code> | The key of the element to remove from the Map object. |

**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('bar', 'foo');

myMap.delete('bar'); // Returns true. Successfully removed.
myMap.has('bar'); // Returns false.
// The "bar" element is no longer present.
```

<a name="module_collections-x.MapConstructor+entries"></a>

#### `map.entries` ⇒ <code>Object</code>

The entries() method returns a new Iterator object that contains the
[key, value] pairs for each element in the Map object in insertion order.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {MapConstructor} from 'collections-x';
const myMap = new MapConstructor();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

const mapIter = myMap.entries();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```

<a name="module_collections-x.MapConstructor+forEach"></a>

#### `map.forEach` ⇒ <code>Object</code>

The forEach() method executes a provided function once per each
key/value pair in the Map object, in insertion order.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - The Map object.

| Param     | Type                  | Description                                   |
| --------- | --------------------- | --------------------------------------------- |
| callback  | <code>function</code> | Function to execute for each element.         |
| [thisArg] | <code>\*</code>       | Value to use as this when executing callback. |

**Example**

```js
import {MapConstructor} from 'collections-x';

function logElements(value, key, map) {
  console.log('m[' + key + '] = ' + value);
}

const myMap = new MapConstructor([['foo', 3], ['bar', {}], ['baz', undefined]]);
myMap.forEach(logElements);
// logs:
// "m[foo] = 3"
// "m[bar] = [object Object]"
// "m[baz] = undefined"
```

<a name="module_collections-x.MapConstructor+get"></a>

#### `map.get` ⇒ <code>\*</code>

The get() method returns a specified element from a Map object.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>\*</code> - Returns the element associated with the specified key or
undefined if the key can't be found in the Map object.

| Param | Type            | Description                                           |
| ----- | --------------- | ----------------------------------------------------- |
| key   | <code>\*</code> | The key of the element to return from the Map object. |

**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('bar', 'foo');

myMap.get('bar'); // Returns "foo".
myMap.get('baz'); // Returns undefined.
```

<a name="module_collections-x.MapConstructor+keys"></a>

#### `map.keys` ⇒ <code>Object</code>

The keys() method returns a new Iterator object that contains the keys
for each element in the Map object in insertion order.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

const mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // Object
```

<a name="module_collections-x.MapConstructor+set"></a>

#### `map.set` ⇒ <code>Object</code>

The set() method adds a new element with a specified key and value to
a Map object.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - The Map object.

| Param | Type            | Description                                        |
| ----- | --------------- | -------------------------------------------------- |
| key   | <code>\*</code> | The key of the element to add to the Map object.   |
| value | <code>\*</code> | The value of the element to add to the Map object. |

**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();

// Add new elements to the map
myMap.set('bar', 'foo');
myMap.set(1, 'foobar');

// Update an element in the map
myMap.set('bar', 'fuuu');
```

<a name="module_collections-x.MapConstructor+size"></a>

#### `map.size` : <code>number</code>

The value of size is an integer representing how many entries the Map
object has.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set(1, true);
myMap.set(5, false);
myMap.set('some text', 1);

console.log(myMap.size); // 3
```

<a name="module_collections-x.MapConstructor+values"></a>

#### `map.values` ⇒ <code>Object</code>

The values() method returns a new Iterator object that contains the
values for each element in the Map object in insertion order.

**Kind**: instance property of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

const mapIter = myMap.values();

console.log(mapIter.next().value); // "foo"
console.log(mapIter.next().value); // "bar"
console.log(mapIter.next().value); // "baz"
```

<a name="module_collections-x.MapConstructor+has"></a>

#### `map.has(key)` ⇒ <code>boolean</code>

The has() method returns a boolean indicating whether an element with
the specified key exists or not.

**Kind**: instance method of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>boolean</code> - Returns true if an element with the specified key
exists in the Map object; otherwise false.

| Param | Type            | Description                                                    |
| ----- | --------------- | -------------------------------------------------------------- |
| key   | <code>\*</code> | The key of the element to test for presence in the Map object. |

**Example**

```js
import {MapConstructor} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('bar', 'foo');

myMap.has('bar'); // returns true
myMap.has('baz'); // returns false
```

<a name="module_collections-x.MapConstructor+symIt"></a>

#### `map.symIt()` ⇒ <code>Object</code>

The initial value of the @@iterator property is the same function object
as the initial value of the entries property.

**Kind**: instance method of [<code>Map</code>](#module_collections-x.MapConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {MapConstructor, symIt} from 'collections-x';

const myMap = new MapConstructor();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

var mapIter = myMap[symIt]();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```

<a name="module_collections-x.SetConstructor"></a>

### `collections-x.SetConstructor`

**Kind**: static property of [<code>collections-x</code>](#module_collections-x)

- [`.SetConstructor`](#module_collections-x.SetConstructor)
  - [`.add`](#module_collections-x.SetConstructor+add) ⇒ <code>Object</code>
  - [`.clear`](#module_collections-x.SetConstructor+clear) ⇒ <code>Object</code>
  - [`.delete`](#module_collections-x.SetConstructor+delete) ⇒ <code>boolean</code>
  - [`.forEach`](#module_collections-x.SetConstructor+forEach) ⇒ <code>Object</code>
  - [`.size`](#module_collections-x.SetConstructor+size) : <code>number</code>
  - [`.entries()`](#module_collections-x.SetConstructor+entries) ⇒ <code>Object</code>
  - [`.has(value)`](#module_collections-x.SetConstructor+has) ⇒ <code>boolean</code>
  - [`.keys()`](#module_collections-x.SetConstructor+keys) ⇒ <code>Object</code>
  - [`.values()`](#module_collections-x.SetConstructor+values) ⇒ <code>Object</code>
  - [`.symIt()`](#module_collections-x.SetConstructor+symIt) ⇒ <code>Object</code>

<a name="module_collections-x.SetConstructor+add"></a>

#### `set.add` ⇒ <code>Object</code>

The add() method appends a new element with a specified value to the end
of a Set object.

**Kind**: instance property of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - The Set object.

| Param | Type            | Description                                                  |
| ----- | --------------- | ------------------------------------------------------------ |
| value | <code>\*</code> | Required. The value of the element to add to the Set object. |

**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();

mySet.add(1);
mySet.add(5).add('some text'); // chainable

console.log(mySet);
// Set [1, 5, "some text"]
```

<a name="module_collections-x.SetConstructor+clear"></a>

#### `set.clear` ⇒ <code>Object</code>

The clear() method removes all elements from a Set object.

**Kind**: instance property of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - The Set object.  
**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add(1);
mySet.add('foo');

console.log(mySet.size); // 2
mySet.has('foo'); // true

mySet.clear();

console.log(mySet.size); // 0
mySet.has('bar'); // false
```

<a name="module_collections-x.SetConstructor+delete"></a>

#### `set.delete` ⇒ <code>boolean</code>

The delete() method removes the specified element from a Set object.

**Kind**: instance property of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>boolean</code> - Returns true if an element in the Set object has been
removed successfully; otherwise false.

| Param | Type            | Description                                             |
| ----- | --------------- | ------------------------------------------------------- |
| value | <code>\*</code> | The value of the element to remove from the Set object. |

**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add('foo');

mySet.delete('bar'); // Returns false. No "bar" element found
//to be deleted.
mySet.delete('foo'); // Returns true.  Successfully removed.

mySet.has('foo'); // Returns false. The "foo" element is no
//longer present.
```

<a name="module_collections-x.SetConstructor+forEach"></a>

#### `set.forEach` ⇒ <code>Object</code>

The forEach() method executes a provided function once per each value
in the Set object, in insertion order.

**Kind**: instance property of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - The Set object.

| Param     | Type                  | Description                                   |
| --------- | --------------------- | --------------------------------------------- |
| callback  | <code>function</code> | Function to execute for each element.         |
| [thisArg] | <code>\*</code>       | Value to use as this when executing callback. |

**Example**

```js
function logSetElements(value1, value2, set) {
  console.log('s[' + value1 + '] = ' + value2);
}

new SetConstructor(['foo', 'bar', undefined]).forEach(logSetElements);

// logs:
// "s[foo] = foo"
// "s[bar] = bar"
// "s[undefined] = undefined"
```

<a name="module_collections-x.SetConstructor+size"></a>

#### `set.size` : <code>number</code>

The value of size is an integer representing how many entries the Set
object has.

**Kind**: instance property of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add(1);
mySet.add(5);
mySet.add('some text');

console.log(mySet.size); // 3
```

<a name="module_collections-x.SetConstructor+entries"></a>

#### `set.entries()` ⇒ <code>Object</code>

The entries() method returns a new Iterator object that contains an
array of [value, value] for each element in the Set object, in
insertion order. For Set objects there is no key like in Map objects.
However, to keep the API similar to the Map object, each entry has the
same value for its key and value here, so that an array [value, value]
is returned.

**Kind**: instance method of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add('foobar');
mySet.add(1);
mySet.add('baz');

const setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```

<a name="module_collections-x.SetConstructor+has"></a>

#### `set.has(value)` ⇒ <code>boolean</code>

The has() method returns a boolean indicating whether an element with the
specified value exists in a Set object or not.

**Kind**: instance method of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>boolean</code> - Returns true if an element with the specified value
exists in the Set object; otherwise false.

| Param | Type            | Description                                       |
| ----- | --------------- | ------------------------------------------------- |
| value | <code>\*</code> | The value to test for presence in the Set object. |

**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add('foo');

mySet.has('foo'); // returns true
mySet.has('bar'); // returns false
```

<a name="module_collections-x.SetConstructor+keys"></a>

#### `set.keys()` ⇒ <code>Object</code>

The keys() method is an alias for the `values` method (for similarity
with Map objects); it behaves exactly the same and returns values of
Set elements.

**Kind**: instance method of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add('foo');
mySet.add('bar');
mySet.add('baz');

const setIter = mySet.keys();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

<a name="module_collections-x.SetConstructor+values"></a>

#### `set.values()` ⇒ <code>Object</code>

The values() method returns a new Iterator object that contains the
values for each element in the Set object in insertion order.

**Kind**: instance method of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {SetConstructor} from 'collections-x';

const mySet = new SetConstructor();
mySet.add('foo');
mySet.add('bar');
mySet.add('baz');

const setIter = mySet.values();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

<a name="module_collections-x.SetConstructor+symIt"></a>

#### `set.symIt()` ⇒ <code>Object</code>

The initial value of the @@iterator property is the same function object
as the initial value of the values property.

**Kind**: instance method of [<code>Set</code>](#module_collections-x.SetConstructor)  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**

```js
import {SetConstructor, symIt} from 'collections-x';

const mySet = new SetConstructor();
mySet.add('0');
mySet.add(1);
mySet.add({});

const setIter = mySet[symIt]();

console.log(setIter.next().value); // "0"
console.log(setIter.next().value); // 1
console.log(setIter.next().value); // Object
```

<a name="module_collections-x.symIt"></a>

### `collections-x.symIt`

The iterator identifier that is in use.

type {Symbol|string}

**Kind**: static property of [<code>collections-x</code>](#module_collections-x)
