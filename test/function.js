/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var should = require('./assert');
var writer = require('../src/index');

describe('Function', function() {
  var test;
  var fn;

  beforeEach(function () {
    test = new writer([
      '<?php',
      'function foo($bar = 1) {',
      '\treturn $bar * 2;',
      '}'
    ].join('\n'));
    
    fn = test.findFunction('foo');
  });

  describe('#setName', function () {
    it('can set name', function () {
      fn.setName('baz');
      fn.ast.name.should.be.equal('baz');
    }); 
  });

  describe('#setArgs', function () {
    it('sets function arguments', function () {
      fn.ast.arguments.length.should.be.exactly(1);
      fn.ast.arguments[0].name.should.be.exactly('bar');
    
      fn.setArgs('int $a, $b = true');
    
      fn.ast.arguments.length.should.be.exactly(2);
    
      fn.ast.arguments[0].name.should.be.exactly('a');
      fn.ast.arguments[0].type.name.should.be.exactly('int');
      should(fn.ast.arguments[0].value).be.null();
    
      fn.ast.arguments[1].name.should.be.exactly('b');
      should(fn.ast.arguments[1].type).be.null();
      fn.ast.arguments[1].value.kind.should.be.equal('boolean');
      fn.ast.arguments[1].value.value.should.be.true();      
    });
  });
});
