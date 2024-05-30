import _ from 'lodash';

const getPlain = (obj) => {
  const iter = (value) => {
    switch (typeof value) {
      case 'object':
        return (value === null) ? value : '[complex value]';
      case 'string':
        return `'${value}'`;
      default:
        return `${value}`;
    }
  };
  const getPath = (data) => data.flat().join('.');
  const result = (data, path) => data.map((key) => {
    const currentPath = getPath([path, key.key]);
    switch (key.action) {
      case 'Nested':
        return result(key.value, currentPath);
      case 'Delete':
        return `Property '${currentPath}' was removed`;
      case 'Added':
        return `Property '${currentPath}' was added with value: ${iter(key.value)}`;
      case 'Edit':
        return `Property '${currentPath}' was updated. From ${iter(key.value)} to ${iter(key.value2)}`;
      case 'Unchanged':
        return null;
      default:
        return '';
    }
  });
  return result(obj, []);
};
const makePlain = (data) => {
  const result = getPlain(data);
  const flatten = _.flattenDeep(result);
  const filtered = flatten.filter((el) => el);
  return filtered.join('\n');
};
export default makePlain;
