/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var unparser = require('php-unparser');

var writer = function(buffer) {
  this.ast = parser.parseCode(buffer);
};

writer.prototype.findNamespace = function() {

};

writer.prototype.findFunction = function() {

};

writer.prototype.findClass = function() {

};

writer.prototype.findTrait = function() {

};

writer.prototype.findInterface = function() {

};

writer.prototype.toString = function() {
  return unparser(this.ast);
};

module.exports = writer;
