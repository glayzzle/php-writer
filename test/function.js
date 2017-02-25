/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var should = require('./assert');
var writer = require('../src/index');

describe('Function', function() {

  var test = new writer([
    '<?php',
    'function foo($bar = 1) {',
    '\treturn $bar * 2;',
    '}'
  ].join('\n'));
  var fn;

  it('findFunction', function() {
    fn = test.findFunction('foo');
    fn.should.be.Object();
  });

  it('setName', function() {
    fn.setName('baz');
    fn.ast.name.should.be.equal('baz');
  });

  it('setArgs', function() {

    fn.ast.arguments.length.should.be.exactly(1);
    fn.ast.arguments[0].name.should.be.exactly('bar');

    fn.setArgs('int $a, $b = true');

    fn.ast.arguments.length.should.be.exactly(2);

    fn.ast.arguments[0].name.should.be.exactly('a');
    fn.ast.arguments[0].type.name.should.be.exactly('int');
    (fn.ast.arguments[0].value === null).should.be.true();

    fn.ast.arguments[1].name.should.be.exactly('b');
    (fn.ast.arguments[1].type === null).should.be.true();
    fn.ast.arguments[1].value.kind.should.be.equal('boolean');
    fn.ast.arguments[1].value.value.should.be.equal(true);
  });




});
