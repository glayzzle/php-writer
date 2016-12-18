var should = require('should');
var writer = require('../src/index');

describe('Namespaces', function() {

  describe('#setName', function() {
    var test = new writer([
      '<?php',
      'namespace foo {',
      '}'
    ].join('\n'));
    var fooNs;
    it('should find foo', function () {
      fooNs = test.findNamespace('foo');
      fooNs.should.be.Object();
    });
  });

});
