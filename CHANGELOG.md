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