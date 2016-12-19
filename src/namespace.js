/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var Class = require('./class');
var fn = require('./function');
var filter = require('./helpers/filter');
var editor = require('./helpers/editor');

var Namespace = function Namespace(ast) {
  this.ast = ast;
};

editor(Namespace, 2);

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
