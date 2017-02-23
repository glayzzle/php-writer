/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var filter = require('./helpers/filter');
var editor = require('./helpers/editor');

/**
 * @constructor
 */
var Method = function Method(ast) {
  this.ast = ast;
};
editor(Method, 'body');



/**
 * Locate the node in the specified ast
 */
Method.locate = function(ast, name) {
  return filter(ast, 'method', function(node) {
    if (node.name === name) {
      return new Method(node);
    }
  });
};

module.exports = Method;
