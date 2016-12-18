/**
 * Filters the specified nodes in order to find the specified criterias
 * @param {Array} nodes
 * @param {String} type
 * @param {Function} match
 * @return {Array}
 */
module.exports = function filter(ast, type, match) {
  if (Array.isArray(ast)) {
    if (typeof ast[0] === 'string') {
      // handle checks
      if (ast[0] === type) {
        if (match(ast)) {
          return ast;
        }
      }
      // scan from node type
      switch(ast[0]) {
        case 'program': return filter(ast[1], type, match);
        case 'namespace': return filter(ast[2], type, match);
        case 'doc': return filter(ast[2], type, match);
        case 'comment': return filter(ast[2], type, match);
        case 'position': return filter(ast[3], type, match);
        case 'function': return filter(ast[3], type, match);
      }
    } else {
      // scan each child node
    }
  }
  return null;
};
