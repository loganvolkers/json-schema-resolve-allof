# JSON Schema Resolve Allof

Some simple code to resolve the `allof` references in [JSON Schema](http://json-schema.org/)

## Usage

```
npm install json-schema-resolve-allof --save
```

Usage

```js 
var resolveAllOf = require('json-schema-resolve-allof');

resolveAllOf({
  "type": "string",
  "allOf": [{
      "properties": {
        "lastName": {
          "type": "string"
        }
      }
    },
    {
      "properties": {
        "lastName": {
          "type": "string"
        }
      }
    }
  ]
});

// Returns:
// {
//  "type": "string",
//  "properties": {
//    "lastName": {
//      "type": "string"
//    },
//    "lastName": {
//      "type": "string"
//    }
//  }
// }
```