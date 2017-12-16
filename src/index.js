/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var parser = require('php-parser');
var unparser = require('php-unparser');
var editor = require('./helpers/editor');

var Namespace = require('./namespace');
var Class = require('./class');
var fn = require('./function');
var Interface = require('./interface');
var Trait = require('./trait');
var usegroup = require('./helpers/usegroup');

// Parser default options
var defaultOptions = {
  writer: {
    indent: true,
    dontUseWhitespaces: false,
    shortArray: true,
    forceNamespaceBrackets: false,
    bracketsNewLine: true
  },
  parser: {
    debug: false, 
    locations: false,
    extractDoc: true,
    suppressErrors: false
  },
  lexer: {
    all_tokens: false,
    comment_tokens: false,
    mode_eval: false,
    asp_tags: false,
    short_tags: false
  },
  ast: {
    withPositions: true
  }
};

/**
 * @varructor
 */
var Writer = function(buffer, options = {}) {
  this.options = Object.assign({}, defaultOptions, options);
  this.ast = parser.parseCode(buffer, this.options);
};
editor(Writer, 1);

/**
 * Add a namespace
 * @param {String} name
 * @return {Namespace|Null}
 */
Writer.prototype.addNamespace = function(name) {
  if (!name) {
    return;
  }
  
  var namespace = parser.parseEval('namespace a;').children.shift();
  namespace.name = name;
  
  this.ast.children.forEach(function (node) {
      namespace.children.push(node);
  });

  this.ast.children = [namespace];
  
  return Namespace.locate(this.ast.children, name);
}

/**
 * Add usegroup
 * @param {String}
 * @return {Writer}
 */
Writer.prototype.addUsegroup = usegroup.add;

/**
 * Finds a namespace
 * @param {String} name
 * @return {Namespace|Null}
 */
Writer.prototype.findNamespace = function(name) {
  return Namespace.locate(this.ast.children, name);
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
  if (!name) {
    return Class.locate(this.ast.children);
  }

  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findClass(ns[0]);
  return Class.locate(this.ast.children, ns[0]);
};

/**
 * Finds a function
 * @param {String} name
 * @return {Function|Null}
 */
Writer.prototype.findFunction = function(name) {
  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findFunction(ns[0]);
  return fn.locate(this.ast.children, ns[0]);
};

/**
 * @param {String} name
 * @return {Trait|Null}
 */
Writer.prototype.findTrait = function(name) {
  if (!name) {
    return Trait.locate(this.ast.children);
  }

  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findTrait(ns[0]);
  return Trait.locate(this.ast.children, ns[0]);
};

/**
 * @param {String} name
 * @return {Interface|Null}
 */
Writer.prototype.findInterface = function(name) {
  if (!name) {
    return Interface.locate(this.ast.children);
  }

  var ns = this.nsLocator(name);
  if (ns[1]) return ns[1].findInterface(ns[0]);
  return Interface.locate(this.ast.children, ns[0]);
};

/**
 * Convert back AST to php code
 * @return {String}
 */
Writer.prototype.toString = function() {
  return unparser(this.ast, this.options.writer);
};

module.exports = Writer;
