/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */

/**
 * Filters the specified nodes in order to find the specified criterias
 * @param {Array} nodes
 * @param {String} type
 * @param {Function} match
 * @return {Array}
 */
var filter = function filter(ast, type, match) {
    var result;
    if (Array.isArray(ast)) {
        for(var i = 0; i < ast.length; i++) {
            result = filter(ast[i], type, match);
            if (result) {
                return result;
            }
        }
    } else {
        if (ast && ast.kind && ast.kind === type) {
            result = match(ast);
            if (result) {
                return result;
            }
        }
        for(var k in ast) {
            if (ast.hasOwnProperty(k) && ast[k] !== ast) {
                result = filter(ast[k], type, match);
                if (result) {
                    return result;
                }
            }
        }
    }
    return null;
};
module.exports = filter;
