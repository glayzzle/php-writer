/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var unparser = require('php-unparser');
var editor = require('./helpers/editor');

var Namespace = require('./namespace');
var Class = require('./class');
var fn = require('./function');
var Interface = require('./interface');
var Trait = require('./trait');

/**
 * @constructor
 */
var Writer = function(buffer) {
  this.ast = parser.parseCode(buffer, {
    parser: {
      extractDoc: true
    }
  });
};
editor(Writer, 1);

/**
 * Finds a namespace
 * @param {String} name
 * @return {Namespace|Null}
 */
Writer.prototype.findNamespace = function(name) {
  return Namespace.locate(this.ast, name);
};

/**
 * Locates the object namespace
 * @param {String} name
 * @return {Namespace|Null}
 */
Writer.prototype.nsLocator = function(name) {
  name = name.trim('\\').split('\\');
  if (name.length > 1) {
    var cName = name.pop();
    return [cName, this.findNamespace(name.join('\\'))];
  } else {
    return [name[0], this.findNamespace('')];
  }
};

/**
 * Finds a class
 * @param {String} name
 * @return {Class|Null}
 */
Writer.prototype.findClass = function(name) {
  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findClass(ns[0]);
  return Class.locate(this.ast, ns[0]);
};

/**
 * Finds a function
 * @param {String} name
 * @return {Function|Null}
 */
Writer.prototype.findFunction = function(name) {
  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findFunction(ns[0]);
  return fn.locate(this.ast, ns[0]);
};

/**
 * @param {String} name
 * @return {Trait|Null}
 */
Writer.prototype.findTrait = function(name) {
  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findTrait(ns[0]);
  return Trait.locate(this.ast, ns[0]);
};

/**
 * @param {String} name
 * @return {Interface|Null}
 */
Writer.prototype.findInterface = function(name) {
  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findInterface(ns[0]);
  return Interface.locate(this.ast, ns[0]);
};

/**
 * Convert back AST to php code
 * @return {String}
 */
Writer.prototype.toString = function() {
  return '<?php\n' + unparser(this.ast);
};

module.exports = Writer;
