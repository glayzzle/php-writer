/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var parser = require('php-parser');
var filter = require('./helpers/filter');

/**
 * Initialize a new constant
 * @constructor Constant
 */
var Constant = function(ast) {
    this.ast = ast;
};

/**
 * Changing the constant name
 */
Constant.prototype.setName = function(name) {
    this.ast.name = name;
    return this;
};

/**
 * Makes the constant private
 */
Constant.prototype.setPrivate = function() {
    this.ast.visibility = 'private';
    return this;
};

/**
 * Makes the constant public
 */
Constant.prototype.setPublic = function() {
    this.ast.visibility = 'public';
    return this;
};

/**
 * Changing default value
 */
Constant.prototype.setValue = function(value) {
    if (value) {
        var ast = parser.parseEval('return '+value+';');
        this.ast.value = ast.children[0].expr;
    } else {
        this.ast.value = null;
    }
    return this;
};

/**
 * Finds a constant node
 */
Constant.locate = function(ast, name, fromNs) {
    if (fromNs) {
        return filter(ast, 'constant', function(node) {
            if (node.name === name) {
                return new Constant(node);
            }
        });
    }
    return filter(ast, 'classconstant', function(node) {
        if (node.name === name) {
            return new Constant(node);
        }
    });
};

module.exports = Constant;
