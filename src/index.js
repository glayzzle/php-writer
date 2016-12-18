/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var unparser = require('php-unparser');
var Namespace = require('./namespace');

var writer = function(buffer) {
  this.ast = parser.parseCode(buffer, {
    parser: {
      extractDoc: true
    }
  });
};

writer.prototype.findNamespace = function(name) {
  return Namespace.locate(this.ast, name);
};

writer.prototype.findFunction = function() {

};

writer.prototype.findClass = function() {

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
