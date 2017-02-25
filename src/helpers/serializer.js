/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-writer/graphs/contributors
 * @url http://glayzzle.com/php-writer
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Serialize a javascript objet to a php AST
 */
var serializer = function serializer(value) {
  if (isNumeric(value)) {
    return ['number', value.toString()];
  } else if (typeof value === 'string') {
    return ['string', value];
  } else if (Array.isArray(value)) {
    var ret = ['array'];
    for(var i = 0; i < value.length; i++) {
      ret.push({ key: false, value: serializer(value[i]) });
    }
    return ret;
  } else if (typeof value === 'object') {
    var ret = ['array'];
    for(var k in value) {
      ret.push({ key: ['string', k], value: serializer(value[k]) });
    }
    return ret;
  } else {
    throw new Error('Unable to serialize "'+value+'"');
  }
};

module.exports = serializer;
