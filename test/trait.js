/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var should = require('./assert');
var writer = require('../src/index');

describe('Trait', function() {
  var test;
  var traitObj;

  beforeEach(function () {
    var test = new writer([
      '<?php',
      'trait foo {',
      '\tconst BAR = 1;',
      '}'
    ].join('\n'));
    
    traitObj = test.findTrait('foo');
  });

  describe('#setName', function () {
    it('can set name', function () {
      traitObj.setName('baz');
      traitObj.ast.name.should.be.equal('baz');
    });
  });
});
