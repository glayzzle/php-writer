# php-writer

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
