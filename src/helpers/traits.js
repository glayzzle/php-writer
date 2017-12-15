var parser = require('php-parser');

var traitPredicate = function (node) {
  return node.kind === 'traituse';
};

var findTraitsChild = function (subject) {
  return subject.body.find(traitPredicate);
};

var findTraitsChildIndex = function (subject) {
  return subject.body.findIndex(traitPredicate);
};

var traits = {
  setTraits: function (names) {
    if (Array.isArray(names)) {
      names = names.join(', ');
    }
  
    if (!names) {
      var index = findTraitsChildIndex(this.ast);
      
      if (index !== -1) {
        this.ast.body.splice(index, 1);
      }
  
      return this;
    }
  
    var ast = parser
      .parseEval('class a { use ' + names + '; }')
      .children
      .shift()
      .body
      .shift();
  
    this.ast.body.unshift(ast);

    return this;
  },

  addTrait: function (name) {
    var traits = this.getTraits();

    if (traits.indexOf(name) === -1) {
      traits.push(name);
      this.setTraits(traits);
    }

    return this;
  },

  getTraits: function (name) {
    var traituse = findTraitsChild(this.ast);

    if (!traituse) {
      return [];
    }

    return traituse.traits.map(function (trait) {
      return trait.name;
    });
  }
}

module.exports = traits;
