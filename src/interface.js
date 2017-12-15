/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var filter = require('./helpers/filter');
var parser = require('php-parser');
var Method = require('./method');
var Property = require('./property');

/**
 * @constructor
 */
var Interface = function(ast) {
  this.ast = ast;
};

Interface.prototype.setName = function(name) {
  this.ast.name = name;
  return this;
};

/**
 * Extends with the specified interface name
 */
Interface.prototype.setExtends = function(name) {
    if(name) {
        var ast = parser.parseEval('interface a extends '+name+' {}');
        this.ast.extends = ast.children[0].extends;
    } else {
        this.ast.extends = null;
    }
    return this;
};

/**
 * Sets a constant value
 */
Interface.prototype.getConstant = function(name) {
    return Constant.locate(this.ast.body, name);
};

/**
 * Sets a constant value
 */
Interface.prototype.setConstant = function(name, value) {
    var constant = this.getConstant(name);
    if (!constant) {
        // append the function
        var ast = parser.parseEval('class a { \n' +
            'const ' + name + (
                value ? ' = ' + value : ''
            ) + ';\n' +
        ' }');
        this.ast.body.unshift(
            ast.children[0].body[0]
        );
    } else {
        if (typeof value !== 'undefined') constant.setValue(value);
    }
    return this;
};

/**
 * Lookup for a function
 */
Interface.prototype.getMethod = function(name) {
    return Method.locate(this.ast.body, name);
};

/**
 * Appends or update an function
 */
Interface.prototype.setMethod = function(name, args, body, flags) {
    var method = this.getMethod(name);
    if (!method) {
        // append the function
        var ast = parser.parseEval('class a { \n' +
            flags + ' function ' + name + '(' + args +  ') {\n' +
                body + '\n' +
            '}\n' +
        ' }');
        this.ast.body.push(
            ast.children[0].body[0]
        );
    } else {
        // update the function
        if (typeof flags !== 'undefined') method.setFlags(flags);
        if (typeof args !== 'undefined') method.setArgs(args);
        if (typeof body !== 'undefined') method.setCode(body);
    }
    return this;
};


/**
 * @return {Interface|Null}
 */
Interface.locate = function(ast, name) {
  return filter(ast, 'interface', function(node) {
    if (!name || node.name === name) {
      return new Interface(node);
    }
  });
};

module.exports = Interface;
