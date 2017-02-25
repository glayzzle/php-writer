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
 * @constructor Function
 */
var fn = function Function(ast) {
    this.ast = ast;
};
editor(fn, 'body');

/**
 * Changing the function name
 */
fn.prototype.setName = function(name) {
    this.ast.name = name;
    return this;
};

/**
 * Changing the function arguments
 */
fn.prototype.setArgs = function(args) {
    var ast = parser.parseEval('function a('+args+') {}');
    this.ast.arguments = ast.children[0].arguments;
    return this;
};

/**
 * Locate the node in the specified ast
 * AST Offsets :
 * name, params, isRef, use, returnType, body
 */
fn.locate = function(ast, name) {
    return filter(ast, 'function', function(node) {
        if (node.name === name) {
            return new fn(node);
        }
    });
};

module.exports = fn;
