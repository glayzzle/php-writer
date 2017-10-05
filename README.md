# php-writer

[![Build Status](https://travis-ci.org/glayzzle/php-writer.svg?branch=master)](https://travis-ci.org/glayzzle/php-writer)
[![Coverage Status](https://coveralls.io/repos/github/glayzzle/php-writer/badge.svg?branch=master)](https://coveralls.io/github/glayzzle/php-writer?branch=master)
[![Gitter](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/glayzzle/Lobby)

Update PHP scripts from their AST by using [php-parser](https://github.com/glayzzle/php-parser) for reading
and [php-unparser](https://github.com/chris-l/php-unparser) for generating back the php.

## How does it works?
You must include the module to your script and feed to it a php file string.
```js
var fs = require('fs');

// Load the writer
var writer = require('php-writer');

// Read file content
var contents = fs.readFileSync('my-php-file.php', 'utf8');

// All the possible options
var options = {
  writer: {
    indent: true,
    dontUseWhitespaces: false,
    shortArray: true,
    forceNamespaceBrackets: false
  },
  parser: {
    debug: false, 
    locations: false,
    extractDoc: false,
    suppressErrors: false
  },
  lexer: {
    all_tokens: false,
    comment_tokens: false,
    mode_eval: false,
    asp_tags: false,
    short_tags: false
  },
  ast: {
    withPositions: true
  }
};

// Init the writer
var myPhpFile = new writer(contents, options);

// Print the file AST object
console.log(myPhpFile);
```

## Options
You can pass to the writer an options object to customize your writer instance:
* __writer__: The same options you would pass to [php-unparser](https://github.com/chris-l/php-unparser#how-to-use)
* __parser__: The same options you would pass to [php-parser](https://github.com/glayzzle/php-parser/wiki/Options) 
* __ast__: The same options you would pass to [php-parser](https://github.com/glayzzle/php-parser/wiki/Options) 

If you want to learn more about __AST__ you can [read the definitions](https://github.com/glayzzle/php-parser/blob/master/docs/AST.md).

## Examples
All the examples assume that you have already loaded the file like in the [example](https://github.com/glayzzle/php-writer#how-does-it-works).

##### Find a function and set its body value:
```js
var myPhpFile = new writer(contents, options);
myPhpFile.findFunction('foo').setBody('return $a + $b');
```

##### Find a class and set a property value:
```js
var myPhpFile = new writer(contents, options);
myPhpFile.findClass('Foo_Class').setProperty('bar', 'foo-bar');
```
