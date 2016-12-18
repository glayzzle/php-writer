/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var Class = require('./class');
var filter = require('./filter');

var Namespace = function(ast) {
  this.ast = ast;
};

/**
 * Change the current namespace name
 * @param {String}
 * @return {namespace}
 */
Namespace.prototype.setName = function(name) {
  this.ast[1] = name.trim('/').split('/');
  return this;
};

Namespace.prototype.findClass = function(name) {
  return Class.locate(this.ast[2], name);
};

Namespace.prototype.findFunction = function(name) {

};

Namespace.prototype.findTrait = function(name) {

};

Namespace.prototype.findInterface = function(name) {

};

Namespace.prototype.prependCode = function(code) {

};

Namespace.prototype.appendCode = function(code) {

};

Namespace.prototype.setCode = function(code) {

};

Namespace.locate = function(ast, name) {
  return filter(ast, 'namespace', function(node) {
    if (node[1].join('/') === name) {
      return new Namespace(node);
    }
  });
};

module.exports = Namespace;
