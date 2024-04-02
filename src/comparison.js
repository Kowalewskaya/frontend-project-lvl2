import _ from 'lodash';
const comparison = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
  let result = '{\n';
  for (const key of keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];
      if (key in obj2 && !(key in obj1)) {
        result += ` + ${key}: ${val1}\n`;
      };
      if (key in obj1 && key in obj2 && val1 !== val2) {
        result += ` - ${key}: ${val1}\n`;
        result += ` + ${key}: ${val2}\n`;
      };
      if (key in obj1 && key in obj2 && val1 === val2) {
        result += `   ${key}: ${val1}\n`;
      };
      if (key in obj1 && !(key in obj2)) {
        result += ` - ${key}: ${val2}\n`;
      };
  };
  return result + '}';
};
export default comparison;