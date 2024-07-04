import path from 'path';
import fs from 'fs';
import makeFormat from './formatters/index.js';
import makeComparison from './comparison.js';
import parse from './parser.js';

function readFile(filePath) {
  const dirName = process.cwd(filePath);
  const fullPath = path.resolve(dirName, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

function getExtension(filename) {
  const result = filename.split('.');
  return result.at(-1);
}
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const dataFile1 = readFile(filepath1);
  const dataFile2 = readFile(filepath2);
  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);
  const parseFile1 = parse(dataFile1, extension1);
  const parseFile2 = parse(dataFile2, extension2);
  const dataDiff = makeComparison(parseFile1, parseFile2);
  const result = makeFormat(dataDiff, format);
  return result;
};

export default genDiff;
