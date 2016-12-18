# php-writer

[![Build Status](https://travis-ci.org/glayzzle/php-writer.svg?branch=master)](https://travis-ci.org/glayzzle/php-writer)

[![Coverage Status](https://coveralls.io/repos/github/glayzzle/php-writer/badge.svg?branch=master)](https://coveralls.io/github/glayzzle/php-writer?branch=master)

[![Gitter](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/glayzzle/Lobby)

Update PHP scripts from their AST by using [php-parser](https://github.com/glayzzle/php-parser) for reading
and [php-unparser](https://github.com/chris-l/php-unparser) for generating back the php.


## Example

```js
var writer = require('php-writer');
var fs = require('fs');
var contents = fs.readFileSync('my-php-file.php');
var myPhpFile = new writer(contents);
myPhpFile.findFunction('foo').setBody('return $a + $b');
console.log(myPhpFile.toString());
```
