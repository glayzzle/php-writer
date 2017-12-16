/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
 'use strict';

var parser = require('php-parser');
var filter = require('./helpers/filter');
var Method = require('./method');
var Constant = require('./constant');
var traits = require('./helpers/traits');

/**
 * @constructor
 */
var Trait = function(ast) {
  this.ast = ast;
};

/**
 * Change the trait name
 * @return {Trait}
 */
Trait.prototype.setName = function(name) {
  this.ast.name = name;
  return this;
};


/**
 * Lookup for a function
 */
Trait.prototype.getMethod = function(name) {
    return Method.locate(this.ast.body, name);
};

/**
 * Appends or update an function
 */
Trait.prototype.setMethod = function(name, args, body, flags) {
    var method = this.getMethod(name);
    if (!method) {
        // append the function
        var ast = parser.parseEval('class a { \n' +
            flags + ' function ' + name + '(' + args +  ') {\n' +
                body + '\n' +
            '}\n' +
        ' }');
        this.ast.body.push(
            ast.children[0].body[0]
        );
    } else {
        // update the function
        if (typeof flags !== 'undefined') method.setFlags(flags);
        if (typeof args !== 'undefined') method.setArgs(args);
        if (typeof body !== 'undefined') method.setCode(body);
    }
    return this;
};

Trait.prototype.setTraits = traits.setTraits;

Trait.prototype.getTraits = traits.getTraits;

Trait.prototype.addTrait = traits.addTrait;

/**
 * @return {Trait|Null}
 */
Trait.locate = function(ast, name) {
  return filter(ast, 'trait', function(node) {
    if (!name || node.name === name) {
      return new Trait(node);
    }
  });
};

module.exports = Trait;
