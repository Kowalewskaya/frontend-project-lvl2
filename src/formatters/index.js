import parse from '../parser.js';
import getStylish from './stylish.js';
import getPlain from './plain.js';
import makeComparison from '../comparison.js';

const makeFormat = (data1, data2, format = 'stylish') => {
  const fileContent1 = parse(data1);
  const fileContent2 = parse(data2);
  const currentData = makeComparison(fileContent1, fileContent2);
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
export default makeFormat;
