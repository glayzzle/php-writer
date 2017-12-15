var parser = require('php-parser');

var usegroup = {
  add: function (name) {
    var usegroup = parser.parseEval('use a;').children.shift();
    usegroup.items[0].name = name;
  
    var insertBefore = this.ast.children.findIndex(function (node) {
        return node.kind !== 'usegroup';
    });
  
    this.ast.children.splice(insertBefore, 0, usegroup);
  
    return this;
  }
}

module.exports = usegroup;
