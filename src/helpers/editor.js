/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
var parser = require('php-parser');

/**
 * Adds some generic manipulation helpers over the body
 * @param {Function} obj
 * @param {Integer} bodyIndex
 * @return void
 */
module.exports = function(obj, property) {

  /**
   * Prepends some code at the ast body
   */
  obj.prototype.prependCode = function(code) {
    var ast = parser.parseEval(code);
    this.ast[property] = ast.children.concat(this.ast[property]);
    return this;
  };

  /**
   * Appends some code at the end of the namespace body
   */
  obj.prototype.appendCode = function(code) {
    var ast = parser.parseEval(code);
    this.ast[property] = this.ast[property].concat(ast.children);
    return this;
  };

  /**
   * Replace the current namespace body
   */
  obj.prototype.setCode = function(code) {
    var ast = parser.parseEval(code);
    this.ast[property] = ast.children;
    return this;
  };

};
