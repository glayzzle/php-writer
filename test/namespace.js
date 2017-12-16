/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var should = require('./assert');
var writer = require('../src/index');

describe('Namespaces', function() {
  var test;
  var fooNs;

  beforeEach(function () {
    test = new writer([
      '<?php',
      'namespace foo {',
      '\tdie();',
      '}'
    ].join('\n'));
    
    fooNs = test.findNamespace('foo');
  });

  describe('#setName', function() {
    it('should change name', function() {
      fooNs.setName('foo\\bar');
      test.findNamespace('foo\\bar').should.be.Object();
    });

  });

  describe('#addUsegroup', function () {
    it('should add usergroup to namespace', function () {
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

  describe('#setCode', function() {
    it('should set echo', function () {
      fooNs.setCode('echo "Hello world";');
      fooNs.ast.children.should.be.AST('echo "Hello world";');
    });
  });

  describe('#appendCode', function() {
    it('should add FOO = 123', function () {
      fooNs.setCode('echo "Hello world";');
      fooNs.appendCode('const FOO = 123;');
      fooNs.ast.children.should.be.AST('echo "Hello world";const FOO = 123;');
    });
  });

  describe('#prependCode', function() {
    it('should insert BAR = false', function () {
      fooNs.setCode('echo "Hello world";');
      fooNs.prependCode('const BAR = false;');
      fooNs.ast.children.should.be.AST('const BAR = false;echo "Hello world";');
    });
  });

  describe('#findClass', function() {
    it('should create a foo class', function () {
      fooNs.appendCode('class foo {}');
      fooNs.findClass('foo').should.be.Object();
      fooNs.findClass('foo').ast.should.be.AST('class foo {}');
    });
  });
});
