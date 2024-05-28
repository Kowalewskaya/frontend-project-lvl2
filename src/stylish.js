import _ from 'lodash';

const stylish = (obj) => {
  const signs = {
    added: '+ ',
    deleted: '- ',
    spase: '  ',
  };
  const iter = (object, level = 1) => {
    const replacer = ' ';
    const spacesCount = 4;
    const currentIndent = (depth) => replacer.repeat(spacesCount * depth - 2);
    const braceIndent = (depth) => replacer.repeat(spacesCount * depth - spacesCount);
    const stringifyObject = (value, depth = 1) => {
      if (!_.isObject(value)) {
        return value;
      }
      const line = _.keys(value).map((key) => `${currentIndent(depth)}  ${key}: ${stringifyObject(value[key], depth + 1)}`);
      return `{\n${line.join('\n')}\n${braceIndent(depth)}}`;
    };
    const result = object.map((key) => {
      switch (key.action) {
        case 'Delete':
          return `${currentIndent(level)}${signs.deleted}${key.key}: ${stringifyObject(key.value, level + 1)}`;
        case 'Added':
          return `${currentIndent(level)}${signs.added}${key.key}: ${stringifyObject(key.value, level + 1)}`;
        case 'Edit':
          return `${currentIndent(level)}${signs.deleted}${key.key}: ${stringifyObject(key.value, level + 1)}\n${currentIndent(level)}${signs.added}${key.key}: ${stringifyObject(key.value2, level + 1)}`;
        case 'Nested':
          return `${currentIndent(level)}${signs.spase}${key.key}: ${iter(key.value, level + 1)}`;
        default:
          return `${currentIndent(level)}${signs.spase}${key.key}: ${stringifyObject(key.value, level + 1)}`;
      }
    });
    return ['{', ...result, `${braceIndent(level)}}`].join('\n');
  };
  return iter(obj);
};
export default stylish;
