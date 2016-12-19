/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var unparser = require('php-unparser');
var Namespace = require('./namespace');
var Class = require('./class');
var fn = require('./function');

/**
 * @constructor
 */
var writer = function(buffer) {
  this.ast = parser.parseCode(buffer, {
    parser: {
      extractDoc: true
    }
  });
};

/**
 * Finds a namespace
 * @param {String} name
 * @return {Namespace|Null}
 */
writer.prototype.findNamespace = function(name) {
  return Namespace.locate(this.ast, name);
};

/**
 * Finds a class
 * @param {String} name
 * @return {Class|Null}
 */
writer.prototype.findClass = function(name) {
  name = name.trim('\\').split('\\');
  if (name.length > 1) {
    var cName = name.pop();
    var ns = this.findNamespace(name.join('\\'));
    if (ns) {
      return ns.findClass(cName);
    }
    name[0] = cName;
  } else {
    var ns = this.findNamespace('');
    if (ns) {
      return ns.findClass(name[0]);
    }
  }
  return Class.locate(this.ast, name[0]);
};

/**
 * Finds a function
 * @param {String} name
 * @return {Function|Null}
 */
writer.prototype.findFunction = function(name) {
  name = name.trim('\\').split('\\');
  if (name.length > 1) {
    var fName = name.pop();
    var ns = this.findNamespace(name.join('\\'));
    if (ns) {
      return ns.findFunction(fName);
    }
    name[0] = fName;
  } else {
    var ns = this.findNamespace('');
    if (ns) {
      return ns.findFunction(name[0]);
    }
  }
  return fn.locate(this.ast, name[0]);
};

writer.prototype.findTrait = function() {

};

writer.prototype.findInterface = function() {

};

/**
 * Convert back AST to php code
 * @return {String}
 */
writer.prototype.toString = function() {
  return '<?php\n' + unparser(this.ast);
};

module.exports = writer;
