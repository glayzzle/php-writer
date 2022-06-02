/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var parser = require('php-parser');
var filter = require('./helpers/filter');
var editor = require('./helpers/editor');

/**
 * @constructor
 */
var Method = function Method(ast) {
    this.ast = ast;
};
editor(Method, 'body');

/**
 * Change the method name
 */
Method.prototype.setName = function (name) {
    this.ast.name = name;
};

/**
 * Sets the abstract flag value
 */
Method.prototype.setAbstract = function (flag) {
    this.ast.isAbstract = flag === true;
    return this;
};

/**
 * Sets the final flag value
 */
Method.prototype.setFinal = function (flag) {
    this.ast.isFinal = flag === true;
    return this;
};

/**
 * Sets the static flag value
 */
Method.prototype.setStatic = function (flag) {
    this.ast.isStatic = flag === true;
    return this;
};

/**
 * Sets the visibility level value
 */
Method.prototype.setVisibility = function (level) {
    this.ast.visibility = level;
    return this;
};

/**
 * Sets the method arguments
 */
Method.prototype.setArgs = function (args) {
    var ast = parser.parseEval('class a { \n' +
        ' function dummy(' + args + ') { return null;}\n' +
        ' }');

    this.ast.arguments = ast.children[0].body[0].arguments;
    return this;
};

/**
 * Sets the method body
 */
Method.prototype.setCode = function (code) {
    var ast = parser.parseEval('class a { \n' +
        'public function dummy($dummy = true) { ' + code + '}\n' +
        ' }');

    this.ast.body = ast.children[0].body[0].body
    return this;
};

/**
 * Sets the return type
 */
Method.prototype.setReturnType = function (returnType) {
    var ast = parser.parseEval('class a { \n' +
        'public function dummy($dummy = true) ' + returnType + ' { return null; }\n' +
        ' }');

    this.ast.type = ast.children[0].body[0].type;

    if (returnType[1] === '?') {
        this.ast.nullable = true;
    }
    return this;
};

/**
 * Locate the node in the specified ast
 */
Method.locate = function (ast, name) {
    return filter(ast, 'method', function (node) {
        if (node.name === name) {
            return new Method(node);
        }
    });
};

module.exports = Method;
