/*!
 * Copyright (C) 2016 Glayzzle (BSD3 License)
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
module.exports = function(obj, bodyIndex) {

  /**
   * Prepends some code at the ast body
   */
  obj.prototype.prependCode = function(code) {
    var ast = parser.parseEval(code);
    this.ast[bodyIndex] = ast[1].concat(this.ast[bodyIndex]);
    return this;
  };

  /**
   * Appends some code at the end of the namespace body
   */
  obj.prototype.appendCode = function(code) {
    var ast = parser.parseEval(code);
    this.ast[bodyIndex] = this.ast[bodyIndex].concat(ast[1]);
    return this;
  };

  /**
   * Replace the current namespace body
   */
  obj.prototype.setCode = function(code) {
    var ast = parser.parseEval(code);
    this.ast[bodyIndex] = ast[1];
    return this;
  };

};
