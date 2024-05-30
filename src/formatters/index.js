import getStylish from './stylish.js';
import makePlain from './plain.js';
import makeComparison from '../comparison.js';

const index = (data1, data2, format = 'stylish') => {
  const currentData = makeComparison(data1, data2);
  if (format === 'stylish') {
    return getStylish(currentData);
  }
  if (format === 'plain') {
    return makePlain(currentData);
  }
  return null;
};
export default index;
