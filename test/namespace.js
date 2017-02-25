/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var should = require('./assert');
var writer = require('../src/index');

describe('Namespaces', function() {

  var test = new writer([
    '<?php',
    'namespace foo {',
    '\tdie();',
    '}'
  ].join('\n'));
  var fooNs;

  describe('#setName', function() {
    it('should find foo', function () {
      fooNs = test.findNamespace('foo');
      fooNs.should.be.Object();
    });

    it('should change name', function() {
      fooNs.setName('foo\\bar');
      test.findNamespace('foo\\bar').should.be.Object();
    });

  });

  describe('#setCode', function() {

    it('should set echo', function () {
      fooNs.setCode('echo "Hello world";');
      fooNs.ast.body.should.be.AST('echo "Hello world";');
    });

  });

  describe('#appendCode', function() {

    it('should add FOO = 123', function () {
      fooNs.appendCode('const FOO = 123;');
      fooNs.ast.body.should.be.AST('echo "Hello world"; const FOO = 123;');
    });

  });

  describe('#prependCode', function() {

    it('should insert BAR = false', function () {
      fooNs.prependCode('const BAR = false;');
      fooNs.ast.body.should.be.AST('const BAR = false; echo "Hello world"; const FOO = 123;');
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
