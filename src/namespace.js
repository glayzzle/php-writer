/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var Class = require('./class');
var fn = require('./function');
var filter = require('./helpers/filter');

var Namespace = function Namespace(ast) {
  this.ast = ast;
};

/**
 * Change the current namespace name
 * @param {String}
 * @return {namespace}
 */
Namespace.prototype.setName = function(name) {
  this.ast[1] = name.trim('\\').split('\\');
  return this;
};

/**
 * Lookup for a class
 */
Namespace.prototype.findClass = function(name) {
  return Class.locate(this.ast[2], name);
};

Namespace.prototype.findFunction = function(name) {
  return fn.locate(this.ast[2], name);
};

Namespace.prototype.findTrait = function(name) {

};

Namespace.prototype.findInterface = function(name) {

};

/**
 * Prepends some code at the ast body
 */
Namespace.prototype.prependCode = function(code) {
  var ast = parser.parseEval(code);
  this.ast[2] = ast[1].concat(this.ast[2]);
  return this;
};

/**
 * Appends some code at the end of the namespace body
 */
Namespace.prototype.appendCode = function(code) {
  var ast = parser.parseEval(code);
  this.ast[2] = this.ast[2].concat(ast[1]);
  return this;
};

/**
 * Replace the current namespace body
 */
Namespace.prototype.setCode = function(code) {
  var ast = parser.parseEval(code);
  this.ast[2] = ast[1];
  return this;
};

/**
 * Locate a namespace
 */
Namespace.locate = function(ast, name) {
  return filter(ast, 'namespace', function(node) {
    if (node[1].join('\\') === name) {
      return new Namespace(node);
    }
  });
};

module.exports = Namespace;
