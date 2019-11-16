# DEPRECATED

Try [json-schema-merge-allof](https://www.npmjs.com/package/json-schema-merge-allof) instead. It provides similar functionality to this libary, but does a merge that is semantic.

I deprecated this library because it contains bugs about how allOfs get merged in non-compliant ways. The alternative libary ([json-schema-merge-allof](https://www.npmjs.com/package/json-schema-merge-allof)) is much more thorough about producing compliant schemas after merge.


<details>
<summary>old docs</summary>
  
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

## Command Line Interface

`json-schema-resolve-allof` can also be used on the command line by piping stdin into it.

For example,
```
echo '{"allOf": [{"type": "object"}, {"additionalProperties": false}]}' | json-schema-resolve-allof
```

will return
```
{"type":"object","additionalProperties":false}
```
</details>
