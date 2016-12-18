/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var should = require('should');

should.Assertion.add(
  'AST',
  function(code) {
    this.params = { operator: 'to be AST' }
    var ast;
    (function parseCode() {
      ast = parser.parseEval(code, {
        parser: {
          extractDoc: true
        }
      });
    }).should.not.throw(code);
    this.obj.should.be.Array();
    if (typeof this.obj[0] === 'string') {
      // just check one node
      this.obj.should.deepEqual(ast[1][0]);
    } else {
      // check a body
      this.obj.should.deepEqual(ast[1]);
    }
  }, false
);

module.exports = should;
