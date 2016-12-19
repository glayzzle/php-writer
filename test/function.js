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
    fn.ast[1].should.be.equal('baz');
  });

  it('setArgs', function() {

    fn.ast[2].length.should.be.exactly(1);
    fn.ast[2][0][0].should.be.exactly('$bar');

    fn.setArgs('int $a, $b = true');

    fn.ast[2].length.should.be.exactly(2);

    fn.ast[2][0][0].should.be.exactly('$a');
    fn.ast[2][0][1].should.be.deepEqual(['int']);
    fn.ast[2][0][2].should.be.deepEqual([]);

    fn.ast[2][1][0].should.be.exactly('$b');
    fn.ast[2][1][1].should.be.exactly('mixed');
    fn.ast[2][1][2].should.be.deepEqual(['constant', 'true']);
  });


});
