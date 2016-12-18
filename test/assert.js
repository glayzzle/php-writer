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
    this.obj.should.deepEqual(ast[1]);
  }, false
);

module.exports = should;
