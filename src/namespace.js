/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var Class = require('./class');
var Constant = require('./class');
var fn = require('./function');
var Interface = require('./interface');
var Trait = require('./trait');
var filter = require('./helpers/filter');
var editor = require('./helpers/editor');
var parser = require('php-parser');
var usegroup = require('./helpers/usegroup');

/**
 * A namespace entry
 * @constructor Namespace
 */
var Namespace = function Namespace(ast) {
  this.ast = ast;
};
editor(Namespace, 'children');

/**
 * Change the current namespace name
 * @param {String}
 * @return {namespace}
 */
Namespace.prototype.setName = function(name) {
  this.ast.name = name;
  return this;
};

/**
 * Add usegroup
 * @param {String}
 * @return {namespace}
 */
Namespace.prototype.addUsegroup = usegroup.add;

/**
 * Lookup for a class
 * @param {String} name
 * @return {Class|Null}
 */
Namespace.prototype.findClass = function(name) {
  return Class.locate(this.ast.children, name);
};

/**
 * Lookup for a function
 * @param {String} name
 * @return {Function|Null}
 */
Namespace.prototype.findFunction = function(name) {
  return fn.locate(this.ast.children, name);
};

/**
 * Lookup for a trait
 * @param {String} name
 * @return {Trait|Null}
 */
Namespace.prototype.findTrait = function(name) {
  return Trait.locate(this.ast.children, name);
};

/**
 * Lookup for an interface
 * @param {String} name
 * @return {Interface|Null}
 */
Namespace.prototype.findInterface = function(name) {
  return Interface.locate(this.ast.children, name);
};

/**
 * Lookup for an interface
 * @param {String} name
 * @return {Interface|Null}
 */
Namespace.prototype.findConstant = function(name) {
  return Constant.locate(this.ast.children, name, true);
};

/**
 * Locate a namespace
 */
Namespace.locate = function(ast, name) {
  return filter(ast, 'namespace', function(node) {
    if (!name || node.name == name) {
      return new Namespace(node);
    }
  });
};

module.exports = Namespace;
