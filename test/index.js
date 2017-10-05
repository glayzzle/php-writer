/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var should = require('./assert');
var writer = require('../src/index');

describe('API', function() {

  var test = new writer([
    '<?php',
    'namespace foo\\bar {',
    '\tclass baz { }',
    '\ttrait tBaz { }',
    '\tinterface iBaz { }',
    '\tfunction doBaz() { }',
    '}',
    'namespace {',
    '\tclass baz extends foo\\bar\\baz { }',
    '}'
  ].join('\n'));


  it('findNamespace', function() {
    test.findNamespace('foo\\bar').should.be.Object();
  });

  it('findClass', function() {
    test.findClass('foo\\bar\\baz').should.be.Object();
    test.findClass('baz').should.be.Object();
  });

  it('findFunction', function() {
    test.findFunction('foo\\bar\\doBaz').should.be.Object();
  });

});