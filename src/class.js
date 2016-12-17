/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var Class = function(ast) {
  this.ast = ast;
};

Class.property.setName = function(name) {
  return this;
};

Class.property.setExtends = function(name) {

};

Class.property.setImplements = function(names) {

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

};

module.exports = cls;
