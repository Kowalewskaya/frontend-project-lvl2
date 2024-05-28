import _ from 'lodash';

const stylish = (obj) => {
    const signs = {
      added: '+ ',
      deleted: '- ',
      spase: '  ',
    };
    const iter = (object, level = 1) => {
      const replacer = '.';
      const spacesCount = 4;
      const currentIndent = (level) => replacer.repeat(spacesCount * level - 2);
      const braceIndent = (level) => replacer.repeat(spacesCount * level - spacesCount);

      const stringifyObject = (value, level = 1) => {
        if (!_.isObject(value)) {
          return value;
        }
        const line = _.keys(value).map(
          (key) => `${currentIndent(level)}..${key}: ${stringifyObject(value[key], level + 1)}`,
        );
        return `{\n${line.join('\n')}\n${braceIndent(level)}}`;
      }
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