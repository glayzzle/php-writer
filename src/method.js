/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

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
 * Change the method name
 */
Method.prototype.setName = function(name) {
    this.ast.name = name;
};

/**
 * Sets the abstract flag value
 */
Method.prototype.setAbstract = function(flag) {
    this.ast.isAbstract = flag === true;
    return this;
};

/**
 * Sets the abstract flag value
 */
Method.prototype.setFinal = function(flag) {
    this.ast.isFinal = flag === true;
    return this;
};

/**
 * Sets the abstract flag value
 */
Method.prototype.setStatic = function(flag) {
    this.ast.isStatic = flag === true;
    return this;
};

/**
 * Sets the abstract flag value
 */
Method.prototype.setVisibility = function(level) {
    this.ast.visibility = level;
    return this;
};

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
