/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

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
    this.obj.should.be.Object();
    if (typeof this.obj.kind === 'string') {
      // just check one node
      this.obj.should.deepEqual(ast.children[0]);
    } else {
      // check a body
      this.obj.should.deepEqual(ast.children);
    }
  }, false
);

should.Assertion.add(
  'Extend',
  function(name) {
    this.params = { operator: 'extend class' };
    this.obj.should.be.Object('should contain AST');
    (this.obj.extends === null).should.be.false('should contain an extends property');
    this.obj.extends.name.should.be.equal(name);
  }, false
);

module.exports = should;
