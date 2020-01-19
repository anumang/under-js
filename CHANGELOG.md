# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.1.0-beta] - 2020-01-16
### Added
- `get` Object value getter with property key path and default value
```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
get(object, 'a[0].b.c');
//> 3 

get(object, 'b', 2);
//> 2 
```

- `set` Object value setter with property key path and value
```js
const object = { 'a': [{ 'b': { 'c': 3 } }] }

set(object, 'a[0].b.c', 4)
//> { 'a': [{ 'b': { 'c': 4 } }] }
 
set(object, 'a/0/b/c', 2) // or set(object, 'a\0\b\c', 2)
//> { 'a': [{ 'b': { 'c': 2 } }] }
 
set(object, ['a', '0', 'c'], 2)
//> { 'a': [{ 'b': { 'c': 3 } }] }
```

- `isEq` Compare deep level equality with more control to swtich comparison algorithms in detail.
```js
// With defaults:
// {eqStrict: false, eqNaN: true, eqZero: true, excludes: []}

isEq({a: {b: c: '1'}}, {a: {b: c: 1}})
//> true

isEq({a: false}, {a: 0})
//> true

isEq({a: ""}, {a: 0})
//> true

isEq({a: -0}, {a: 0})
//> true
 
isEq({a: NaN}, {a: Nan})
//> true
 
// With eqStrict:
// {eqStrict: true, eqNaN: true, eqZero: true, excludes: []}

isEq({a: {b: c: '1'}}, {a: {b: c: 1}}, {eqStrict: true})
//> false
 
isEq({a: false}, {a: 0}, {eqStrict: true})
//> false

isEq({a: ""}, {a: 0}, {eqStrict: true})
//> false

isEq({a: -0}, {a: 0}, {eqStrict: true})
//> true
 
isEq({a: NaN}, {a: Nan}, {eqStrict: true})
//> true

// With eqNaN: 
// {eqStrict: false, eqNaN: false, eqZero: true, excludes: []}

isEq({a: {b: c: '1'}}, {a: {b: c: 1}}, {eqNaN: false})
//> true

isEq({a: false}, {a: 0}, {eqNaN: false})
//> true

isEq({a: ""}, {a: 0}, {eqNaN: false})
//> true

isEq({a: -0}, {a: 0}, {eqNaN: false})
//> true
 
isEq({a: NaN}, {a: Nan}, {eqNaN: false})
//> false
 
// With eqZero
// {eqStrict: false, eqNaN: true, eqZero: false, excludes: []}

isEq({a: {b: c: '1'}}, {a: {b: c: 1}}, {eqZero: false})
//> true
 
isEq({a: false}, {a: 0}, {eqZero: false})
//> true

isEq({a: ""}, {a: 0}, {eqZero: false})
//> true

isEq({a: -0}, {a: 0}, {eqZero: false})
//> false
 
isEq({a: NaN}, {a: Nan}, {eqZero: false})
//> false

// with excludes:
// {eqStrict: false, eqNaN: true, eqZero: true, excludes: []}

isEq({a: {b: c: '1'}}, {a: {b: c: 2}}, {excludes: ['c']})
//> true 

isEq({a: 1}, {a: 0}, {excludes: ['a']})
//> true 
```

- `isNil` Check not defined values if and only if null or udefined
```js
isNil(undefined)
//> true

isNil(null)
 //> true

isNil(void 0)
//> true
 
isNil('')
//> false

isNil(0)
//> false
```

- `pick` Object property picker with key/s or predicate
```js
const object = { 'a': 0, 'b': 1, 'c': 2 }] }

pick(object, 'a')
//> {a: 0}
 
pick(object, ['a', 'b'])
//> {a: 0, b: 1}

pick(object, Boolean)
//> {b: 1, c: 2}
```

- `diff` Find difference between array of values
```js
const arr = [1,2,3]

diff(arr, [1])
//> [2, 3]

diff(arr, [1,2])
//> [3]

diff(arr, [1,2], (c1, c2) => c1 == (c2 + 1))
//> [1]
```

- `keyBy` Array to map by using prop values
```js
const arr = [{a: 1}, {a: 2, b: 3}, {a: 3, b: 4}]

keyBy(arr, 'a')
//> {1: {a: 1}, 2: {a: 2, b: 3}, 3: {a: 3, b: 4}}
 
keyBy(arr, 'b')
//> {undefined: {a: 1}, 3: {a: 2, b: 3}, 4: {a: 3, b: 4}}

keyBy(arr, 'b', (keyVal) => keyVal || 'NaN')
//> {NaN: {a: 1}, 3: {a: 2, b: 3}, 4: {a: 3, b: 4}}
```