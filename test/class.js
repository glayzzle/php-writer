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
      klass.ast.extends.name.should.equal('bar');
    });

    it('removes extends when empty name provided', function () {
      klass.setExtends('bar');
      klass.ast.extends.name.should.equal('bar');

      klass.setExtends();
      should(klass.ast.extends).be.null();
    });
  });

  describe('#setImplements', function () {
    it('can set string implements', function() {
      klass.setImplements('bar');
      klass.ast.implements[0].name.should.equal('bar');
    });

    it('can set array implements', function() {
      klass.setImplements(['bar', 'baz']);
      klass.ast.implements.should.have.length(2);
      klass.ast.implements[0].name.should.equal('bar');
      klass.ast.implements[1].name.should.equal('baz');
    });

    it('removes implements when empty names provided', function () {
      klass.setImplements('bar');
      klass.ast.implements.should.have.length(1);
      
      klass.setImplements();
      should(klass.ast.implements).be.null();
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
      klass.ast.implements.should.have.length(2);
      klass.ast.implements[0].name.should.equal('bar');
      klass.ast.implements[1].name.should.equal('baz');
    });

    it('should not add same interface twice', function () {
      klass.setImplements('bar');
      klass.addImplements('baz');
      klass.addImplements('baz');
      klass.ast.implements.should.have.length(2);
      klass.ast.implements[0].name.should.equal('bar');
      klass.ast.implements[1].name.should.equal('baz');
    });
  });

  describe('#setTraits', function () {
    it('can set trait', function () {
      klass.setTraits('bar');
      klass.ast.body[0].kind.should.equal('traituse');
      klass.ast.body[0].traits[0].name.should.equal('bar');
    });
    
    it('can set traits from array of names', function () {
      klass.setTraits(['bar', 'baz']);
      klass.ast.body[0].kind.should.equal('traituse');
      klass.ast.body[0].traits[0].name.should.equal('bar');
      klass.ast.body[0].traits[1].name.should.equal('baz');
    });
    
    it('removes traits when empty name provided', function() {
      klass.setTraits('bar');
      klass.ast.body[0].traits[0].name.should.equal('bar');
      
      klass.setTraits();
      klass.ast.body.should.be.empty();
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
      klass.ast.body[0].kind.should.equal('traituse');
      klass.ast.body[0].traits[0].name.should.equal('bar');
    });

    it('adds another trait', function () {
      klass.setTraits('bar');
      klass.addTrait('baz');
      klass.ast.body[0].kind.should.equal('traituse');
      klass.ast.body[0].traits[0].name.should.equal('bar');
      klass.ast.body[0].traits[1].name.should.equal('baz');
    });
    
    it('should not add same trait twice', function () {
      klass.setTraits('bar');
      klass.addTrait('baz');
      klass.addTrait('baz');
      klass.ast.body[0].kind.should.equal('traituse');
      klass.ast.body[0].traits.should.have.length(2);
      klass.ast.body[0].traits[0].name.should.equal('bar');
      klass.ast.body[0].traits[1].name.should.equal('baz');
    });
  });

  // describe('#addUsegroup', function () {
  //   it('should add usergroup to namespace', function () {
  //     var namespace = test.findNamespace();
  //     var childrenCount = namespace.ast.children.length;
      
  //     namespace.addUsegroup('bar');
  //     namespace.ast.children.should.have.length(childrenCount + 1);
      
  //     namespace.addUsegroup('baz');
  //     namespace.ast.children.should.have.length(childrenCount + 2);

  //     namespace.ast.children[0].items[0].name.should.equal('bar');
  //     namespace.ast.children[1].items[0].name.should.equal('baz');
  //   });
  // });

  // describe('#setCode', function() {
  //   it('should set echo', function () {
  //     fooNs.setCode('echo "Hello world";');
  //     fooNs.ast.children.should.be.AST('echo "Hello world";');
  //   });
  // });

  // // describe('#appendCode', function() {
  // //   it('should add FOO = 123', function () {
  // //     fooNs.appendCode('const FOO = 123;');

  // //     console.log(fooNs.ast.children);

  // //     fooNs.ast.children.should.be.AST('die();const FOO = 123;');
  // //   });
  // // });

  // // describe('#prependCode', function() {
  // //   it('should insert BAR = false', function () {
  // //     fooNs.prependCode('const BAR = false;');
  // //     fooNs.ast.children.should.be.AST('const BAR = false;die();');
  // //   });
  // // });

  // describe('#findClass', function() {
  //   it('should create a foo class', function () {
  //     fooNs.appendCode('class foo {}');
  //     fooNs.findClass('foo').should.be.Object();
  //     fooNs.findClass('foo').ast.should.be.AST('class foo {}');
  //   });
  // });
});
