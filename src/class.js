/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var filter = require('./helpers/filter');

var Class = function(ast) {
  this.ast = ast;
};

Class.prototype.setName = function(name) {
  return this;
};

Class.prototype.setExtends = function(name) {

};

Class.prototype.setImplements = function(names) {

};

Class.prototype.setProperty = function(name, value, flags) {

};

Class.prototype.setConstant = function(name, value) {

};

Class.prototype.getMethod = function(name) {

};

Class.prototype.setMethod = function(name, args, body, flags) {

};

/**
 * Locate the node in the specified ast
 */
Class.locate = function(ast, name) {
  return filter(ast, 'class', function(node) {
    if (node[1] === name) {
      return new Class(node);
    }
  });
};

module.exports = Class;
