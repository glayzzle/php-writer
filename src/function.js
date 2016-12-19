/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var filter = require('./helpers/filter');
var parser = require('php-parser');

/**
 * @constructor Function
 */
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
 * Changing the function name
 */
fn.prototype.setArgs = function(args) {
  var ast = parser.parseEval('function a('+args+') {}');
  this.ast[2] = ast[1][0][2];
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
