/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var filter = require('./helpers/filter');

var fn = function Function(ast) {
  this.ast = ast;
};

/**
 * Changing the function name
 */
fn.prototype.setName = function(name) {
  this.ast[1] = name;
  return this;
};

/**
 * Locate the node in the specified ast
 */
fn.locate = function(ast, name) {
  return filter(ast, 'function', function(node) {
    if (node[1] === name) {
      return new fn(node);
    }
  });
};

module.exports = fn;
