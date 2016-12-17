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
