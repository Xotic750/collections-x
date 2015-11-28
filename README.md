<a name="module_collections-x"></a>
## collections-x
<a href="https://travis-ci.org/Xotic750/collections-x"
title="Travis status">
<img src="https://travis-ci.org/Xotic750/collections-x.svg?branch=master"
alt="Travis status" height="18">
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
alt="npm version" height="18">
</a>

ES6 collections library: Map and Set.

**Version**: 1.0.0  
**Author:** Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [collections-x](#module_collections-x)
  * [.Set](#module_collections-x.Set)
    * [`new module.exports.Set([iterable])`](#new_module_collections-x.Set_new)
    * [`.has(value)`](#module_collections-x.Set+has) ⇒ <code>boolean</code>
    * [`.add(value)`](#module_collections-x.Set+add) ⇒ <code>Object</code>
    * [`.clear()`](#module_collections-x.Set+clear) ⇒ <code>Object</code>
    * [`.delete(value)`](#module_collections-x.Set+delete) ⇒ <code>boolean</code>
    * [`.forEach(callback, [thisArg])`](#module_collections-x.Set+forEach) ⇒ <code>Object</code>
    * [`.values()`](#module_collections-x.Set+values) ⇒ <code>Object</code>
    * [`.keys()`](#module_collections-x.Set+keys) ⇒ <code>Object</code>
    * [`.entries()`](#module_collections-x.Set+entries) ⇒ <code>Object</code>
    * [`.symIt()`](#module_collections-x.Set+symIt) ⇒ <code>Object</code>
  * [.Map](#module_collections-x.Map)
    * [`new module.exports.Map([iterable])`](#new_module_collections-x.Map_new)
    * [`.has(key)`](#module_collections-x.Map+has) ⇒ <code>boolean</code>
    * [`.set(key, value)`](#module_collections-x.Map+set) ⇒ <code>Object</code>
    * [`.clear()`](#module_collections-x.Map+clear) ⇒ <code>Object</code>
    * [`.get(key)`](#module_collections-x.Map+get) ⇒ <code>\*</code>
    * [`.delete(key)`](#module_collections-x.Map+delete) ⇒ <code>boolean</code>
    * [`.forEach(callback, [thisArg])`](#module_collections-x.Map+forEach) ⇒ <code>Object</code>
    * [`.values()`](#module_collections-x.Map+values) ⇒ <code>Object</code>
    * [`.keys()`](#module_collections-x.Map+keys) ⇒ <code>Object</code>
    * [`.entries()`](#module_collections-x.Map+entries) ⇒ <code>Object</code>
    * [`.symIt()`](#module_collections-x.Map+symIt) ⇒ <code>Object</code>
  * [`.symIt`](#module_collections-x.symIt)

<a name="module_collections-x.Set"></a>
### collections-x.Set
**Kind**: static class of <code>[collections-x](#module_collections-x)</code>  

* [.Set](#module_collections-x.Set)
  * [`new module.exports.Set([iterable])`](#new_module_collections-x.Set_new)
  * [`.has(value)`](#module_collections-x.Set+has) ⇒ <code>boolean</code>
  * [`.add(value)`](#module_collections-x.Set+add) ⇒ <code>Object</code>
  * [`.clear()`](#module_collections-x.Set+clear) ⇒ <code>Object</code>
  * [`.delete(value)`](#module_collections-x.Set+delete) ⇒ <code>boolean</code>
  * [`.forEach(callback, [thisArg])`](#module_collections-x.Set+forEach) ⇒ <code>Object</code>
  * [`.values()`](#module_collections-x.Set+values) ⇒ <code>Object</code>
  * [`.keys()`](#module_collections-x.Set+keys) ⇒ <code>Object</code>
  * [`.entries()`](#module_collections-x.Set+entries) ⇒ <code>Object</code>
  * [`.symIt()`](#module_collections-x.Set+symIt) ⇒ <code>Object</code>

<a name="new_module_collections-x.Set_new"></a>
#### `new module.exports.Set([iterable])`
The Set object lets you store unique values of any type, whether primitive
values or object references.


| Param | Type | Description |
| --- | --- | --- |
| [iterable] | <code>\*</code> | If an iterable object is passed, all of its elements will be added to the new Set. null is treated as undefined. |

**Example**  
```js
var mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add("some text");
var o = {a: 1, b: 2};
mySet.add(o);

mySet.has(1); // true
mySet.has(3); // false, 3 has not been added to the set
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 4

mySet.delete(5); // removes 5 from the set
mySet.has(5);    // false, 5 has been removed

mySet.size; // 3, we just removed one value

// Relation with Array objects

var myArray = ["value1", "value2", "value3"];

// Use the regular Set constructor to transform an Array into a Set
var mySet = new Set(myArray);

mySet.has("value1"); // returns true

// Use the spread operator to transform a set into an Array.
console.log(uneval([...mySet])); // Will show you exactly the same Array
                                 // as myArray
```
<a name="module_collections-x.Set+has"></a>
#### `set.has(value)` ⇒ <code>boolean</code>
The has() method returns a boolean indicating whether an element with the
specified value exists in a Set object or not.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>boolean</code> - Returns true if an element with the specified value
 exists in the Set object; otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to test for presence in the Set object. |

**Example**  
```js
var mySet = new Set();
mySet.add("foo");

mySet.has("foo");  // returns true
mySet.has("bar");  // returns false
```
<a name="module_collections-x.Set+add"></a>
#### `set.add(value)` ⇒ <code>Object</code>
The add() method appends a new element with a specified value to the end
of a Set object.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - The Set object.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | Required. The value of the element to add to the Set  object. |

**Example**  
```js
var mySet = new Set();

mySet.add(1);
mySet.add(5).add("some text"); // chainable

console.log(mySet);
// Set [1, 5, "some text"]
```
<a name="module_collections-x.Set+clear"></a>
#### `set.clear()` ⇒ <code>Object</code>
The clear() method removes all elements from a Set object.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - The Set object.  
**Example**  
```js
var mySet = new Set();
mySet.add(1);
mySet.add("foo");

mySet.size;       // 2
mySet.has("foo"); // true

mySet.clear();

mySet.size;       // 0
mySet.has("bar")  // false
```
<a name="module_collections-x.Set+delete"></a>
#### `set.delete(value)` ⇒ <code>boolean</code>
The delete() method removes the specified element from a Set object.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>boolean</code> - Returns true if an element in the Set object has been
 removed successfully; otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value of the element to remove from the Set object. |

**Example**  
```js
var mySet = new Set();
mySet.add("foo");

mySet.delete("bar"); // Returns false. No "bar" element found
                     //to be deleted.
mySet.delete("foo"); // Returns true.  Successfully removed.

mySet.has("foo");    // Returns false. The "foo" element is no
                     //longer present.
```
<a name="module_collections-x.Set+forEach"></a>
#### `set.forEach(callback, [thisArg])` ⇒ <code>Object</code>
The forEach() method executes a provided function once per each value
in the Set object, in insertion order.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - The Set object.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to execute for each element. |
| [thisArg] | <code>\*</code> | Value to use as this when executing callback. |

**Example**  
```js
function logSetElements(value1, value2, set) {
    console.log("s[" + value1 + "] = " + value2);
}

new Set(["foo", "bar", undefined]).forEach(logSetElements);

// logs:
// "s[foo] = foo"
// "s[bar] = bar"
// "s[undefined] = undefined"
```
<a name="module_collections-x.Set+values"></a>
#### `set.values()` ⇒ <code>Object</code>
The values() method returns a new Iterator object that contains the
values for each element in the Set object in insertion order.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

var setIter = mySet.values();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```
<a name="module_collections-x.Set+keys"></a>
#### `set.keys()` ⇒ <code>Object</code>
The keys() method is an alias for the `values` method (for similarity
with Map objects); it behaves exactly the same and returns values of
Set elements.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

var setIter = mySet.keys();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```
<a name="module_collections-x.Set+entries"></a>
#### `set.entries()` ⇒ <code>Object</code>
The entries() method returns a new Iterator object that contains an
array of [value, value] for each element in the Set object, in
insertion order. For Set objects there is no key like in Map objects.
However, to keep the API similar to the Map object, each entry has the
same value for its key and value here, so that an array [value, value]
is returned.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");

var setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```
<a name="module_collections-x.Set+symIt"></a>
#### `set.symIt()` ⇒ <code>Object</code>
The initial value of the @@iterator property is the same function object
as the initial value of the values property.

**Kind**: instance method of <code>[Set](#module_collections-x.Set)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var mySet = new Set();
mySet.add("0");
mySet.add(1);
mySet.add({});

var setIter = mySet[Symbol.iterator]();

console.log(setIter.next().value); // "0"
console.log(setIter.next().value); // 1
console.log(setIter.next().value); // Object
```
<a name="module_collections-x.Map"></a>
### collections-x.Map
**Kind**: static class of <code>[collections-x](#module_collections-x)</code>  

* [.Map](#module_collections-x.Map)
  * [`new module.exports.Map([iterable])`](#new_module_collections-x.Map_new)
  * [`.has(key)`](#module_collections-x.Map+has) ⇒ <code>boolean</code>
  * [`.set(key, value)`](#module_collections-x.Map+set) ⇒ <code>Object</code>
  * [`.clear()`](#module_collections-x.Map+clear) ⇒ <code>Object</code>
  * [`.get(key)`](#module_collections-x.Map+get) ⇒ <code>\*</code>
  * [`.delete(key)`](#module_collections-x.Map+delete) ⇒ <code>boolean</code>
  * [`.forEach(callback, [thisArg])`](#module_collections-x.Map+forEach) ⇒ <code>Object</code>
  * [`.values()`](#module_collections-x.Map+values) ⇒ <code>Object</code>
  * [`.keys()`](#module_collections-x.Map+keys) ⇒ <code>Object</code>
  * [`.entries()`](#module_collections-x.Map+entries) ⇒ <code>Object</code>
  * [`.symIt()`](#module_collections-x.Map+symIt) ⇒ <code>Object</code>

<a name="new_module_collections-x.Map_new"></a>
#### `new module.exports.Map([iterable])`
The Map object is a simple key/value map. Any value (both objects and
primitive values) may be used as either a key or a value.


| Param | Type | Description |
| --- | --- | --- |
| [iterable] | <code>\*</code> | Iterable is an Array or other iterable object whose  elements are key-value pairs (2-element Arrays). Each key-value pair is  added to the new Map. null is treated as undefined. |

**Example**  
```js
var myMap = new Map();

var keyString = "a string",
    keyObj = {},
    keyFunc = function () {};

// setting the values
myMap.set(keyString, "value associated with 'a string'");
myMap.set(keyObj, "value associated with keyObj");
myMap.set(keyFunc, "value associated with keyFunc");

myMap.size; // 3

// getting the values
myMap.get(keyString);    // "value associated with 'a string'"
myMap.get(keyObj);       // "value associated with keyObj"
myMap.get(keyFunc);      // "value associated with keyFunc"

myMap.get("a string");   // "value associated with 'a string'"
                         // because keyString === 'a string'
myMap.get({});           // undefined, because keyObj !== {}
myMap.get(function() {}) // undefined, because keyFunc !== function () {}

// Using NaN as Map keys
var myMap = new Map();
myMap.set(NaN, "not a number");

myMap.get(NaN); // "not a number"

var otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"

// Relation with Array objects
var kvArray = [["key1", "value1"], ["key2", "value2"]];

// Use the regular Map constructor to transform a
// 2D key-value Array into a map
var myMap = new Map(kvArray);

myMap.get("key1"); // returns "value1"
```
<a name="module_collections-x.Map+has"></a>
#### `map.has(key)` ⇒ <code>boolean</code>
The has() method returns a boolean indicating whether an element with
the specified key exists or not.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>boolean</code> - Returns true if an element with the specified key
 exists in the Map object; otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>\*</code> | The key of the element to test for presence in the  Map object. |

**Example**  
```js
var myMap = new Map();
myMap.set("bar", "foo");

myMap.has("bar");  // returns true
myMap.has("baz");  // returns false
```
<a name="module_collections-x.Map+set"></a>
#### `map.set(key, value)` ⇒ <code>Object</code>
The set() method adds a new element with a specified key and value to
a Map object.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - The Map object.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>\*</code> | The key of the element to add to the Map object. |
| value | <code>\*</code> | The value of the element to add to the Map object. |

**Example**  
```js
var myMap = new Map();

// Add new elements to the map
myMap.set("bar", "foo");
myMap.set(1, "foobar");

// Update an element in the map
myMap.set("bar", "fuuu");
```
<a name="module_collections-x.Map+clear"></a>
#### `map.clear()` ⇒ <code>Object</code>
The clear() method removes all elements from a Map object.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - The Map object.  
**Example**  
```js
var myMap = new Map();
myMap.set("bar", "baz");
myMap.set(1, "foo");

myMap.size;       // 2
myMap.has("bar"); // true

myMap.clear();

myMap.size;       // 0
myMap.has("bar")  // false
```
<a name="module_collections-x.Map+get"></a>
#### `map.get(key)` ⇒ <code>\*</code>
The get() method returns a specified element from a Map object.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>\*</code> - Returns the element associated with the specified key or
 undefined if the key can't be found in the Map object.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>\*</code> | The key of the element to return from the Map object. |

**Example**  
```js
var myMap = new Map();
myMap.set("bar", "foo");

myMap.get("bar");  // Returns "foo".
myMap.get("baz");  // Returns undefined.
```
<a name="module_collections-x.Map+delete"></a>
#### `map.delete(key)` ⇒ <code>boolean</code>
The delete() method removes the specified element from a Map object.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>boolean</code> - Returns true if an element in the Map object has been
 removed successfully.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>\*</code> | The key of the element to remove from the Map object. |

**Example**  
```js
var myMap = new Map();
myMap.set("bar", "foo");

myMap.delete("bar"); // Returns true. Successfully removed.
myMap.has("bar");    // Returns false.
                     // The "bar" element is no longer present.
```
<a name="module_collections-x.Map+forEach"></a>
#### `map.forEach(callback, [thisArg])` ⇒ <code>Object</code>
The forEach() method executes a provided function once per each
key/value pair in the Map object, in insertion order.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - The Map object.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to execute for each element.. |
| [thisArg] | <code>\*</code> | Value to use as this when executing callback. |

**Example**  
```js
function logElements(value, key, map) {
     console.log("m[" + key + "] = " + value);
}
Map([["foo", 3], ["bar", {}], ["baz", undefined]]).forEach(logElements);
// logs:
// "m[foo] = 3"
// "m[bar] = [object Object]"
// "m[baz] = undefined"
```
<a name="module_collections-x.Map+values"></a>
#### `map.values()` ⇒ <code>Object</code>
The values() method returns a new Iterator object that contains the
values for each element in the Map object in insertion order.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.values();

console.log(mapIter.next().value); // "foo"
console.log(mapIter.next().value); // "bar"
console.log(mapIter.next().value); // "baz"
```
<a name="module_collections-x.Map+keys"></a>
#### `map.keys()` ⇒ <code>Object</code>
The keys() method returns a new Iterator object that contains the keys
for each element in the Map object in insertion order.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // Object
```
<a name="module_collections-x.Map+entries"></a>
#### `map.entries()` ⇒ <code>Object</code>
The entries() method returns a new Iterator object that contains the
[key, value] pairs for each element in the Map object in insertion order.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.entries();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```
<a name="module_collections-x.Map+symIt"></a>
#### `map.symIt()` ⇒ <code>Object</code>
The initial value of the @@iterator property is the same function object
as the initial value of the entries property.

**Kind**: instance method of <code>[Map](#module_collections-x.Map)</code>  
**Returns**: <code>Object</code> - A new Iterator object.  
**Example**  
```js
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap[iterator]();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```
<a name="module_collections-x.symIt"></a>
### `collections-x.symIt`
type {Symbol|string}

**Kind**: static property of <code>[collections-x](#module_collections-x)</code>  
