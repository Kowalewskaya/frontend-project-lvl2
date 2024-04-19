import _ from 'lodash';

const makeComparison = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
  let result = '{\n';
  keys.forEach((key) => {
    if (key in obj2 && !(key in obj1)) {
      result += `  + ${key}: ${obj2[key]}\n`;
    }
    if (key in obj1 && key in obj2 && obj1[key] !== obj2[key]) {
      result += `  - ${key}: ${obj1[key]}\n`;
      result += `  + ${key}: ${obj2[key]}\n`;
    }
    if (key in obj1 && key in obj2 && obj1[key] === obj2[key]) {
      result += `    ${key}: ${obj1[key]}\n`;
    }
    if (key in obj1 && !(key in obj2)) {
      result += `  - ${key}: ${obj1[key]}\n`;
    }
  });
  return `${result}}`;
};
export default makeComparison;
