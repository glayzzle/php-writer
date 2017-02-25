/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var parser = require('php-parser');
var filter = require('./helpers/filter');

/**
 * @constructor Property
 */
var Property = function(ast) {
    this.ast = ast;
};

/**
 * Change the property name
 */
Property.prototype.setName = function(name) {
    this.ast.name = name;
    return this;
};

/**
 * Sets a default value
 */
Property.prototype.setValue = function(value) {
    if (value) {
        var ast = parser.parseEval('return '+value+';');
        this.ast.value = ast.children[0].expr;
    } else {
        this.ast.value = null;
    }
    return this;
};

/**
 * Changes visibility / static ... flags
 */
Property.prototype.setFlags = function(flags) {
    var ast = parser.parseEval('class a { '+flags+' $a;');
    var node = ast.children[0].body[0];
    this.ast.isAbstract = node.isAbstract;
    this.ast.isStatic = node.isStatic;
    this.ast.isFinal = node.isFinal;
    this.ast.visibility = node.visibility;
    return this;
};

/**
 * Locates a property
 */
Property.locate = function(ast, name) {
    return filter(ast, 'property', function(node) {
        if (node.name === name) {
            return new Property(node);
        }
    });
};

module.exports = Property;
