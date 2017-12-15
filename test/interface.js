/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var should = require('./assert');
var writer = require('../src/index');

describe('Interface', function() {
  var test;
  var interfaceObject;

  beforeEach(function () {
    test = new writer([
      '<?php',
      'interface foo {',
      '\tconst BAR = 1;',
      '}'
    ].join('\n'));

    interfaceObject = test.findInterface('foo');
  });

  describe('#setName', function () {
    it('can set name', function () {
      interfaceObject.setName('baz');
      interfaceObject.ast.name.should.be.equal('baz');  
    });
  });

  describe('#setExtends', function () {
    it('can set extends', function () {
      interfaceObject.setExtends(['bar', 'quux']);
      interfaceObject.ast.extends.should.have.length(2);
      interfaceObject.ast.extends[0].name.should.equal('bar');
      interfaceObject.ast.extends[1].name.should.equal('quux');  
    });
  });
});
