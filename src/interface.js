/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var filter = require('./helpers/filter');

/**
 * @constructor
 */
var Interface = function(ast) {
  this.ast = ast;
};

Interface.prototype.setName = function(name) {
  this.ast[1] = name;
  return this;
};

/**
 * @return {Interface|Null}
 */
Interface.locate = function(ast, name) {
  return filter(ast, 'interface', function(node) {
    if (node.name === name) {
      return new Interface(node);
    }
  });
};

module.exports = Interface;
