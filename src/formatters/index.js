import getStylish from './stylish.js';
import getPlain from './plain.js';
import makeComparison from '../comparison.js';

const index = (data1, data2, format = 'stylish') => {
  const currentData = makeComparison(data1, data2);
  if (format === 'stylish') {
    return getStylish(currentData);
  }
  if (format === 'plain') {
    return getPlain(currentData);
  }
	if (format === 'json') {
		return JSON.stringify(currentData);
	}
  return null;
};
export default index;
