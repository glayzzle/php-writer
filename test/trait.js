/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var should = require('./assert');
var writer = require('../src/index');

describe('Trait', function() {

  var test = new writer([
    '<?php',
    'trait foo {',
    '\tconst BAR = 1;',
    '}'
  ].join('\n'));
  var traitObj;

  it('findTrait', function() {
    traitObj = test.findTrait('foo');
    traitObj.should.be.Object();
  });

  it('setName', function() {
    traitObj.setName('baz');
    traitObj.ast[1].should.be.equal('baz');
  });

});
