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

  describe('#setTraits', function () {
    it('can set trait', function () {
      traitObj.setTraits('bar');
      traitObj.should.have.traits();
      traitObj.should.have.trait('bar');
    });
    
    it('can set traits from array of names', function () {
      traitObj.setTraits(['bar', 'baz']);
      traitObj.should.have.traits(['bar', 'baz']);
    });
    
    it('removes traits when empty name provided', function() {
      traitObj.setTraits('bar');
      traitObj.should.have.trait('bar');
      
      traitObj.setTraits();
      traitObj.should.notHaveAnyTraits();
    });
  });
  
  describe('#getTraits', function () {
    it('return the list of traits', function () {
      traitObj.setTraits(['bar', 'baz']);
      traitObj.getTraits().should.be.eql(['bar', 'baz']);
    });
  });
  
  describe('#addTrait', function () {
    it('adds new trait', function () {
      traitObj.addTrait('bar');
      traitObj.should.have.trait('bar');
    });

    it('adds another trait', function () {
      traitObj.setTraits('bar');
      traitObj.addTrait('baz');
      traitObj.should.have.traits(['bar', 'baz']);
    });
    
    it('should not add same trait twice', function () {
      traitObj.setTraits('bar');
      traitObj.addTrait('baz');
      traitObj.addTrait('baz');

      traitObj.should.have.traitsCount(2);
      traitObj.should.have.traits(['bar', 'baz']);
    });
  });
});
