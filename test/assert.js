/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var parser = require('php-parser');
var should = require('should');

should.Assertion.add(
  'AST',
  function(code) {
    this.params = { operator: 'to be AST' }
    var ast;
    (function parseCode() {
      ast = parser.parseEval(code, {
        parser: {
          extractDoc: true
        }
      });
    }).should.not.throw(code);
    this.obj.should.be.Object();
    if (typeof this.obj.kind === 'string') {
      // just check one node
      this.obj.should.deepEqual(ast.children[0]);
    } else {
      // check a body
      this.obj.should.deepEqual(ast.children);
    }
  }, false
);

should.Assertion.add(
  'Extend',
  function(name) {
    this.params = { operator: 'extend class' };
    this.obj.should.be.Object('should contain AST');
    (this.obj.extends === null).should.be.false('should contain an extends property');
    this.obj.extends.name.should.be.equal(name);
  }, false
);

should.Assertion.add('extendClass', function (name) {
  this.obj.ast.extends.name.should.equal('bar'); 
});

should.Assertion.add('notExtendAnyClass', function () {
  should(this.obj.ast.extends).be.null(); 
});

should.Assertion.add('implementInterface', function (name) {
  var index = this.obj.ast.implements.findIndex(function (node) {
    return node.name === name;
  });

  index.should.be.greaterThan(-1);
});

should.Assertion.add('implementedInterfacesCount', function (n) {
  this.obj.ast.implements.should.have.length(n);
});

should.Assertion.add('notImplementAnyInterfaces', function (name) {
  should(this.obj.ast.implements).be.null();
});


var getTraituse = function (subject) {
  return subject.ast.body.find(function (node) {
    return node.kind === 'traituse'; 
  });
}

should.Assertion.add('traits', function (names) {
  var subject = this.obj;
  var traituse = getTraituse(subject);

  should(traituse).not.be.null();

  if (names) {
    names.forEach(function (name) {
      subject.should.have.trait(name);
    })
  }
});

should.Assertion.add('trait', function (name) {
  var subject = this.obj;
  var traituse = getTraituse(subject);

  should(traituse).not.be.null();
  
  var index = traituse.traits.findIndex(function (node) {
    return node.name === name;
  });

  index.should.be.greaterThan(-1);
});

should.Assertion.add('traitsCount', function (n) {
  var subject = this.obj;
  var traituse = getTraituse(subject);

  should(traituse).not.be.null();

  traituse.traits.should.have.length(n);
});

should.Assertion.add('notHaveAnyTraits', function (name) {
  var subject = this.obj;
  var traituse = getTraituse(subject);

  should(!!traituse).be.false();
});



module.exports = should;
