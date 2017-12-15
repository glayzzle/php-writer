'use strict';

var should = require('./assert');
var writer = require('../src/index');

describe('Class', function() {
  var test;
  var klass;

  beforeEach(function () {
    test = new writer([
      '<?php',
      'class foo {',
      '}'
    ].join('\n'));
    
    klass = test.findClass('foo');
  });

  describe('#setName', function() {
    it('can set name', function() {
      klass.setName('bar');
      klass.ast.name.should.equal('bar');
    });
  });

  describe('#setExtends', function () {
    it('can set extends', function () {
      klass.setExtends('bar');
      
      klass.should.extendClass('bar');
    });

    it('removes extends when empty name provided', function () {
      klass.setExtends('bar');
      klass.should.extendClass('bar');

      klass.setExtends();
      klass.should.notExtendAnyClass();
    });
  });

  describe('#setImplements', function () {
    it('can set string implements', function() {
      klass.setImplements('bar');
      
      klass.should.implementInterface('bar');
    });

    it('can set array implements', function() {
      klass.setImplements(['bar', 'baz']);
      
      klass.should.have.implementedInterfacesCount(2);
      klass.should.implementInterface('bar');
      klass.should.implementInterface('baz');
    });

    it('removes implements when empty names provided', function () {
      klass.setImplements('bar');
      klass.should.have.implementedInterfacesCount(1);
      
      klass.setImplements();
      klass.should.notImplementAnyInterfaces();
    });
  });

  describe('#getImplements', function () {
    it('returns implements', function () {
      klass.setImplements(['bar', 'baz']);
      
      klass.getImplements().should.eql(['bar', 'baz']);
    }); 
  });

  describe('#addImplements', function () {
    it('can add interface', function () {
      klass.setImplements('bar');
      klass.addImplements('baz');
      
      klass.should.have.implementedInterfacesCount(2);
      klass.should.implementInterface('bar');
      klass.should.implementInterface('baz');
    });

    it('should not add same interface twice', function () {
      klass.setImplements('bar');
      klass.addImplements('baz');
      klass.addImplements('baz');

      klass.should.have.implementedInterfacesCount(2);
      klass.should.implementInterface('bar');
      klass.should.implementInterface('baz');
    });
  });

  describe('#setTraits', function () {
    it('can set trait', function () {
      klass.setTraits('bar');
      klass.should.have.traits();
      klass.should.have.trait('bar');
    });
    
    it('can set traits from array of names', function () {
      klass.setTraits(['bar', 'baz']);
      klass.should.have.traits(['bar', 'baz']);
    });
    
    it('removes traits when empty name provided', function() {
      klass.setTraits('bar');
      klass.should.have.trait('bar');
      
      klass.setTraits();
      klass.should.notHaveAnyTraits();
    });
  });
  
  describe('#getTraits', function () {
    it('return the list of traits', function () {
      klass.setTraits(['bar', 'baz']);
      klass.getTraits().should.be.eql(['bar', 'baz']);
    });
  });
  
  describe('#addTrait', function () {
    it('adds new trait', function () {
      klass.addTrait('bar');
      klass.should.have.trait('bar');
    });

    it('adds another trait', function () {
      klass.setTraits('bar');
      klass.addTrait('baz');
      klass.should.have.traits(['bar', 'baz']);
    });
    
    it('should not add same trait twice', function () {
      klass.setTraits('bar');
      klass.addTrait('baz');
      klass.addTrait('baz');

      klass.should.have.traitsCount(2);
      klass.should.have.traits(['bar', 'baz']);
    });
  });
});
