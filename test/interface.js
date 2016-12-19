/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var should = require('./assert');
var writer = require('../src/index');

describe('Interface', function() {

  var test = new writer([
    '<?php',
    'interface foo {',
    '\tconst BAR = 1;',
    '}'
  ].join('\n'));
  var interfaceObject;

  it('findInterface', function() {
    interfaceObject = test.findInterface('foo');
    interfaceObject.should.be.Object();
  });

  it('setName', function() {
    interfaceObject.setName('baz');
    interfaceObject.ast[1].should.be.equal('baz');
  });

});
