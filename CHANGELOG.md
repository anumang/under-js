# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.1.0-beta] - 2020-01-15
### Added
- `get` Object value getter with property key path and default value, base on [Reflect.get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get).
```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
get(object, 'a[0].b.c');
// >> 3 

get(object, 'b', 2);
// >> 2 
```