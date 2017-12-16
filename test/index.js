/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var should = require('./assert');
var writer = require('../src/index');

var Namespace = require('../src/namespace');
var Class = require('../src/class');
var PHPFunction = require('../src/function');
var Trait = require('../src/trait');
var Interface = require('../src/interface');

describe('API', function () {
  var test;

  beforeEach(function () {
    test = new writer([
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
  })

  describe('#addNamespace', function() {
    it('adds namespace to the program and returns it', function () {
      var program = new writer('<?php class bar {}');
      var namespace = program.addNamespace('foo');

      namespace.should.be.instanceOf(Namespace);
      
      var klass = namespace.findClass('bar');

      klass.should.be.instanceOf(Class);
    });
  });

  describe('#addUsegroup', function () {
    it('should add usergroup to file', function () {
      var namespace = test.findNamespace();
      var childrenCount = namespace.ast.children.length;
      
      namespace.addUsegroup('bar');
      namespace.ast.children.should.have.length(childrenCount + 1);
      
      namespace.addUsegroup('baz');
      namespace.ast.children.should.have.length(childrenCount + 2);

      namespace.ast.children[0].items[0].name.should.equal('bar');
      namespace.ast.children[1].items[0].name.should.equal('baz');
    });
  });
  
  describe('#findNamespace', function() {
    it('finds namespace by name', function () {
      var namespace = test.findNamespace('foo\\bar');

      namespace.should.be.instanceOf(Namespace);  
    });

    it('finds first namespace when no name given', function () {
      var namespace = test.findNamespace('foo\\bar');
      var firstNamespace = test.findNamespace();
  
      namespace.should.be.instanceOf(Namespace);
      namespace.should.deepEqual(firstNamespace);
    });
  });

  describe('#findClass', function () {
    it('finds class by name', function () {
      var klass = test.findClass('foo\\bar\\baz');
  
      klass.should.be.instanceOf(Class);
    });

    it('finds first class when no name given', function () {
      var klass = test.findClass('foo\\bar\\baz');
      var firstClass = test.findClass();
  
      klass.should.be.instanceOf(Class);
      klass.should.deepEqual(firstClass);
    });
  });

  describe('#findFunction', function () {
    it('finds function by name', function() {
      test.findFunction('foo\\bar\\doBaz')
        .should.be.instanceOf(PHPFunction);
    });
  });

  describe('#findTrait', function () {
    it('finds trait by name', function () {
      var trait = test.findTrait('tBaz');
  
      trait.should.be.instanceOf(Trait);
    });

    it('finds first trait when no name given', function () {
      var trait = test.findTrait('tBaz');
      var firstTrait = test.findTrait();
  
      trait.should.be.instanceOf(Trait);
      trait.should.deepEqual(firstTrait);  
    });
  });

  describe('#findInterface', function () {
    it('finds interface by name', function () {
      var _interface = test.findInterface('iBaz');
  
      _interface.should.be.instanceOf(Interface);
    });

    it('finds first interface when no name given', function () {
      var _interface = test.findInterface('iBaz');
      var firstInterface = test.findInterface();
    
      _interface.should.be.instanceOf(Interface);
      _interface.should.deepEqual(firstInterface);
    });
  });
});
