/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
'use strict';

var parser = require('php-parser');
var filter = require('./helpers/filter');
var serialize = require('./helpers/serializer');
var Method = require('./method');
var Property = require('./property');
var Constant = require('./constant');
var traits = require('./helpers/traits');

/**
 * @constructor
 */
var Class = function Class(ast) {
    this.ast = ast;
};

/**
 * Sets the class name
 */
Class.prototype.setName = function(name) {
    this.ast.name = name;
    return this;
};

/**
 * Extends with the specified classname
 */
Class.prototype.setExtends = function(name) {
    if(name) {
        var ast = parser.parseEval('class a extends '+name+' {}');
        this.ast.extends = ast.children[0].extends;
    } else {
        this.ast.extends = null;
    }
    return this;
};

/**
 * Sets a list of implementation classes
 */
Class.prototype.setImplements = function(names) {
  if (Array.isArray(names)) names = names.join(', ');
  if(names) {
    var ast = parser.parseEval('class a implements '+names+' {}');
    this.ast.implements = ast.children[0].implements;
  } else {
    this.ast.implements = null;
  }
  return this;
};

/**
 * Gets a list of implemented classes
 */
Class.prototype.getImplements = function() {
  if (!this.ast.implements) {
    return []
  }

  return this.ast.implements.map(function (_interface) {
    return _interface.resolution === 'rn'
      ? 'namespace\\' + _interface.name
      : _interface.name;
  });
}

/**
 * Adds a new class implement (if not already defined)
 */
Class.prototype.addImplements = function(name) {
    var list = this.getImplements();
    if (list.indexOf(name) === -1) {
        list.push(name);
        this.setImplements(list);
    }
    return this;
};

Class.prototype.setTraits = traits.setTraits;

Class.prototype.getTraits = traits.getTraits;

Class.prototype.addTrait = traits.addTrait;

/**
 * Retrieves a class property
 */
Class.prototype.getProperty = function(name) {
    return Property.locate(this.ast.body, name);
};

/**
 * Sets a property value
 */
Class.prototype.setProperty = function(name, value, flags) {

    var property = this.getProperty(name);
    if (!property) {
        // append the function
        var ast = parser.parseEval('class a { \n' +
            flags + ' $' + name + (
                value ? ' = ' + value : ''
            ) + ';\n' +
        ' }');
        this.ast.body.unshift(
            ast.children[0].body[0]
        );
    } else {
        if (typeof flags !== 'undefined') property.setFlags(flags);
        if (typeof value !== 'undefined') property.setValue(value);
    }

};

/**
 * Sets a constant value
 */
Class.prototype.getConstant = function(name) {
    return Constant.locate(this.ast.body, name);
};

/**
 * Sets a constant value
 */
Class.prototype.setConstant = function(name, value) {
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
Class.prototype.getMethod = function(name) {
    return Method.locate(this.ast.body, name);
};

/**
 * Appends or update an function
 */
Class.prototype.setMethod = function(name, args, body, flags) {
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
 * Locate the node in the specified ast
 */
Class.locate = function(ast, name) {
  return filter(ast, 'class', function(node) {
    if (!name || node.name === name) {
      return new Class(node);
    }
  });
};

module.exports = Class;
