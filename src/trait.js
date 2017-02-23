/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var filter = require('./helpers/filter');

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
 * @return {Interface|Null}
 */
Trait.locate = function(ast, name) {
  return filter(ast, 'trait', function(node) {
    if (node.name === name) {
      return new Trait(node);
    }
  });
};

module.exports = Trait;
