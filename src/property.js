/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

var parser = require('php-parser');
var filter = require('./helpers/filter');

var Property = function(ast) {
    this.ast = ast;
};

Property.locate = function(ast, name) {
    return filter(ast, 'property', function(node) {
        if (node.name === name) {
            return new Property(node);
        }
    });
};

module.exports = Property;
